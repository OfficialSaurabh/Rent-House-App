import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
// pages/_app.js
import { Toaster } from "react-hot-toast";
import { SessionProvider as AuthProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <AuthProvider session={session}>
        <Component {...pageProps} />
        <Analytics />
      </AuthProvider>

      <Toaster />
    </>
  );
}

export default MyApp;
