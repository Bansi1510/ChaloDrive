import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/lib/Provider";
import ReduxProvider from "@/redux/ReduxProvider";
import GetUser from "@/components/hooks/GetUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChaloDrive",
  description: "🚗 Multi-vendor vehicle booking platform — built with Next.js 14, MongoDB, Socket.io, ZEGOCLOUD Video KYC, Razorpay payments & Auth.js. Features real-time booking updates, vendor dashboards, admin KYC approval, and smooth Framer Motion UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Provider>
          <ReduxProvider>
            <GetUser />
            {children}
          </ReduxProvider>

        </Provider>
      </body>
    </html>
  );
}
