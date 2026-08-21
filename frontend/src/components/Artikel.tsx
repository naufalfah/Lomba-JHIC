interface ArtikelProps {
    id: number;
    judul: string;
    gambar: string;
}

function Artikel() {
    const artikel: ArtikelProps[] = [
        {
            id: 1,
            judul: "Kegiatan Sekolah",
            gambar: "",
        },
        {
            id: 2,
            judul: "Prestasi Siswa",
            gambar: "",
        },
        {
            id: 3,
            judul: "Kegiatan Terbaru",
            gambar: "",
        },
        {
            id: 4,
            judul: "Berita Sekolah",
            gambar: "",
        },
        {
            id: 5,
            judul: "Kabar Sekolah",
            gambar: "",
        },
        {
            id: 6,
            judul: "Anu Sekolah",
            gambar: "",
        },
    ];

    return (
        <section className="relative overflow-hidden bg-[#FFA313] px-6 py-16">
            <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[#E89100]" />
            <div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-[#E89100]" />

            <div className="relative z-10 text-center">
                <h2 className="text-4xl font-bold text-white">
                    ARTIKEL DAN BERITA
                </h2>
                <p className="mt-2 text-sm text-white">
                    Beberapa artikel yang dapat kami tampilkan...
                </p>
            </div>

            <div className="relative z-10 mx-auto mt-6 max-w-[1120px] rounded-2xl bg-[#E89100] p-4">
                <div className="flex gap-6 overflow-x-auto pb-2">
                    {artikel.map((item) => (
                        <article
                            key={item.id}
                            className="w-[285px] shrink-0 rounded-2xl bg-white p-4 shadow-md"
                        >
                            <div className="h-[110px] overflo-hidden rounded-xl bg-gray-100">
                                {item.gambar ? (
                                    <img
                                        src={item.gambar}
                                        alt={item.judul}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                        Belum ada gambar
                                    </div>
                                )}
                            </div>

                            <h3 className="mt-2 text-center text-sm text-gray-800">
                                {item.judul}
                            </h3>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Artikel