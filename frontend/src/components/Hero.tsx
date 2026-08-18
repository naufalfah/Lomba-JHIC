import Sekolah from "../assets/sekolah.png"

function Hero() {
    return (
        <section className="hero">
            <div className="hero-title">
                SKANEDA
            </div>
            <div className="hero-img">
                <img 
                    src={Sekolah}
                    alt="Gedung SMKN 2 Kota Mojokerto"
                />
            </div>
        </section>
    )
}

export default Hero