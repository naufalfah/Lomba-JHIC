import { useState, useEffect, type FormEvent } from "react";
import { getNews, createNews, updateNews, deleteNews, uploadImage, type News } from "../../api/newsApi";
import { getImageUrl } from "../../api/uploadApi";

function Berita() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form state
  const [form, setForm] = useState<News>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    imagePath: "",
  });

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await getNews();
      setNewsList(data);
    } catch {
      setError("Gagal memuat data berita. Pastikan backend berjalan di port 8080.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openCreateModal = () => {
    setEditingNews(null);
    setForm({ title: "", description: "", date: new Date().toISOString().split("T")[0], imagePath: "" });
    setShowModal(true);
  };

  const openEditModal = (news: News) => {
    setEditingNews(news);
    setForm({
      title: news.title,
      description: news.description,
      date: news.date,
      imagePath: news.imagePath ?? "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNews(null);
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setForm((prev) => ({ ...prev, imagePath: url }));
    } catch (err: any) {
      alert("Gagal mengunggah gambar: " + (err.response?.data?.message || err.message));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingNews?.id) {
        await updateNews(editingNews.id, form);
      } else {
        await createNews(form);
      }
      closeModal();
      await fetchNews();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data || err.message || "Terjadi kesalahan";
      alert("Gagal menyimpan berita: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteNews(id);
      setDeleteConfirm(null);
      await fetchNews();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data || err.message || "Terjadi kesalahan";
      alert("Gagal menghapus berita: " + msg);
    }
  };

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Berita</h1>
          <p className="mt-1 text-gray-500">Kelola artikel dan berita yang ditampilkan di halaman utama</p>
        </div>
        <button
          id="btn-tambah-berita"
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition"
        >
          <span className="text-lg">+</span>
          Tambah Berita
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-sm text-red-700 flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <svg className="animate-spin h-10 w-10 text-blue-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
            </svg>
            <span className="text-sm">Memuat berita...</span>
          </div>
        </div>
      ) : (

        /* Tabel Berita */
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {newsList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <p className="font-medium">Belum ada berita</p>
              <p className="text-sm mt-1">Klik "Tambah Berita" untuk membuat artikel pertama</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">Judul</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600 hidden md:table-cell">Deskripsi</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">Tanggal</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {newsList.map((news) => (
                  <tr key={news.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 max-w-[200px] md:max-w-xs break-words">
                      <div className="flex items-center gap-3">
                        {news.imagePath ? (
                          <img src={getImageUrl(news.imagePath)} alt={news.title} className="h-10 w-10 rounded-lg object-cover bg-gray-100 shrink-0" />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                          </div>
                        )}
                        <span className="font-medium text-gray-800 line-clamp-1">{news.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell max-w-xs md:max-w-md break-words">
                      <span className="line-clamp-2">{news.description}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(news.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          id={`btn-edit-${news.id}`}
                          onClick={() => openEditModal(news)}
                          className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 transition"
                        >
                          Edit
                        </button>
                        {deleteConfirm === news.id ? (
                          <div className="flex gap-1">
                            <button
                              id={`btn-confirm-delete-${news.id}`}
                              onClick={() => handleDelete(news.id!)}
                              className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 transition"
                            >
                              Hapus?
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50 transition"
                            >
                              Batal
                            </button>
                          </div>
                        ) : (
                          <button
                            id={`btn-delete-${news.id}`}
                            onClick={() => setDeleteConfirm(news.id!)}
                            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition"
                          >
                            Hapus
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Modal Form Tambah / Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <h2 className="text-lg font-bold text-gray-800">
                {editingNews ? "Edit Berita" : "Tambah Berita Baru"}
              </h2>
              <button
                id="btn-close-modal"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition text-xl font-medium cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">

              <div>
                <label htmlFor="news-title" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Judul Berita <span className="text-red-500">*</span>
                </label>
                <input
                  id="news-title"
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Masukkan judul berita..."
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label htmlFor="news-description" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="news-description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Tulis deskripsi berita..."
                  required
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="news-date" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tanggal <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="news-date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Gambar Berita
                  </label>
                  
                  {form.imagePath ? (
                    <div className="relative rounded-xl border border-gray-200 p-2 flex items-center gap-3 bg-gray-50">
                      <img 
                        src={getImageUrl(form.imagePath)} 
                        alt="Preview" 
                        className="h-12 w-12 rounded-lg object-cover bg-white border"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-medium text-gray-500 truncate">Gambar Terpilih</p>
                        <p className="text-[10px] text-gray-400 truncate">{form.imagePath}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, imagePath: "" })}
                        className="p-1 px-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition text-[10px] font-semibold"
                      >
                        Hapus
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="border border-dashed border-gray-200 rounded-xl p-3 text-center hover:border-blue-400 transition relative bg-gray-50/50 cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file);
                          }}
                          disabled={uploadingImage}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="space-y-0.5 flex flex-col items-center">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                          </svg>
                          <div className="text-[10px] font-medium text-gray-600">
                            {uploadingImage ? "Mengunggah..." : "Pilih file gambar untuk diunggah"}
                          </div>
                        </div>
                      </div>
                      
                      <input
                        id="news-image-url"
                        type="text"
                        value={form.imagePath ?? ""}
                        onChange={(e) => setForm({ ...form, imagePath: e.target.value })}
                        placeholder="Atau masukkan URL gambar langsung..."
                        className="w-full rounded-xl border border-gray-200 px-3 py-1.5 text-[11px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                >
                  Batal
                </button>
                <button
                  id="btn-submit-berita"
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {submitting ? "Menyimpan..." : editingNews ? "Simpan Perubahan" : "Tambah Berita"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Berita;
