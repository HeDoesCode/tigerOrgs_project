import IconUser from "@/Components/Icons/IconUser";
import IconEye from "@/Components/Icons/IconEye";
import IconStatus from "@/Components/Icons/IconStatus";
import IconChevronDown from "@/Components/Icons/IconChevronDown";
import AdminDropdownMenu from "@/Components/Admin/AdminDropdownMenu";
import AdminInvDropdownMenu from "./AdminInvDropdownMenu";
import AdminAlertDialog from "./AdminAlertDialog";
import DotsVertical from "../DotsVertical";
import AdminDialogForInvite from "./AdminDialogForInvite";
import AdminDialog from "./AdminDialog";
import IconEdit from "../Icons/IconEdit";
import { useRef, useState } from "react";
import AdminButton from "./AdminButton";
import IconDelete from "../Icons/IconDelete";

function AdminOrgCard({
    edit,
    visible,
    setVisible,
    organization,
    onEdit,
    onDelete,
}) {
    const imgRef = useRef(null);
    const visibilityClass = visible
        ? "bg-green-50  border-green-600 text-green-800"
        : "bg-red-50  border-red-600 text-red-800";

    //for editing
    const [editForm, setEditForm] = useState({
        name: organization.name,
        department: organization.department,
    });

    const handleEditSubmit = (e) => {
        e.preventDefault();
        onEdit(organization.orgID, editForm);
    };

    const handleEditChange = (e) => {
        const { id, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <div className="hover:scale-[1.02] transition-all duration-300 ease-in-out px-4 rounded-xl divide-y divide-gray-300 shadow-lg bg-white hover:bg-gray-100 transOptimize">
            <div className="py-4 ">
                <div className="grid grid-cols-6  ">
                    <div className="p-2 col-span-2 content-center">
                        <img
                            className="rounded-full"
                            src={
                                organization.logo
                                    ? organization.logo
                                    : "https://placehold.co/500x500"
                            }
                            alt="Organization Logo"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/500x500";
                            }}
                        />
                    </div>
                    <div className="col-span-3  px-2">
                        <h1 className="text-sm font-bold py-4 ">
                            {organization.name}
                        </h1>
                    </div>
                </div>
                <h3 className="text-gray-500 text-xs pt-4 text-justify font-semibold">
                    {organization.department}
                </h3>
            </div>

            <div className="grid grid-rows-1 py-4">
                <div className="grid grid-cols-6 py-1">
                    <div className="col-start-1 col-end-2 flex justify-center">
                        <IconUser />
                    </div>
                    <div className="text-sm font-semibold col-start-2 col-end-4 content-center">
                        Members:
                    </div>
                    <div className="text-sm font-semibold col-start-4 col-end-7 flex justify-center">
                        {organization.members_count !== undefined
                            ? organization.members_count
                            : "Members not set"}
                    </div>
                </div>

                <div className="grid grid-cols-6 py-1 ">
                    <div className="col-start-1 col-end-2 flex justify-center ">
                        <IconEye />
                    </div>
                    <div className="text-sm font-semibold col-start-2 col-end-4 content-center">
                        <span>Visibility:</span>
                    </div>

                    {edit ? (
                        <div
                            className={`text-sm font-semibold col-start-4 col-end-7 flex justify-center rounded-xl border-2 ${visibilityClass}`}
                        >
                            <AdminDropdownMenu
                                triggerContent={
                                    <div className="pl-1 flex items-center justify-center poppins">
                                        {visible ? "Visible" : "Not Visible"}
                                        <IconChevronDown size="15" />
                                    </div>
                                }
                                title="Select visibility"
                                dropdownItems={[
                                    {
                                        name: "Visible",
                                        value: true,
                                    },
                                    {
                                        name: "Not Visible",
                                        value: false,
                                    },
                                ]}
                                onSelect={setVisible}
                            />
                        </div>
                    ) : (
                        <div
                            className={`text-sm font-semibold col-start-4 col-end-7 flex justify-center rounded-xl border-2 ${visibilityClass}`}
                        >
                            <div className="pl-1 flex content-center poppins">
                                {visible ? "Visible" : "Not Visible"}
                            </div>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-6 py-1 ">
                    <div className="col-start-1 col-end-2 flex justify-center">
                        <IconStatus />
                    </div>
                    <div className="text-sm font-semibold col-start-2 col-end-4 content-center">
                        Status:
                    </div>
                    <div
                        className={`text-sm font-semibold col-start-4 col-end-7 flex justify-center rounded-xl poppins border-2 ${visibilityClass}`}
                    >
                        {visible ? "Active" : "Inactive"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminOrgCard;
