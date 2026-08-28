import { useState, useEffect } from "react";
import { getNews, type News } from "../api/newsApi";
import { Link } from "react-router-dom";

function Artikel() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        setNewsList(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="min-h-[50vh] md:min-h-[70vh] relative overflow-hidden bg-[#FFA313] px-4 sm:px-6 py-10 md:py-16">
      <div className="absolute -left-20 md:-left-30 -top-20 md:-top-34 h-52 md:h-86 w-52 md:w-86 rounded-full bg-[#E89100]" />
      <div className="absolute -bottom-20 md:-bottom-34 -right-20 md:-right-30 h-52 md:h-86 w-52 md:w-86 rounded-full bg-[#E89100]" />

      <div className="relative z-10 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          ARTIKEL DAN BERITA
        </h2>
        <p className="mt-2 text-sm md:text-lg text-white">
          Beberapa artikel yang dapat kami tampilkan...
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-6 max-w-[1380px] rounded-2xl bg-[#E89100] p-3 md:p-4">

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
              </svg>
              <p className="text-sm text-white/80">Memuat berita...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-white/80">Gagal memuat berita. Silakan coba lagi nanti.</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && newsList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <svg className="w-12 h-12 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="text-sm text-white/80">Belum ada berita yang dipublikasikan</p>
          </div>
        )}

        {/* News list */}
        {!loading && !error && newsList.length > 0 && (
          <div className="flex gap-6 overflow-x-auto pb-2">
            {newsList.map((item) => (
              <Link
                to={`/berita/${item.id}`}
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
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
                  {new Date(item.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </Link>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Artikel;