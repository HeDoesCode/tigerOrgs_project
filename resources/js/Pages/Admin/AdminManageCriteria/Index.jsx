import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconForms from "@/Components/Icons/IconForms";
import IconHistory from "@/Components/Icons/IconHistory";
import IconPlus from "@/Components/Icons/IconPlus";
import IconDelete from "@/Components/Icons/IconDelete";
import IconEdit from "@/Components/Icons/IconEdit";

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
                    <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-5 p-5">
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
                    </div>
                    <div className="p-5">
                        <h1 className="mb-4">
                            Created Positions and Qualifications
                        </h1>
                        <ul>
                            {criteriaData.map((criteria) => {
                                return (
                                    <li
                                        key={criteria.criteriaID}
                                        className="p-5 mb-3 rounded bg-white grid grid-cols-12 gap-3"
                                    >
                                        <div className="grid grid-cols-subgrid col-span-10 align-middle items-center">
                                            {criteria.name}
                                        </div>
                                        <a
                                            href={route("admin.criteria.edit", [
                                                criteria.orgID,
                                                criteria.criteriaID,
                                            ])}
                                        >
                                            <button className="bg-green-600 w-full p-2 rounded hover:bg-green-700 text-white text-lg flex justify-center items-center gap-x-2">
                                                <IconEdit /> Edit
                                            </button>
                                        </a>
                                        <button
                                            className="bg-red-500 w-fill p-2 rounded hover:bg-red-600 text-white text-lg flex justify-center items-center gap-x-2"
                                            onClick={() =>
                                                handleDelete(
                                                    criteria.criteriaID
                                                )
                                            }
                                        >
                                            <IconDelete /> Delete
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default Index;
