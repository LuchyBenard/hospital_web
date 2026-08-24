import "./globals.css";
import { Source_Sans_3, Lora } from "next/font/google";
import { AuthProvider } from "@/contexts/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { hospitalInfo, siteConfig } from "@/constants";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${hospitalInfo.name} | Advanced Clinical Care & Level I Trauma`,
    template: `%s | ${hospitalInfo.shortName}`,
  },
  description:
    "Providence General Hospital delivers board-certified specialty care, robotic surgery, and 24/7 Level I trauma services. Schedule an appointment or find a doctor today.",
  keywords: [
    "hospital",
    "emergency care",
    "Level I trauma center",
    "find a doctor",
    "appointment booking",
    "cardiology",
    "pediatrics",
  ],
  openGraph: {
    type: "website",
    siteName: hospitalInfo.name,
    locale: "en_US",
    url: siteConfig.url,
    title: `${hospitalInfo.name} | Advanced Clinical Care & Level I Trauma`,
    description:
      "Board-certified specialists, precision robotic surgery, and 24/7 acute trauma readiness.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${hospitalInfo.name} | Level I Trauma Center`,
    description:
      "Advanced clinical medicine. Compassionate patient care. Open 24/7.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a4e8a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${lora.variable}`}>
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
