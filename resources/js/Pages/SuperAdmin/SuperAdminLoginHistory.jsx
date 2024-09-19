import MainAdminFrame from "@/Components/MainAdminFrame";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import { Head } from "@inertiajs/react";
import IconInvite from "@/Components/Icons/IconInvite";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconDotsVertical from "@/Components/Icons/IconDotsVertical";
import VerticalCard from "@/Components/VerticalCard";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import Pre from "@/Components/Pre";

export default function SuperAdminLoginHistory({ login_entries }) {
    // const []

    return (
        <div className="w-full">
            <Head title="OSA Dashboard" />
            <SuperAdminLayout>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconCheckBox />,
                            label: "Login History",
                            link: "superadmin.loginhistory",
                        },
                        {
                            icon: <IconInvite />,
                            label: "Invite History",
                            link: "superadmin.invitehistory",
                        },
                    ]}
                    title="Activity Log"
                >
                    {/* <Pre object={login_entries} /> */}
                    <div className="grid grid-rows-1 p-5 gap-2">
                        {login_entries.map((entry, index) => {
                            return (
                                <VerticalCard gridcol="sm:grid-cols-7" key={index}>
                                    <div className=" col-span-1 ">
                                        <h1 className="ml-2  text-center font-semibold text-gray-500">
                                            {entry.login_date}
                                            {/* Aug-15-2024 */}
                                        </h1>
                                    </div>
                                    <div className=" col-span-5 ">
                                        <h1 className="ml-2  text-center">
                                            <span className="font-bold text-gray-500">
                                                {`${entry.firstname} ${entry.lastname}`}
                                            </span>{" "}
                                            <span className="text-gray-500 font-medium">
                                                accessed the Super Admin Dashboard
                                            </span>
                                        </h1>
                                    </div>
                                    <div className=" col-span-1 ">
                                        <h1 className="ml-2 text-center font-semibold text-gray-500">
                                            {entry.login_time}
                                        </h1>
                                    </div>
                                </VerticalCard>
                            )
                        })}
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}
