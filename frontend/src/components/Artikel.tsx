import { useState, useEffect } from "react";
import { getNews, type News } from "../api/newsApi";

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
    <section className="relative overflow-hidden bg-[#FFA313] px-6 py-16">
      <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[#E89100]" />
      <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-[#E89100]" />

      <div className="relative z-10 text-center">
        <h2 className="text-4xl font-bold text-white">
          ARTIKEL DAN BERITA
        </h2>
        <p className="mt-2 text-sm text-white">
          Beberapa artikel yang dapat kami tampilkan...
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-6 max-w-[1120px] rounded-2xl bg-[#E89100] p-4">

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
            <span className="text-4xl">📰</span>
            <p className="text-sm text-white/80">Belum ada berita yang dipublikasikan</p>
          </div>
        )}

        {/* News list */}
        {!loading && !error && newsList.length > 0 && (
          <div className="flex gap-6 overflow-x-auto pb-2">
            {newsList.map((item) => (
              <article
                key={item.id}
                className="w-[285px] shrink-0 rounded-2xl bg-white p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-[110px] overflow-hidden rounded-xl bg-gray-100">
                  {item.imagePath ? (
                    <img
                      src={item.imagePath}
                      alt={item.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                      📰
                    </div>
                  )}
                </div>

                <h3 className="mt-3 text-center text-sm font-semibold text-gray-800 line-clamp-2">
                  {item.title}
                </h3>

                <p className="mt-1 text-center text-xs text-gray-500 line-clamp-2">
                  {item.description}
                </p>

                <p className="mt-2 text-center text-xs text-gray-400">
                  {new Date(item.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Artikel;