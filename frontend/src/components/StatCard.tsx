interface StatCardProps {
    image: string
    number: string
    label: string
}

function StatCard({image, number, label}: StatCardProps) {
    return (
        <div className="
            bg-white
            rounded-[26px]
            text-[#0500A2]
            shadow-lg
            p-5
        ">
            <img
                src={image}
                alt={label}
                className="
                    w-full
                    h-50
                    lg:h-40
                    object-cover
                    rounded-xl
                "
            />
            <div className="
                text-center
                mt-3
            ">
                <p className="
                    font-extrabold
                    text-3xl
                ">
                    {number}
                </p>
                <p className="
                    text-sm
                ">
                    {label}
                </p>
            </div>
        </div>
    )
}

export default StatCard