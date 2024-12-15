import MainAdminFrame from "@/Components/MainAdminFrame";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import { Head } from "@inertiajs/react";
import IconInvite from "@/Components/Icons/IconInvite";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import VerticalCard from "@/Components/VerticalCard";
import CustomPagination from "@/Components/CustomPagination";

export default function SuperAdminInviteHistory({ inviteEntries }) {
    console.log(inviteEntries);
    return (
        <div className="w-full">
            <Head title="Invite History" />
            <SuperAdminLayout>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconInvite />,
                            label: "Login History",
                            link: "superadmin.loginhistory",
                        },
                        {
                            icon: <IconCheckBox />,
                            label: "Invite History",
                            link: "superadmin.invitehistory",
                        },
                    ]}
                    title="Admin Invite History"
                >
                    <div className="grid grid-rows-1 p-5 gap-2">
                        {inviteEntries?.data?.length > 0 ? (
                            inviteEntries.data.map((entry, index) => (
                                <VerticalCard gridcol="sm:grid-cols-7" key={index}>
                                    {/* Invite date */}
                                    <div className="col-span-1">
                                        <h1 className="ml-2 text-center font-semibold text-gray-500">
                                            {entry.invite_date}
                                        </h1>
                                    </div>
                                    {/* Invite details */}
                                    <div className="col-span-5">
                                        <h1 className="ml-2 text-center ">
                                            <span className="font-bold text-gray-500">
                                                {entry.inviter_firstname} {entry.inviter_lastname}
                                            </span>{" "}
                                            invited{" "}
                                            <span className="font-bold text-gray-500">
                                                {entry.invited_firstname} {entry.invited_lastname}
                                            </span>{" "}
                                            to join{" "}
                                            <span className="font-medium text-gray-500">
                                                {entry.name}
                                            </span>
                                        </h1>
                                    </div>
                                    {/* Invite time */}
                                    <div className="col-span-1">
                                        <h1 className="ml-2 text-center font-semibold text-gray-500">
                                            {entry.invite_time}
                                        </h1>
                                    </div>
                                </VerticalCard>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No invite entries found.</p>
                        )}
                        <div className="h-10 w-full">
                            <div className="fixed w-screen bottom-0 left-0 right-0 pl-8 sm:pl-24 pr-10 pb-3 flex justify-center">
                                <CustomPagination page={inviteEntries} />
                            </div>
                        </div>
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}
