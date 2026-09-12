export default function CardGlass({
    text = 'ini history ini history ini history ini history ini history ini history ini history ',
    onClick,
}: {
    text?: string;
    onClick?: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className={`w-50 max-w-sm rounded-full border border-white/5 bg-blue-600/20 p-2 px-5 shadow-[0_10px_30px_rgba(50,120,255,0.15)] backdrop-blur-md transition duration-300 hover:scale-95 ${onClick ? 'cursor-pointer' : ''}`}
        >
            <p className='truncate text-center text-white text-xs'>{text}</p>
        </div>
    );
}