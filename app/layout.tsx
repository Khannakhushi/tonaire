import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { UserProvider } from "@/components/UserProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tonaire - Say it your way",
  description:
    "Your AI-powered tone stylist. Rephrase sentences and generate stylish social posts in any vibe you want.",
  keywords: [
    "AI",
    "tone",
    "writing",
    "social media",
    "rephrasing",
    "content creation",
    "LinkedIn",
    "Twitter",
    "Instagram",
  ],
  authors: [{ name: "Tonaire Team" }],
  creator: "Tonaire",
  publisher: "Tonaire",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tonaire.vercel.app"),
  openGraph: {
    title: "Tonaire - Say it your way",
    description:
      "Your AI-powered tone stylist. Rephrase sentences and generate stylish social posts in any vibe you want.",
    url: "https://tonaire.vercel.app",
    siteName: "Tonaire",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tonaire - Say it your way",
    description:
      "Your AI-powered tone stylist. Rephrase sentences and generate stylish social posts in any vibe you want.",
    creator: "@tonaire",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="theme-color" content="#8b5a83" />
      </head>
      <body className={`${cormorant.variable} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>{children}</UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
