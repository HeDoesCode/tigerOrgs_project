function VerticalCard({ children, gridcol }) {
    return (
        <div
            className={`p-4 shadow-lg grid gridcol rounded-xl bg-white divide-x divide-gray-300 ${gridcol}`}
        >
            {children}
        </div>
    );
}

export default VerticalCard;
