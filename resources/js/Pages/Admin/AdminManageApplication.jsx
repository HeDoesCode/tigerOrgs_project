import { Head, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconForms from "@/Components/Icons/IconForms";
import IconHistory from "@/Components/Icons/IconHistory";
import DotsVertical from "@/Components/DotsVertical";
import AdminDialog from "@/Components/Admin/AdminDialog";
import { useEffect } from "react";

import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import RenderFormItem from "@/Components/Forms/Form-Renderer/RenderFormItem";
import RenderFormItemAnswers from "@/Components/Forms/Form-Renderer/RenderFormItemAnswers";
import IconStars from "@/Components/Icons/IconStars";

function AdminManageApplication({ orgID, formsWithApplications }) {
    const [selectedFormId, setSelectedFormId] = useState(null);

    const handleFormSelect = (formId) => {
        setSelectedFormId(formId);
    };

    const selectedForm = formsWithApplications.find(
        (form) => form.formID === selectedFormId
    );
    const hasApplications = selectedForm?.applications?.length > 0;

    function handleSubmit(e) {
        e.preventDefault();
        router.post(`/admin/${orgID}/categorizeApplications/${selectedFormId}`);
    }

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
                    title="Manage Student Applications"
                >
                    {formsWithApplications.length > 0 ? (
                        <div className="">
                            <div className="grid grid-cols-1 md:grid-cols-12 divide-x divide-gray-200">
                                <div className="col-span-5 md:col-span-3 mb-6">
                                    <div className="hidden sm:block poppins p-5">
                                        Available Forms:
                                    </div>
                                    <div className="hidden sm:block h-[500px] overflow-auto">
                                        {formsWithApplications.map((form) => (
                                            <ApplicationForms
                                                key={form.formID}
                                                formID={form.formID}
                                                criteriaID={form.criteriaID}
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

                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="text-left p-5 flex sm:hidden">
                                                Forms Available
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <ul className="bg-transparent flex flex-col pt-2 rounded-md space-y-1">
                                                    {formsWithApplications.map(
                                                        (form) => (
                                                            <ApplicationForms
                                                                key={
                                                                    form.formID
                                                                }
                                                                formID={
                                                                    form.formID
                                                                }
                                                                criteriaID={
                                                                    form.criteriaID
                                                                }
                                                                name={
                                                                    form
                                                                        .formLayout
                                                                        ?.name
                                                                }
                                                                applicationCount={
                                                                    form
                                                                        .applications
                                                                        ?.length ||
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
                                                        )
                                                    )}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>

                                <div className="col-span-1 md:col-span-9 grid-cols-1 min-h-[500px]">
                                    <div className="poppins col-span-1 flex justify-between">
                                        <h1 className="p-5">
                                            Application Responses for the form{" "}
                                            <span className="underline underline-offset-2">
                                                {selectedForm?.formLayout
                                                    ?.name || "Select a form"}
                                            </span>
                                            :
                                        </h1>
                                        {console.log(formsWithApplications)}
                                        {selectedFormId === null ? (
                                            ""
                                        ) : (
                                            <form
                                                onSubmit={handleSubmit}
                                                className="py-4"
                                            >
                                                <button
                                                    type="submit"
                                                    className="mr-2 py-1 bg-white flex px-5  shadow-lg rounded-2xl hover:bg-gray-800 hover:text-white ease-in-out duration-300 "
                                                >
                                                    Run ATS Analysis
                                                </button>
                                            </form>
                                        )}
                                    </div>

                                    {selectedForm && hasApplications ? (
                                        <div className="grid grid-cols-1 min-h-[500px] h-[500px] overflow-auto">
                                            <table className="mr-5 ml-5 sm:ml-0 sm:mr-3 bg-white divide-y min-h-[500px] rounded-r-xl rounded-l-xl sm:rounded-r-xl sm:rounded-l-none divide-gray-200">
                                                <thead>
                                                    <tr className="hidden sm:grid grid-cols-1  sm:grid-cols-9 py-4 text-center ">
                                                        <th className="col-span-1 sm:col-span-2 text-sm">
                                                            Full Name
                                                        </th>
                                                        <th className="col-span-1 sm:col-span-2 text-sm">
                                                            Affiliation
                                                        </th>
                                                        <th className="col-span-1 sm:col-span-2 text-sm">
                                                            Email
                                                        </th>
                                                        <th
                                                            className={`${
                                                                selectedForm
                                                                    .formLayout
                                                                    .criteria ===
                                                                ""
                                                                    ? "col-span-2 sm:col-span-2"
                                                                    : "col-span-1 sm:col-span-1"
                                                            } text-sm`}
                                                        >
                                                            Date Submitted
                                                        </th>
                                                        {selectedForm.formLayout
                                                            .criteria === "" ? (
                                                            ""
                                                        ) : (
                                                            <th className="col-span-1 sm:col-span-1 text-sm">
                                                                Similarity Score
                                                            </th>
                                                        )}

                                                        <th className="col-span-1 sm:col-span-1 text-sm">
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
                                                                criteria={
                                                                    selectedForm
                                                                        .formLayout
                                                                        .criteria
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
    criteriaID,
    name,
    applicationCount,
    selected,
    onSelect,
}) {
    return (
        <div
            onClick={onSelect}
            className={`cursor-pointer p-4 text-sm mr-5 ml-5 sm:mr-0 sm:ml-3 ${
                selected ? "bg-white" : ""
            } hover:bg-white flex justify-between items-center rounded-l-xl rounded-r-xl sm:rounded-r-none sm:rounded-l-xl`}
        >
            <h1 className="font-extrabold">{name}</h1>
            <div className="ml-2 mr-2 rounded-full p-1 text-xs text-center font-bold bg-gray-300">
                {applicationCount}
            </div>
        </div>
    );
}

function ApplicationResponses({
    criteria,
    application,
    orgID,
    selectedFormId,
}) {
    const { errors } = usePage().props;
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });
    };

    const user = application.user;
    const isMember = application.isMember;

    const [status, setStatus] = useState("");

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

    const parseUserData = () => {
        if (!application?.userData) return null;

        try {
            // If it's already an object, return it as is
            if (typeof application.userData === "object") {
                return application.userData;
            }

            // If it's a string, parse it
            return JSON.parse(application.userData);
        } catch (error) {
            console.error("Error parsing userData:", error);
            return null;
        }
    };

    const userData = parseUserData();

    if (!userData || !userData.layout) {
        return (
            <div className="p-4 text-sm text-yellow-800 bg-yellow-50 rounded-lg">
                No response data available
            </div>
        );
    }

    const [openStatusDialog, setOpenStatusDialog] = useState(false);

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
                    setOpenStatusDialog(false);
                    setMessage("");
                },
                onError: () => {
                    console.error("Save failed. Please try again.");
                },
            }
        );
    }

    return (
        <tr className="grid grid-cols-1 hover:bg-gray-100 sm:grid-cols-9 py-2 text-center min-h-16">
            <td className="col-span-1 sm:col-span-2 text-sm content-center">
                {user?.firstname} {user?.lastname}
            </td>
            <td className="col-span-1 sm:col-span-2 text-sm content-center">
                {user?.college}
            </td>
            <td className="col-span-1 sm:col-span-2 text-sm content-center truncate">
                {user?.email}
            </td>

            <td
                className={`${
                    criteria === ""
                        ? "col-span-1 sm:col-span-2"
                        : "col-span-1 sm:col-span-1"
                } text-sm content-center`}
            >
                {formatDate(application.created_at)}
            </td>
            {criteria === "" ? (
                ""
            ) : (
                <td className="col-span-1 sm:col-span-1 px-4 text-sm content-center">
                    <div
                        className={`bg-gray-500 rounded-xl text-white px-2 py-1`}
                    >
                        {application.similarityScore !== null
                            ? `${application.similarityScore}%`
                            : "Not yet graded"}
                    </div>
                </td>
            )}

            {!isMember ? (
                application.status === "accepted" ? (
                    <td className="col-span-1  px-2  grid-cols-1 text-sm font-bold grid content-center justify-self-center sm:grid-cols-1">
                        <div className="bg-green-400 px-4 py-1 text-black rounded-xl">
                            Accepted
                        </div>
                    </td>
                ) : application.status === "rejected" ? (
                    <td className="col-span-1  px-2  grid-cols-1 text-sm font-bold grid content-center justify-self-center sm:grid-cols-1">
                        <div className="bg-red-400 px-4 py-1 text-black rounded-xl ">
                            Rejected
                        </div>
                    </td>
                ) : (
                    <td className="sm:col-span-1 grid-cols-2 text-sm grid sm:grid-cols-2">
                        <div className="col-span-1 sm:col-span-1 content-center justify-self-center">
                            <AdminDialog
                                title="Answer of the Applicant"
                                trigger={
                                    <div className=" justify-self-center underline content-center underline-offset-2">
                                        View{" "}
                                        <span className="sm:hidden">
                                            Response
                                        </span>
                                    </div>
                                }
                            >
                                <div className="space-y-4">
                                    <h3 className="text-md font-bold">
                                        Applicant Details
                                    </h3>
                                    <p>
                                        <strong>Name:</strong> {user?.firstname}{" "}
                                        {user?.lastname}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {user?.email}
                                    </p>
                                    <p>
                                        <strong>College:</strong>{" "}
                                        {user?.college}
                                    </p>
                                    <hr className="my-4" />
                                    <h3 className="text-lg font-bold">
                                        Application Answers
                                    </h3>
                                    <div className="px-6 py-8">
                                        <h1 className="text-3xl font-bold  text-gray-900 mb-6">
                                            {userData.name}
                                        </h1>
                                        {application.userData.desc && (
                                            <p className="text-gray-600  mb-8">
                                                {userData.desc}
                                            </p>
                                        )}

                                        {Object.keys(errors).length > 0 && (
                                            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                                                <div className="flex">
                                                    <div className="flex-shrink-0">
                                                        <svg
                                                            className="h-5 w-5 text-red-400"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="ml-3">
                                                        <h3 className="font-medium text-red-800">
                                                            There were errors
                                                            with your submission
                                                        </h3>
                                                        <ul className="mt-2 text-red-700 list-disc list-inside">
                                                            {Object.keys(
                                                                errors
                                                            ).map(
                                                                (
                                                                    error,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {
                                                                            errors[
                                                                                error
                                                                            ]
                                                                        }
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <ul className="space-y-6">
                                            {userData.layout.map(
                                                (item, index) => (
                                                    <RenderFormItemAnswers
                                                        key={index}
                                                        item={item}
                                                        orgID={orgID}
                                                        applicationID={
                                                            application.applicationID
                                                        }
                                                    />
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </AdminDialog>
                        </div>

                        <div className="col-span-1 sm:col-span-1 content-center justify-self-center">
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
                                open={openStatusDialog}
                                onOpenChange={(open) =>
                                    setOpenStatusDialog(open)
                                }
                            >
                                <form
                                    onSubmit={handleStatusSubmit}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700">
                                            Select a Status to be Set for this
                                            Application:
                                        </label>
                                        <Select
                                            required
                                            onValueChange={handleStatusValue}
                                        >
                                            <SelectTrigger className="w-full h-12 mb border-gray-300 bg-transparent">
                                                <SelectValue placeholder="Select a Status" />
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
                                                handleInputMessageValue(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="mt-4 grid justify-items-end">
                                        <button
                                            type="submit"
                                            className="flex px-9 shadow-lg rounded-2xl bg-white hover:bg-gray-800 hover:text-white"
                                        >
                                            <span className="ml-2 poppins truncate sm:block">
                                                Set Status
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </AdminDialog>
                        </div>
                    </td>
                )
            ) : (
                <td className="col-span-1  px-2  grid-cols-1 text-sm font-bold grid content-center justify-self-center sm:grid-cols-1">
                    <div className="bg-[#FFBC58] px-4 py-1 text-black rounded-xl ">
                        Member
                    </div>
                </td>
            )}
        </tr>
    );
}

export default AdminManageApplication;
