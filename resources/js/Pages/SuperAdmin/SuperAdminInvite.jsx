import MainAdminFrame from "@/Components/MainAdminFrame";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import { Head } from "@inertiajs/react";
import IconInvite from "@/Components/Icons/IconInvite";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconDotsVertical from "@/Components/Icons/IconDotsVertical";
import VerticalCard from "@/Components/VerticalCard";
import AdminButton from "@/Components/Admin/AdminButton";
import IconBellFilled from "@/Components/Icons/IconBellFilled";
import DotsVertical from "@/Components/DotsVertical";

function SuperAdminInvite() {
    return (
        <div className="w-full">
            <Head title="OSA Dashboard" />
            <SuperAdminLayout>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconCheckBox />,
                            label: "Status",
                            link: "superadmin.status",
                        },
                        {
                            icon: <IconInvite />,
                            label: "Invite",
                            link: "superadmin.invite",
                        },
                    ]}
                    title="Role Invitation"
                >
                    <div>
                        <div className="flex justify-end me-5 mt-5">
                            <AdminButton
                                className="mr-2 bg-gray-300 hover:bg-white"
                                icon={<IconInvite />}
                                name="Assign"
                            />
                        </div>
                        <div className="grid grid-rows-1 p-5 gap-2">
                            <VerticalCard gridcol="grid-cols-12">
                                <div className=" col-span-3 content-center">
                                    <h1 className="ml-2 font-bold">
                                        Joseph Paduga
                                    </h1>
                                </div>
                                <div className="col-span-3 content-center">
                                    <h1 className="text-center font-semibold text-gray-500">
                                        laurencearvin.arcila.cics@ust.edu.ph
                                    </h1>
                                </div>
                                <div className="col-span-3 content-center">
                                    <h1 className=" text-center text-sm font-semibold text-gray-500">
                                        College of Information and Computing
                                        Sciences
                                    </h1>
                                </div>
                                <div className="col-span-2 px-4 text-sm content-center ">
                                    <h1 className=" text-center font-semibold rounded-xl poppins bg-green-50 border-2 border-green-600 text-green-800">
                                        Assigned to 1 Org
                                    </h1>
                                </div>
                                <DotsVertical />
                            </VerticalCard>
                        </div>
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}

export default SuperAdminInvite;
