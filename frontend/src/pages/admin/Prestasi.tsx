import { useState, useEffect, type FormEvent } from "react";
import { getAchievements, createAchievement, updateAchievement, deleteAchievement, type Achievement } from "../../api/prestasiApi";
import { uploadImage, getImageUrl } from "../../api/uploadApi";

function AdminPrestasi() {
  const [achievementList, setAchievementList] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [form, setForm] = useState<Achievement>({
    title: "",
    description: "",
    tier: "",
    rank: 1,
    date: new Date().toISOString().split("T")[0],
    organizer: "",
    imagePath: "",
  });

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const data = await getAchievements();
      setAchievementList(data);
    } catch {
      setError("Gagal memuat data prestasi. Pastikan backend berjalan di port 8080.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const openCreateModal = () => {
    setEditingAchievement(null);
    setForm({
      title: "",
      description: "",
      tier: "",
      rank: 1,
      date: new Date().toISOString().split("T")[0],
      organizer: "",
      imagePath: "",
    });
    setShowModal(true);
  };

  const openEditModal = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setForm({
      title: achievement.title,
      description: achievement.description,
      tier: achievement.tier ?? "",
      rank: achievement.rank,
      date: achievement.date,
      organizer: achievement.organizer,
      imagePath: achievement.imagePath ?? "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAchievement(null);
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
      if (editingAchievement?.id) {
        await updateAchievement(editingAchievement.id, form);
      } else {
        await createAchievement(form);
      }
      closeModal();
      await fetchAchievements();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data || err.message || "Terjadi kesalahan";
      alert("Gagal menyimpan prestasi: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAchievement(id);
      setDeleteConfirm(null);
      await fetchAchievements();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data || err.message || "Terjadi kesalahan";
      alert("Gagal menghapus prestasi: " + msg);
    }
  };

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Prestasi</h1>
          <p className="mt-1 text-gray-500">Kelola data prestasi yang ditampilkan di halaman utama</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition"
        >
          <span className="text-lg">+</span>
          Tambah Prestasi
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
            <span className="text-sm">Memuat prestasi...</span>
          </div>
        </div>
      ) : (

        /* Table */
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {achievementList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75A1.125 1.125 0 017.5 15.375V18.75m9 0h-9M12 3a4.5 4.5 0 00-4.5 4.5v1.5a4.5 4.5 0 009 0V7.5A4.5 4.5 0 0012 3z" />
              </svg>
              <p className="font-medium">Belum ada prestasi</p>
              <p className="text-sm mt-1">Klik "Tambah Prestasi" untuk menambahkan data</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">Judul</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600 hidden md:table-cell">Penyelenggara</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600 hidden lg:table-cell">Tingkat</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">Tanggal</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {achievementList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 max-w-[200px] md:max-w-xs break-words">
                      <div className="flex items-center gap-3">
                        {item.imagePath ? (
                          <img src={getImageUrl(item.imagePath)} alt={item.title} className="h-10 w-10 rounded-lg object-cover bg-gray-100 shrink-0" />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75A1.125 1.125 0 017.5 15.375V18.75m9 0h-9M12 3a4.5 4.5 0 00-4.5 4.5v1.5a4.5 4.5 0 009 0V7.5A4.5 4.5 0 0012 3z" />
                            </svg>
                          </div>
                        )}
                        <span className="font-medium text-gray-800 line-clamp-1">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell max-w-xs break-words">
                      <span className="line-clamp-1">{item.organizer}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden lg:table-cell whitespace-nowrap">
                      {item.tier && (
                        <span className="inline-block bg-purple-50 text-purple-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                          {item.tier}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(item.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 transition"
                        >
                          Edit
                        </button>
                        {deleteConfirm === item.id ? (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleDelete(item.id!)}
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
                            onClick={() => setDeleteConfirm(item.id!)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-lg font-bold text-gray-800">
                {editingAchievement ? "Edit Prestasi" : "Tambah Prestasi Baru"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition text-xl font-medium cursor-pointer">
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Judul Prestasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Contoh: Juara 1 Lomba Web Design"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Deskripsi prestasi..."
                  required
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Penyelenggara <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.organizer}
                    onChange={(e) => setForm({ ...form, organizer: e.target.value })}
                    placeholder="Contoh: Kemendikbud"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tingkat (Tier)
                  </label>
                  <input
                    type="text"
                    value={form.tier}
                    onChange={(e) => setForm({ ...form, tier: e.target.value })}
                    placeholder="Contoh: Nasional"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Peringkat <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.rank}
                    onChange={(e) => setForm({ ...form, rank: Number(e.target.value) })}
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Tanggal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Gambar (Upload File atau URL)
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={form.imagePath}
                    onChange={(e) => setForm({ ...form, imagePath: e.target.value })}
                    placeholder="Masukkan URL Gambar (misal: https://... atau /uploads/...)"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="h-px bg-gray-200 flex-1" />
                    <span>atau upload dari perangkat</span>
                    <span className="h-px bg-gray-200 flex-1" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2 text-xs text-gray-800 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-xs file:font-medium file:text-blue-600 cursor-pointer"
                  />
                </div>
                {uploadingImage && <p className="text-xs text-blue-500 mt-1.5 animate-pulse">Mengunggah gambar...</p>}
                {form.imagePath && !uploadingImage && (
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={getImageUrl(form.imagePath)}
                      alt="Preview"
                      className="h-16 w-24 rounded-xl object-cover border border-gray-200 bg-gray-50 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "";
                        (e.target as HTMLImageElement).alt = "URL tidak dapat dimuat";
                      }}
                    />
                    <div className="text-xs text-gray-500 truncate max-w-xs">
                      <span className="font-medium text-gray-700 block mb-0.5">Preview Gambar</span>
                      <span className="truncate block font-mono text-[11px] text-gray-400">{form.imagePath}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition"
                >
                  {submitting ? "Menyimpan..." : editingAchievement ? "Simpan Perubahan" : "Tambah Prestasi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPrestasi;
