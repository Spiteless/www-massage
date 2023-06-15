import type { AppProps } from "next/app"
import { Public_Sans } from "next/font/google"
import Head from "next/head"

import { ThemeProvider } from 'next-themes'

import "../styles/global.css"
import ThemeSwitch from "@/components/ThemeSwitch"

const public_sans = Public_Sans({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
})

const theme: string = "dark"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{`Meet with ${
          process.env.NEXT_PUBLIC_OWNER_NAME ?? "me"
        }`}</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <style jsx global>{`
        html {
          font-family: ${public_sans.style.fontFamily};
        }
      `}</style>
      <ThemeProvider defaultTheme={theme}>
        <ThemeSwitch />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
