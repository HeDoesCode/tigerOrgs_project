import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconForms from "@/Components/Icons/IconForms";
import IconHistory from "@/Components/Icons/IconHistory";
import MainAdminFrame from "@/Components/MainAdminFrame";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, router, useForm } from "@inertiajs/react";

function Edit({ orgID, criteriaData }) {
    const { data, setData, put, errors } = useForm({
        name: criteriaData.name,
        description: criteriaData.description,
    });

    const handleCancel = () => {
        setData({
            name: criteriaData.name,
            description: criteriaData.description,
        });
        router.get(route("admin.criteria.index", [orgID]));
    };

    const handleReset = () => {
        if (confirm("Are you sure you want to revert changes?")) {
            setData({
                name: criteriaData.name,
                description: criteriaData.description,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        put(
            route("admin.criteria.update", [orgID, criteriaData.criteriaID]),
            data
        );
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
                    title="Create Criteria"
                >
                    <form
                        action=""
                        method="POST"
                        className="bg-white p-6 rounded"
                        onSubmit={handleSubmit}
                    >
                        <ul>
                            <li className="mb-4">
                                <label htmlFor="name" className="block">
                                    Name<span className="text-red-600">*</span>{" "}
                                    {errors.name ? (
                                        <span className="text-red-600">
                                            {errors.name}
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full block rounded"
                                    placeholder="Position title..."
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                            </li>
                            <li className="mb-4">
                                <label htmlFor="desc" className="block">
                                    Description
                                    <span className="text-red-600">*</span>{" "}
                                    {errors.description ? (
                                        <span className="text-red-600">
                                            {errors.description}
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </label>
                                <textarea
                                    name=""
                                    id="desc"
                                    className="w-full h-96 rounded"
                                    placeholder="Describe the criteria that the candidate must possess..."
                                    value={data.description}
                                    onChange={(e) => {
                                        setData("description", e.target.value);
                                    }}
                                ></textarea>
                            </li>
                            <li className="mb-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium text-lg transition ease-in-out duration-300 w-fit text-right px-4 py-1 border rounded-full"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium text-lg transition ease-in-out duration-300 w-fit text-right px-4 py-1 border rounded-full"
                                >
                                    Reset Changes
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#04aa6dd5] hover:bg-[#04AA6D] text-white font-medium text-lg transition ease-in-out duration-300 w-fit text-right px-4 py-1 border rounded-full"
                                >
                                    Save Changes
                                </button>
                            </li>
                        </ul>
                    </form>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default Edit;
