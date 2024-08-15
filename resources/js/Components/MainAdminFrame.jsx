import { useState } from "react";
function MainAdminFrame({ children, navItems }) {
    const [selectedNav, setSelectedNav] = useState(navItems[0]?.label);

    const handleNavClick = (label) => {
        setSelectedNav(label);
    };
    return (
        <div className="bg-[#EEEEEE] mt-2 border border-gray-400 rounded-xl grid grid-cols-1 divide-y divide-gray-400">
            <div className="grid grid-cols-8 gap-4">
                <div className="col-start-1 col-end-9 grid grid-cols-5 ">
                    {navItems.map((item, index) => (
                        <div
                            key={index}
                            className={`py-3 rounded-t-xl hover:bg-[#FFBC58] hover:text-black text-md flex justify-center cursor-pointer ${
                                selectedNav === item.label
                                    ? "border-b-2 border-[#FF9900] text-[#FF9900]"
                                    : ""
                            }`}
                            onClick={() => handleNavClick(item.label)}
                        >
                            {item.icon}
                            <div className="pl-2">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            {children}
        </div>
    );
}

export default MainAdminFrame;
