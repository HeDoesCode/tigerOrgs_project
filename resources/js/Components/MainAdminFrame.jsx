import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

function MainAdminFrame({
    children,
    navItems,
    title,
    searchbar,
    onSelect,
    filter,
    dialog,
    ...props
}) {
    const { url } = usePage();

    const [selectedNav, setSelectedNav] = useState(navItems[0]?.label);

    const handleNavClick = (label) => {
        setSelectedNav(label);
    };
    return (
        <div>
            <div className="poppins text-xl p-2 font-light grid lg:grid-cols-10 md:grid-cols-2 ">
                <div className=" pb-3 flex col-span-5">
                    {title} {dialog}
                </div>

                {searchbar}
                {filter}
            </div>
            <div className="bg-[#EEEEEE] mt-2 border border-gray-400 rounded-xl grid grid-cols-1 divide-y divide-gray-400">
                <div className="grid grid-cols-8 gap-4">
                    <div className="col-start-1 col-end-9 grid grid-cols-3 lg:grid-cols-5">
                        {navItems.map((item, index) => {
                            const itemUrl = route(item.link, item.params);
                            return (
                                <Link
                                    key={index}
                                    className={`py-3 rounded-t-xl hover:bg-gray-800 hover:text-white text-md flex justify-center cursor-pointer ${
                                        route().current() === item.link
                                            ? "border-b-2 border-[#FF9900] text-[#FF9900]"
                                            : ""
                                    }`}
                                    onClick={() => handleNavClick(item.label)}
                                    href={itemUrl}
                                >
                                    <div className="hidden sm:block">
                                        {item.icon}
                                    </div>
                                    <div className="pl-2 poppins">
                                        {item.label}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}

export default MainAdminFrame;
