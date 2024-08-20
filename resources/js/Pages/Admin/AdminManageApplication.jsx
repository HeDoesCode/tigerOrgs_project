import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import VerticalCard from "@/Components/VerticalCard";
import IconInvite from "@/Components/Icons/IconInvite";
import IconDotsVertical from "@/Components/Icons/IconDotsVertical";
import Home from "../Organizations/Home";
import IconEdit from "@/Components/Icons/IconEdit";
import IconForms from "@/Components/Icons/IconForms";
import IconHistory from "@/Components/Icons/IconHistory";
import DotsVertical from "@/Components/DotsVertical";

function AdminManageApplication() {
    return (
        <div className="w-full">
            <Head title="Admin Dashboard" />
            <AdminLayout>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconCheckBox />,
                            label: "Student Applications",
                            link: "admin.applications",
                        },
                        {
                            icon: <IconForms />,
                            label: "Recruitment Form",
                            link: "admin.forms",
                        },
                        {
                            icon: <IconHistory />,
                            label: "Form History",
                            link: "admin.formhistory",
                        },
                    ]}
                    title="Manage Student Applications"
                >
                    <div className="p-5">
                        <div className="poppins">Positions Available:</div>
                        <div className="bg-[#EEEEEE] mt-2 border min-h-24 p-4 border-gray-400 rounded-xl flex flex-wrap ">
                            <div className="mb-5 flex items-center">
                                <input
                                    type="radio"
                                    name="position"
                                    value="President"
                                    defaultChecked
                                    className="ml-5 mr-2 "
                                    style={{}}
                                />
                                <h1>President</h1>
                                <div className="ml-2 mr-2 rounded-full p-1 text-sm text-center  font-bold bg-gray-300">
                                    21
                                </div>
                            </div>
                        </div>

                        <div className="poppins mt-5">
                            Application Responses for position{" "}
                            <span className="underline underline-offset-2">
                                President
                            </span>
                            :
                        </div>

                        <div className="bg-[#EEEEEE] mt-2 border divide-y  divide-gray-400  border-gray-400 rounded-xl   ">
                            <div className="grid grid-cols-9 py-2 text-center font-medium">
                                <div className="col-span-2 ">Full Name</div>
                                <div className="col-span-2">College</div>
                                <div className="col-span-2">Email</div>
                                <div className="col-span-1">Date Submitted</div>
                                <div className="col-span-1">
                                    Similarity Score
                                </div>
                                <div className="col-span-1">Actions</div>
                            </div>
                            <div className="grid grid-cols-9 py-2 text-center min-h-16">
                                <div className="col-span-2 content-center">
                                    Laurence Arvin Arcilla
                                </div>
                                <div className="col-span-2 content-center ">
                                    College of Information and Computing
                                    Sciences
                                </div>
                                <div className="col-span-2 content-center">
                                    laurencearvin.arcilla.cics@ust.edu.ph
                                </div>
                                <div className="col-span-1 content-center">
                                    Aug-13-2024
                                </div>
                                <div className="col-span-1 px-4 content-center">
                                    <div
                                        className={`bg-[#609B00] rounded-xl text-white`}
                                    >
                                        50% Match
                                    </div>
                                </div>
                                <div className="col-span-1 grid grid-cols-2">
                                    <div className="underline content-center underline-offset-2">
                                        View
                                    </div>
                                    <DotsVertical />
                                </div>
                            </div>
                        </div>
                    </div>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default AdminManageApplication;
