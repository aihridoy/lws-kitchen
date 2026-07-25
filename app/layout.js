import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SavedRecipesProvider } from "./context/SavedRecipesContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "LWS Kitchen — Delicious Recipes & Cooking Inspiration",
  description:
    "Discover delicious recipes, cooking tips, and culinary inspiration for every occasion. From quick weeknight dinners to weekend baking projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-paper text-ink flex flex-col min-h-screen`}
      >
        <SavedRecipesProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </SavedRecipesProvider>
      </body>
    </html>
  );
}
