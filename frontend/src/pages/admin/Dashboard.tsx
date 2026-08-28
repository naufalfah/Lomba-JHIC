import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNews } from "../../api/newsApi";
import { getAchievements } from "../../api/prestasiApi";
import { getTotalGuru, getTotalSiswa } from "../../api/statCounts";

function Dashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    news: 0,
    teachers: 88,
    students: 1279,
    achievements: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadCounts = async () => {
    try {
      setLoading(true);
      const [newsList, achievementList] = await Promise.all([
        getNews().catch(() => []),
        getAchievements().catch(() => []),
      ]);

      setCounts({
        news: newsList.length,
        teachers: getTotalGuru(),
        students: getTotalSiswa(),
        achievements: achievementList.length,
      });
    } catch (err) {
      console.error("Gagal mengambil data statistik:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCounts();

    const handleUpdate = () => loadCounts();
    window.addEventListener("stat_counts_updated", handleUpdate);
    return () => window.removeEventListener("stat_counts_updated", handleUpdate);
  }, []);

  const stats = [
    {
      title: "Berita",
      value: loading ? "..." : counts.news,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
        </svg>
      ),
      path: "/admin/berita",
    },
    {
      title: "Guru & Staff",
      value: counts.teachers,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      path: "/admin/guru",
    },
    {
      title: "Siswa",
      value: counts.students,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      path: "/admin/siswa",
    },
    {
      title: "Prestasi",
      value: loading ? "..." : counts.achievements,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75A1.125 1.125 0 017.5 15.375V18.75m9 0h-9M12 3a4.5 4.5 0 00-4.5 4.5v1.5a4.5 4.5 0 009 0V7.5A4.5 4.5 0 0012 3z" />
        </svg>
      ),
      path: "/admin/prestasi",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="mt-1 text-gray-500">
          Selamat datang kembali, Admin
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            onClick={() => navigate(stat.path)}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition">
                  {stat.title}
                </p>
                <h2 className="mt-2 text-3xl font-bold text-gray-800">
                  {stat.value}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Aktivitas */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-800">
            Aktivitas Terbaru
          </h2>

          <div className="mt-5 space-y-5">
            <div className="flex gap-4">
              <div className="mt-1 h-3 w-3 rounded-full bg-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Pengaturan jumlah total Siswa & Guru aktif
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Tersinkronisasi ke Beranda
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 h-3 w-3 rounded-full bg-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Sistem manajemen berita dan prestasi aktif
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Real-time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold text-gray-800">
            Aksi Cepat
          </h2>

          <div className="mt-5 space-y-3">
            <button
              onClick={() => navigate("/admin/siswa")}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white hover:bg-blue-700 transition cursor-pointer flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              </svg>
              <span>Atur Total Siswa</span>
            </button>

            <button
              onClick={() => navigate("/admin/guru")}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              </svg>
              <span>Atur Total Guru</span>
            </button>

            <button
              onClick={() => navigate("/admin/berita")}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />
              </svg>
              <span>Kelola Berita</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;