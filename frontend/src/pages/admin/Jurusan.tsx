import { useState, useEffect, type FormEvent } from "react";
import { getMajors, createMajor, updateMajor, deleteMajor, type Major } from "../../api/jurusanApi";
import { uploadImage, getImageUrl } from "../../api/uploadApi";

function AdminJurusan() {
  const [majorList, setMajorList] = useState<Major[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingMajor, setEditingMajor] = useState<Major | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImgError, setPreviewImgError] = useState(false);

  const [form, setForm] = useState<Major>({
    name: "",
    description: "",
    logoPath: "",
  });

  const fetchMajors = async () => {
    try {
      setLoading(true);
      const data = await getMajors();
      setMajorList(data);
    } catch {
      setError("Gagal memuat data jurusan. Pastikan backend berjalan di port 8080.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  const openCreateModal = () => {
    setEditingMajor(null);
    setForm({ name: "", description: "", logoPath: "" });
    setPreviewImgError(false);
    setShowModal(true);
  };

  const openEditModal = (major: Major) => {
    setEditingMajor(major);
    setForm({
      name: major.name,
      description: major.description ?? "",
      logoPath: major.logoPath ?? "",
    });
    setPreviewImgError(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMajor(null);
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setUploadingImage(true);
    setPreviewImgError(false);
    try {
      const url = await uploadImage(file);
      setForm((prev) => ({ ...prev, logoPath: url }));
    } catch (err: any) {
      alert("Gagal mengunggah gambar: " + (err.response?.data?.message || err.message));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Judul jurusan tidak boleh kosong.");
      return;
    }
    setSubmitting(true);
    try {
      const payload: Major = {
        name: form.name.trim(),
        description: form.description?.trim() || undefined,
        logoPath: form.logoPath?.trim() || undefined,
      };

      if (editingMajor?.id) {
        await updateMajor(editingMajor.id, payload);
      } else {
        await createMajor(payload);
      }
      closeModal();
      await fetchMajors();
    } catch (err: any) {
      console.error("Gagal menyimpan jurusan:", err);
      const msg = err.response?.data?.message || err.message || "Terjadi kesalahan saat menyimpan data jurusan.";
      alert("Gagal menyimpan jurusan: " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMajor(id);
      setDeleteConfirm(null);
      await fetchMajors();
    } catch (err: any) {
      console.error("Gagal menghapus jurusan:", err);
      const msg = err.response?.data?.message || err.message || "Terjadi kesalahan saat menghapus jurusan.";
      alert("Gagal menghapus jurusan: " + msg);
    }
  };

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Jurusan</h1>
          <p className="mt-1 text-gray-500">Kelola data jurusan dan sub judul yang ditampilkan di halaman utama</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition cursor-pointer"
        >
          <span className="text-lg">+</span>
          Tambah Jurusan
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
            <span className="text-sm">Memuat jurusan...</span>
          </div>
        </div>
      ) : (

        /* Table */
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {majorList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147L12 14.625l7.74-4.478M12 3L2.25 8.625l9.75 5.625 9.75-5.625L12 3zM4.5 12.375v4.5A2.25 2.25 0 006.75 19.125h10.5a2.25 2.25 0 002.25-2.25v-4.5" />
              </svg>
              <p className="font-medium">Belum ada jurusan</p>
              <p className="text-sm mt-1">Klik "Tambah Jurusan" untuk menambahkan data</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600">Judul Jurusan</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-600 hidden md:table-cell">Sub Judul</th>
                  <th className="px-6 py-4 text-right font-semibold text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {majorList.map((major) => (
                  <tr key={major.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 max-w-xs break-words">
                      <div className="flex items-center gap-3">
                        {major.logoPath ? (
                          <img src={getImageUrl(major.logoPath)} alt={major.name} className="h-10 w-10 rounded-lg object-cover bg-gray-100 shrink-0" />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147L12 14.625l7.74-4.478M12 3L2.25 8.625l9.75 5.625 9.75-5.625L12 3zM4.5 12.375v4.5A2.25 2.25 0 006.75 19.125h10.5a2.25 2.25 0 002.25-2.25v-4.5" />
                            </svg>
                          </div>
                        )}
                        <span className="font-bold text-gray-800 uppercase">{major.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell max-w-xs break-words">
                      {major.description || <span className="text-gray-300 italic">-</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(major)}
                          className="rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                        >
                          Edit
                        </button>
                        {deleteConfirm === major.id ? (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleDelete(major.id!)}
                              className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 transition cursor-pointer"
                            >
                              Hapus?
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-50 transition cursor-pointer"
                            >
                              Batal
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(major.id!)}
                            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition cursor-pointer"
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
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <h2 className="text-lg font-bold text-gray-800">
                {editingMajor ? "Edit Jurusan" : "Tambah Jurusan Baru"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition text-xl font-medium cursor-pointer">
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Judul Jurusan (Singkatan / Kode) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: RPL"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Sub Judul Jurusan (Nama Lengkap / Keterangan)
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Contoh: Rekayasa Perangkat Lunak"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Gambar / Logo Jurusan
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-xs file:font-medium file:text-blue-600 cursor-pointer"
                />
                {uploadingImage && <p className="text-xs text-blue-500 mt-1 animate-pulse">Mengunggah gambar...</p>}
                {form.logoPath && !uploadingImage && (
                  <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-3 flex items-center gap-3">
                    {previewImgError ? (
                      <div className="h-16 w-16 rounded-xl bg-red-50 border border-red-200 flex flex-col items-center justify-center shrink-0">
                        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <span className="text-[10px] text-red-400 mt-0.5">Error</span>
                      </div>
                    ) : (
                      <img
                        src={getImageUrl(form.logoPath)}
                        alt="Preview"
                        className="h-16 w-16 rounded-xl object-cover border border-gray-200 shrink-0"
                        onError={() => setPreviewImgError(true)}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700 mb-0.5">Gambar tersimpan</p>
                      <p className="text-[11px] text-gray-400 font-mono truncate" title={form.logoPath}>
                        {getImageUrl(form.logoPath)}
                      </p>
                      {previewImgError && (
                        <p className="text-[11px] text-red-500 mt-1">Gambar tidak dapat dimuat. File mungkin belum ada di server.</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => { setForm((prev) => ({ ...prev, logoPath: "" })); setPreviewImgError(false); }}
                      className="text-xs text-red-500 hover:text-red-700 font-medium shrink-0 cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition cursor-pointer"
                >
                  {submitting ? "Menyimpan..." : editingMajor ? "Simpan Perubahan" : "Tambah Jurusan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminJurusan;
