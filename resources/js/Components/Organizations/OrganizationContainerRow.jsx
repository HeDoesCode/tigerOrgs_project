function OrganizationContainerRow({ children, title, className }) {
    return (
        <div className={`flex flex-col space-y-3 w-full ${className}`}>
            <div className="flex flex-row justify-between -mb-3">
                <div className="questrial font-bold tracking-wider">{title}</div>
                <div className="w-20 relative overflow-visible">
                    <button className="absolute right-0 min-w-max underline text-sm py-1 px-2 text-gray-500 hover:bg-gray-800 hover:text-white rounded-lg">show all</button>
                </div>
            </div>
            <div className="flex flex-row space-x-2 w-full overflow-x-auto overflow-y-hidden">
                {children}
            </div>
        </div>
    )
}

export default OrganizationContainerRow
