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

function AdminMemberCard({ isAdmin }) {
    return (
        <div className="hover:scale-[1.02] transition-all duration-300 ease-in-out shadow-lg hover:bg-gray-100 p-3 w-full bg-white rounded-xl">
            <div className="flex justify justify-between mb-4">
                <div
                    className={`${
                        isAdmin ? "bg-[#FF9900]" : "bg-[#FFBC58]"
                    } p-1 px-4 rounded-2xl flex justify-between`}
                >
                    <div className="mx-1 text-gray-800">
                        <IconAdmin />
                    </div>
                    <div className="ml-2  poppins">
                        {isAdmin ? "Admin" : "Member"}
                    </div>
                </div>
                <div className="flex">
                    <div className="mx-1 text-gray-500">
                        <IconEdit />
                    </div>
                    <div className="mx-1 text-gray-500">
                        <IconDelete />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-5 mb-1">
                <div className="col-span-1 grid content-center justify-self-center text-gray-500">
                    <IconProfile />
                </div>
                <div className="col-span-4 text-lg font-bold">Roshe Sapin</div>
            </div>

            <div className="grid grid-cols-5 mb-1">
                <div className="col-span-1 grid content-center justify-self-center text-gray-500">
                    <IconPosition />
                </div>
                <div className="col-span-4 text-lg font-semibold">
                    President
                </div>
            </div>

            <div className="grid grid-cols-5 mb-1">
                <div className="col-span-1 grid content-center justify-self-center text-gray-500">
                    <IconDepartment />
                </div>
                <div className="col-span-4 text-md ">
                    College of Information and Computing Sciences (CICS)
                </div>
            </div>

            <div className="grid grid-cols-5 mb-1">
                <div className="col-span-1 grid content-center justify-self-center text-gray-500">
                    <IconEmail />
                </div>
                <div className="col-span-4 text-md ">
                    roshe.sapin.cics@ust.edu.ph
                </div>
            </div>
        </div>
    );
}

export default AdminMemberCard;
