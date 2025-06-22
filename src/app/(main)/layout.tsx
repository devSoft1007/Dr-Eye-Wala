import ReduxProvider from "../../store/ReduxProvider";
import { Geist, Geist_Mono } from "next/font/google";
import '../globals.css';
import Header from "@/components/header/Header";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </ReduxProvider>
  );
}
