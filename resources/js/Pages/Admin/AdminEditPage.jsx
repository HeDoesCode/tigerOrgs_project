import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import VerticalCard from "@/Components/VerticalCard";
import IconInvite from "@/Components/Icons/IconInvite";
import IconDotsVertical from "@/Components/Icons/IconDotsVertical";

function AdminEditPage() {
    return (
        <div className="w-full">
            <Head title="Admin Dashboard" />
            <AdminLayout>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconCheckBox />,
                            label: "Edit Page",
                            link: "admin.editpage",
                        },
                        {
                            icon: <IconInvite />,
                            label: "Members",
                            link: "admin.invite",
                        },
                    ]}
                >
                    <div className="grid grid-rows-1 p-5 gap-2">
                        <VerticalCard gridcol="grid-cols-12">
                            <div className=" col-span-3 content-center">
                                <h1 className="ml-2 font-bold">
                                    Joseph Paduga
                                </h1>
                            </div>
                            <div className="col-span-3 content-center">
                                <h1 className="text-center">
                                    laurencearvin.arcila.cics@ust.edu.ph
                                </h1>
                            </div>
                            <div className="col-span-3 content-center">
                                <h1 className=" text-center text-sm">
                                    College of Information and Computing
                                    Sciences
                                </h1>
                            </div>
                            <div className="col-span-2 px-4 text-sm content-center ">
                                <h1 className=" text-center font-semibold rounded-xl bg-green-50 border-2 border-green-600 text-green-800">
                                    Assigned to 1 Org
                                </h1>
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <div className="hover:bg-[#EEEEEE]  rounded-full">
                                    <IconDotsVertical />
                                </div>
                            </div>
                        </VerticalCard>
                    </div>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default AdminEditPage;
