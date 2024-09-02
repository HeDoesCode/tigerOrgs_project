function VerticalCard({ children, gridcol }) {
    return (
        <div
            className={`hover:scale-[1.01] transition-all duration-300 ease-in-out p-4 shadow-lg grid mb-2 hover:bg-gray-100 rounded-xl bg-white md:divide-x  divide-gray-300 grid-cols-1 ${gridcol}`}
        >
            {children}
        </div>
    );
}

export default VerticalCard;
