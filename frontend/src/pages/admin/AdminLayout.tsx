import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../../components/admin/sidebar";
import { isLoggedIn } from "../../api/authApi";

function AdminLayout() {
  // Route guard: redirect ke /admin/login jika belum login
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <Sidebar />

      <main className="ml-64 min-h-screen">

        <Outlet />

      </main>

    </div>
  );
}

export default AdminLayout;