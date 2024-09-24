import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
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
                { userID }
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

    const removeStudent = async () => {
        console.log("Removing student with:", { userID, orgID });

        try {
            const response = await axios.post(
                route("admin.remove-student", { orgID }),
                { userID }
            );

            console.log("Success:", response.data);
            addToast("User has been removed from the organization!", "success");
        } catch (error) {
            console.error(
                "Error removing student:",
                error.response?.data || error
            );
            addToast(
                "Error removing student: " +
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
                    onClick={makeAdmin}
                >
                    Make Admin
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="bg-[#f8f8f8] border-gray-300 cursor-pointer"
                    onClick={makeMember}
                >
                    Make Member
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="bg-[#f8f8f8] border-gray-300 cursor-pointer "
                    onClick={removeStudent}
                >
                    Remove Student
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AdminEditMenu;
