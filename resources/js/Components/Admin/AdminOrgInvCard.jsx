import IconUser from "@/Components/Icons/IconUser";
import IconEye from "@/Components/Icons/IconEye";
import IconStatus from "@/Components/Icons/IconStatus";
import IconChevronDown from "@/Components/Icons/IconChevronDown";
import AdminDropdownMenu from "@/Components/Admin/AdminDropdownMenu";

function AdminOrgInvCard({ organization, onClick, selectedOrg, userRoles }) {
    console.log(userRoles);

    const isDisabled = userRoles.some(
        (role) => role.roleID === 2 && role.orgID === organization.orgID
    );

    return (
        <div
            onClick={() => {
                if (!isDisabled) {
                    onClick();
                }
            }}
            className={`hover:scale-[1.02] cursor-pointer transition-all duration-300 ease-in-out px-4 rounded-xl divide-y divide-gray-300 shadow-lg  ${
                selectedOrg === organization.orgID
                    ? "ring ring-gray-300 ring-offset-4 bg-gray-200"
                    : "bg-white"
            } 
            ${
                isDisabled
                    ? "bg-gray-200 cursor-not-allowed"
                    : "hover:bg-gray-100"
            } 
            transOptimize`}
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
                        {isDisabled && (
                            <span className="text-xs font-semibold text-red-500">
                                Already an Admin of this Org
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminOrgInvCard;
