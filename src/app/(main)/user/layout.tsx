import Header from "@/components/header/Header"
import Footer from "@/components/ui/Footer";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
      <>
        {/* User Header */}
        <Header />
            <main>{children}</main>
        <Footer />
        {/* User Footer */}
      </>
    );
  }