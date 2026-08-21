import Sekolah from "../assets/sekolah.png"

function Hero() {
    return (
        <>
            <section className="lg:h-auto bg-linear-to-b from-[#0900FF] to-[#A7A7A7] overflow-hidden">
                <div className="flex flex-col pt-[35vh] lg:pt-20">
                    <div className="absolute text-[clamp(70px,19vw,280px)] text-center w-full -translate-y-45 lg:-translate-y-15 text-white">
                        <p className="font-black lg:bg-linear-to-b from-white via-white to-white-50 lg:bg-clip-text lg:text-transparent">SKANEDA</p>
                        <p className="lg:hidden text-xl font-bold -translate-y-5">SMKN 2 MOJOKERTO</p>
                        <p className="lg:hidden md:hidden sm:hidden text-base font-light -translate-y-5">Disiplin | Berprestasi</p>
                    </div>
                </div>
                <img src={Sekolah} alt="" className="relative w-full scale-101" />
            </section>
        </>
    )
}

export default Hero