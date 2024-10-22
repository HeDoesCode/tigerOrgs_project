import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel,
} from "@/Components/ui/dropdown-menu";

import AdminDialog from "./AdminDialog";

function AdminInvDropdownMenu({ onSelect, ...props }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
                {props.triggerContent}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#f8f8f8] border-gray-300 flex flex-col justify-center space-y-2 p-2">
                <DropdownMenuLabel className="poppins">
                    {props.title}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-300 mx-2" />

                {props.dropdownItems.map((item, index) => (
                    <DropdownMenuItem
                        key={index}
                        className="poppins cursor-pointer"
                        // onSelect={(event) => {
                        //     event.preventDefault();
                        //     if (
                        //         typeof item.name === "object" &&
                        //         item.name.type === AdminDialog
                        //     ) {
                        //         // if the item is an admindialog, prevent the dropdown from closing
                        //         event.stopPropagation();
                        //     }
                        // }}
                        onSelect={item.onSelect}
                    >
                        {item.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AdminInvDropdownMenu;
