import { useState, useEffect } from "react"
import DefaultGuruImage from "../assets/guru_card.jpg"
import DefaultSiswaImage from "../assets/siswa_card.jpg"
import StatCard from "./StatCard"
import ButtonJelajah from "./ButtonJelajah.tsx"
import { getTotalSiswa, getTotalGuru, getImageSiswa, getImageGuru } from "../api/statCounts"

function Welcome() {
    const [studentCount, setStudentCount] = useState<string>("1279")
    const [teacherCount, setTeacherCount] = useState<string>("88")
    const [studentImage, setStudentImage] = useState<string>(DefaultSiswaImage)
    const [teacherImage, setTeacherImage] = useState<string>(DefaultGuruImage)

    const updateStateFromStorage = () => {
        setStudentCount(getTotalSiswa().toString())
        setTeacherCount(getTotalGuru().toString())

        const customSiswa = getImageSiswa()
        setStudentImage(customSiswa || DefaultSiswaImage)

        const customGuru = getImageGuru()
        setTeacherImage(customGuru || DefaultGuruImage)
    }

    useEffect(() => {
        updateStateFromStorage()

        // Sync in real-time when updated in admin panel or other tabs
        window.addEventListener("stat_counts_updated", updateStateFromStorage)
        window.addEventListener("storage", updateStateFromStorage)

        return () => {
            window.removeEventListener("stat_counts_updated", updateStateFromStorage)
            window.removeEventListener("storage", updateStateFromStorage)
        }
    }, [])

    return (
        <section className="bg-[#FFA20D]">
            <div className="
                    w-[92vw]
                    sm:w-[90vw]
                    lg:w-[80vw]
                    mx-auto
                    px-4
                    sm:px-6
                    py-10
                    md:py-12
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
                        <p className="text-lg sm:text-xl lg:text-2xl font-normal">
                            Selamat Datang,
                        </p>

                        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            SMKN 2 MOJOKERTO
                        </p>

                        <p className="text-sm sm:text-base lg:text-base font-light">
                            Disiplin Berprestasi
                        </p>

                        <ButtonJelajah
                            title="JELAJAHI PROFIL"
                        />
                    </div>


                    <div className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            gap-5
                        ">

                        <div className=" 
                            transition
                            duration-300
                            ease
                            hover:-translate-y-2
                        ">
                            <StatCard
                                image={studentImage}
                                number={studentCount}
                                label="Siswa"
                            />
                        </div>

                        <div className=" 
                            transition
                            duration-300
                            ease
                            hover:-translate-y-2
                        ">
                            <StatCard
                                image={teacherImage}
                                number={teacherCount}
                                label="Guru"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </section>

    )
}

export default Welcome