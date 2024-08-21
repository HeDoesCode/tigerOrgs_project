import { useState } from "react"

function OrganizationContainerRow({ children, title, className }) {
    const [expand, setExpand] = useState(false);
    const expandRow = () => {
        setExpand(!expand);
    }

    return (
        <div className={`flex flex-col space-y-3 w-full ${className}`}>
            <div className="flex flex-row justify-between -mb-3">
                <div className="questrial font-bold tracking-wider">{title}</div>
                <div className="w-20 relative overflow-visible">
                    <button onClick={expandRow} className={`absolute right-0 min-w-max underline text-sm py-1 px-2 hover:bg-gray-800 hover:text-white rounded-lg ${expand ? 'text-blue-500 font-bold' : 'text-gray-500'}`}>
                        {expand ? 'hide all' : 'show all'}
                    </button>
                </div>
            </div>
            <div className={!expand ?
                (
                    'flex flex-row space-x-2 w-full overflow-x-auto overflow-y-hidden'
                ) :
                (
                    'w-full select-none max-h-full overflow-y-hidden overflow-x-hidden grid grid-cols-[repeat(auto-fill,_minmax(9rem,1fr))] md:grid-cols-[repeat(auto-fill,_minmax(12rem,1fr))] gap-4 justify-items-center border border-gray-400 rounded-lg'
                )
            }>
                {children}
            </div>
        </div >
    )
}

export default OrganizationContainerRow
