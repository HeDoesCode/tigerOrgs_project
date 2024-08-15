import MainAdminFrame from "@/Components/MainAdminFrame";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import IconInvite from "@/Components/Icons/IconInvite";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconDotsVertical from "@/Components/Icons/IconDotsVertical";

function SuperAdminInvite() {
    return (
        <div className="w-full">
            <Head title="OSA Dashboard" />
            <AdminLayout>
                <MainAdminFrame
                    navItems={[
                        { icon: <IconCheckBox />, label: "Status" },
                        { icon: <IconInvite />, label: "Invite" },
                    ]}
                >
                    <div className="grid grid-rows-1 p-5 gap-2">
                        <div className="p-4 grid grid-cols-10 rounded-xl bg-white divide-x divide-gray-300">
                            <div className=" col-span-2 content-center">
                                <h1 className="ml-2 font-bold">
                                    Joseph Paduga
                                </h1>
                            </div>
                            <div className="col-span-3 content-center">
                                <h1 className="text-center">
                                    laurencearvin.arcila.cics@ust.edu.ph
                                </h1>
                            </div>
                            <div className="col-span-2 content-center">
                                <h1 className=" text-center text-sm">
                                    College of Information and Computing
                                    Sciences
                                </h1>
                            </div>
                            <div className="col-span-2 px-4 text-sm content-center ">
                                <h1 className="py-1 text-center font-semibold rounded-xl bg-green-50 border-2 border-green-600 text-green-800">
                                    Assigned to 1 Org
                                </h1>
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <div className="bg-[#EEEEEE] p-2 rounded-full">
                                    <IconDotsVertical />
                                </div>
                            </div>
                        </div>
                    </div>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default SuperAdminInvite;
