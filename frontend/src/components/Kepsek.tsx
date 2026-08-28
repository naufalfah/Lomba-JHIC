import KepalaSekolah from "../assets/kepsek.png"
import ButtonJelajah from "./ButtonJelajah.tsx"

function Kepsek() {
    return (
        <section>
                <div className="
                    bg-[linear-gradient(to_right,#5b57f3_53%,#554ff0_53%,#554ff0_70%,#4d47ee_70%,#4d47ee_85%,#4139ed_85%,#4139ed_100%)]
                    lg:bg-[linear-gradient(to_right,#5b57f3_53%,#554ff0_53%,#554ff0_70%,#4d47ee_70%,#4d47ee_85%,#4139ed_85%,#4139ed_100%)]
                    bg-[#5b57f3]
                ">

                    <div className="
                        w-[92vw]
                        sm:w-[90vw]
                        lg:w-[80vw]
                        mx-auto
                        px-4
                        sm:px-6
                        py-10
                        md:py-12
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
                                    text-xl
                                    sm:text-2xl
                                    md:text-3xl
                                    lg:text-4xl
                                    font-bold
                                ">
                                    KEPALA SEKOLAH
                                </p>

                                <p className="
                                    text-[clamp(18px,5vw,89px)]
                                    font-bold
                                    my-2 md:my-3
                                    leading-tight
                                ">
                                    Iswahyudi,
                                    S.ST., M.Pd.
                                </p>

                                <p className="
                                    text-base
                                    lg:text-xl
                                    font-medium
                                ">
                                    Menjabat sejak 2026
                                </p>

                                <ButtonJelajah 
                                    title="JELAJAHI SEKARANG"
                                />
                            </div>

                        </div>

                    </div>
                </div>
            </section>
    )
}

export default Kepsek