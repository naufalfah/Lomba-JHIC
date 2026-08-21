import logo from "../assets/logo.png";
import Down from "../assets/down.png";
import DownBlack from "../assets/down-black.png";
import { useEffect, useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Deteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle dropdown
  const toggleDropdown = (menu: string) => {
    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-[1000]
        flex items-center justify-between
        lg:h-[100px] h-20
        lg:px-[90px] md:px-10 px-6
        transition-all duration-300
        ${
          isScrolled
            ? "bg-white text-black shadow-md rounded-b-2xl px-6"
            : "bg-transparent text-white"
        }
      `}
    >
      {/* LOGO */}
      <div className="flex items-center lg:gap-3 gap-2">
        <div>
          <img
            src={logo}
            alt="Logo SMKN 2 Mojokerto"
            className="lg:w-13 w-12"
          />
        </div>

        <div className="font-bold lg:text-sm text-xs">
          <p>SMK NEGERI 2</p>
          <p>KOTA MOJOKERTO</p>
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="lg:flex gap-8 hidden translate-y-1 items-center">
        <a href="" className="hover:opacity-70 transition">
          BERANDA
        </a>

        {/* PROFIL SEKOLAH */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("profil")}
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            PROFIL SEKOLAH
            <img
              src={isScrolled ? DownBlack : Down}
              alt=""
              className={`w-[12px] transition-transform duration-300 ${
                activeDropdown === "profil" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "profil" && (
            <Dropdown>
              <a href="">Tentang Sekolah</a>
              <a href="">Visi & Misi</a>
              <a href="">Struktur Organisasi</a>
            </Dropdown>
          )}
        </div>

        {/* KOMPETENSI KEAHLIAN */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("kompetensi")}
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            KOMPETENSI KEAHLIAN
            <img
              src={isScrolled ? DownBlack : Down}
              alt=""
              className={`w-[12px] transition-transform duration-300 ${
                activeDropdown === "kompetensi" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "kompetensi" && (
            <Dropdown>
              <a href="">Rekayasa Perangkat Lunak</a>
              <a href="">Teknik Jaringan Komputer</a>
              <a href="">Desain Komunikasi Visual</a>
            </Dropdown>
          )}
        </div>

        {/* PRESTASI */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("prestasi")}
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            PRESTASI
            <img
              src={isScrolled ? DownBlack : Down}
              alt=""
              className={`w-[12px] transition-transform duration-300 ${
                activeDropdown === "prestasi" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "prestasi" && (
            <Dropdown>
              <a href="">Prestasi Akademik</a>
              <a href="">Prestasi Non-Akademik</a>
              <a href="">Prestasi Siswa</a>
            </Dropdown>
          )}
        </div>

        {/* FASILITAS */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("fasilitas")}
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            FASILITAS
            <img
              src={isScrolled ? DownBlack : Down}
              alt=""
              className={`w-[12px] transition-transform duration-300 ${
                activeDropdown === "fasilitas" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "fasilitas" && (
            <Dropdown>
              <a href="">Laboratorium</a>
              <a href="">Perpustakaan</a>
              <a href="">Lapangan</a>
              <a href="">Ruang Kelas</a>
            </Dropdown>
          )}
        </div>

        {/* INFORMASI */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("informasi")}
            className="flex items-center gap-2 hover:opacity-70 transition"
          >
            INFORMASI
            <img
              src={isScrolled ? DownBlack : Down}
              alt=""
              className={`w-[12px] transition-transform duration-300 ${
                activeDropdown === "informasi" ? "rotate-180" : ""
              }`}
            />
          </button>

          {activeDropdown === "informasi" && (
            <Dropdown>
              <a href="">Berita</a>
              <a href="">Pengumuman</a>
              <a href="">Agenda</a>
            </Dropdown>
          )}
        </div>
      </div>

      {/* BUTTON */}
      <button
        className={`
          px-10 py-3
          border-2 rounded-[26px]
          font-medium
          transition duration-300
          lg:block hidden cursor-pointer
          ${
            isScrolled
              ? "border-[#FFA20D] text-[#FFA20D] hover:bg-[#FFA20D] hover:text-white"
              : "border-white text-white hover:bg-white hover:text-[#FFA20D]"
          }
        `}
      >
        JELAJAHI SEKARANG
      </button>

      {/* MOBILE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-3xl lg:hidden"
        aria-label={isOpen ? "Tutup menu" : "Buka menu"}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* MOBILE MENU */}
      {isOpen && (
        <div
          className={`
            absolute left-0 right-0 top-20
            rounded-2xl p-6
            shadow-lg lg:hidden
            ${isScrolled ? "bg-white text-black" : "bg-white text-black"}
          `}
        >
          <div className="flex flex-col gap-5">
            <a href="">BERANDA</a>

            <button
              onClick={() => toggleDropdown("mobile-profil")}
              className="flex justify-between"
            >
              PROFIL SEKOLAH
              <span>⌄</span>
            </button>

            {activeDropdown === "mobile-profil" && (
              <div className="ml-4 flex flex-col gap-3 text-sm">
                <a href="">Tentang Sekolah</a>
                <a href="">Visi & Misi</a>
                <a href="">Struktur Organisasi</a>
              </div>
            )}

            <button
              onClick={() => toggleDropdown("mobile-kompetensi")}
              className="flex justify-between"
            >
              KOMPETENSI KEAHLIAN
              <span>⌄</span>
            </button>

            {activeDropdown === "mobile-kompetensi" && (
              <div className="ml-4 flex flex-col gap-3 text-sm">
                <a href="">Rekayasa Perangkat Lunak</a>
                <a href="">Teknik Jaringan Komputer</a>
                <a href="">Desain Komunikasi Visual</a>
              </div>
            )}

            <button
              onClick={() => toggleDropdown("mobile-prestasi")}
              className="flex justify-between"
            >
              PRESTASI
              <span>⌄</span>
            </button>

            {activeDropdown === "mobile-prestasi" && (
              <div className="ml-4 flex flex-col gap-3 text-sm">
                <a href="">Prestasi Akademik</a>
                <a href="">Prestasi Non-Akademik</a>
              </div>
            )}

            <button
              onClick={() => toggleDropdown("mobile-fasilitas")}
              className="flex justify-between"
            >
              FASILITAS
              <span>⌄</span>
            </button>

            {activeDropdown === "mobile-fasilitas" && (
              <div className="ml-4 flex flex-col gap-3 text-sm">
                <a href="">Laboratorium</a>
                <a href="">Perpustakaan</a>
                <a href="">Lapangan</a>
              </div>
            )}

            <button
              onClick={() => toggleDropdown("mobile-informasi")}
              className="flex justify-between"
            >
              INFORMASI
              <span>⌄</span>
            </button>

            {activeDropdown === "mobile-informasi" && (
              <div className="ml-4 flex flex-col gap-3 text-sm">
                <a href="">Berita</a>
                <a href="">Pengumuman</a>
                <a href="">Agenda</a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// COMPONENT DROPDOWN
function Dropdown({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-8 left-0 w-60 rounded-xl bg-white p-4 text-black shadow-lg">
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

export default Navbar;
