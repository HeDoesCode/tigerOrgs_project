import { Head, Link } from "@inertiajs/react";
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
import { Button } from "@/Components/ui/button";
import IconPlus from "@/Components/Icons/IconPlus";
import AdminDropdownMenu from "@/Components/Admin/AdminDropdownMenu";

function AdminManageForms({ orgID }) {
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
                    title="Manage Recruitment Form"
                >
                    <div className="p-5">
                        <div className="poppins mb-5">
                            <span className="font-semibold">
                                Recruitment is now open.
                            </span>{" "}
                            You may now deploy a Recruitment Form for{" "}
                            <span className="font-semibold">
                                Society of Information Technology Enthusiasts
                                (SITE).
                            </span>{" "}
                            You can also browse history of forms from previous
                            year{" "}
                            <span className="text-[#FF9900]">
                                <Link
                                    href={route("admin.formhistory", { orgID })}
                                >
                                    here.
                                </Link>
                            </span>
                        </div>
                        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-5">
                            <Link
                                href={route("admin.formbuilder", { orgID })}
                                className=" bg-white flex items-center justify-center rounded-lg hover:bg-gray-100 min-h-14 hover:scale-[1.03] transition-all duration-300 ease-in-out"
                            >
                                <div className="text-gray-500 bg-gray-200 size-8 p-1 rounded-full">
                                    <IconPlus />
                                </div>{" "}
                                <p className="text-black poppins ml-2">
                                    Create Form
                                </p>
                            </Link>

                            <AdminDropdownMenu
                                triggerContent={
                                    <div className="bg-white flex items-center justify-center rounded-lg hover:bg-gray-100 min-h-14 hover:scale-[1.03] transition-all duration-300 ease-in-out">
                                        <p className="text-black poppins ml-2">
                                            Recruitment Form 1
                                        </p>
                                    </div>
                                }
                                title="Select Action"
                                dropdownItems={[
                                    {
                                        name: "Edit Form",
                                        value: "editform",
                                    },
                                    {
                                        name: "Delete Form",
                                        value: "deleteform",
                                    },
                                    {
                                        name: "Disable Criteria",
                                        value: "disablecriteria",
                                    },
                                    {
                                        name: "Deploy Form",
                                        value: "deployform",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default AdminManageForms;
