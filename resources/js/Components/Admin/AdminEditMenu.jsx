import { useForm } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/Components/ui/dropdown-menu";
import IconEdit from "../Icons/IconEdit";

function AdminEditMenu({ userID, orgID, roleID, onRoleChange }) {
    const { data, setData, post, processing } = useForm({
        userID,
    });

    const handleAction = (action) => {
        post(route(`admin.${action}`, { orgID }), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // Handle success and call onRoleChange
                if (action === "make-admin") {
                    onRoleChange(2); // 2 represents Admin role
                } else if (action === "make-member") {
                    onRoleChange(1); // 1 represents Member role
                }
            },
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full" disabled={processing}>
                <IconEdit />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {roleID === 2 ? (
                    <DropdownMenuItem
                        className="bg-[#f8f8f8] border-gray-300 cursor-pointer"
                        onClick={() => handleAction("make-member")}
                    >
                        Make Member
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem
                        className="bg-[#f8f8f8] border-gray-300 cursor-pointer"
                        onClick={() => handleAction("make-admin")}
                    >
                        Make Admin
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="bg-[#f8f8f8] border-gray-300 cursor-pointer"
                    onClick={() => handleAction("remove-student")}
                >
                    Remove Student
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AdminEditMenu;
