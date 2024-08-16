function ControlContainer({ name, children, className }) {
    return (
        <div className={`flex flex-col space-y-1 w-full ${className}`}>
            <span className="text-sm">{name}</span>
            {children}
        </div>
    )
}

export default ControlContainer
