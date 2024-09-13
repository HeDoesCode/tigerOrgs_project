import IconDotsVertical from "@/Components/Icons/IconDotsVertical";
import IconAdmin from "@/Components/Icons/IconAdmin";
import IconEdit from "@/Components/Icons/IconEdit";
import IconDelete from "@/Components/Icons/IconDelete";
import IconProfile from "@/Components/Icons/IconProfile";
import IconPosition from "@/Components/Icons/IconPosition";
import IconDepartment from "@/Components/Icons/IconDepartment";
import IconEmail from "@/Components/Icons/IconEmail";
import VerticalCard from "@/Components/VerticalCard";
import IconSave from "@/Components/Icons/IconSave";
import IconCancel from "@/Components/Icons/IconCancel";

function AdminMemberCard({
    isAdmin,
    name,
    position,
    college,
    email,
    showActions = true,
}) {
    return (
        <div className="hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-lg hover:bg-gray-100 p-3 w-full bg-white rounded-xl">
            {/* Admin or Member Badge */}
            <div className="flex justify-between mb-4">
                <div
                    className={`${
                        isAdmin ? "bg-[#FF9900]" : "bg-[#FFBC58]"
                    } p-1 px-4 rounded-2xl flex justify-between items-center`}
                >
                    <div className="mx-1 text-gray-800">
                        <IconAdmin />
                    </div>
                    <div className="ml-2  poppins">
                        {isAdmin ? "Admin" : "Member"}
                    </div>
                </div>

                {/* Conditionally show Edit/Delete buttons */}
                {showActions && (
                    <div className="flex">
                        <div className="mx-1 text-gray-500 cursor-pointer">
                            <IconEdit />
                        </div>
                        <div className="mx-1 text-gray-500 cursor-pointer">
                            <IconDelete />
                        </div>
                    </div>
                )}
            </div>

            {/* Member Details */}
            <div className="grid grid-cols-5 mb-1">
                <div className="col-span-1 grid content-center justify-self-center text-gray-500">
                    <IconProfile />
                </div>
                <div className="col-span-4 text-lg font-bold truncate">
                    {name}
                </div>
            </div>

            <div className="grid grid-cols-5 mb-1">
                <div className="col-span-1 grid content-center justify-self-center text-gray-500">
                    <IconPosition />
                </div>
                <div className="col-span-4 text-lg font-semibold truncate">
                    {position}
                </div>
            </div>

            <div className="grid grid-cols-5 mb-1">
                <div className="col-span-1 grid content-center justify-self-center text-gray-500">
                    <IconDepartment />
                </div>
                <div className="col-span-4 text-md truncate">{college}</div>
            </div>

            <div className="grid grid-cols-5 mb-1">
                <div className="col-span-1 grid content-center justify-self-center text-gray-500">
                    <IconEmail />
                </div>
                <div className="col-span-4 text-md truncate">{email}</div>
            </div>
        </div>
    );
}

export default AdminMemberCard;
