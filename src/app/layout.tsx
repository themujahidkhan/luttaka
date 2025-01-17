import "@/styles/globals.css"

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TRPCReactProvider } from "@/trpc/react"

import ProtectedPage from "./protected-page"
import PublicPage from "./public-page"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  manifest: "/manifest.json",
  title: "Luttaka",
  description: "The open source conference app from Flowcore",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen ${inter.variable} font-inter`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"light"}
          disableTransitionOnChange
          enableSystem={false}>
          <ClerkProvider>
            <SignedOut>
              <PublicPage children={children} />
            </SignedOut>
            <SignedIn>
              <TRPCReactProvider cookies={cookies().toString()}>
                <ProtectedPage children={children} />
                <Toaster richColors />
              </TRPCReactProvider>
            </SignedIn>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
