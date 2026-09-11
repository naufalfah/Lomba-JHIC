import { Link } from 'react-router-dom';
import bot from '../assets/bot.png';

export default function ChatBot() {
    return (
        <div className='fixed md:bottom-20 md:right-20 bottom-15 right-5 z-50'>
            <div className='group float-animation flex items-center gap-3 cursor-pointer'>
                <p className='opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 px-4 py-2 bg-blue-900 text-white rounded-lg shadow-md font-medium text-sm whitespace-nowrap order-1 cursor-default'>
                    ChatBot
                </p>

                <Link to='/assistant' className='bg-[#0900FF] rounded-full md:h-20 md:w-20 h-15 w-15 shadow-xl/30 shadow-orange-400 group-hover:bg-[#040080] transition-colors duration-300 flex items-center justify-center order-2'>
                    <img src={bot} alt='Bot' className='md:w-10 w-9' />
                </Link>
            </div>
        </div>
    );
}
