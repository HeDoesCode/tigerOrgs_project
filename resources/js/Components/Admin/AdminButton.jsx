function AdminButton({
    onClick,
    icon,
    name,
    className,
    type = "button",
    disabled,
    asChild,
}) {
    const ButtonTag = asChild ? "div" : "button";

    return (
        <ButtonTag
            type={!asChild ? type : undefined}
            onClick={onClick}
            disabled={disabled}
            className={`flex px-9 shadow-lg rounded-2xl ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
            } ${className}`}
        >
            {icon}
            <span className="ml-2 poppins hidden truncate sm:block">
                {name}
            </span>
        </ButtonTag>
    );
}

export default AdminButton;
