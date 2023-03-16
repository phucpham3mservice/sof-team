import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "437711522760-j9usah9n6e3ceh47td6peo26impbib92.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});
