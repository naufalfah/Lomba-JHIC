function Dashboard() {
  const stats = [
    {
      title: "Berita",
      value: "12",
      icon: "📰",
    },
    {
      title: "Guru & Staff",
      value: "36",
      icon: "👨‍🏫",
    },
    {
      title: "Siswa",
      value: "845",
      icon: "👨‍🎓",
    },
    {
      title: "Prestasi",
      value: "27",
      icon: "🏆",
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
          Selamat datang kembali, Admin 👋
        </p>

      </div>


      {/* Statistik */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => (

          <div
            key={stat.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-800">
                  {stat.value}
                </h2>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
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
                  Admin menambahkan berita baru
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  10 menit yang lalu
                </p>
              </div>
            </div>


            <div className="flex gap-4">
              <div className="mt-1 h-3 w-3 rounded-full bg-green-500" />

              <div>
                <p className="text-sm font-medium text-gray-700">
                  Data guru diperbarui
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  1 jam yang lalu
                </p>
              </div>
            </div>


            <div className="flex gap-4">
              <div className="mt-1 h-3 w-3 rounded-full bg-yellow-500" />

              <div>
                <p className="text-sm font-medium text-gray-700">
                  Sambutan kepala sekolah diubah
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  2 jam yang lalu
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

            <button className="w-full rounded-xl bg-blue-600 px-4 py-3 text-left text-sm font-medium text-white hover:bg-blue-700">
              + Tambah Berita
            </button>

            <button className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50">
              + Tambah Guru
            </button>

            <button className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50">
              ✏️ Edit Beranda
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;