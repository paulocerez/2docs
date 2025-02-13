import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Sendgrid from "next-auth/providers/sendgrid"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db/db";
import { getGoogleAccountByUserId, updateGoogleAccessToken } from "./db/queries/user/user";
import CredentialsProvider from "next-auth/providers/credentials"
import { verifyEmailLogin } from "./lib/auth/email-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
					scope: "openid email profile"
				}
			}
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" }
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null
				}
				
				try {
					const user = await verifyEmailLogin(
						credentials.email as string,
						credentials.password as string
					)
					return user
				} catch (error) {
					return null
				}
			}
		})
	],
	adapter: DrizzleAdapter(db),
	session: {
		strategy: "jwt",
	},
	callbacks: {
		// called when user logs in > access to session and user object from the db
		async session({session, token}) {
			if (token.provider === "google") {
				const googleAccount = await getGoogleAccountByUserId(token.id as string)

				if (googleAccount?.refresh_token) {
					const tokenExpiryTime = googleAccount.expires_at ? googleAccount.expires_at * 1000 : 0
					const shouldRefreshToken = tokenExpiryTime ? tokenExpiryTime <= Date.now() : false

					if (shouldRefreshToken) {
						try {
							const response = await fetch("https://oauth2.googleapis.com/token", {
								method: "POST",
								headers: { "Content-Type": "application/x-www-form-urlencoded" },
								body: new URLSearchParams({
									client_id: process.env.AUTH_GOOGLE_ID!,
									client_secret: process.env.AUTH_GOOGLE_SECRET!,
									grant_type: "refresh_token",
									refresh_token: googleAccount.refresh_token,
								}),
							})

							const tokens = await response.json()

							if (!response.ok) throw tokens

							await updateGoogleAccessToken(token.id as string, {
								access_token: tokens.access_token,
								expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
								// Only update refresh_token if a new one was provided
								...(tokens.refresh_token && { refresh_token: tokens.refresh_token }),
							})
						} catch (error) {
							console.error("Error refreshing Google access token", error)
							session.error = "RefreshTokenError"
						}
					}
				}
			}

			if (session.user) {
				session.user.id = token.id as string
			}
			return session
		},

		async jwt({ token, user, account }) {
			if (user) {
				token.id = user.id
				token.email = user.email
			}
			// Save the provider to the token right after signing in
			if (account) {
				token.provider = account.provider
			}
			return token
		},

		authorized({auth, request: { nextUrl}}) {
			if (nextUrl.pathname.startsWith('/api/auth/')) {
				return true;
			}

			const isLoggedIn = !!auth?.user;
			const paths = ["/chat", "/workflows", "/settings", "/docs"]
			const isProtected = paths.some((path) => nextUrl.pathname.startsWith(path))

			if (isProtected && !isLoggedIn) {
				const redirectUrl = new URL("/", nextUrl.origin)
				redirectUrl.searchParams.append("callbackUrl", nextUrl.href)
				return Response.redirect(redirectUrl)
			}

			return true
		}
	}
});