import Sekolah from "../assets/sekolah.png"

function Hero() {
    return (
        <>
            <section className="lg:h-auto bg-linear-to-b from-[#0900FF] to-[#A7A7A7] overflow-hidden">
                <div className="flex flex-col pt-[25vh] sm:pt-[30vh] lg:pt-20">
                    <div className="absolute text-[clamp(48px,15vw,280px)] lg:text-[clamp(70px,19vw,280px)] text-center w-full -translate-y-32 sm:-translate-y-40 lg:-translate-y-15 text-white px-4">
                        <p className="font-black lg:bg-linear-to-b from-white via-white to-white-50 lg:bg-clip-text lg:text-transparent">SKANEDA</p>
                        <p className="lg:hidden text-lg sm:text-xl font-bold -translate-y-3 sm:-translate-y-5">SMKN 2 MOJOKERTO</p>
                        <p className="lg:hidden md:hidden sm:hidden text-sm font-light -translate-y-3">Disiplin | Berprestasi</p>
                    </div>
                </div>
                <img src={Sekolah} alt="" className="relative w-full scale-101" />
            </section>
        </>
    )
}

export default Hero