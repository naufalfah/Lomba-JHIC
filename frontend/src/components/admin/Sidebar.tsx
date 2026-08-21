import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "📊",
    },
    {
      name: "Beranda",
      path: "/admin/beranda",
      icon: "🏠",
    },
    {
      name: "Berita",
      path: "/admin/berita",
      icon: "📰",
    },
    {
      name: "Guru & Staff",
      path: "/admin/guru",
      icon: "👨‍🏫",
    },
    {
      name: "Siswa",
      path: "/admin/siswa",
      icon: "👨‍🎓",
    },
    {
      name: "Pengaturan",
      path: "/admin/pengaturan",
      icon: "⚙️",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r border-gray-200">

      {/* Logo */}
      <div className="flex h-20 items-center gap-3 px-6 border-b border-gray-200">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          🏫
        </div>

        <div>
          <h1 className="font-bold text-gray-800">
            Admin Panel
          </h1>

          <p className="text-xs text-gray-400">
            Website Sekolah
          </p>
        </div>
      </div>


      {/* Menu */}
      <nav className="p-4">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Menu Utama
        </p>

        <div className="space-y-1">

          {menu.map((item) => {

            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition
                  ${active
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >

                <span className="text-lg">
                  {item.icon}
                </span>

                {item.name}

              </Link>
            );
          })}

        </div>
      </nav>


      {/* Logout */}
      <div className="absolute bottom-4 left-4 right-4">

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50">
          🚪
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;