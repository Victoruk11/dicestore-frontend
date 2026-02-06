import type React from "react"
import { Toaster } from "sonner";

// import "./globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className="font-sans antialiased overflow-x-hidden">
        <Toaster position="top-right" richColors />
        {children}
        </body>
        </html>
    )
}



