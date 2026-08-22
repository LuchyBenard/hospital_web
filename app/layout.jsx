import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { hospitalInfo } from "@/constants";

export const metadata = {
  title: `${hospitalInfo.name} | Advanced Clinical Care & Level I Trauma`,
  description: hospitalInfo.tagline,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
