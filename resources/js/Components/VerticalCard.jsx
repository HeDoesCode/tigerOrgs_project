function VerticalCard({ children, gridcol }) {
    return (
        <div
            className={`hover:scale-[1.01] transition-all duration-300 ease-in-out p-4 shadow-lg grid gridcol hover:bg-gray-100 rounded-xl bg-white divide-x divide-gray-300 ${gridcol}`}
        >
            {children}
        </div>
    );
}

export default VerticalCard;
