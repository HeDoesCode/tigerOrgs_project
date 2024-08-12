import Layout from "./Layout";
import { Link, router } from "@inertiajs/react";
import IconBellFilled from "@/Components/Icons/IconBellFilled";
import IconProfile from "@/Components/Icons/IconProfile";
import IconMenu3 from "@/Components/Icons/IconMenu3";
import IconExit from "@/Components/Icons/IconExit";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import IconFacebookRoundFilled from "@/Components/Icons/IconFacebookRoundFilled";
import IconInstagram from "@/Components/Icons/IconInstagram";

function UserLayout({ children, bgImage }) {
    const footer_minHeight = "";

    return (
        <Layout headerContent={<HeaderContent />} bgImage={bgImage}>
            {children}
        </Layout>
    );

    function HeaderContent() {
        return (
            <nav className="flex-1">
                {/* content for large */}
                <ul className="hidden sm:flex justify-end items-center space-x-6 nunito font-extrabold">
                    <li className="text-[#E7A600]">
                        <Link className="contents" href="#home">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="contents" href="#organizations">
                            Organizations
                        </Link>
                    </li>
                    <li>
                        <HeaderDropdownMenu
                            triggerContent={"Status"}
                            dropdownContent={
                                <>
                                    <div>appplication 1</div>
                                    <div>appplication 1</div>
                                    <div>appplication 1</div>
                                    <div>appplication 1</div>
                                </>
                            }
                        />
                    </li>
                    <li className="flex items-center">
                        <div className="w-0 border-gray-400 border-r-[1px] h-5"></div>
                    </li>
                    <li>
                        <Notifications count="15" />
                    </li>
                    <li>
                        {/* <Link className='inline-block' href='#profilepage'><div className='p-3 -m-3 hover:bg-gray-800 hover:text-white rounded-xl'><IconProfile /></div></Link> */}
                        <HeaderDropdownMenu
                            triggerContent={
                                <div className="p-3 -m-3 hover:bg-gray-800 hover:text-white rounded-xl">
                                    <IconProfile />
                                </div>
                            }
                            dropdownContent={
                                <>
                                    <DDM_Link href="#profilepage">
                                        <IconProfile />
                                        <span>Profile</span>
                                    </DDM_Link>
                                    <DDM_Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        <IconExit />
                                        <span>Logout</span>
                                    </DDM_Link>
                                </>
                            }
                        />
                    </li>
                    {/* <IconExit /> */}
                </ul>

                {/* content for narrow */}
                <div className="flex w-full sm:hidden justify-end space-x-2">
                    <Notifications count="15" />
                    <HeaderDropdownMenu
                        triggerContent={
                            <div className="p-3 -m-3 hover:bg-gray-800 hover:text-white rounded-xl">
                                <IconMenu3 size="27" />
                            </div>
                        }
                        dropdownContent={
                            <>
                                <DDM_Link current>Home</DDM_Link>
                                <DDM_Link>Organizations</DDM_Link>
                                <div className="px-3">
                                    <DropdownMenuSeparator className="bg-gray-400" />
                                </div>
                                <DDM_Link href="#profilepage">
                                    <IconProfile />
                                    <span>Profile</span>
                                </DDM_Link>
                                <DDM_Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    <IconExit />
                                    <span>Logout</span>
                                </DDM_Link>
                            </>
                        }
                    />
                </div>
            </nav>
        );

        function DDM_Link({ children, className, href, current, onClick }) {
            return (
                <Link
                    href={href}
                    method="post"
                    as="button"
                    className={`p-2 space-x-2 hover:bg-gray-800 rounded-xl flex justify-center items-center ${
                        current
                            ? "font-bold text-[#ffbb10] hover:text-[#E7A600]"
                            : "hover:text-white"
                    } ${className}`}
                    onClick={onClick}
                >
                    {children}
                </Link>
            );
        }

        function Notifications({ count }) {
            return (
                <HeaderDropdownMenu
                    triggerContent={<NotificationsIcon count="25" size="24" />}
                    dropdownContent={
                        <>
                            <div>notif 1</div>
                            <div>notif 1</div>
                            <div>notif 1</div>
                            <div>notif 1</div>
                        </>
                    }
                />
            );

            function NotificationsIcon({ size, count }) {
                return (
                    <div className="relative">
                        <IconBellFilled size={size} />
                        <span className="absolute -right-1 -top-1 text-[0.6rem] rounded-full bg-red-600 size-4 flex justify-center items-center text-white font-normal">
                            {count}
                        </span>
                    </div>
                );
            }
        }

        function HeaderDropdownMenu({ triggerContent, dropdownContent }) {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center p-3 -m-3 hover:bg-gray-800 hover:text-white rounded-xl outline-none">
                        {triggerContent}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#f8f8f8] border-gray-300 flex flex-col justify-center space-y-2 p-2">
                        {dropdownContent}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
}

export default UserLayout;
