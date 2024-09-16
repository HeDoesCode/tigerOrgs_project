import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel,
} from "@/Components/ui/dropdown-menu";
import IconEdit from "../Icons/IconEdit";

function AdminEditMenu({ userID, orgID }) {
    const makeAdmin = () => {
        // Assuming the route for invite page exists, and you handle this action within the same page
        Inertia.post(route("invite.updateRole"), { userID, orgID, roleID: 2 });
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
                <IconEdit />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                    className="bg-[#f8f8f8] border-gray-300 cursor-pointer"
                    onClick={makeAdmin} // Trigger role update
                >
                    Make Admin
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AdminEditMenu;
