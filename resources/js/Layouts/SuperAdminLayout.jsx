import IconExit from "@/Components/Icons/IconExit";
import Layout from "./Layout";
import { Link } from "@inertiajs/react";
import IconUserSearch from "@/Components/Icons/IconUserSearch";
import IconFolder from "@/Components/Icons/IconFolder";
import { useState } from "react";
import IconMenu3 from "@/Components/Icons/IconMenu3";
import IconList from "@/Components/Icons/IconList";
import IconHistory from "@/Components/Icons/IconHistory";
import IconDataUpload from "@/Components/Icons/IconDataUpload";

function SuperAdminLayout({ children }) {
    return (
        <Layout headerContent={<HeaderContent />} sidebar={<SideBarContent />}>
            {children}
        </Layout>
    );

    function HeaderContent() {
        return (
            <div className="flex-1 flex justify-end">
                <Link
                    href="#userpage"
                    className="p-3 -m-3 hover:bg-gray-800 hover:text-white rounded-xl"
                >
                    <IconExit size="27" />
                </Link>
            </div>
        );
    }

    function SideBarContent() {
        const [test, setTest] = useState("-ml-16 sm:ml-0");
        // console.log(test)
        return (
            <div
                className={`border-gray-300 border-r-[1px] fixed left-0 ${test} top-0 bottom-0 min-w-16 w-0 sm:w-16 max-w-52 flex flex-col justify-center bg-[#EEEEEE] transition-all ease-in-out duration-300 group hover:w-52 hover:bg-[#FEFEFE]`}
            >
                <button
                    onFocus={() => setTest("-ml-0")}
                    onBlur={() => setTest("-ml-16 sm:ml-0")}
                    className="fixed block sm:hidden left-0 top-0 size-16"
                >
                    <div className="p-3 flex items-center justify-center">
                        <IconMenu3 size="27" />
                    </div>
                </button>
                <div className="flex z-10">
                    <div
                        className={`min-h-16 min-w-16 size-16 flex items-center justify-center p-2`}
                    >
                        {/* logo */}
                        {/* <IconMenu3 size='27' /> */}
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPhcNkJ7-IxlXnLfMbPwT4l1LROZeDmxoO3A&s"
                            alt="test"
                            className="bg-cover rounded-full"
                        />
                    </div>
                    <p className="text-center mr-3 font-bold text-xs leading-4 line-clamp-3 h-min my-auto w-full">
                        Office for Student Affairs
                    </p>
                </div>
                <nav className="flex-1 flex flex-col space-y-3 m-2 transition-all group-hover:mr-0 ease-in-out duration-300">
                    <SideBarLink
                        icon={<IconList size="100%" />}
                        href="#managepage"
                        desc="Organizations"
                        current
                    />
                    <SideBarLink
                        icon={<IconHistory size="100%" />}
                        href="#recruitmentpage"
                        desc="Activity&nbsp;Log"
                    />
                    <SideBarLink
                        icon={<IconDataUpload size="100%" />}
                        href="#recruitmentpage"
                        desc="Data&nbsp;Upload"
                    />
                </nav>
            </div>
        );

        function SideBarLink({ icon, href, desc, current }) {
            return (
                <div
                    className={`flex pl-[0.6rem] transition-all ease-in-out duration-300 p-2 group-hover:pl-5 group-hover:rounded-r-none rounded-full ${
                        (current && "bg-[#FFBC58]") ||
                        "hover:bg-gray-800 hover:text-white"
                    }`}
                >
                    <Link className="contents" href={href}>
                        <div className="min-h-7 min-w-7 size-7">{icon}</div>
                        <div className="text-left pl-3 text-lg overflow-hidden h-min my-auto w-full">
                            {desc}
                        </div>
                    </Link>
                </div>
            );
        }
    }
}

export default SuperAdminLayout;
