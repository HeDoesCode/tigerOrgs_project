import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import VerticalCard from "@/Components/VerticalCard";
import IconInvite from "@/Components/Icons/IconInvite";
import IconDotsVertical from "@/Components/Icons/IconDotsVertical";
import IconAdmin from "@/Components/Icons/IconAdmin";
import IconEdit from "@/Components/Icons/IconEdit";
import IconDelete from "@/Components/Icons/IconDelete";
import IconProfile from "@/Components/Icons/IconProfile";
import IconPosition from "@/Components/Icons/IconPosition";
import IconDepartment from "@/Components/Icons/IconDepartment";
import IconEmail from "@/Components/Icons/IconEmail";

function AdminInvite() {
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
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 p-5">
                        <div className="p-3 w-full bg-white rounded-xl">
                            <div className="flex justify justify-between mb-4">
                                <div className="bg-[#FF9900] p-1 px-4 rounded-2xl flex justify-between">
                                    <IconAdmin />
                                    <div className="ml-2">Admin</div>
                                </div>
                                <div className="flex">
                                    <div className="mx-1 text-gray-500">
                                        <IconEdit />
                                    </div>
                                    <div className="mx-1 text-gray-500">
                                        <IconDelete />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-5 mb-1">
                                <div className="col-span-1 grid content-center justify-self-center text-gray-500">
                                    <IconProfile />
                                </div>
                                <div className="col-span-4 text-xl font-bold">
                                    Roshe Sapin
                                </div>
                            </div>

                            <div className="grid grid-cols-5 mb-1">
                                <div className="col-span-1 grid content-center justify-self-center text-gray-500">
                                    <IconPosition />
                                </div>
                                <div className="col-span-4 text-lg font-semibold">
                                    President
                                </div>
                            </div>

                            <div className="grid grid-cols-5 mb-1">
                                <div className="col-span-1 grid content-center justify-self-center text-gray-500">
                                    <IconDepartment />
                                </div>
                                <div className="col-span-4 text-md ">
                                    College of Information and Computing
                                    Sciences (CICS)
                                </div>
                            </div>

                            <div className="grid grid-cols-5 mb-1">
                                <div className="col-span-1 grid content-center justify-self-center text-gray-500">
                                    <IconEmail />
                                </div>
                                <div className="col-span-4 text-md ">
                                    roshe.sapin.cics@ust.edu.ph
                                </div>
                            </div>
                        </div>
                    </div>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default AdminInvite;
