import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db/db";
import { getGoogleAccountByUserId, updateGoogleAccessToken } from "./db/queries/user/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Google],
	adapter: DrizzleAdapter(db),
	callbacks: {
		// functions acting similar to middleware
		// called when user logs in > access to session and user object from the db
		async session({session, user}) {
			const googleAccount = await getGoogleAccountByUserId(user.id)

			if (googleAccount && googleAccount.expires_at && googleAccount.expires_at * 1000 < Date.now()) {
				try {
					const response = await fetch("https://oauth2.googleapis.com/token", {
						method: "POST",
						body: new URLSearchParams({
						  client_id: process.env.AUTH_GOOGLE_ID!,
						  client_secret: process.env.AUTH_GOOGLE_SECRET!,
						  grant_type: "refresh_token",
						  refresh_token: googleAccount.refresh_token ?? "",
						}),
					  })

					  const tokensOrError = await response.json()

					  if (!response.ok) throw tokensOrError
			
					  const newTokens = tokensOrError as {
						access_token: string
						expires_in: number
						refresh_token: string
					  }

					  await updateGoogleAccessToken(user.id, {
						access_token: newTokens.access_token,
						expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
						refresh_token: newTokens.refresh_token,
					  })

				} catch (error) {
					console.error("Error refreshing Google access token", error)
					session.error = "RefreshTokenError"
				}
			}




			if (session.user) {
			  session.user.id = user.id;
			}
			return session;
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