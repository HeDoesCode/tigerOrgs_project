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

export default function SuperAdminInviteHistory() {
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
                >
                    <div className="grid grid-rows-1 p-5 gap-2">
                        <VerticalCard gridcol="grid-cols-7">
                            <div className=" col-span-1 ">
                                <h1 className="ml-2  text-center">
                                    Aug-15-2024
                                </h1>
                            </div>
                            <div className=" col-span-3 ">
                                <h1 className="ml-2  text-center">
                                    <span className="font-bold">
                                        Ethan Catacutan
                                    </span>{" "}
                                    invited{" "}
                                    <span className="font-bold">
                                        Laurence Arcilla
                                    </span>{" "}
                                    as <span className="font-bold">Admin</span>
                                </h1>
                            </div>
                            <div className=" col-span-2 ">
                                <h1 className="ml-2 text-center">
                                    College of Architecture
                                </h1>
                            </div>
                            <div className=" col-span-1 ">
                                <h1 className="ml-2 text-center">1:04 PM</h1>
                            </div>
                        </VerticalCard>
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}
