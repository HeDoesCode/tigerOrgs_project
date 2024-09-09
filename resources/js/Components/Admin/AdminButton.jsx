function AdminButton({ onClick, icon, name, className }) {
    return (
        <button
            onClick={onClick}
            className={`flex px-9  shadow-lg rounded-2xl   ${className}`}
        >
            {icon}
            <span className="ml-2 poppins hidden truncate sm:block">
                {name}
            </span>
        </button>
    );
}

export default AdminButton;
