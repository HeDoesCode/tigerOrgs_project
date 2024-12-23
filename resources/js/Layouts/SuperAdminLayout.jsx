import IconExit from "@/Components/Icons/IconExit";
import Layout from "./Layout";
import { Link } from "@inertiajs/react";
import IconMenu3 from "@/Components/Icons/IconMenu3";
import IconList from "@/Components/Icons/IconList";
import IconHistory from "@/Components/Icons/IconHistory";
import IconDataUpload from "@/Components/Icons/IconDataUpload";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import IconSettings from "@/Components/Icons/IconSettings";
import IconBook2 from "@/Components/Icons/IconBook2";

function SuperAdminLayout({ children }) {
    const { url } = usePage();
    const routePath = (routeName) => new URL(route(routeName)).pathname;
    const currentPath = new URL(url, window.location.origin).pathname; // Combine with origin

    return (
        <Layout headerContent={<HeaderContent />} sidebar={<SideBarContent />}>
            {children}
        </Layout>
    );

    function HeaderContent() {
        const handleLogout = () => {
            Inertia.post("/logout");
        };

        return (
            <div className="flex-1 flex justify-end ">
                <button
                    onClick={handleLogout}
                    className="p-3 -m-3 hover:bg-gray-800 hover:text-white rounded-xl duration-300"
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
                        <img
                            src="/OSA logo.png"
                            alt="test"
                            className="bg-cover rounded-full"
                        />
                    </div>
                    <div className="text-center mr-3 font-bold text-xs leading-4 line-clamp-3 h-min my-auto w-32 overflow-clip">
                        <div className="w-32 min-w-32">
                            <span className="text-[0.65rem] text-slate-400">
                                (Superadmin)
                            </span>
                            <br />
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
                            currentPath === routePath("superadmin.status") ||
                            currentPath === routePath("superadmin.invite")
                        }
                    />
                    <SideBarLink
                        icon={<IconHistory size="100%" />}
                        href={route("superadmin.loginhistory")}
                        desc="Activity&nbsp;Log"
                        current={
                            currentPath ===
                                routePath("superadmin.loginhistory") ||
                            currentPath ===
                                routePath("superadmin.invitehistory")
                        }
                    />
                    <SideBarLink
                        icon={<IconDataUpload size="100%" />}
                        href={route("superadmin.dataupload")}
                        desc="Manage&nbsp;Data"
                        current={
                            currentPath ===
                                routePath("superadmin.dataupload") ||
                            currentPath === routePath("superadmin.filedownload")
                        }
                    />

                    <SideBarLink
                        icon={<IconSettings size="100%" />}
                        href={route("superadmin.settings")}
                        desc="Settings"
                        current={
                            currentPath === routePath("superadmin.settings")
                        }
                    />

                    <SideBarLink
                        icon={<IconBook2 size="100%" />}
                        href={route("superadmin.manual")}
                        desc="Manual"
                        current={currentPath === routePath("superadmin.manual")}
                    />
                </nav>
            </div>
        );

        function SideBarLink({ icon, href, desc, current }) {
            return (
                <div className="flex">
                    <Link
                        className={`flex items-center py-2 pl-3 rounded-l-full overflow-x-clip w-full ${
                            (current && "bg-[#FFBC58]") ||
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
