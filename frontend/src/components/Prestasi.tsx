import { useState, useEffect } from "react";
import { getAchievements, type Achievement } from "../api/prestasiApi";
import { Link } from "react-router-dom";

function Prestasi() {
  const [achievementList, setAchievementList] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await getAchievements();
        setAchievementList(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <section className="min-h-[50vh] md:min-h-[60vh] relative overflow-hidden bg-[#FFA313] px-4 sm:px-6 py-10 md:py-16">
      {/* Decorative circles */}
      <div className="absolute -left-16 md:-left-20 -top-16 md:-top-20 h-48 md:h-72 w-48 md:w-72 rounded-full bg-[#E89100]" />
      <div className="absolute -bottom-16 md:-bottom-20 -right-16 md:-right-20 h-48 md:h-72 w-48 md:w-72 rounded-full bg-[#E89100]" />

      <div className="relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          PRESTASI
        </h2>
        <p className="mt-2 text-sm md:text-lg text-white/80">
          Beberapa prestasi yang dimiliki oleh SMKN 2 Mojokerto
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-6 md:mt-8 max-w-[1380px] rounded-2xl bg-[#E89100] p-3 md:p-4 lg:p-6">

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
              </svg>
              <p className="text-sm text-white/80">Memuat prestasi...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-white/80">Gagal memuat prestasi. Silakan coba lagi nanti.</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && achievementList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75A1.125 1.125 0 017.5 15.375V18.75m9 0h-9M12 3a4.5 4.5 0 00-4.5 4.5v1.5a4.5 4.5 0 009 0V7.5A4.5 4.5 0 0012 3z" />
            </svg>
            <p className="text-sm text-white/80">Belum ada prestasi yang ditambahkan</p>
          </div>
        )}

        {/* Achievement cards */}
        {!loading && !error && achievementList.length > 0 && (
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {achievementList.map((item) => (
              <Link
                to={`/prestasi/${item.id}`}
                key={item.id}
                className="w-[260px] sm:w-[300px] md:w-[340px] shrink-0 rounded-2xl bg-white p-3 md:p-4 shadow-md hover:shadow-xl transition-all duration-300 block text-left group"
              >
                <div className="h-[190px] overflow-hidden rounded-xl bg-gray-100 relative">
                  {item.imagePath ? (
                    <img
                      src={item.imagePath}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-300">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75A1.125 1.125 0 017.5 15.375V18.75m9 0h-9M12 3a4.5 4.5 0 00-4.5 4.5v1.5a4.5 4.5 0 009 0V7.5A4.5 4.5 0 0012 3z" />
                      </svg>
                    </div>
                  )}
                </div>

                <h3 className="mt-4 text-center text-lg font-semibold text-gray-800 line-clamp-2 break-words group-hover:text-[#E89100] transition-colors duration-200">
                  {item.title}
                </h3>

                <p className="mt-2 text-center text-sm text-gray-500 line-clamp-2 break-words">
                  {item.description}
                </p>

                <p className="mt-2 text-center text-xs text-gray-400">
                  {item.date
                    ? new Date(item.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : `${item.organizer} ${item.tier ? `• ${item.tier}` : ""}`}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Prestasi;
