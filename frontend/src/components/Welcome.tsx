import Guru from "../assets/guru_card.jpg"
import Siswa from "../assets/siswa_card.jpg"
import StatCard from "./StatCard"

function Welcome() {
    return (
        <section className="bg-[#FFA20D]">
            <div className="
                    w-[90vw]
                    lg:w-[80vw]
                    mx-auto
                    px-6
                    py-12
                    lg:px-1
                    lg:py-20
                    
                ">

                <div className="
                        grid
                        grid-cols-1
                        lg:grid-cols-2
                        gap-12
                        lg:gap-0
                        items-center
                    ">

                    <div className="text-white">
                        <p className="text-xl lg:text-2xl font-normal">
                            Selamat Datang,
                        </p>

                        <p className="text-4xl md:text-5xl lg:text-5xl font-bold leading-tight">
                            SMKN 2 MOJOKERTO
                        </p>

                        <p className="text-base lg:text-base font-light">
                            Disiplin Berprestasi
                        </p>

                        <button className="
                                border-2
                                border-white
                                rounded-tr-[15px]
                                rounded-tl-[15px]
                                rounded-br-[15px]
                                py-3
                                px-8
                                lg:px-10
                                mt-5
                                transition
                                duration-300
                                hover:bg-white
                                hover:text-[#FFA20D]
                                cursor-pointer
                            ">
                            JELAJAHI PROFIL
                        </button>
                    </div>


                    <div className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            gap-5
                        ">

                        <StatCard
                            image={Siswa}
                            number="1279"
                            label="Siswa"
                        />

                        <StatCard
                            image={Guru}
                            number="88"
                            label="Guru"
                        />
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Welcome