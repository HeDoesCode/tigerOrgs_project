import { useForm } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/Components/ui/dropdown-menu";
import IconEdit from "../Icons/IconEdit";
import AdminAlertDialog from "./AdminAlertDialog";

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
                        onSelect={(e) => {
                            e.preventDefault();
                        }}
                        className="bg-[#f8f8f8] border-gray-300 cursor-pointer"
                    >
                        <AdminAlertDialog
                            trigger="Make Member"
                            title={`Demote the user as member?`}
                            description="This will disable the user to manage the organization."
                            accept="Confirm"
                            onclick={() => handleAction("make-member")}
                        ></AdminAlertDialog>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault();
                        }}
                        className="bg-[#f8f8f8] border-gray-300 cursor-pointer"
                    >
                        <AdminAlertDialog
                            trigger="Make Admin"
                            title={`Make the user as admin?`}
                            description="This will enable the user to manage the organization."
                            accept="Confirm"
                            onclick={() => handleAction("make-admin")}
                        ></AdminAlertDialog>
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.preventDefault();
                    }}
                    className="bg-[#f8f8f8] border-gray-300 cursor-pointer"
                >
                    <AdminAlertDialog
                        trigger="Remove Student"
                        title={`Remove the user from the organization`}
                        description="Are you sure you want to delete the user from the organization?"
                        accept="Confirm"
                        onclick={() => handleAction("remove-student")}
                    ></AdminAlertDialog>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AdminEditMenu;
