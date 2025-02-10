import mongoose from "mongoose";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/app/DB/connectDB";
import User from "@/app/Models/User";


export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    
  ],
  // Pass the MongoDB connection here
  callbacks: {
    async signIn({ user, account }) {
     
     
        await connectDB();

        const currentUser = await User.findOne({ email: user.email });

        if(!currentUser){
         const newUser = await User.create({
            name:user.name,
            username: user.email.split("@")[0],
            email: user.email,
          });
          
        }       
      
      return true;
    }
  }
})

export { authoptions as GET, authoptions as POST }