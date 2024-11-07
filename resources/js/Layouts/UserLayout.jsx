import Layout from "./Layout";
import { Link, router, usePage } from "@inertiajs/react";
import IconBellFilled from "@/Components/Icons/IconBellFilled";
import IconProfile from "@/Components/Icons/IconProfile";
import IconMenu3 from "@/Components/Icons/IconMenu3";
import IconExit from "@/Components/Icons/IconExit";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

dayjs.extend(relativeTime);

function UserLayout({ children, bgImage, noPadding }) {
    const { url } = usePage();
    const routePath = (routeName) => new URL(route(routeName)).pathname;

    return (
        <Layout
            headerContent={<HeaderContent />}
            bgImage={bgImage}
            noPadding={noPadding}
            footer
        >
            {children}
        </Layout>
    );

    function HeaderContent() {
        const { props } = usePage();
        const { unreadNotificationsCount: initialCount, notifications } = props;
        const [count, setCount] = useState(initialCount);

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
                            className={`block hover:text-white hover:bg-gray-800 p-3 -m-3 rounded-xl ${
                                url === routePath("index")
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
                            className={`block hover:text-white hover:bg-gray-800 p-3 -m-3 rounded-xl outline-none ${
                                url === routePath("organizations")
                                    ? "text-[#ffbb10]"
                                    : ""
                            }`}
                            href={route("organizations")}
                        >
                            Organizations
                        </Link>
                    </li>

                    <li className="flex items-center">
                        <div className="w-0 border-gray-400 border-r-[1px] h-5"></div>
                    </li>
                    <li>
                        <Notifications
                            unreadNotificationsCount={count}
                            setUnreadNotificationsCount={setCount}
                            notifications={notifications}
                        />
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
                            <DDM_Link
                                href={route("profile.edit")}
                                current={url === routePath("profile.edit")}
                            >
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
                    <Notifications
                        unreadNotificationsCount={count}
                        setUnreadNotificationsCount={setCount}
                        notifications={notifications}
                    />
                    <HeaderDropdownMenu
                        triggerContent={
                            <div className="p-3 -m-3 hover:bg-gray-800 hover:text-white rounded-xl">
                                <IconMenu3 size="27" />
                            </div>
                        }
                    >
                        <DDM_Link
                            current={url === routePath("index")}
                            href={route("index")}
                        >
                            Home
                        </DDM_Link>
                        <DDM_Link
                            current={url === routePath("organizations")}
                            href={route("organizations")}
                        >
                            Organizations
                        </DDM_Link>
                        <div className="px-3">
                            <DropdownMenuSeparator className="bg-gray-400" />
                        </div>
                        <DDM_Link
                            current={url === routePath("profile.edit")}
                            href={route("profile.edit")}
                        >
                            <IconProfile />
                            <span>Profile</span>
                        </DDM_Link>
                        <DDM_Link
                            current={url === routePath("logout")}
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

        function DDM_Link({
            children,
            className,
            href,
            current,
            onClick,
            ...props
        }) {
            return (
                <Link
                    href={href}
                    className={`p-2 space-x-2 hover:bg-gray-800 rounded-xl flex justify-center items-center ${
                        current
                            ? "font-bold text-[#ffbb10] hover:text-[#E7A600]"
                            : "hover:text-white"
                    } ${className}`}
                    {...props}
                >
                    {children}
                </Link>
            );
        }

        function Notifications({
            unreadNotificationsCount: initialCount,
            notifications: initialNotifications = [],
            setUnreadNotificationsCount,
        }) {
            const [notifications, setNotifications] =
                useState(initialNotifications);
            const [count, setCount] = useState(initialCount);
            const { auth } = usePage().props;

            useEffect(() => {
                if (!auth || !auth.user) {
                    console.log("No user is authenticated or available.");
                    return;
                }

                const fetchNotifications = async () => {
                    try {
                        const response = await axios.get(
                            route("notifications.fetch")
                        ); // Replace with your fetch route
                        setNotifications(response.data.notifications); // Adjust according to your response structure
                        setCount(response.data.unreadCount); // Adjust according to your response structure
                        setUnreadNotificationsCount(response.data.unreadCount); // Update parent state
                    } catch (error) {}
                };

                fetchNotifications();

                const intervalId = setInterval(() => {
                    fetchNotifications();
                }, 5000);

                // Clean up the interval on unmount
                return () => clearInterval(intervalId);
            }, [auth, setUnreadNotificationsCount]);

            const markAllAsRead = async () => {
                try {
                    console.log("Marked as read");
                    await axios.post(route("notifications.markAllRead"));
                    setCount(0);
                    setUnreadNotificationsCount(0);
                } catch (error) {
                    console.error("Error marking notifications as read", error);
                }
            };

            return (
                <HeaderDropdownMenu
                    triggerContent={
                        <NotificationsIcon count={count} size="24" />
                    }
                    rootProps={{
                        onOpenChange: (open) => {
                            if (!open) {
                                markAllAsRead();
                            }
                        },
                        // open: true
                    }}
                >
                    <Tabs defaultValue="notifications" className="w-96">
                        <TabsList className="flex items-center">
                            <TabsTrigger
                                value="notifications"
                                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg"
                            >
                                <div className="relative">
                                    Notifications
                                    {count > 0 ? (
                                        <span className="absolute -right-3 -top-1 text-[0.6rem] rounded-full bg-red-600 size-4 flex justify-center items-center text-white font-normal">
                                            {count}
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </TabsTrigger>
                            <TabsTrigger
                                value="applications"
                                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-lg"
                            >
                                <div className="relative">Applications</div>
                            </TabsTrigger>
                        </TabsList>

                        <div className="px-2">
                            <TabsContent value="notifications">
                                <div className="flex flex-col gap-y-5 max-h-[20rem] overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map(
                                            (notification, index) =>
                                                notification ? (
                                                    notification.data.orgID ? (
                                                        notification.data
                                                            .recruiting ? (
                                                            <Link
                                                                href={route(
                                                                    "organizations.home",
                                                                    {
                                                                        id: notification
                                                                            .data
                                                                            .orgID,
                                                                    }
                                                                )}
                                                                key={index}
                                                                className="flex space-x-3"
                                                            >
                                                                <NotificationItem
                                                                    notification={
                                                                        notification
                                                                    }
                                                                />
                                                            </Link>
                                                        ) : (
                                                            <Link
                                                                href={route(
                                                                    "admin.editpage",
                                                                    {
                                                                        id: notification
                                                                            .data
                                                                            .orgID,
                                                                    }
                                                                )}
                                                                key={index}
                                                                className="flex space-x-3"
                                                            >
                                                                <NotificationItem
                                                                    notification={
                                                                        notification
                                                                    }
                                                                />
                                                            </Link>
                                                        )
                                                    ) : (
                                                        <Dialog key={index}>
                                                            <DialogTrigger>
                                                                <div
                                                                    key={index}
                                                                    className="flex space-x-3"
                                                                >
                                                                    <NotificationItem
                                                                        notification={
                                                                            notification
                                                                        }
                                                                    />
                                                                </div>
                                                            </DialogTrigger>
                                                            <DialogContent className="w-fit p-10">
                                                                <DialogHeader>
                                                                    <DialogTitle className="text-center ">
                                                                        {
                                                                            notification
                                                                                .data
                                                                                .org_name
                                                                        }{" "}
                                                                        Announcement
                                                                    </DialogTitle>
                                                                    <DialogDescription className="hidden"></DialogDescription>
                                                                </DialogHeader>
                                                                <div
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: notification
                                                                            .data
                                                                            .message,
                                                                    }}
                                                                />
                                                            </DialogContent>
                                                        </Dialog>
                                                    )
                                                ) : null
                                        )
                                    ) : (
                                        <p>No notifications available.</p>
                                    )}
                                </div>
                            </TabsContent>
                            <TabsContent value="applications">
                                <ApplicationNotifications />
                            </TabsContent>
                        </div>
                    </Tabs>
                </HeaderDropdownMenu>
            );

            function NotificationItem({ notification }) {
                return (
                    <>
                        <div className="size-16 rounded-full overflow-clip min-w-16 min-h-16">
                            <img
                                src={`/storage/logo/${notification.data.org_logo}`}
                                alt=""
                                className="size-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col text-left">
                            <div className="font-bold text-sm leading-4 line-clamp-2">
                                {notification.data.org_name}
                            </div>
                            <div
                                className="poppins line-clamp-2 text-sm font-light mt-1"
                                dangerouslySetInnerHTML={{
                                    __html: notification.data.message, // Renders the HTML, including <br />
                                }}
                            ></div>
                            <div className="poppins text-[0.7rem] text-gray-500 leading-3 mt-2">
                                {dayjs(notification.created_at).fromNow()}
                            </div>
                        </div>
                    </>
                );
            }

            function NotificationsIcon({ size, count }) {
                return (
                    <div className="relative">
                        <IconBellFilled size={size} />
                        {count > 0 ? (
                            <span className="absolute -right-1 -top-1 text-[0.6rem] rounded-full bg-red-600 size-4 flex justify-center items-center text-white font-normal">
                                {count}
                            </span>
                        ) : (
                            ""
                        )}
                    </div>
                );
            }
        }

        function HeaderDropdownMenu({ triggerContent, children, rootProps }) {
            return (
                <DropdownMenu {...rootProps}>
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

    function ApplicationNotifications() {
        const { applications } = usePage().props;

        const getStatusColor = (status) => {
            switch (status) {
                case "accepted":
                    return "bg-green-500";
                case "rejected":
                    return "bg-red-500";
                case "pending":
                    return "bg-yellow-500";
                default:
                    return "bg-blue-500";
            }
        };

        const getStatusText = (status) => {
            switch (status) {
                case "accepted":
                    return "Accepted";
                case "rejected":
                    return "Rejected";
                case "pending":
                    return "Under Review";
                default:
                    return "Submitted";
            }
        };

        return (
            <div className="flex flex-col space-y-3 max-h-[20rem] overflow-y-auto">
                {applications.length > 0 ? (
                    applications.map((application) => (
                        <div
                            key={application.applicationID}
                            className="flex space-x-3"
                        >
                            <div className="size-16 rounded-full overflow-clip min-w-16 min-h-16">
                                <img
                                    src={`/storage/logo/${application.organization.logo}`}
                                    alt={application.organization.name}
                                    className="size-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="flex items-center justify-between">
                                    <div className="font-bold text-sm">
                                        {application.organization.name}
                                    </div>
                                </div>
                                <div className="poppins line-clamp-2 text-sm font-light mt-1">
                                    Current status of your application:{" "}
                                    {application.form}
                                    {console.log(application)}
                                </div>
                                <div className="mt-1 flex flex-nowrap space-x-5 poppins text-xs text-white">
                                    <div
                                        // href={route("applications.view", {
                                        //     id: application.applicationID,
                                        // })}
                                        className={`px-8 py-2 ${getStatusColor(
                                            application.status
                                        )} font-semibold rounded-full  transition-opacity`}
                                    >
                                        {getStatusText(application.status)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-4 text-gray-500">
                        No applications found.
                    </div>
                )}
            </div>
        );
    }
}

export default UserLayout;
