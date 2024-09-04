import Layout from "./Layout";
import { Link, router, usePage } from "@inertiajs/react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"


function UserLayout({ children, bgImage, noPadding }) {
    const footer_minHeight = "";
    const { url } = usePage();
    const routePath = (routeName) => new URL(route(routeName)).pathname;

    return (
        <Layout headerContent={<HeaderContent />} bgImage={bgImage} noPadding={noPadding} footer>
            {children}
        </Layout>
    );

    function HeaderContent() {
        return (
            <nav className="flex-1">
                {/* content for large */}
                <ul className="hidden sm:flex justify-end items-center space-x-6 nunito font-extrabold">
                    <li
                        className={
                            url === routePath("index")
                                ? "font-bold text-[#ffbb10]"
                                : ""
                        }
                    >
                        <Link
                            className={`block hover:text-white hover:bg-gray-800 p-3 -m-3 rounded-xl ${url === routePath("index")
                                ? "text-[#ffbb10] hover:text-[#E7A600]"
                                : ""
                                }`}
                            href={route("index")}
                        >
                            Home
                        </Link>
                    </li>

                    <li
                        className={
                            url === routePath("organizations")
                                ? "font-bold text-[#ffbb10]"
                                : ""
                        }
                    >
                        <Link
                            className={`block hover:text-white hover:bg-gray-800 p-3 -m-3 rounded-xl outline-none ${url === routePath("organizations")
                                ? "text-[#ffbb10]"
                                : ""
                                }`}
                            href={route("organizations")}
                        >
                            Organizations
                        </Link>
                    </li>

                    {/* <li
                        className={
                            url === "put the status route here"
                                ? "font-bold text-[#ffbb10] hover:text-[#E7A600]"
                                : "hover:text-white"
                        }
                    >
                        <HeaderDropdownMenu
                            triggerContent={"Status"}
                            dropdownContent={
                                // <>
                                //     <div>appplication 1</div>
                                //     <div>appplication 1</div>
                                //     <div>appplication 1</div>
                                //     <div>appplication 1</div>
                                // </>
                                <div className="oc w-72">
                                    <div>Application Status</div>
                                    <div className="flex flex-col">
                                        <div className="flex items-start">
                                            <div className="size-16 flex items-center justify-center">icon</div>
                                            <div className="flex flex-col">
                                                <div>title</div>
                                                <div>details</div>
                                                <div>buttons</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        />
                    </li> */}
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
                        >
                            <DDM_Link href={route('profile.edit')}>
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

                        </HeaderDropdownMenu>
                    </li>
                    {/* <IconExit /> */}
                </ul>

                {/* content for narrow */}
                <div className="flex w-full sm:hidden justify-end space-x-4">
                    <Notifications count="15" />
                    <HeaderDropdownMenu
                        triggerContent={
                            <div className="p-3 -m-3 hover:bg-gray-800 hover:text-white rounded-xl">
                                <IconMenu3 size="27" />
                            </div>
                        }
                    >
                        <DDM_Link
                            current={url === routePath("index")}
                        >
                            Home
                        </DDM_Link>
                        <DDM_Link
                            current={url === routePath("organizations")}
                        >
                            Organizations
                        </DDM_Link>
                        <div className="px-3">
                            <DropdownMenuSeparator className="bg-gray-400" />
                        </div>
                        <DDM_Link href={route('profile.edit')}>
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
                    </HeaderDropdownMenu>
                </div>
            </nav>
        );

        function DDM_Link({ children, className, href, current, onClick, ...props }) {
            return (
                <Link
                    href={href}
                    className={`p-2 space-x-2 hover:bg-gray-800 rounded-xl flex justify-center items-center ${current
                        ? "font-bold text-[#ffbb10] hover:text-[#E7A600]"
                        : "hover:text-white"
                        } ${className}`}
                    {...props}
                >
                    {children}
                </Link>
            );
        }

        function Notifications({ count }) {
            return (
                <HeaderDropdownMenu
                    triggerContent={<NotificationsIcon count={12 + 15} size="24" />}
                >
                    <Tabs defaultValue="notifications" className="w-96">
                        <TabsList className='flex items-center'>
                            <TabsTrigger value="notifications" className='data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg'>
                                <div className="relative">
                                    Notifications
                                    <span className="absolute -right-3 -top-1 text-[0.6rem] rounded-full bg-red-600 size-4 flex justify-center items-center text-white font-normal">
                                        12
                                    </span>
                                </div>
                            </TabsTrigger>
                            <TabsTrigger value="applications" className='data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg'>
                                <div className="relative">
                                    Applications
                                    <span className="absolute -right-3 -top-1 text-[0.6rem] rounded-full bg-red-600 size-4 flex justify-center items-center text-white font-normal">
                                        15
                                    </span>
                                </div>
                            </TabsTrigger>
                        </TabsList>
                        <div className="px-2">
                            <TabsContent value="notifications">
                                <div className="flex flex-col space-y-3 max-h-[20rem] overflow-y-auto">
                                    <div className="flex space-x-3">
                                        <div className="size-16 rounded-full overflow-clip min-w-16 min-h-16">
                                            <img src="https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/270248466_309421074524208_4699754745554854022_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFIX-PZOCvY39Ts0B0EZaYlyZODIdEpl6nJk4Mh0SmXqUmobdwUBHr2A_Cqb_c3ZRWCXgIJ2s0dEWz3NhEBe8Vb&_nc_ohc=gi9nCJxHWRkQ7kNvgH8Yjod&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYCZDAzaJMlBWPgXrJSuBI4lc7XbxXx3uHykIXWhLWwMRw&oe=66C8B8A4"
                                                alt=""
                                                className="size-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <div className="font-bold">TomasinoWeb</div>
                                                <div className="flex-1 flex flex-nowrap poppins text-[0.7rem] text-gray-500 ml-3 w-max">2 days ago</div>
                                            </div>
                                            <div className="poppins text-sm font-light mt-1">Mark Doe invites you as Admin for TomasinoWeb.</div>
                                            <div className="mt-2 flex flex-nowrap space-x-5 poppins text-xs text-white">
                                                <div className="px-8 py-2 bg-[#04AA6D] font-semibold rounded-full">Accept</div>
                                                <div className="px-8 py-2 bg-[#F44336] font-semibold rounded-full">Decline</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-3">
                                        <div className="size-16 rounded-full overflow-clip min-w-16 min-h-16">
                                            <img src="https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/270248466_309421074524208_4699754745554854022_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFIX-PZOCvY39Ts0B0EZaYlyZODIdEpl6nJk4Mh0SmXqUmobdwUBHr2A_Cqb_c3ZRWCXgIJ2s0dEWz3NhEBe8Vb&_nc_ohc=gi9nCJxHWRkQ7kNvgH8Yjod&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYCZDAzaJMlBWPgXrJSuBI4lc7XbxXx3uHykIXWhLWwMRw&oe=66C8B8A4"
                                                alt=""
                                                className="size-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <div className="font-bold">TomasinoWeb</div>
                                                <div className="flex-1 flex flex-nowrap poppins text-[0.7rem] text-gray-500 ml-3 w-max">2 days ago</div>
                                            </div>
                                            <div className="poppins text-sm font-light mt-1">Mark Doe invites you as Admin for TomasinoWeb.</div>
                                            <div className="mt-2 flex flex-nowrap space-x-5 poppins text-xs text-white">
                                                <div className="px-8 py-2 bg-[#04AA6D] font-semibold rounded-full">Accept</div>
                                                <div className="px-8 py-2 bg-[#F44336] font-semibold rounded-full">Decline</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-3">
                                        <div className="size-16 rounded-full overflow-clip min-w-16 min-h-16">
                                            <img src="https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/270248466_309421074524208_4699754745554854022_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFIX-PZOCvY39Ts0B0EZaYlyZODIdEpl6nJk4Mh0SmXqUmobdwUBHr2A_Cqb_c3ZRWCXgIJ2s0dEWz3NhEBe8Vb&_nc_ohc=gi9nCJxHWRkQ7kNvgH8Yjod&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYCZDAzaJMlBWPgXrJSuBI4lc7XbxXx3uHykIXWhLWwMRw&oe=66C8B8A4"
                                                alt=""
                                                className="size-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <div className="font-bold">TomasinoWeb</div>
                                                <div className="flex-1 flex flex-nowrap poppins text-[0.7rem] text-gray-500 ml-3 w-max">2 days ago</div>
                                            </div>
                                            <div className="poppins text-sm font-light mt-1">Mark Doe invites you as Admin for TomasinoWeb.</div>
                                            <div className="mt-2 flex flex-nowrap space-x-5 poppins text-xs text-white">
                                                <div className="px-8 py-2 bg-[#04AA6D] font-semibold rounded-full">Accept</div>
                                                <div className="px-8 py-2 bg-[#F44336] font-semibold rounded-full">Decline</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-3">
                                        <div className="size-16 rounded-full overflow-clip min-w-16 min-h-16">
                                            <img src="https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/270248466_309421074524208_4699754745554854022_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFIX-PZOCvY39Ts0B0EZaYlyZODIdEpl6nJk4Mh0SmXqUmobdwUBHr2A_Cqb_c3ZRWCXgIJ2s0dEWz3NhEBe8Vb&_nc_ohc=gi9nCJxHWRkQ7kNvgH8Yjod&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYCZDAzaJMlBWPgXrJSuBI4lc7XbxXx3uHykIXWhLWwMRw&oe=66C8B8A4"
                                                alt=""
                                                className="size-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <div className="font-bold">TomasinoWeb</div>
                                                <div className="flex-1 flex flex-nowrap poppins text-[0.7rem] text-gray-500 ml-3 w-max">2 days ago</div>
                                            </div>
                                            <div className="poppins text-sm font-light mt-1">Mark Doe invites you as Admin for TomasinoWeb.</div>
                                            <div className="mt-2 flex flex-nowrap space-x-5 poppins text-xs text-white">
                                                <div className="px-8 py-2 bg-[#04AA6D] font-semibold rounded-full">Accept</div>
                                                <div className="px-8 py-2 bg-[#F44336] font-semibold rounded-full">Decline</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="applications">
                                <div className="flex flex-col space-y-3 max-h-[20rem] overflow-y-auto">
                                    <div className="flex space-x-3">
                                        <div className="size-16 rounded-full overflow-clip min-w-16 min-h-16">
                                            <img src="https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/270248466_309421074524208_4699754745554854022_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFIX-PZOCvY39Ts0B0EZaYlyZODIdEpl6nJk4Mh0SmXqUmobdwUBHr2A_Cqb_c3ZRWCXgIJ2s0dEWz3NhEBe8Vb&_nc_ohc=gi9nCJxHWRkQ7kNvgH8Yjod&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYCZDAzaJMlBWPgXrJSuBI4lc7XbxXx3uHykIXWhLWwMRw&oe=66C8B8A4"
                                                alt=""
                                                className="size-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <div className="font-bold">TomasinoWeb</div>
                                                <div className="flex-1 flex flex-nowrap poppins text-[0.7rem] text-gray-500 ml-3 w-max">2 days ago</div>
                                            </div>
                                            <div className="mt-2 flex flex-nowrap space-x-5 poppins text-xs text-white">
                                                <div className="px-8 py-2 bg-[#04AA6D] font-semibold rounded-full">View</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-3">
                                        <div className="size-16 rounded-full overflow-clip min-w-16 min-h-16">
                                            <img src="https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/270248466_309421074524208_4699754745554854022_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFIX-PZOCvY39Ts0B0EZaYlyZODIdEpl6nJk4Mh0SmXqUmobdwUBHr2A_Cqb_c3ZRWCXgIJ2s0dEWz3NhEBe8Vb&_nc_ohc=gi9nCJxHWRkQ7kNvgH8Yjod&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYCZDAzaJMlBWPgXrJSuBI4lc7XbxXx3uHykIXWhLWwMRw&oe=66C8B8A4"
                                                alt=""
                                                className="size-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <div className="font-bold">TomasinoWeb</div>
                                                <div className="flex-1 flex flex-nowrap poppins text-[0.7rem] text-gray-500 ml-3 w-max">2 days ago</div>
                                            </div>
                                            <div className="mt-2 flex flex-nowrap space-x-5 poppins text-xs text-white">
                                                <div className="px-8 py-2 bg-[#04AA6D] font-semibold rounded-full">View</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-3">
                                        <div className="size-16 rounded-full overflow-clip min-w-16 min-h-16">
                                            <img src="https://scontent.fmnl30-2.fna.fbcdn.net/v/t39.30808-1/270248466_309421074524208_4699754745554854022_n.jpg?stp=dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeFIX-PZOCvY39Ts0B0EZaYlyZODIdEpl6nJk4Mh0SmXqUmobdwUBHr2A_Cqb_c3ZRWCXgIJ2s0dEWz3NhEBe8Vb&_nc_ohc=gi9nCJxHWRkQ7kNvgH8Yjod&_nc_ht=scontent.fmnl30-2.fna&oh=00_AYCZDAzaJMlBWPgXrJSuBI4lc7XbxXx3uHykIXWhLWwMRw&oe=66C8B8A4"
                                                alt=""
                                                className="size-full object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center">
                                                <div className="font-bold">TomasinoWeb</div>
                                                <div className="flex-1 flex flex-nowrap poppins text-[0.7rem] text-gray-500 ml-3 w-max">2 days ago</div>
                                            </div>
                                            <div className="mt-2 flex flex-nowrap space-x-5 poppins text-xs text-white">
                                                <div className="px-8 py-2 bg-[#04AA6D] font-semibold rounded-full">View</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </TabsContent>
                        </div>
                    </Tabs>
                </HeaderDropdownMenu>
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

        function HeaderDropdownMenu({ triggerContent, children }) {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center p-3 -m-3 hover:bg-gray-800 hover:text-white rounded-xl outline-none">
                        {triggerContent}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#f8f8f8] border-gray-300 flex flex-col justify-center space-y-2 p-2">
                        {children}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    }
}

export default UserLayout;
