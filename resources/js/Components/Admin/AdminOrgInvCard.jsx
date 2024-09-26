import IconUser from "@/Components/Icons/IconUser";
import IconEye from "@/Components/Icons/IconEye";
import IconStatus from "@/Components/Icons/IconStatus";
import IconChevronDown from "@/Components/Icons/IconChevronDown";
import AdminDropdownMenu from "@/Components/Admin/AdminInvDropdownMenu";
import { XCircle } from "lucide-react";

function AdminOrgInvCard({
    organization,
    onClick,
    selectedOrg,
    userRoles,
    onDelete,
    isDeleting,
}) {
    const isAssigned = userRoles.some(
        (role) => role.roleID === 2 && role.orgID === organization.orgID
    );

    return (
        <div
            onClick={() => {
                if (!isAssigned) {
                    onClick();
                }
            }}
            className={`hover:scale-[1.02] cursor-pointer transition-all duration-300 ease-in-out px-4 rounded-xl divide-y divide-gray-300 shadow-lg  ${
                selectedOrg === organization.orgID
                    ? "ring ring-gray-300 ring-offset-4 bg-gray-200"
                    : "bg-white"
            } 
            ${isAssigned ? "bg-gray-200" : "hover:bg-gray-100"} 
            transOptimize relative`}
        >
            <div className="py-4 ">
                <div className="grid grid-cols-3 divide-x divide-gray-300">
                    <div className="p-2 content-center">
                        <img
                            className="rounded-full"
                            src={organization.logo}
                            alt={organization.name}
                        />
                    </div>
                    <div className="col-span-2  px-2">
                        <h1 className="text-sm font-bold py-2 ">
                            {organization.name}
                        </h1>
                        <h3 className="text-gray-500 text-xs  text-justify font-semibold">
                            {organization.department}
                        </h3>
                        {isAssigned && (
                            <span className="text-xs font-semibold text-green-500">
                                Admin of this Org
                            </span>
                        )}
                    </div>
                </div>
            </div>
            {isAssigned && isDeleting && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(organization.orgID);
                    }}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                    <XCircle size={20} />
                </button>
            )}
        </div>
    );
}

export default AdminOrgInvCard;
