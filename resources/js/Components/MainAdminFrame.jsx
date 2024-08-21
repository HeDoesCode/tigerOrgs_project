import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import IconSearch from "@/Components/Icons/IconSearch";

function MainAdminFrame({ children, navItems, title }) {
    const { url } = usePage();
    const routePath = (routeName) => new URL(route(routeName)).pathname;

    const [selectedNav, setSelectedNav] = useState(navItems[0]?.label);

    const handleNavClick = (label) => {
        setSelectedNav(label);
    };
    return (
        <div>
            <div className="poppins text-xl p-2 font-light grid lg:grid-cols-3 md:grid-cols-2 ">
                <div className="p-2  col-span-2">{title}</div>

                <div className="flex flex-col    space-y-1 w-full relative shadow-lg rounded-xl">
                    <input
                        type="text"
                        placeholder="Search"
                        className="peer p-3 bg-transparent  text-gray-600 focus:text-black rounded-xl bg-white border-none h-12 pl-10 focus:pl-3 transition-all duration-200"
                    />
                    <div className="absolute text-gray-500 left-0 bottom-0 h-12 flex items-center justify-center w-12 peer-focus:w-0 overflow-hidden transition-all duration-200 peer-focus:text-gray-500/0">
                        <IconSearch size="22" />
                    </div>
                </div>
            </div>
            <div className="bg-[#EEEEEE] mt-2 border border-gray-400 rounded-xl grid grid-cols-1 divide-y divide-gray-400">
                <div className="grid grid-cols-8 gap-4">
                    <div className="col-start-1 col-end-9 grid grid-cols-3 lg:grid-cols-5">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                className={`py-3 rounded-t-xl hover:bg-gray-800 hover:text-white text-md flex justify-center cursor-pointer ${
                                    url === routePath(item.link)
                                        ? "border-b-2 border-[#FF9900] text-[#FF9900]"
                                        : ""
                                }`}
                                onClick={() => handleNavClick(item.label)}
                                href={route(item.link)}
                            >
                                <div className="hidden sm:block">
                                    {item.icon}
                                </div>
                                <div className="pl-2 poppins">{item.label}</div>
                            </Link>
                        ))}
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}

export default MainAdminFrame;
