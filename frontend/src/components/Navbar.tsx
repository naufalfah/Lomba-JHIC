import logo from "../assets/logo.png"

function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="brand">
                    <div className="logo">
                        <img src={logo} alt="" />    
                    </div>                    
                    <div className="title">
                        <p>SMK NEGERI 2</p>
                        <p>KOTA MOJOKERTO</p>
                    </div>
                </div>

                <div className="nav-menu">
                    <a href="">BERANDA</a>
                    <a href="">PROFIL SEKOLAH</a>
                    <a href="">KOMPETENSI KEAHLIAN</a>
                    <a href="">FASILITAS</a>
                    <a href="">INFORMASI</a>
                </div>

                <button className="x-btn">
                    JELAJAHI SEKARANG
                </button>
            </nav>
        </>
    )
}

export default Navbar