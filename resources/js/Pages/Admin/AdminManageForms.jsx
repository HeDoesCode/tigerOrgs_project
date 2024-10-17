import { Head, Link, router } from "@inertiajs/react";
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
import AdminDropdownMenu from "@/Components/Admin/AdminInvDropdownMenu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"


function AdminManageForms({ orgID, orgName, forms }) {
    // console.log(forms)
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
                            </span>&nbsp;
                            You may now deploy a Recruitment Form for&nbsp;
                            <span className="font-semibold">
                                {/* Society of Information Technology Enthusiasts
                                (SITE). */}
                                {orgName}.
                            </span>&nbsp;
                            You can also browse history of forms from previous
                            year&nbsp;
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

                            {forms.map((item, index) => (
                                <AdminDropdownMenu
                                    key={index}
                                    triggerContent={
                                        <div className="bg-white flex items-center justify-center rounded-lg hover:bg-gray-100 min-h-14 hover:scale-[1.03] transition-all duration-300 ease-in-out">
                                            <p className="text-black poppins ml-2 line-clamp-2">
                                                {item.formLayout.name}
                                            </p>
                                        </div>
                                    }
                                    title="Select Action"
                                    dropdownItems={[
                                        {
                                            name: "Edit Form",
                                            onSelect: () => router.get(route('admin.formbuilder.edit', [orgID, item.formID])),
                                            // onSelect: () => console.log('test'),
                                        },
                                        {
                                            name: (
                                                <AlertDialog>
                                                    <AlertDialogTrigger>Delete Form</AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete form "{item.formLayout.name}" permanently?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => router.delete(route('admin.formbuilder.delete', [orgID, item.formID]))}
                                                            >
                                                                Continue
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            ),
                                            onSelect: (e) => e.preventDefault(),
                                        },
                                        {
                                            name: "Disable Criteria",
                                            onSelect: () => null,
                                        },
                                        {
                                            name: "Deploy Form",
                                            onSelect: () => null,
                                        },
                                    ]}
                                />
                            ))}
                        </div>
                    </div>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default AdminManageForms;
