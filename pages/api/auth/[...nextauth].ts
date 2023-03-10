import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../src/lib/mongodb"

/**
  Authentication options for NextAuth.JS
*/

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      /**
       * Authorize callback function. It checks the DB connection and checks the user ID and password for validation.
       * @param {Object} credentials - User credentials
       * @param {Object} req - Request object
       * @returns {Promise<Object>} - User object
      */

      async authorize(credentials, req) {        
        const client = await clientPromise;
        const db = client.db("test");
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await db.collection("users").findOne({
          email: email,
          password : password
        });
        
        console.log("user found " ,user)
        if (user) {
          // The user object that we have received from the DB
          return user
        } else {
          // If no user found then return null
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/', // Sign in page
    signOut: '/', // Sign Out page
  },
  
  callbacks: {
    /**
      * JWT callback function which we can access
      * @param {Object} params - Callback parameters
      * @param {Object} params.user - User object
      * @param {Object} params.token - JWT token object
      * @returns {Object} Updated JWT token
      */

    jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      
      // return final_token
      return params.token;
    },
  },
};

export default NextAuth(authOptions);
