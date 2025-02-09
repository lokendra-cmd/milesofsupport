import mongoose from "mongoose";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
// import EmailProvider from 'next-auth/providers/email'
import connectDB from "@/app/DB/connectDB";
import User from "@/app/Models/User";


export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // EmailProvider({
    //   server: {
    //     host: process.env.EMAIL_SERVER_HOST,
    //     port: process.env.EMAIL_SERVER_PORT,
    //     auth: {
    //       user: process.env.EMAIL_SERVER_USER,
    //       pass: process.env.EMAIL_SERVER_PASSWORD,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
  callbacks: {
    async signIn({ user, account }) {
     
      if(account.provider === 'github'){
        await connectDB();

        const currentUser = await User.findOne({ email: user.email });

        if(!currentUser){
         const newUser = await User.create({
            name:user.name,
            username: user.email.split("@")[0],
            email: user.email,
          });
          
        }       
      }
      return true;
    }
  }
})

export { authoptions as GET, authoptions as POST }