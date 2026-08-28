import { useState, useEffect } from "react";
import { getTotalGuru, setTotalGuru, getImageGuru, setImageGuru } from "../../api/statCounts";
import { uploadImage } from "../../api/uploadApi";
import StatCard from "../../components/StatCard";
import GuruDefaultImage from "../../assets/guru_card.jpg";

function AdminGuru() {
  const [count, setCount] = useState<number>(88);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setCount(getTotalGuru());
    setCustomImage(getImageGuru());
  }, []);

  const handleIncrement = (amount: number) => {
    setCount((prev) => Math.max(0, prev + amount));
  };

  const handleDecrement = (amount: number) => {
    setCount((prev) => Math.max(0, prev - amount));
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file);
      setCustomImage(url);
      setImageGuru(url);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err: any) {
      console.error("Gagal unggah gambar:", err);
      alert("Gagal mengunggah gambar: " + (err.response?.data?.message || err.message));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleResetImage = () => {
    setCustomImage(null);
    setImageGuru(null);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSaveCount = () => {
    setTotalGuru(count);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const activeDisplayImage = customImage || GuruDefaultImage;

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manajemen Total & Gambar Guru</h1>
        <p className="mt-1 text-gray-500">
          Atur total jumlah guru dan gambar StatCard Guru yang ditampilkan di beranda sekolah
        </p>
      </div>

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

        {/* Left Column: Controls */}
        <div className="lg:col-span-2 space-y-6">

          {/* Card 1: Total Count Control */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Total Guru saat ini</h2>
            <p className="text-sm text-gray-500 mb-6">
              Gunakan tombol <span className="font-semibold text-blue-600">+</span> dan <span className="font-semibold text-blue-600">-</span> atau ketik angka secara langsung.
            </p>

            {/* Controls Container */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              {/* Decrement Main Button */}
              <button
                type="button"
                onClick={() => handleDecrement(1)}
                className="w-14 h-14 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 text-2xl font-bold flex items-center justify-center transition shadow-sm border border-red-200 cursor-pointer active:scale-95 select-none"
                title="Kurangi 1"
              >
                −
              </button>

              {/* Direct Number Input */}
              <div className="flex-1 w-full text-center">
                <input
                  type="number"
                  min="0"
                  value={count}
                  onChange={(e) => setCount(Math.max(0, parseInt(e.target.value, 10) || 0))}
                  className="w-full text-center text-4xl font-extrabold text-gray-900 border-2 border-gray-200 focus:border-blue-500 rounded-2xl py-3 px-4 focus:outline-none transition"
                />
                <span className="text-xs text-gray-400 mt-1 block">Guru / Tenaga Pendidik</span>
              </div>

              {/* Increment Main Button */}
              <button
                type="button"
                onClick={() => handleIncrement(1)}
                className="w-14 h-14 rounded-2xl bg-green-50 hover:bg-green-100 text-green-600 text-2xl font-bold flex items-center justify-center transition shadow-sm border border-green-200 cursor-pointer active:scale-95 select-none"
                title="Tambah 1"
              >
                +
              </button>
            </div>

            {/* Quick Adjustment Shortcuts */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => handleDecrement(10)}
                className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition cursor-pointer"
              >
                -10
              </button>
              <button
                type="button"
                onClick={() => handleDecrement(5)}
                className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition cursor-pointer"
              >
                -5
              </button>
              <button
                type="button"
                onClick={() => handleIncrement(5)}
                className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition cursor-pointer"
              >
                +5
              </button>
              <button
                type="button"
                onClick={() => handleIncrement(10)}
                className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition cursor-pointer"
              >
                +10
              </button>
            </div>

            <button
              type="button"
              onClick={handleSaveCount}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition cursor-pointer text-center"
            >
              Simpan Total Guru
            </button>
          </div>

          {/* Card 2: Custom Image Upload */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Ubah Gambar StatCard Guru</h2>
            <p className="text-sm text-gray-500 mb-4">
              Unggah gambar kustom untuk menggantikan gambar bawaan pada kartu Guru di Beranda.
            </p>

            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-800 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-xs file:font-medium file:text-blue-600 cursor-pointer"
              />

              {uploadingImage && (
                <p className="text-xs text-blue-600 font-medium animate-pulse">
                  Sedang mengunggah gambar...
                </p>
              )}

              {customImage && (
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs text-green-600 font-semibold">
                    ✓ Gambar Kustom Aktif
                  </span>
                  <button
                    type="button"
                    onClick={handleResetImage}
                    className="text-xs text-red-600 hover:underline cursor-pointer"
                  >
                    Reset ke Gambar Default
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Feedback message */}
          {savedSuccess && (
            <div className="p-3 rounded-xl bg-green-50 text-green-700 border border-green-200 text-sm font-medium text-center animate-fade-in">
              ✓ Data Guru berhasil disimpan dan diperbarui di Beranda!
            </div>
          )}
        </div>

        {/* Right Column: Live Preview */}
        <div className="lg:col-span-1 bg-[#FFA20D] p-6 rounded-2xl shadow-md text-white sticky top-8">
          <p className="text-xs font-bold uppercase tracking-wider text-white/80 mb-3 text-center">
            Tampilan Preview di Beranda
          </p>
          <div className="pointer-events-none transform scale-95">
            <StatCard image={activeDisplayImage} number={count.toString()} label="Guru" />
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminGuru;
