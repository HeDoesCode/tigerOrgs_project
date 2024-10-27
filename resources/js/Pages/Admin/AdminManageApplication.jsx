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
import AdminDialog from "@/Components/Admin/AdminDialog";
import AdminDropdownMenu from "@/Components/Admin/AdminInvDropdownMenu";
import { useState } from "react";
import AdminAlertDialog from "@/Components/Admin/AdminAlertDialog";
import IconDelete from "@/Components/Icons/IconDelete";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

function AdminManageApplication({ orgID }) {
    const [forms] = useState(true);
    const [response] = useState(true);

    const [orgs, setOrgs] = useState({
        name: "",
        department: "",
    });

    function handleChangeForNewOrg(e) {
        const key = e.target.id;
        const value = e.target.value;
        setOrgs((orgs) => ({
            ...orgs,
            [key]: value,
        }));
    }

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
                    title="Manage Student Applications"
                >
                    {forms ? (
                        <div className="">
                            <div className=" grid grid-cols-12  divide-x  divide-gray-200">
                                <div className="col-span-2 mb-6 ">
                                    <div className="poppins p-5">
                                        Forms Available:
                                    </div>
                                    <div className="h-[500px] overflow-auto">
                                        <ApplicationForms selected={true} />
                                        <ApplicationForms />
                                        <ApplicationForms />
                                        <ApplicationForms />
                                    </div>
                                </div>

                                <div className="col-span-10 min-h-[500px]">
                                    <div className="poppins">
                                        <h1 className="p-5">
                                            Application Responses for the form{" "}
                                            <span className="underline underline-offset-2">
                                                Staff for Back-End
                                            </span>
                                            :
                                        </h1>
                                    </div>
                                    {response ? (
                                        <div className="min-h-[500px] h-[500px] overflow-auto">
                                            <table className="mr-3  bg-white divide-y min-h-[500px]  rounded-r-xl divide-gray-200    ">
                                                <thead>
                                                    <tr className="lg:grid hidden font-bold grid-cols-9 py-4 text-center">
                                                        <th className=" col-span-2 text-sm">
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
                                                    <ApplicationResponses />
                                                    <ApplicationResponses />
                                                    <ApplicationResponses />
                                                    <ApplicationResponses />
                                                    <ApplicationResponses />
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="m-14 sm:m-48 text-xl text-gray-600 font-thin text-center">
                                            No Responses Found
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

function ApplicationForms({ selected }) {
    return (
        <div
            className={`cursor-pointer p-4 rounded-l-xl text-sm ml-3 ${
                selected ? "bg-white" : ""
            } hover:bg-white flex`}
        >
            <h1 className="font-extrabold">Staff for Back-End</h1>{" "}
            <div className="ml-2 mr-2 rounded-full p-1 text-xs text-center  font-bold bg-gray-300">
                21
            </div>
        </div>
    );
}

function ApplicationResponses() {
    return (
        <tr className="grid grid-cols-1 hover:bg-gray-100 lg:grid-cols-9 py-2 text-center min-h-16">
            <td className=" lg:col-span-2 text-sm content-center">
                Laurence Arvin Arcilla
            </td>
            <td className="lg:col-span-2 text-sm content-center ">
                College of Information and Computing Sciences
            </td>
            <td className="lg:col-span-2 text-sm content-center truncate">
                laurencearvin.arcilla.cics@ust.edu.ph
            </td>
            <td className="col-span-1 text-sm content-center">Aug-13-2024</td>
            <td className="lg:col-span-1 px-4 text-sm content-center">
                <div className={`bg-[#609B00] rounded-xl text-white`}>
                    50% Match
                </div>
            </td>
            <td className="col-span-1 text-sm grid grid-cols-2">
                <AdminDialog
                    title="Answer of the Applicant"
                    trigger={
                        <div className="underline content-center underline-offset-2">
                            View <span className="lg:hidden ">Response </span>
                        </div>
                    }
                ></AdminDialog>

                <AdminDialog
                    //specify the user
                    title="Set the Status for this Application"
                    trigger={<DotsVertical />}
                >
                    <form
                        // onSubmit={
                        //     handleSubmitForNewOrg
                        // }
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-bold text-gray-700"
                            >
                                Select a Status to be Set for this Application:
                            </label>
                            <Select
                                defaultValue="Assign"
                                // onValueChange={
                                //    handleFilterCategory
                                // }
                            >
                                <SelectTrigger className="w-full h-12 mb border-gray-300 bg-transparent">
                                    <SelectValue placeholder="Assign" />
                                </SelectTrigger>
                                <SelectContent
                                    className="border-gray-500 bg-[#EEEEEE] quicksand"
                                    ref={(ref) => {
                                        if (!ref) return;
                                        ref.ontouchstart = (e) =>
                                            e.preventDefault();
                                    }}
                                >
                                    <SelectItem
                                        value="Assign"
                                        className="hover:!bg-gray-3 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10"
                                    >
                                        Mark as Assigned
                                    </SelectItem>
                                    <SelectItem
                                        value="Additional"
                                        className="hover:!bg-gray-3 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10"
                                    >
                                        Mark as Pending
                                    </SelectItem>
                                    <SelectItem
                                        value="Reject"
                                        className="hover:!bg-gray-3 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10"
                                    >
                                        Mark as Rejected
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <label
                                htmlFor="name"
                                className="block text-sm font-bold text-gray-700"
                            >
                                Attach a Message/Reason:
                            </label>
                            <textarea
                                id="name"
                                // value={
                                //     orgs.name
                                // }
                                // onChange={
                                //     handleChangeForNewOrg
                                // }
                                className="block w-full px-4 h-44 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="(Optional)"
                            />
                        </div>

                        <div className="mt-4 grid justify-items-end">
                            <button
                                type="submit"
                                className="flex px-9  shadow-lg rounded-2xl bg-white hover:bg-gray-800 hover:text-white"
                            >
                                <span className="ml-2  poppins hidden truncate sm:block">
                                    Set Status
                                </span>
                            </button>
                        </div>
                    </form>
                </AdminDialog>

                {/* <AdminDropdownMenu
                                                        triggerContent={
                                                            
                                                        }
                                                        title="Select Action"
                                                        dropdownItems={[
                                                            {
                                                                name: (
                                                                    <AdminAlertDialog
                                                                        trigger={`Assign as Staff for Back-end`}
                                                                        title={`Assign this user?`}
                                                                        description="Once confirmed, the user will automatically be added to your organization."
                                                                        accept="Confirm"
                                                                        // onclick={() =>
                                                                        //     onDelete(
                                                                        //         organization.orgID
                                                                        //     )
                                                                        // }
                                                                    ></AdminAlertDialog>
                                                                ),
                                                                onSelect: (e) =>
                                                                    e.preventDefault(),
                                                            },
                                                            {
                                                                name: "Send Notification",
                                                                value: "notif",
                                                            },
                                                            {
                                                                name: (
                                                                    <AdminAlertDialog
                                                                        trigger={`Reject the applicant`}
                                                                        title={`Reject this user?`}
                                                                        description="Once rejected, the users application will be removed from the list."
                                                                        accept="Confirm"
                                                                        // onclick={() =>
                                                                        //     onDelete(
                                                                        //         organization.orgID
                                                                        //     )
                                                                        // }
                                                                    ></AdminAlertDialog>
                                                                ),
                                                                onSelect: (e) =>
                                                                    e.preventDefault(),
                                                            },
                                                        ]}
                                                    /> */}
            </td>
        </tr>
    );
}

export default AdminManageApplication;
