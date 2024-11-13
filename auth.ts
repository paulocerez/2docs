import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "./db/postgres/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Google],
	adapter: DrizzleAdapter(db),
	callbacks: {
		// functions acting similar to middleware
		// called when user logs in > access to session and user object from the db
		async session({session, user}) {
			if (session.user) {
			  session.user.id = user.id;
			}
			return session;
		},

		authorized({auth, request: { nextUrl}}) {
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