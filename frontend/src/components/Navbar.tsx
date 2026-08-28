import logo from "../assets/logo.png";
import Down from "../assets/down.png";
import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import User from "../assets/user.png";
import User2 from "../assets/user2.png";


function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Helper untuk mengecek apakah path/menu sedang aktif
  const isActive = (path: string) => {
    if (path === "/" || path === "/beranda") {
      return location.pathname === "/" || location.pathname === "/beranda";
    }
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  // Deteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <nav
        ref={menuRef}
        className={`
          fixed top-0 left-0 right-0 z-[1000]
          flex items-center justify-between
          lg:px-[90px] md:px-10 px-4
          transition-all duration-500 ease-out
          ${isScrolled
            ? "bg-[#FFA20D] backdrop-blur-md text-white shadow-lg rounded-b-2xl lg:h-[100px] h-16"
            : "bg-transparent text-white lg:h-[100px] h-16"
          }
        `}
      >
        {/* LOGO */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          <img
            src={logo}
            alt="Logo SMKN 2 Mojokerto"
            className="w-10 lg:w-13"
          />
          <div className="font-bold text-[11px] lg:text-sm leading-tight">
            <p>SMK NEGERI 2</p>
            <p>KOTA MOJOKERTO</p>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <div className="lg:flex gap-6 xl:gap-8 hidden translate-y-1 items-center text-sm">
          <Link
            to="/"
            className={`transition duration-200 ${isActive("/")
                ? "font-bold text-white opacity-100"
                : "font-normal opacity-85 hover:opacity-100"
              }`}
          >
            BERANDA
          </Link>

          {/* PROFIL SEKOLAH */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown("profil")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => toggleDropdown("profil")}
              className={`flex items-center gap-2 transition cursor-pointer ${isActive("/profil")
                  ? "font-bold opacity-100"
                  : "font-normal opacity-85 hover:opacity-100"
                }`}
            >
              PROFIL SEKOLAH
              <img
                src={Down}
                alt=""
                className={`w-[12px] transition-all duration-300 ${activeDropdown === "profil" ? "rotate-180" : ""
                  }`}
              />
            </button>
            {activeDropdown === "profil" && (
              <Dropdown>
                <Link to="/tentang-sekolah" className={`hover:text-[#FFA20D] ${isActive("/tentang-sekolah") ? "font-bold text-[#FFA20D]" : ""}`}>Tentang Sekolah</Link>
                <Link to="/visi-misi" className={`hover:text-[#FFA20D] ${isActive("/visi-misi") ? "font-bold text-[#FFA20D]" : ""}`}>Visi & Misi</Link>
                <Link to="/struktur-organisasi" className={`hover:text-[#FFA20D] ${isActive("/struktur-organisasi") ? "font-bold text-[#FFA20D]" : ""}`}>Struktur Organisasi</Link>
              </Dropdown>
            )}
          </div>

          {/* KOMPETENSI KEAHLIAN */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown("kompetensi")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => toggleDropdown("kompetensi")}
              className={`flex items-center gap-2 transition cursor-pointer ${isActive("/kompetensi")
                  ? "font-bold opacity-100"
                  : "font-normal opacity-85 hover:opacity-100"
                }`}
            >
              KOMPETENSI KEAHLIAN
              <img
                src={Down}
                alt=""
                className={`w-[12px] transition-all duration-300 ${activeDropdown === "kompetensi" ? "rotate-180" : ""
                  }`}
              />
            </button>
            {activeDropdown === "kompetensi" && (
              <Dropdown>
                <Link to="/kompetensi/rpl" className={`hover:text-[#FFA20D] ${isActive("/kompetensi/rpl") ? "font-bold text-[#FFA20D]" : ""}`}>Rekayasa Perangkat Lunak</Link>
                <Link to="/kompetensi/tkj" className={`hover:text-[#FFA20D] ${isActive("/kompetensi/tkj") ? "font-bold text-[#FFA20D]" : ""}`}>Teknik Jaringan Komputer</Link>
                <Link to="/kompetensi/dkv" className={`hover:text-[#FFA20D] ${isActive("/kompetensi/dkv") ? "font-bold text-[#FFA20D]" : ""}`}>Desain Komunikasi Visual</Link>
              </Dropdown>
            )}
          </div>

          {/* PRESTASI */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown("prestasi")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => toggleDropdown("prestasi")}
              className={`flex items-center gap-2 transition cursor-pointer ${isActive("/prestasi")
                  ? "font-bold opacity-100"
                  : "font-normal opacity-85 hover:opacity-100"
                }`}
            >
              PRESTASI
              <img
                src={Down}
                alt=""
                className={`w-[12px] transition-all duration-300 ${activeDropdown === "prestasi" ? "rotate-180" : ""
                  }`}
              />
            </button>
            {activeDropdown === "prestasi" && (
              <Dropdown>
                <Link to="/prestasi/akademik" className={`hover:text-[#FFA20D] ${isActive("/prestasi/akademik") ? "font-bold text-[#FFA20D]" : ""}`}>Prestasi Akademik</Link>
                <Link to="/prestasi/non-akademik" className={`hover:text-[#FFA20D] ${isActive("/prestasi/non-akademik") ? "font-bold text-[#FFA20D]" : ""}`}>Prestasi Non-Akademik</Link>
                <Link to="/prestasi/siswa" className={`hover:text-[#FFA20D] ${isActive("/prestasi/siswa") ? "font-bold text-[#FFA20D]" : ""}`}>Prestasi Siswa</Link>
              </Dropdown>
            )}
          </div>

          {/* FASILITAS */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown("fasilitas")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => toggleDropdown("fasilitas")}
              className={`flex items-center gap-2 transition cursor-pointer ${isActive("/fasilitas")
                  ? "font-bold opacity-100"
                  : "font-normal opacity-85 hover:opacity-100"
                }`}
            >
              FASILITAS
              <img
                src={Down}
                alt=""
                className={`w-[12px] transition-all duration-300 ${activeDropdown === "fasilitas" ? "rotate-180" : ""
                  }`}
              />
            </button>
            {activeDropdown === "fasilitas" && (
              <Dropdown>
                <Link to="/fasilitas/laboratorium" className={`hover:text-[#FFA20D] ${isActive("/fasilitas/laboratorium") ? "font-bold text-[#FFA20D]" : ""}`}>Laboratorium</Link>
                <Link to="/fasilitas/perpustakaan" className={`hover:text-[#FFA20D] ${isActive("/fasilitas/perpustakaan") ? "font-bold text-[#FFA20D]" : ""}`}>Perpustakaan</Link>
                <Link to="/fasilitas/lapangan" className={`hover:text-[#FFA20D] ${isActive("/fasilitas/lapangan") ? "font-bold text-[#FFA20D]" : ""}`}>Lapangan</Link>
                <Link to="/fasilitas/ruang-kelas" className={`hover:text-[#FFA20D] ${isActive("/fasilitas/ruang-kelas") ? "font-bold text-[#FFA20D]" : ""}`}>Ruang Kelas</Link>
              </Dropdown>
            )}
          </div>

          {/* INFORMASI */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown("informasi")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => toggleDropdown("informasi")}
              className={`flex items-center gap-2 transition cursor-pointer ${isActive("/informasi") || isActive("/berita")
                  ? "font-bold opacity-100"
                  : "font-normal opacity-85 hover:opacity-100"
                }`}
            >
              INFORMASI
              <img
                src={Down}
                alt=""
                className={`w-[12px] transition-all duration-300 ${activeDropdown === "informasi" ? "rotate-180" : ""
                  }`}
              />
            </button>
            {activeDropdown === "informasi" && (
              <Dropdown>
                <Link to="/informasi/berita" className={`hover:text-[#FFA20D] ${isActive("/informasi/berita") || isActive("/berita") ? "font-bold text-[#FFA20D]" : ""}`}>Berita</Link>
                <Link to="/informasi/pengumuman" className={`hover:text-[#FFA20D] ${isActive("/informasi/pengumuman") ? "font-bold text-[#FFA20D]" : ""}`}>Pengumuman</Link>
                <Link to="/informasi/agenda" className={`hover:text-[#FFA20D] ${isActive("/informasi/agenda") ? "font-bold text-[#FFA20D]" : ""}`}>Agenda</Link>
              </Dropdown>
            )}
          </div>
        </div>

        {/* DESKTOP BUTTON */}
        <Link
          to="/alumni"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            px-8 py-2.5
            border-2 rounded-[26px]
            font-medium text-sm
            transition duration-300
            lg:flex gap-2
            items-center
            lg:block hidden cursor-pointer shrink-0
            border-white text-white hover:bg-white hover:text-[#FFA20D]
          `}
        >
          <img src={isHovered ? User2 : User} alt="" className="w-3 h-4" />
          <p>CARI ALUMNI</p>
        </Link>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-2xl cursor-pointer relative z-[1001]"
          aria-label={isOpen ? "Tutup menu" : "Buka menu"}
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* MOBILE MENU PANEL (slide-down) */}
        <div
          className={`
            absolute left-0 right-0 top-16 lg:hidden
            bg-white text-gray-800 rounded-b-2xl shadow-2xl
            transition-all duration-300 ease-out origin-top
            ${isOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"}
          `}
          style={{ transformOrigin: "top center" }}
        >
          <div className="flex flex-col p-5 max-h-[75vh] overflow-y-auto">

            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`py-3 text-sm border-b border-gray-100 transition-colors ${isActive("/")
                  ? "font-bold text-[#FFA20D]"
                  : "font-semibold text-gray-700 active:text-[#FFA20D]"
                }`}
            >
              BERANDA
            </Link>

            {/* Mobile Dropdown: Profil Sekolah */}
            <MobileDropdownItem
              label="PROFIL SEKOLAH"
              isOpen={activeDropdown === "mobile-profil"}
              onToggle={() => toggleDropdown("mobile-profil")}
              isActive={isActive("/profil")}
            >
              <Link to="/tentang-sekolah" onClick={closeMobileMenu} className={isActive("/tentang-sekolah") ? "font-bold text-[#FFA20D]" : ""}>Tentang Sekolah</Link>
              <Link to="/visi-misi" onClick={closeMobileMenu} className={isActive("/visi-misi") ? "font-bold text-[#FFA20D]" : ""}>Visi & Misi</Link>
              <Link to="/struktur-organisasi" onClick={closeMobileMenu} className={isActive("/struktur-organisasi") ? "font-bold text-[#FFA20D]" : ""}>Struktur Organisasi</Link>
            </MobileDropdownItem>

            {/* Mobile Dropdown: Kompetensi Keahlian */}
            <MobileDropdownItem
              label="KOMPETENSI KEAHLIAN"
              isOpen={activeDropdown === "mobile-kompetensi"}
              onToggle={() => toggleDropdown("mobile-kompetensi")}
              isActive={isActive("/kompetensi")}
            >
              <Link to="/kompetensi/rpl" onClick={closeMobileMenu} className={isActive("/kompetensi/rpl") ? "font-bold text-[#FFA20D]" : ""}>Rekayasa Perangkat Lunak</Link>
              <Link to="/kompetensi/tkj" onClick={closeMobileMenu} className={isActive("/kompetensi/tkj") ? "font-bold text-[#FFA20D]" : ""}>Teknik Jaringan Komputer</Link>
              <Link to="/kompetensi/dkv" onClick={closeMobileMenu} className={isActive("/kompetensi/dkv") ? "font-bold text-[#FFA20D]" : ""}>Desain Komunikasi Visual</Link>
            </MobileDropdownItem>

            {/* Mobile Dropdown: Prestasi */}
            <MobileDropdownItem
              label="PRESTASI"
              isOpen={activeDropdown === "mobile-prestasi"}
              onToggle={() => toggleDropdown("mobile-prestasi")}
              isActive={isActive("/prestasi")}
            >
              <Link to="/prestasi/akademik" onClick={closeMobileMenu} className={isActive("/prestasi/akademik") ? "font-bold text-[#FFA20D]" : ""}>Prestasi Akademik</Link>
              <Link to="/prestasi/non-akademik" onClick={closeMobileMenu} className={isActive("/prestasi/non-akademik") ? "font-bold text-[#FFA20D]" : ""}>Prestasi Non-Akademik</Link>
            </MobileDropdownItem>

            {/* Mobile Dropdown: Fasilitas */}
            <MobileDropdownItem
              label="FASILITAS"
              isOpen={activeDropdown === "mobile-fasilitas"}
              onToggle={() => toggleDropdown("mobile-fasilitas")}
              isActive={isActive("/fasilitas")}
            >
              <Link to="/fasilitas/laboratorium" onClick={closeMobileMenu} className={isActive("/fasilitas/laboratorium") ? "font-bold text-[#FFA20D]" : ""}>Laboratorium</Link>
              <Link to="/fasilitas/perpustakaan" onClick={closeMobileMenu} className={isActive("/fasilitas/perpustakaan") ? "font-bold text-[#FFA20D]" : ""}>Perpustakaan</Link>
              <Link to="/fasilitas/lapangan" onClick={closeMobileMenu} className={isActive("/fasilitas/lapangan") ? "font-bold text-[#FFA20D]" : ""}>Lapangan</Link>
            </MobileDropdownItem>

            {/* Mobile Dropdown: Informasi */}
            <MobileDropdownItem
              label="INFORMASI"
              isOpen={activeDropdown === "mobile-informasi"}
              onToggle={() => toggleDropdown("mobile-informasi")}
              isActive={isActive("/informasi") || isActive("/berita")}
            >
              <Link to="/informasi/berita" onClick={closeMobileMenu} className={isActive("/informasi/berita") || isActive("/berita") ? "font-bold text-[#FFA20D]" : ""}>Berita</Link>
              <Link to="/informasi/pengumuman" onClick={closeMobileMenu} className={isActive("/informasi/pengumuman") ? "font-bold text-[#FFA20D]" : ""}>Pengumuman</Link>
              <Link to="/informasi/agenda" onClick={closeMobileMenu} className={isActive("/informasi/agenda") ? "font-bold text-[#FFA20D]" : ""}>Agenda</Link>
            </MobileDropdownItem>

            {/* Mobile CTA Button */}
            <Link
              to="/alumni"
              className="mt-4 w-full py-3 bg-[#FFA20D] text-white text-center rounded-xl font-bold text-sm cursor-pointer active:scale-95 transition-transform"
              onClick={closeMobileMenu}
            >
              CARI ALUMNI
            </Link>
          </div>
        </div>
      </nav>

      {/* BACKDROP OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}

// DESKTOP DROPDOWN COMPONENT
function Dropdown({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-full left-0 pt-2 w-60 z-50">
      <div className="rounded-xl bg-white p-4 text-black shadow-lg">
        <div className="flex flex-col gap-3 text-sm">{children}</div>
      </div>
    </div>
  );
}

// MOBILE DROPDOWN ITEM COMPONENT
function MobileDropdownItem({
  label,
  isOpen,
  onToggle,
  isActive,
  children,
}: {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-gray-100">
      <button
        onClick={onToggle}
        className={`flex items-center justify-between w-full py-3 text-sm cursor-pointer ${isActive ? "font-bold text-[#FFA20D]" : "font-semibold text-gray-800"
          }`}
      >
        {label}
        <span
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        >
          ⌄
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60 pb-3" : "max-h-0"
          }`}
      >
        <div className="ml-4 flex flex-col gap-2.5 text-sm text-gray-600">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
