import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";
import IconEdit from "../Icons/IconEdit";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

function AdminEditMenu({ userID, orgID, roleID }) {
    const { addToast } = useToast();

    const makeAdmin = async () => {
        console.log("Making admin with:", { userID, orgID, roleID });

        try {
            const response = await axios.post(
                route("admin.make-admin", { orgID }),
                { userID },
                { orgID }
            );

            console.log("Success:", response.data);
            addToast("User has been made an Admin!", "success");
        } catch (error) {
            console.error("Error making admin:", error.response?.data || error);
            addToast(
                "Error making admin: " +
                    (error.response?.data.message || "Unknown error"),
                "error"
            );
        }
    };

    const makeMember = async () => {
        console.log("Making member with:", { userID, orgID, roleID });

        try {
            const response = await axios.post(
                route("admin.make-member", { orgID }),
                { userID },
                { roleID }
            );

            console.log("Success:", response.data);
            addToast("User has been made a Member!", "success");
        } catch (error) {
            console.error(
                "Error making member:",
                error.response?.data || error
            );
            addToast(
                "Error making member: " +
                    (error.response?.data.message || "Unknown error"),
                "error"
            );
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
                <IconEdit />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    className="bg-[#f8f8f8] border-gray-300 cursor-pointer"
                    onClick={makeAdmin} // Trigger role update to admin
                >
                    Make Admin
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="bg-[#f8f8f8] border-gray-300 cursor-pointer"
                    onClick={makeMember} // Trigger role update to member
                >
                    Make Member
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AdminEditMenu;
