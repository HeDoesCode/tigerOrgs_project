import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconForms from "@/Components/Icons/IconForms";
import IconHistory from "@/Components/Icons/IconHistory";
import IconPlus from "@/Components/Icons/IconPlus";
import IconDelete from "@/Components/Icons/IconDelete";
import IconEdit from "@/Components/Icons/IconEdit";
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
} from "@/Components/ui/alert-dialog";

export function Index({ orgID, criteriaData }) {
    const handleDelete = (criteriaID) => {
        if (confirm("Are you sure you want to delete this?")) {
            router.delete(route("admin.criteria.destroy", [orgID, criteriaID]));
        }
    };

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
                        {
                            icon: <IconCheckBox />,
                            label: "Manage Criteria",
                            link: "admin.criteria.index",
                            params: { orgID },
                        },
                    ]}
                    title="Manage Criteria"
                >
                    <div className="p-5">
                        <div className="poppins mb-5">
                            <>
                                <span className="font-semibold">
                                    Information about the Criteria:
                                </span>
                                &nbsp; Specify all the requirements or skills
                                you expect applicants to possess. You have the
                                option to link this criteria to your chosen
                                forms and will serve as the basis for evaluating
                                applications. Each criterion will contribute to
                                a similarity score, making it easier to assess
                                how well an applicant's qualifications match
                                your expectations when reviewing applications
                                for a specific form.
                            </>
                        </div>
                        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-5 ">
                            <Link
                                href={route("admin.criteria.create", { orgID })}
                                className=" bg-white flex items-center justify-center rounded-lg hover:bg-gray-100 min-h-14 hover:scale-[1.03] transition-all duration-300 ease-in-out"
                            >
                                <div className="text-gray-500 bg-gray-200 size-8 p-1 rounded-full">
                                    <IconPlus />
                                </div>{" "}
                                <p className="text-black poppins ml-2">
                                    Create Criteria
                                </p>
                            </Link>

                            {criteriaData.map((criteria) => (
                                <AdminDropdownMenu
                                    key={criteria.criteriaID}
                                    triggerContent={
                                        <div
                                            className={` bg-white flex items-center justify-center rounded-lg hover:bg-gray-100 min-h-14 hover:scale-[1.03] transition-all duration-300 ease-in-out`}
                                        >
                                            <p className="text-black poppins ml-2 line-clamp-2">
                                                {criteria.name}
                                            </p>
                                        </div>
                                    }
                                    title="Select Action"
                                    dropdownItems={[
                                        {
                                            name: "Edit Criteria",
                                            onSelect: () =>
                                                router.get(
                                                    route(
                                                        "admin.criteria.edit",
                                                        [
                                                            criteria.orgID,
                                                            criteria.criteriaID,
                                                        ]
                                                    )
                                                ),
                                        },
                                        {
                                            name: (
                                                <AlertDialog>
                                                    <AlertDialogTrigger>
                                                        Delete Criteria
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Delete criteria
                                                                "{criteria.name}
                                                                " permanently?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action
                                                                cannot be
                                                                undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Cancel
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        criteria.criteriaID
                                                                    )
                                                                }
                                                            >
                                                                Continue
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            ),
                                            onSelect: (e) => e.preventDefault(),
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

export default Index;
