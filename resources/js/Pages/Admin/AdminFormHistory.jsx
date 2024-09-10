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
import IconEye from "@/Components/Icons/IconEye";
import AdminDialog from "@/Components/Admin/AdminDialog";

function AdminFormHistory({ orgID }) {
    return (
        <div className="w-full">
            <Head title="Admin Dashboard" />
            <AdminLayout orgID={orgID}>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconCheckBox />,
                            label: "Student Applications",
                            link: "admin.applications",
                            params: { orgID },
                        },
                        {
                            icon: <IconForms />,
                            label: "Recruitment Form",
                            link: "admin.forms",
                            params: { orgID },
                        },
                        {
                            icon: <IconHistory />,
                            label: "Form History",
                            link: "admin.formhistory",
                            params: { orgID },
                        },
                    ]}
                    title="Browse Previous Forms"
                >
                    <div className="p-5">
                        <VerticalCard gridcol="sm:grid-cols-5">
                            <div className="col-span-1">
                                <h1 className="ml-2  text-center font-semibold text-gray-500">
                                    Aug-15-2024
                                </h1>
                            </div>
                            <div className=" col-span-3">
                                <h1 className="ml-2  text-center">
                                    <span className="font-bold text-gray-500">
                                        Laurence Arcilla
                                    </span>{" "}
                                    <span className="text-gray-500 font-medium">
                                        created a Form.
                                    </span>
                                </h1>
                            </div>
                            <div className="col-span-1 flex justify-center text-gray-500">
                                <AdminDialog
                                    title="Form History"
                                    trigger={
                                        <div className="px-2">
                                            <IconEye />
                                        </div>
                                    }
                                ></AdminDialog>

                                <div className="px-2">
                                    <IconEdit />
                                </div>
                            </div>
                        </VerticalCard>
                    </div>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default AdminFormHistory;
