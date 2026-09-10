import bot from "../assets/bot.png";

export default function ChatBot() {
    return (
        <div className='fixed bottom-20 right-20 z-50 flex flex-col'>
            <p className="px-10 bg-blue-900 float-animation">ChatBot</p>
            <div className='float-animation bg-[#0900FF] rounded-full h-20 w-20 shadow-md shadow-orange-400 hover:bg-[#040080] cursor-pointer'>
                <p className='flex text-center items-center justify-center h-full'>
                    <img src={bot} alt='' className='w-10' />
                </p>
            </div>
        </div>
    );
}