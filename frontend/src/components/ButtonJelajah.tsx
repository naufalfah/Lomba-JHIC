interface ButtonProps {
    title: string;
}

function ButtonJelajah({title}: ButtonProps) {
    return (
        <>
            <button className="
                        border-2
                        border-white
                        rounded-full
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
                    {title}
                </button>
        </>
    )
}

export default ButtonJelajah