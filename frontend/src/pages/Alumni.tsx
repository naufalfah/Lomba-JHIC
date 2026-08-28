import { useState, useEffect } from "react";
import { getAlumni, type Alumni } from "../api/alumniApi";
import { getMajors, type Major } from "../api/jurusanApi";
import { getImageUrl } from "../api/uploadApi";

function AlumniPage() {
  const [alumniList, setAlumniList] = useState<Alumni[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedMajor, setSelectedMajor] = useState<string>("ALL");
  const [selectedYear, setSelectedYear] = useState<string>("ALL");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [alumniRes, majorRes] = await Promise.all([
        getAlumni(),
        getMajors(),
      ]);
      setAlumniList(alumniRes);
      setMajors(majorRes);
    } catch (err) {
      console.error("Gagal mengambil data alumni:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatYear = (dateStr?: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return isNaN(date.getFullYear()) ? dateStr : date.getFullYear().toString();
  };

  const availableYears = Array.from(
    new Set(
      alumniList
        .map((a) => formatYear(a.graduationYear))
        .filter((y) => y !== "-")
    )
  ).sort((a, b) => b.localeCompare(a));

  const filteredAlumni = alumniList.filter((item) => {
    const studentName = item.student?.name || "";
    const studentEmail = item.student?.email || "";
    const majorName = item.student?.major?.name || "";
    const quote = item.quote || "";
    const instance = item.instance || "";
    const yearStr = formatYear(item.graduationYear);
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      studentName.toLowerCase().includes(search) ||
      studentEmail.toLowerCase().includes(search) ||
      majorName.toLowerCase().includes(search) ||
      quote.toLowerCase().includes(search) ||
      instance.toLowerCase().includes(search) ||
      yearStr.includes(search);

    const matchesMajor =
      selectedMajor === "ALL" ||
      item.student?.major?.id?.toString() === selectedMajor;

    const matchesYear =
      selectedYear === "ALL" || yearStr === selectedYear;

    return matchesSearch && matchesMajor && matchesYear;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* TOP SECTION: HERO BANNER & SEARCH FILTERS */}
      <section className="relative pt-28 pb-16 overflow-hidden bg-gradient-to-r from-[#FFA20D] via-[#FF8000] to-[#E06C00] px-4 md:px-8 shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_55%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center text-white relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-3 border border-white/30">
            Direktori Alumni
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
            Cari Alumni SMKN 2 Kota Mojokerto
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Temukan informasi alumni, angkatan lulusan, jurusan, dan jejak prestasi para lulusan terbaik sekolah kita.
          </p>

          {/* SEARCH & FILTERS CONTAINER */}
          <div className="bg-white/95 backdrop-blur-lg p-4 md:p-5 rounded-2xl shadow-xl text-gray-800 grid grid-cols-1 md:grid-cols-4 gap-3 max-w-4xl mx-auto border border-white/50">
            {/* Input Search */}
            <div className="md:col-span-2 relative">
              <input
                type="text"
                placeholder="Cari nama, email, atau prestasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100/90 border border-gray-200/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFA20D] transition"
              />
              <span className="absolute left-3.5 top-3.5 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </span>
            </div>

            {/* Filter Jurusan */}
            <div>
              <select
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
                className="w-full px-3.5 py-3 bg-gray-100/90 border border-gray-200/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFA20D] transition cursor-pointer text-gray-700"
              >
                <option value="ALL">Semua Jurusan</option>
                {majors.map((m) => (
                  <option key={m.id} value={m.id?.toString()}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Tahun */}
            <div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3.5 py-3 bg-gray-100/90 border border-gray-200/80 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#FFA20D] transition cursor-pointer text-gray-700"
              >
                <option value="ALL">Semua Tahun</option>
                {availableYears.map((yr) => (
                  <option key={yr} value={yr}>
                    Lulusan {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM SECTION: ALUMNI TABLE */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 mt-10">
        {/* Table Title & Count Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3 border-b border-gray-200/70 pb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Daftar Alumni Sekolah</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Menampilkan {filteredAlumni.length} data alumni terdaftar
            </p>
          </div>
          {(searchTerm || selectedMajor !== "ALL" || selectedYear !== "ALL") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedMajor("ALL");
                setSelectedYear("ALL");
              }}
              className="text-xs text-[#FFA20D] font-semibold hover:underline cursor-pointer flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span>Reset Filter</span>
            </button>
          )}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-16 text-center text-gray-400">
              <div className="inline-block w-8 h-8 border-4 border-[#FFA20D] border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-sm">Memuat data alumni...</p>
            </div>
          ) : filteredAlumni.length === 0 ? (
            <div className="p-16 text-center text-gray-400">
              <div className="w-14 h-14 bg-amber-50 text-[#FFA20D] rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147L12 14.625l7.74-4.478M12 3L2.25 8.625l9.75 5.625 9.75-5.625L12 3zM4.5 12.375v4.5A2.25 2.25 0 006.75 19.125h10.5a2.25 2.25 0 002.25-2.25v-4.5" />
                </svg>
              </div>
              <p className="text-base font-semibold text-gray-700">Data Alumni Tidak Ditemukan</p>
              <p className="text-xs text-gray-400 mt-1">
                Silakan coba ubah kata kunci atau kata filter pencarian Anda.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200/70 text-[11px] font-bold uppercase text-gray-500 tracking-wider">
                    <th className="py-4 px-6">NAMA & EMAIL</th>
                    <th className="py-4 px-6">JURUSAN</th>
                    <th className="py-4 px-6">LULUSAN TAHUN</th>
                    <th className="py-4 px-6">KETERANGAN PRESTASI (OPSIONAL)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {filteredAlumni.map((item) => {
                    const studentName = item.student?.name || "Alumni SMKN 2";
                    const email = item.student?.email || "-";
                    const majorName = item.student?.major?.name || "Jurusan Umum";
                    const graduationYear = formatYear(item.graduationYear);
                    const quote = item.quote;

                    return (
                      <tr
                        key={item.studentId}
                        className="hover:bg-amber-50/30 transition-colors"
                      >
                        {/* NAMA & EMAIL */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 font-bold text-xs shrink-0 overflow-hidden">
                              {item.student?.imagePath ? (
                                <img
                                  src={getImageUrl(item.student.imagePath)}
                                  alt={studentName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                studentName.charAt(0).toUpperCase()
                              )}
                            </div>
                            <div className="overflow-hidden">
                              <div className="font-bold text-gray-900 text-sm leading-snug">
                                {studentName}
                              </div>
                              <div className="text-xs text-gray-400 font-normal truncate mt-0.5">
                                {email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* JURUSAN */}
                        <td className="py-4 px-6">
                          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                            {majorName}
                          </span>
                        </td>

                        {/* LULUSAN TAHUN */}
                        <td className="py-4 px-6 font-semibold text-gray-800">
                          Lulusan Ke- {graduationYear}
                        </td>

                        {/* KETERANGAN PRESTASI (OPSIONAL) */}
                        <td className="py-4 px-6 max-w-xs">
                          {quote ? (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200/80 rounded-xl text-xs font-semibold text-amber-900 italic">
                              <svg className="w-3.5 h-3.5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75A1.125 1.125 0 017.5 15.375V18.75m9 0h-9M12 3a4.5 4.5 0 00-4.5 4.5v1.5a4.5 4.5 0 009 0V7.5A4.5 4.5 0 0012 3z" />
                              </svg>
                              <span className="truncate">{quote}</span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-300 italic">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AlumniPage;
