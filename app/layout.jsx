import "./globals.css";
import { Source_Sans_3, Lora } from "next/font/google";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HospitalSchema } from "@/components/seo/hospital-schema";
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

// Runs before first paint: restores the saved theme or follows the system,
// so there is no light-flash on dark loads.
const themeBoot = `(function(){try{var t=localStorage.getItem("ibuild.theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.dataset.theme=t;}catch(e){}})();`;

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1e56a0" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1422" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${lora.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <HospitalSchema />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
