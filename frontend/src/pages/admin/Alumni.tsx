import { useState, useEffect } from "react";
import {
  getAlumni,
  createAlumni,
  updateAlumni,
  deleteAlumni,
  type Alumni,
  type AlumniRequest,
} from "../../api/alumniApi";
import { getMajors, type Major } from "../../api/jurusanApi";

function AdminAlumni() {
  const [alumniList, setAlumniList] = useState<Alumni[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<Alumni | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState<AlumniRequest>({
    name: "",
    email: "",
    majorId: undefined,
    graduationYear: new Date().getFullYear(),
    quote: "",
    instance: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [alumniData, majorData] = await Promise.all([
        getAlumni(),
        getMajors(),
      ]);
      setAlumniList(alumniData);
      setMajors(majorData);
    } catch (err) {
      console.error("Gagal memuat data alumni/jurusan:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      email: "",
      majorId: majors.length > 0 ? majors[0].id : undefined,
      graduationYear: new Date().getFullYear(),
      quote: "",
      instance: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Alumni) => {
    setEditingItem(item);
    const gradYearStr = item.graduationYear ? new Date(item.graduationYear).getFullYear() : new Date().getFullYear();
    setFormData({
      studentId: item.studentId,
      name: item.student?.name || "",
      email: item.student?.email || "",
      majorId: item.student?.major?.id,
      graduationYear: isNaN(gradYearStr) ? new Date().getFullYear() : gradYearStr,
      quote: item.quote || "",
      instance: item.instance || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Nama alumni wajib diisi");
      return;
    }

    try {
      setSaving(true);
      if (editingItem) {
        await updateAlumni(editingItem.studentId, formData);
      } else {
        await createAlumni(formData);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      console.error("Gagal menyimpan data alumni:", err);
      alert("Gagal menyimpan data: " + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (studentId: number, name: string) => {
    if (!window.confirm(`Yakin ingin menghapus data alumni "${name}"?`)) return;

    try {
      await deleteAlumni(studentId);
      fetchData();
    } catch (err: any) {
      console.error("Gagal menghapus alumni:", err);
      alert("Gagal menghapus: " + (err.response?.data?.message || err.message));
    }
  };

  const parseYear = (dateStr?: string) => {
    if (!dateStr) return "-";
    const year = new Date(dateStr).getFullYear();
    return isNaN(year) ? dateStr : year.toString();
  };

  const filteredAlumni = alumniList.filter((item) => {
    const name = item.student?.name || "";
    const email = item.student?.email || "";
    const major = item.student?.major?.name || "";
    const quote = item.quote || "";
    const instance = item.instance || "";
    const search = searchTerm.toLowerCase();

    return (
      name.toLowerCase().includes(search) ||
      email.toLowerCase().includes(search) ||
      major.toLowerCase().includes(search) ||
      quote.toLowerCase().includes(search) ||
      instance.toLowerCase().includes(search)
    );
  });

  return (
    <div className="p-8 max-w-7xl">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Alumni</h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola data alumni sekolah, angkatan lulusan, dan catatan prestasinya
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm transition active:scale-95 cursor-pointer shrink-0"
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span>Tambah Alumni</span>
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6 flex items-center gap-3">
        <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder="Cari nama, email, jurusan, atau keterangan prestasi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-sm text-gray-700 bg-transparent focus:outline-none"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* TABLE DATA */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2" />
            <p className="text-sm">Memuat data alumni...</p>
          </div>
        ) : filteredAlumni.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-base font-semibold">Belum ada data alumni</p>
            <p className="text-xs text-gray-400 mt-1">
              Silakan klik tombol "Tambah Alumni" untuk memasukkan data baru.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-500 tracking-wider">
                  <th className="py-4 px-6">Nama & Email</th>
                  <th className="py-4 px-6">Jurusan</th>
                  <th className="py-4 px-6">Lulusan Tahun</th>
                  <th className="py-4 px-6">Keterangan Prestasi (Opsional)</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {filteredAlumni.map((item) => {
                  const name = item.student?.name || "Tanpa Nama";
                  const email = item.student?.email || "-";
                  const majorName = item.student?.major?.name || "-";
                  const gradYear = parseYear(item.graduationYear);

                  return (
                    <tr key={item.studentId} className="hover:bg-gray-50/80 transition">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-gray-800">{name}</div>
                        <div className="text-xs text-gray-500">{email}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                          {majorName}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium">
                        Lulusan Ke- {gradYear}
                      </td>
                      <td className="py-4 px-6 max-w-xs">
                        {item.quote ? (
                          <div className="text-xs text-gray-700 bg-amber-50 border border-amber-200/60 p-2 rounded-lg italic flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75A1.125 1.125 0 017.5 15.375V18.75m9 0h-9M12 3a4.5 4.5 0 00-4.5 4.5v1.5a4.5 4.5 0 009 0V7.5A4.5 4.5 0 0012 3z" />
                            </svg>
                            <span>{item.quote}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">-</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2 shrink-0">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.studentId, name)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg transition cursor-pointer"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 my-8">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">
                {editingItem ? "Edit Data Alumni" : "Tambah Data Alumni"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nama Alumni */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                  Nama Lengkap Alumni <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama alumni..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Email Alumni */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                  Email Alumni
                </label>
                <input
                  type="email"
                  placeholder="contoh: alumni@email.com"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Jurusan & Tahun Lulus */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                    Jurusan <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.majorId !== undefined && formData.majorId !== null ? formData.majorId : ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        majorId: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option value="">-- Pilih Jurusan --</option>
                    {majors.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                    Lulusan Tahun Ke-
                  </label>
                  <input
                    type="number"
                    min="1990"
                    max="2035"
                    value={formData.graduationYear || 2024}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        graduationYear: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Instansi / Status Saat Ini (Opsional) */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                  Instansi / Pekerjaan / Tempat Kuliah Saat Ini (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="contoh: PT Telkom Indonesia / Universitas Brawijaya"
                  value={formData.instance || ""}
                  onChange={(e) => setFormData({ ...formData, instance: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Keterangan Prestasi (Opsional) */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">
                  Keterangan Prestasi (Opsional)
                </label>
                <textarea
                  rows={3}
                  placeholder="contoh: Juara 1 LKS Web Technologies Tingkat Provinsi 2023..."
                  value={formData.quote || ""}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan Alumni"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAlumni;
