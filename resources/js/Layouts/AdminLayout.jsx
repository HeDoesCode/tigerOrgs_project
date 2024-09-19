import IconExit from "@/Components/Icons/IconExit";
import Layout from "./Layout";
import { Link, usePage } from "@inertiajs/react";
import IconUserSearch from "@/Components/Icons/IconUserSearch";
import IconFolder from "@/Components/Icons/IconFolder";
import { useState } from "react";
import IconMenu3 from "@/Components/Icons/IconMenu3";
import IconList from "@/Components/Icons/IconList";
import IconHistory from "@/Components/Icons/IconHistory";
import IconFolderCog from "@/Components/Icons/IconFolderCog";
import IconOrg from "@/Components/Icons/IconOrg";
import SideBar from "@/Components/ui/Custom/SideBar";
import axios from "axios";
import { useEffect } from "react";

function AdminLayout({ orgID, children }) {
    const { orgLogo, orgName } = usePage().props;
    const { url } = usePage();
    return (
        <Layout headerContent={<HeaderContent />} sidebar={<SideBarContent />}>
            {children}
        </Layout>
    );

    function HeaderContent() {
        return (
            <div className="flex-1 flex justify-end">
                <Link
                    href={route("organizations")}
                    className="p-3 -m-3 hover:bg-gray-800 hover:text-white rounded-xl"
                >
                    <IconExit size="27" />
                </Link>
            </div>
        );
    }

    function SideBarContent() {
        // const [current, setCurrent] = useState(route().current());
        return (
            <div className="border-gray-300 border-r-[1px] fixed -left-16 hover:left-0 sm:left-0 top-0 bottom-0 min-w-16 w-0 sm:w-16 max-w-52 flex flex-col justify-center bg-[#EEEEEE] transition-all ease-in-out duration-300 group hover:w-52 hover:bg-[#FEFEFE] overflow-clip">
                <button className="fixed size-16 left-0 top-0 flex sm:hidden items-center justify-center cursor-default">
                    <IconMenu3 size="27" />
                </button>
                <div className="flex z-10">
                    <div
                        className={`min-h-16 min-w-16 size-16 flex items-center justify-center p-2`}
                    >
                        <img
                            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPhcNkJ7-IxlXnLfMbPwT4l1LROZeDmxoO3A&s"
                            src={orgLogo}
                            alt="test"
                            className="bg-cover rounded-full"
                        />
                    </div>
                    <div className="text-center mr-3 font-bold text-xs leading-4 line-clamp-3 h-min my-auto w-32 overflow-clip">
                        <div className="w-32 min-w-32">
                            {/* Placeholder Society of Information Technology
                            Enthusiasts (SITE) */}
                            {orgName}
                        </div>
                    </div>
                </div>
                <nav className="flex-1 flex flex-col space-y-3 ml-2 my-2 transition-all group-hover:mr-0 ease-in-out duration-300">
                    <SideBarLink
                        icon={<IconFolderCog size="100%" />}
                        href={route("admin.editpage", {
                            orgID,
                        })}
                        desc="Manage"
                        current={["admin.editpage", "admin.invite"].includes(
                            route().current()
                        )}
                    />
                    <SideBarLink
                        icon={<IconOrg size="100%" />}
                        href={route("admin.applications", {
                            orgID,
                        })}
                        desc="Recruitment"
                        current={[
                            "admin.applications",
                            "admin.forms",
                            "admin.formbuilder",
                            "admin.formhistory",
                        ].includes(route().current())}
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

export default AdminLayout;
