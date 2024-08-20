import IconMenu3 from "@/Components/Icons/IconMenu3"
import { React } from "react"
import { Link } from "@inertiajs/react"

function SideBar(logo, title, current, children) {

    return (
        <div
            className='border-gray-300 border-r-[1px] fixed -left-16 hover:left-0 sm:left-0 top-0 bottom-0 min-w-16 w-0 sm:w-16 max-w-52 flex flex-col justify-center bg-[#EEEEEE] transition-all ease-in-out duration-300 group hover:w-52 hover:bg-[#FEFEFE] overflow-clip'
        >
            <button className="fixed size-16 left-0 top-0 flex sm:hidden items-center justify-center cursor-default">
                <IconMenu3 size="27" />
            </button>
            <div className="flex z-10">
                <div className='min-h-16 min-w-16 size-16 flex items-center justify-center p-2'>
                    <img src={logo} alt='Missing Logo' className="bg-cover rounded-full" />
                </div>
                <p className="text-center mr-3 font-bold text-xs leading-4 line-clamp-3 h-min my-auto w-32 overflow-clip">
                    <span className="w-32 min-w-32">
                        {title}
                    </span>
                </p>
            </div>
            <nav className="flex-1 flex flex-col space-y-3 ml-2 my-2 transition-all group-hover:mr-0 ease-in-out duration-300">
                {children.toArray.map(child =>
                    React.cloneElement(child, { current })
                )}
            </nav>
        </div>
    )
}

SideBar.Link = ({ icon, href, children, targets, current }) => {
    // targets array []
    const isActive = targets.some(target => target === current)
    return (
        <div className='flex'>
            <Link className={`flex items-center py-2 pl-3 rounded-l-full overflow-x-clip w-full ${(isActive && "bg-[#FFBC58]") || "hover:bg-gray-800 hover:text-white"}`} href={href}>
                <div className="min-h-7 min-w-7 size-7">{icon}</div>
                <div className="text-left poppins text-lg overflow-hidden h-min w-full invisible group-hover:visible ml-3 transition-all">
                    {children}
                </div>
            </Link>
        </div>
    )
}

export default SideBar
