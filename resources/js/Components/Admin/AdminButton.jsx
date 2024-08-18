function AdminButton({ onClick, icon, name, className }) {
    return (
        <button
            onClick={onClick}
            className={`flex px-9 py-1  rounded-2xl  ${className}`}
        >
            {icon}
            <span className="ml-2 poppins">{name}</span>
        </button>
    );
}

export default AdminButton;
