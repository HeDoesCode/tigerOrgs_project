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
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

function SuperAdminLayout({ children }) {
    const { url } = usePage();
    const routePath = (routeName) => new URL(route(routeName)).pathname;
    return (
        <Layout headerContent={<HeaderContent />} sidebar={<SideBarContent />}>
            {children}
        </Layout>
    );

    function HeaderContent() {

        const handleLogout = () => {
            Inertia.post('/logout');
        };

        return (
            <div className="flex-1 flex justify-end">
                <button
                    onClick={handleLogout}
                    className="p-3 -m-3 hover:bg-gray-800 hover:text-white rounded-xl"
                >
                    <IconExit size="27" />
                </button>
            </div>
        );
    }

    function SideBarContent() {
        return (
            <div className="border-gray-300 border-r-[1px] fixed -left-16 hover:left-0 sm:left-0 top-0 bottom-0 min-w-16 w-0 sm:w-16 max-w-52 flex flex-col justify-center bg-[#EEEEEE] transition-all ease-in-out duration-300 group hover:w-52 hover:bg-[#FEFEFE] overflow-clip">
                <button className="fixed size-16 left-0 top-0 flex sm:hidden items-center justify-center cursor-default">
                    <IconMenu3 size="27" />
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
                    <div className="text-center mr-3 font-bold text-xs leading-4 line-clamp-3 h-min my-auto w-32 overflow-clip">
                        <div className="w-32 min-w-32">
                            Office for Student Affairs
                        </div>
                    </div>
                </div>
                <nav className="flex-1 flex flex-col space-y-3 ml-2 my-2 transition-all group-hover:mr-0 ease-in-out duration-300">
                    <SideBarLink
                        icon={<IconList size="100%" />}
                        href={route("superadmin.status")}
                        desc="Organizations"
                        current={
                            url === routePath("superadmin.status") ||
                            url === routePath("superadmin.invite")
                        }
                    />
                    <SideBarLink
                        icon={<IconHistory size="100%" />}
                        href={route("superadmin.loginhistory")}
                        desc="Activity&nbsp;Log"
                        current={
                            url === routePath("superadmin.loginhistory") ||
                            url === routePath("superadmin.invitehistory")
                        }
                    />
                    <SideBarLink
                        icon={<IconDataUpload size="100%" />}
                        href={route("superadmin.dataupload")}
                        desc="Data&nbsp;Upload"
                        current={url === routePath("superadmin.dataupload")}
                    />
                </nav>
            </div>
        );

        function SideBarLink({ icon, href, desc, current }) {
            return (
                <div className="flex">
                    <Link
                        className={`flex items-center py-2 pl-3 rounded-l-full overflow-x-clip w-full ${(current && "bg-[#FFBC58]") ||
                            "hover:bg-gray-800 hover:text-white"
                            }`}
                        href={href}
                    >
                        <div className="min-h-7 min-w-7 size-7">{icon}</div>
                        <div className="text-left poppins text-lg overflow-hidden h-min w-full invisible group-hover:visible ml-3 transition-all">
                            {desc}
                        </div>
                    </Link>
                </div>
            );
        }
    }
}

export default SuperAdminLayout;
