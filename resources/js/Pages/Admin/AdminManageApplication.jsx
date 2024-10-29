import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconForms from "@/Components/Icons/IconForms";
import IconHistory from "@/Components/Icons/IconHistory";
import DotsVertical from "@/Components/DotsVertical";
import AdminDialog from "@/Components/Admin/AdminDialog";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

function AdminManageApplication({ orgID, formsWithApplications }) {
    const [selectedFormId, setSelectedFormId] = useState(null);

    const handleFormSelect = (formId) => {
        setSelectedFormId(formId);
    };

    const selectedForm = formsWithApplications.find(
        (form) => form.formID === selectedFormId
    );
    const hasApplications = selectedForm?.applications?.length > 0;

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
                    title="Manage Student Applications"
                >
                    {formsWithApplications.length > 0 ? (
                        <div className="">
                            <div className="grid grid-cols-12 divide-x divide-gray-200">
                                <div className="col-span-2 mb-6">
                                    <div className="poppins p-5">
                                        Forms Available:
                                    </div>
                                    <div className="h-[500px] overflow-auto">
                                        {formsWithApplications.map((form) => (
                                            <ApplicationForms
                                                key={form.formID}
                                                formID={form.formID}
                                                name={form.formLayout?.name}
                                                applicationCount={
                                                    form.applications?.length ||
                                                    0
                                                }
                                                selected={
                                                    selectedFormId ===
                                                    form.formID
                                                }
                                                onSelect={() =>
                                                    handleFormSelect(
                                                        form.formID
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-10 min-h-[500px]">
                                    <div className="poppins">
                                        <h1 className="p-5">
                                            Application Responses for the form{" "}
                                            <span className="underline underline-offset-2">
                                                {selectedForm?.formLayout
                                                    ?.name || "Select a form"}
                                            </span>
                                            :
                                        </h1>
                                    </div>
                                    {selectedForm && hasApplications ? (
                                        <div className="min-h-[500px] h-[500px] overflow-auto">
                                            <table className="mr-3 bg-white divide-y min-h-[500px] rounded-r-xl divide-gray-200">
                                                <thead>
                                                    <tr className="lg:grid hidden font-bold grid-cols-9 py-4 text-center">
                                                        <th className="col-span-2 text-sm">
                                                            Full Name
                                                        </th>
                                                        <th className="col-span-2 text-sm">
                                                            College
                                                        </th>
                                                        <th className="col-span-2 text-sm">
                                                            Email
                                                        </th>
                                                        <th className="col-span-1 text-sm">
                                                            Date Submitted
                                                        </th>
                                                        <th className="col-span-1 text-sm">
                                                            Similarity Score
                                                        </th>
                                                        <th className="col-span-1 text-sm">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedForm.applications.map(
                                                        (application) => (
                                                            <ApplicationResponses
                                                                key={
                                                                    application.applicationID
                                                                }
                                                                application={
                                                                    application
                                                                }
                                                                orgID={orgID}
                                                                selectedFormId={
                                                                    selectedFormId
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="m-14 sm:m-48 text-xl text-gray-600 font-thin text-center">
                                            {selectedForm
                                                ? "No Responses Found"
                                                : "Select a form to view responses"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="m-14 sm:m-48 text-xl text-gray-600 font-thin text-center">
                                No Recruitment Form Found
                            </div>
                        </div>
                    )}
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

function ApplicationForms({
    formID,
    name,
    applicationCount,
    selected,
    onSelect,
}) {
    return (
        <div
            onClick={onSelect}
            className={`cursor-pointer p-4 rounded-l-xl text-sm ml-3 ${
                selected ? "bg-white" : ""
            } hover:bg-white flex justify-between items-center`}
        >
            <h1 className="font-extrabold">{name}</h1>
            <div className="ml-2 mr-2 rounded-full p-1 text-xs text-center font-bold bg-gray-300">
                {applicationCount}
            </div>
        </div>
    );
}

function ApplicationResponses({ application, orgID, selectedFormId }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });
    };

    // Now we can access user data through application.user
    const user = application.user;

    const [status, setStatus] = useState("accepted");

    const handleStatusValue = (value) => {
        setStatus(value);
    };

    const [message, setMessage] = useState("");

    const handleInputMessageValue = (value) => {
        setMessage(value);
    };

    const [selectedUser, setselectedUser] = useState(null);

    const handleUserSelect = (userId) => {
        setselectedUser(userId);
    };

    const [selectedApplicationId, setselectedApplicationId] = useState(null);

    const handleApplicationSelect = (applicationId) => {
        setselectedApplicationId(applicationId);
    };

    function handleStatusSubmit(e) {
        e.preventDefault();

        router.patch(
            route("admin.setStatus", orgID),
            {
                formID: selectedFormId,
                userID: selectedUser,
                applicationID: selectedApplicationId,
                orgID: orgID,
                status: status,
                message: message,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setStatus("accepted");
                    setMessage("");
                },
                onError: () => {
                    console.error("Save failed. Please try again.");
                },
            }
        );

        console.log(selectedApplicationId);
        console.log(status);
        console.log(selectedUser);
        console.log(orgID);
        console.log(message);
        console.log(selectedFormId);
    }

    return (
        <tr className="grid grid-cols-1 hover:bg-gray-100 lg:grid-cols-9 py-2 text-center min-h-16">
            <td className="lg:col-span-2 text-sm content-center">
                {user?.firstname} {user?.lastname}
            </td>
            <td className="lg:col-span-2 text-sm content-center">
                {user?.college}
            </td>
            <td className="lg:col-span-2 text-sm content-center truncate">
                {user?.email}
            </td>
            <td className="col-span-1 text-sm content-center">
                {formatDate(application.created_at)}
            </td>
            <td className="lg:col-span-1 px-4 text-sm content-center">
                <div className={`bg-[#609B00] rounded-xl text-white`}>
                    {/* palagay code  */}
                    90% Match
                </div>
            </td>
            <td className="col-span-1 text-sm grid grid-cols-2">
                <AdminDialog
                    title="Answer of the Applicant"
                    trigger={
                        <div className="underline content-center underline-offset-2">
                            View <span className="lg:hidden">Response</span>
                        </div>
                    }
                >
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">Applicant Details</h3>
                        <p>
                            <strong>Name:</strong> {user?.firstname}{" "}
                            {user?.lastname}
                        </p>
                        <p>
                            <strong>Email:</strong> {user?.email}
                        </p>
                        <p>
                            <strong>College:</strong> {user?.college}
                        </p>
                        <hr className="my-4" />
                        <h3 className="text-lg font-bold">
                            Application Answers
                        </h3>
                        <pre className="bg-gray-100 p-4 rounded">
                            {/* {JSON.stringify(application.userData, null, 2)} */}
                        </pre>
                    </div>
                </AdminDialog>

                <AdminDialog
                    title={`Set the Status for Applicant ${user?.firstname} ${user?.lastname}`}
                    trigger={
                        <DotsVertical
                            onClick={() => {
                                handleUserSelect(user?.userID);
                                handleApplicationSelect(
                                    application.applicationID
                                );
                            }}
                        />
                    }
                >
                    <form onSubmit={handleStatusSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">
                                Select a Status to be Set for this Application:
                            </label>
                            <Select
                                defaultValue={
                                    application.status === "submitted"
                                        ? "accepted"
                                        : application.status
                                }
                                onValueChange={handleStatusValue}
                            >
                                <SelectTrigger className="w-full h-12 mb border-gray-300 bg-transparent">
                                    <SelectValue placeholder="Set Status" />
                                </SelectTrigger>
                                <SelectContent className="border-gray-500 bg-[#EEEEEE] quicksand">
                                    <SelectItem value="accepted">
                                        Mark as Accepted
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        Mark as Pending
                                    </SelectItem>
                                    <SelectItem value="rejected">
                                        Mark as Rejected
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <label className="block text-sm font-bold text-gray-700">
                                Attach a Message/Reason:
                            </label>
                            <textarea
                                className="block w-full px-4 h-44 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder={
                                    status === "pending"
                                        ? "(This field is required)"
                                        : "(Optional)"
                                }
                                onChange={(e) =>
                                    handleInputMessageValue(e.target.value)
                                }
                            />
                        </div>

                        <div className="mt-4 grid justify-items-end">
                            <button
                                type="submit"
                                className="flex px-9 shadow-lg rounded-2xl bg-white hover:bg-gray-800 hover:text-white"
                            >
                                <span className="ml-2 poppins hidden truncate sm:block">
                                    Set Status
                                </span>
                            </button>
                        </div>
                    </form>
                </AdminDialog>
            </td>
        </tr>
    );
}

export default AdminManageApplication;
