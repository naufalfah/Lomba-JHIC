import KepalaSekolah from "../assets/kepsek.png"

function Kepsek() {
    return (
        <section>
                <div className="
                    bg-[linear-gradient(to_right,#5b57f3_53%,#554ff0_53%,#554ff0_70%,#4d47ee_70%,#4d47ee_85%,#4139ed_85%,#4139ed_100%)]
                ">

                    <div className="
                        w-[90vw]
                        lg:w-[80vw]
                        mx-auto
                        px-6
                        py-12
                        lg:px-10
                        lg:py-0
                    ">

                        <div className="
                            grid
                            grid-cols-1
                            lg:grid-cols-2
                            items-center
                            gap-12
                            lg:gap-0
                        ">

                            <div className="flex justify-center lg:justify-start">
                                <img
                                    src={KepalaSekolah}
                                    alt="Kepala Sekolah"
                                    className="
                                        w-[clamp(200px,40vw,490px)] 
                                        max-w-full
                                    "
                                />
                            </div>


                            <div className="flex flex-col items-start text-white">

                                <p className="
                                    text-2xl
                                    md:text-3xl
                                    lg:text-4xl
                                    font-bold
                                ">
                                    KEPALA SEKOLAH
                                </p>

                                <p className="
                                    text-[clamp(20px,5vw,69px)]
                                    font-bold
                                    my-3
                                    leading-tight
                                ">
                                    DRS. AHMAD <br />
                                    MUKLASON, M M.PD
                                </p>

                                <p className="
                                    text-base
                                    lg:text-xl
                                    font-medium
                                ">
                                    Menjabat sejak 2020
                                </p>

                                <button className="
                                    border-2
                                    border-white
                                    rounded-tr-[15px]
                                    rounded-tl-[15px]
                                    rounded-br-[15px]
                                    py-3
                                    px-8
                                    lg:px-15
                                    mt-8
                                    transition
                                    duration-300
                                    hover:bg-white
                                    hover:text-[#FFA20D]
                                    cursor-pointer
                                ">
                                    LIHAT SELENGKAPNYA
                                </button>

                            </div>

                        </div>

                    </div>
                </div>
            </section>
    )
}

export default Kepsek