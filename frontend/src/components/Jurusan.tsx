import { useState, useEffect } from "react";
import { getMajors, type Major } from "../api/jurusanApi";

// Helper function to resolve Title (code/short name) and Subtitle (full name/description)
const getMajorDisplay = (item: Major): { title: string; subtitle: string } => {
  const nameTrimmed = (item.name || "").trim();
  const descTrimmed = (item.description || "").trim();

  // Default mapping for known vocational majors
  const defaultFullNames: Record<string, string> = {
    RPL: "Rekayasa Perangkat Lunak",
    LPS: "Layanan Perbankan Syariah",
    DKV: "Desain Komunikasi Visual",
    KULINER: "Kuliner",
    APHP: "Agribisnis Pengolahan Hasil Pertanian",
  };

  const nameUpper = nameTrimmed.toUpperCase();
  const knownFullName = defaultFullNames[nameUpper];

  if (descTrimmed.length > 0) {
    return {
      title: nameTrimmed,
      subtitle: descTrimmed,
    };
  }

  if (knownFullName) {
    return {
      title: nameTrimmed,
      subtitle: knownFullName,
    };
  }

  // Handle parenthetical names e.g. "RPL (Rekayasa Perangkat Lunak)"
  const matchParen = nameTrimmed.match(/^(.*?)\s*\((.*?)\)$|^([^(]+)\((.*)\)$/);
  if (matchParen) {
    const p1 = (matchParen[1] || matchParen[3] || "").trim();
    const p2 = (matchParen[2] || matchParen[4] || "").trim();
    if (p1.length <= 6) return { title: p1, subtitle: p2 };
    if (p2.length <= 6) return { title: p2, subtitle: p1 };
    return { title: p1, subtitle: p2 };
  }

  return {
    title: nameTrimmed,
    subtitle: "",
  };
};

function Jurusan() {
  const [majorList, setMajorList] = useState<Major[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const data = await getMajors();
        setMajorList(data);
      } catch {
        setError(true);    
      } finally {
        setLoading(false);
      }
    };

    fetchMajors();
  }, []);

  return (
    <section className="min-h-[50vh] md:min-h-[60vh] relative overflow-hidden bg-gradient-to-br from-[#6C63FF] to-[#8B83FF] px-4 sm:px-6 py-10 md:py-16">
      {/* Decorative circles */}
      <div className="absolute -left-16 md:-left-20 -top-16 md:-top-20 h-48 md:h-72 w-48 md:w-72 rounded-full bg-white/10" />
      <div className="absolute -bottom-16 md:-bottom-20 -right-16 md:-right-20 h-48 md:h-72 w-48 md:w-72 rounded-full bg-white/10" />

      <div className="relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          JURUSAN
        </h2>
        <p className="mt-2 text-sm md:text-lg text-white/80">
          Jurusan yang tersedia di SMKN 2 Mojokerto
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-6 md:mt-8 max-w-[1380px] rounded-2xl bg-white/20 backdrop-blur-sm p-3 md:p-4 lg:p-6">

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
              </svg>
              <p className="text-sm text-white/80">Memuat jurusan...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-white/80">Gagal memuat jurusan. Silakan coba lagi nanti.</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && majorList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147L12 14.625l7.74-4.478M12 3L2.25 8.625l9.75 5.625 9.75-5.625L12 3zM4.5 12.375v4.5A2.25 2.25 0 006.75 19.125h10.5a2.25 2.25 0 002.25-2.25v-4.5" />
            </svg>
            <p className="text-sm text-white/80">Belum ada jurusan yang ditambahkan</p>
          </div>
        )}

        {/* Major cards */}
        {!loading && !error && majorList.length > 0 && (
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {majorList.map((item) => {
              const { title, subtitle } = getMajorDisplay(item);

              return (
                <div
                  key={item.id}
                  className="w-[240px] sm:w-[280px] md:w-[320px] shrink-0 rounded-2xl bg-white p-4 md:p-5 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                >
                  {/* 1. GAMBAR (1:1 Aspect Square Container) */}
                  <div className="w-full aspect-square overflow-hidden rounded-xl bg-gray-100 relative">
                    {item.logoPath ? (
                      <img
                        src={item.logoPath}
                        alt={item.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-300">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147L12 14.625l7.74-4.478M12 3L2.25 8.625l9.75 5.625 9.75-5.625L12 3zM4.5 12.375v4.5A2.25 2.25 0 006.75 19.125h10.5a2.25 2.25 0 002.25-2.25v-4.5" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* 2. JUDUL & 3. SUB JUDUL */}
                  <div className="mt-4 text-center">
                    {/* Judul Utama / Kode */}
                    <h3 className="text-2xl font-black text-gray-800 tracking-tight uppercase group-hover:text-[#6C63FF] transition-colors duration-200">
                      {title}
                    </h3>
                    {/* Sub Judul / Nama Lengkap */}
                    {subtitle ? (
                      <p className="mt-1 text-sm font-semibold text-gray-600 break-words line-clamp-2">
                        {subtitle}
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Jurusan;