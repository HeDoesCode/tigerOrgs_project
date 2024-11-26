import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconForms from "@/Components/Icons/IconForms";
import IconHistory from "@/Components/Icons/IconHistory";
import IconStars from "@/Components/Icons/IconStars";
import MainAdminFrame from "@/Components/MainAdminFrame";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";

function Create({ orgID }) {
    const { data, setData, post, errors } = useForm({
        name: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("admin.criteria.store", [orgID]), data);
    };

    return (
        <div className="w-full">
            <Head title="Admin Dashboard" />
            <AdminLayout orgID={orgID}>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconForms />,
                            label: "Recruitment Form",
                            link: "admin.forms",
                            params: { orgID },
                        },
                        {
                            icon: <IconStars />,
                            label: "Manage Criteria",
                            link: "admin.criteria.index",
                            params: { orgID },
                        },
                        {
                            icon: <IconCheckBox />,
                            label: "Student Applications",
                            link: "admin.applications",
                            params: { orgID },
                        },
                    ]}
                    title="Create Criteria"
                >
                    <div className=" bg-white min-h-screen ">
                        <div className="flex flex-col justify-center m-4 p-4 max-w-3xl mx-auto rounded-xl">
                            <h1 className="font-semibold text-3xl mb-4 px-2 text-center">
                                Create Criteria
                            </h1>
                            <form
                                action=""
                                method="POST"
                                className="bg-whiterounded"
                                onSubmit={handleSubmit}
                            >
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
                                    className="w-full bg-transparent rounded-xl border-[1.5px] border-x-stone-600 mb-4 p-2"
                                    placeholder="Position title..."
                                    required
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
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
                                    className="w-full bg-transparent rounded-xl border-[1.5px] h-96 border-x-stone-600 mb-2"
                                    placeholder="Describe the criteria that the candidate must possess..."
                                    required
                                    value={data.description}
                                    onChange={(e) => {
                                        setData("description", e.target.value);
                                    }}
                                ></textarea>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="submit"
                                        className="bg-[#04aa6dd5] hover:bg-[#04AA6D] text-white font-medium text-lg transition ease-in-out duration-300 w-fit text-right px-4 py-1 border rounded-full"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default Create;
