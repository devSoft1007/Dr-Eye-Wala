import ReduxProvider from "../../store/ReduxProvider";
import AdminHeader from "./components/adminHeader/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <AdminHeader />
      <main>{children}</main>
      {/* Admin Footer */}
    </ReduxProvider>
  );
}