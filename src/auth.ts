import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import connectDB from "./lib/db"
import User from "./models/user.model"
import bcrypt from "bcryptjs"
import type { AuthOptions } from "next-auth"
export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credentials not found")
        }

        await connectDB()

        const user = await User.findOne({ email: credentials.email })

        if (!user) throw new Error("User not found")

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isMatch) throw new Error("Invalid password")

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
    }),

    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        await connectDB()

        let existingUser = await User.findOne({ email: user.email })

        if (!existingUser) {
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            role: "user",
          })
        }

        user.id = existingUser._id
        user.role = existingUser.role
      }

      return true
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.role = user.role
      }
      return token
    },

    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.role = token.role as string
      }
      return session
    },
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  session: {
    strategy: "jwt" as const,
    maxAge: 10 * 24 * 60 * 60,
  },

  secret: process.env.AUTH_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);