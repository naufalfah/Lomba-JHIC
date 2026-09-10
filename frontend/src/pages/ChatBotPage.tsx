import aiBg from '../assets/ai-bg.jpg';
import plusIcon from '../assets/plus.png';
import arrowRight from '../assets/arrow-right.png';
import CardGlass from '../components/CardGlass';

export default function ChatBotPage() {
    return (
        <div className='min-h-screen relative overflow-hidden'>
            <div
                className='absolute inset-0 scale-105 bg-center bg-cover bg-no-repeat blur-sm'
                style={{
                    backgroundImage: `url(${aiBg})`,
                }}
            ></div>

            <div className='relative z-10'>
                <div className='flex flex-col gap-5 justify-center items-center min-h-screen'>
                    <h1 className='text-4xl text-white'>
                        Selamat Datang Di, Velo AI
                    </h1>

                    <div className='flex h-16 w-full items-center bg-[#30298B] rounded-full px-4 max-w-4xl shadow-xl shadow-white/20'>
                        <button className='w-6 mx-2 opacity-80'>
                            <img src={plusIcon} alt='Add' />
                        </button>

                        <input
                            type='text'
                            placeholder='Mau tanya apa hari ini?'
                            className='flex-1 bg-transparent px-6 text-white outline-none placeholder:text-gray-300'
                        />

                        <button className='flex h-12 w-12 items-center justify-center rounded-full bg-[#49439B] transition duration-300 hover:bg-[#352f7d]'>
                            <img
                                src={arrowRight}
                                alt='Kirim'
                                className='w-5 opacity-80 mx-2'
                            />
                        </button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mt-5 w-full max-w-7xl px-6'>
                        <CardGlass
                            judul='SMKN 2 MOJOKERTO'
                            isi='Sekolah Menengah Kejuruan yang berkomitmen mencetak generasi kompeten dan berkarakter.'
                            next='→ Selengkapnya'
                        />
                        <CardGlass
                            judul='Agenda Terdekat'
                            isi='PILKETOS atau yang disebut dengan (Pemilihan Ketua Osis) akan segera dilaksanakan di SMKN 2 Mojokerto'
                        />
                        <CardGlass
                            judul='MOTIVASI HARI INI'
                            quote='- SMKN 2 MOJOKERTO'
                            isi='"Disiplin adalah jembatan antara tujuan dan pencapaian."'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


// bg-[#30298B]