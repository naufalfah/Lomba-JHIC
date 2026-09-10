export default function CardGlass({
    judul = "",
    isi = "",
    quote = "",
    next =""
}) {
    return (
        <div className='w-full max-w-sm rounded-2xl border border-white/25 bg-blue-500/20 p-10 shadow-[0_10px_30px_rgba(50,120,255,0.75)] backdrop-blur-md transition duration-300 hover:-translate-y-2'>
            <h2 className='text-xl font-medium text-white'>
                {judul}
            </h2>

            <p className='mt-6 text-sm font-medium leading-relaxed text-white/75 tracking-wider'>
                {isi}
            </p>

            <p className='mt-6 text-sm font-medium leading-relaxed text-white/75 tracking-wider'>
                {quote}
            </p>

            <div className='mt-8 text-right'>
                <button className='text-sm font-medium text-white/80 transition hover:text-white'>
                    {next}
                </button>
            </div>
        </div>
    );
}