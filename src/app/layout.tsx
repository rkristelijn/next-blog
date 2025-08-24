import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeRegistry from '@/components/ThemeRegistry';
import ErrorBoundary from '@/components/ErrorBoundary';
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Blog",
  description: "A modern blog built with Next.js and Material-UI",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="emotion-insertion-point" content="" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var mode = localStorage.getItem('theme-mode');
                  if (!mode) {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    mode = prefersDark ? 'dark' : 'light';
                  }
                  // Remove any existing theme classes first
                  document.documentElement.classList.remove('mui-light', 'mui-dark');
                  // Add the correct theme class
                  document.documentElement.classList.add('mui-' + mode);
                  // Store the theme in a global variable for immediate access
                  window.__THEME_MODE__ = mode;
                  // Set data attribute for MUI CSS variables
                  document.documentElement.setAttribute('data-mui-color-scheme', mode);
                } catch (e) {
                  document.documentElement.classList.remove('mui-light', 'mui-dark');
                  document.documentElement.classList.add('mui-light');
                  document.documentElement.setAttribute('data-mui-color-scheme', 'light');
                  window.__THEME_MODE__ = 'light';
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeRegistry>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeRegistry>
      </body>
    </html>
  );
}
