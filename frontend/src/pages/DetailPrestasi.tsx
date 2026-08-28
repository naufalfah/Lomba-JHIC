import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getAchievementById, getAchievements, type Achievement } from "../api/prestasiApi";
import { getImageUrl } from "../api/uploadApi";

function DetailPrestasi() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [latestAchievements, setLatestAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Scroll to top on mount or ID change
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchDetailAndLatest = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(false);
        const [detailData, allAchievementsData] = await Promise.all([
          getAchievementById(Number(id)),
          getAchievements(),
        ]);

        setAchievement(detailData);
        // Filter out current achievement and get top 4 latest achievements
        const filtered = allAchievementsData
          .filter((item) => item.id !== Number(id))
          .slice(0, 4);
        setLatestAchievements(filtered);
      } catch (err) {
        console.error("Gagal mengambil data prestasi:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailAndLatest();
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = achievement ? encodeURIComponent(achievement.title) : "";

  return (
    <div className="min-h-screen bg-linear-to-b from-[#0900FF] to-[#FFA20D] pt-24 md:pt-[120px] pb-12 md:pb-20 px-3 sm:px-4 md:px-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Back Button */}
        <button
          onClick={() => navigate("/beranda")}
          className="mb-6 flex items-center gap-2 text-[#E89100] hover:text-[#FFA313] font-semibold transition-colors duration-200 cursor-pointer group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Kembali ke Beranda
        </button>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <svg className="animate-spin h-10 w-10 text-[#E89100]" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
            </svg>
            <p className="text-gray-600 font-medium animate-pulse">Memuat prestasi...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && (error || !achievement) && (
          <div className="bg-white rounded-3xl p-10 text-center shadow-lg border border-red-100 max-w-[600px] mx-auto">
            <div className="flex justify-center mb-4 text-amber-500">
              <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Gagal Memuat Prestasi</h3>
            <p className="text-gray-500 mb-6">
              Prestasi tidak ditemukan atau terjadi kesalahan saat menghubungi server.
            </p>
            <Link
              to="/"
              className="inline-block bg-[#E89100] hover:bg-[#FFA313] text-white px-6 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-200"
            >
              Kembali ke Beranda
            </Link>
          </div>
        )}

        {/* Achievement Layout Grid */}
        {!loading && !error && achievement && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              <article className="overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                {/* Image */}
                <div className="relative w-full aspect-video bg-gray-100 overflow-hidden">
                  {achievement.imagePath ? (
                    <img
                      src={getImageUrl(achievement.imagePath)}
                      alt={achievement.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex w-full h-full items-center justify-center text-gray-300 select-none">
                      <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75A1.125 1.125 0 017.5 15.375V18.75m9 0h-9M12 3a4.5 4.5 0 00-4.5 4.5v1.5a4.5 4.5 0 009 0V7.5A4.5 4.5 0 0012 3z" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Achievement Info Container */}
                <div className="p-6 md:p-10">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    {achievement.rank && (
                      <span className="bg-[#E89100] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Juara {achievement.rank}
                      </span>
                    )}
                    {achievement.tier && (
                      <span className="bg-[#FFA313] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        Tingkat {achievement.tier}
                      </span>
                    )}
                    {achievement.organizer && (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Penyelenggara: {achievement.organizer}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4 break-words">
                    {achievement.title}
                  </h1>

                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#E89100]/25 flex items-center justify-center text-[#E89100] font-bold text-xs select-none">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75A1.125 1.125 0 017.5 15.375V18.75m9 0h-9M12 3a4.5 4.5 0 00-4.5 4.5v1.5a4.5 4.5 0 009 0V7.5A4.5 4.5 0 0012 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">{achievement.organizer || "SMKN 2 Mojokerto"}</p>
                      {achievement.date && (
                        <p className="text-xs text-gray-400">
                          {new Date(achievement.date).toLocaleDateString("id-ID", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-gray-100 mb-8" />

                  {/* Description Body */}
                  <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-6">
                    {achievement.description ? (
                      achievement.description.split("\n").map((paragraph, index) => {
                        const trimmed = paragraph.trim();
                        if (!trimmed) return null;
                        return (
                          <p key={index} className="text-justify break-words">
                            {trimmed}
                          </p>
                        );
                      })
                    ) : (
                      <p className="italic text-gray-400">Tidak ada deskripsi detail untuk prestasi ini.</p>
                    )}
                  </div>

                  {/* Share Section */}
                  <div className="mt-12 pt-6 border-t border-gray-100">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">
                      Bagikan Prestasi Ini
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                      {/* WhatsApp */}
                      <a
                        href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-sm hover:shadow-md hover:brightness-105 transition-all duration-200"
                      >
                        WhatsApp
                      </a>
                      
                      {/* Facebook */}
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-sm hover:shadow-md hover:brightness-105 transition-all duration-200"
                      >
                        Facebook
                      </a>

                      {/* Twitter / X */}
                      <a
                        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 bg-[#1DA1F2] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-sm hover:shadow-md hover:brightness-105 transition-all duration-200"
                      >
                        Twitter
                      </a>

                      {/* Copy Link */}
                      <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-full text-xs font-bold shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        {copied ? "Tautan Disalin! ✓" : "Salin Tautan"}
                      </button>
                    </div>
                  </div>

                </div>
              </article>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              
              {/* Latest Achievements Card */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md">
                <h3 className="text-lg font-extrabold text-gray-900 border-b border-gray-100 pb-3 mb-4">
                  Prestasi Lainnya
                </h3>

                {latestAchievements.length === 0 ? (
                  <p className="text-sm text-gray-400 italic">Tidak ada prestasi lainnya</p>
                ) : (
                  <div className="flex flex-col gap-4">
                    {latestAchievements.map((item) => (
                      <Link
                        to={`/prestasi/${item.id}`}
                        key={item.id}
                        className="flex gap-4 group bg-gray-50/50 hover:bg-gray-50 p-3 rounded-2xl border border-transparent hover:border-gray-100 transition-all duration-200"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 shrink-0 overflow-hidden rounded-xl bg-gray-100 relative">
                          {item.imagePath ? (
                            <img
                              src={getImageUrl(item.imagePath)}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="flex w-full h-full items-center justify-center text-gray-300">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75A1.125 1.125 0 017.5 15.375V18.75m9 0h-9M12 3a4.5 4.5 0 00-4.5 4.5v1.5a4.5 4.5 0 009 0V7.5A4.5 4.5 0 0012 3z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Title & Date */}
                        <div className="flex flex-col justify-center min-w-0">
                          <h4 className="text-sm font-bold text-gray-800 line-clamp-2 group-hover:text-[#E89100] transition-colors duration-200 mb-1 leading-snug">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-gray-400">
                            {item.date
                              ? new Date(item.date).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })
                              : item.organizer}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* School Vision Banner Card */}
              <div className="bg-gradient-to-br from-[#FFA313] to-[#E89100] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-white/10" />
                <h4 className="text-xl font-extrabold mb-2 relative z-10">SMKN 2 MOJOKERTO</h4>
                <p className="text-sm text-white/90 font-light relative z-10 leading-relaxed mb-4">
                  "Disiplin Berprestasi"
                </p>
                <div className="h-[1px] w-full bg-white/20 my-4" />
                <div className="text-xs text-white/80 space-y-2">
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span>Jalan Raya Mojokerto No. 2</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.828-1.42-5.111-3.703-6.53-6.53l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <span>(0321) 123456</span>
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default DetailPrestasi;
