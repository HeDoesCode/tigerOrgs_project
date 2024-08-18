import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel,
} from "@/Components/ui/dropdown-menu";

function AdminDropdownMenu({ triggerContent, dropdownItems, title, onSelect }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{triggerContent}</DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#f8f8f8] border-gray-300 flex flex-col justify-center space-y-2 p-2">
                <DropdownMenuLabel className="poppins">
                    {title}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {dropdownItems.map((item, index) => (
                    <DropdownMenuItem
                        key={index}
                        onSelect={() => onSelect(item.value)}
                        className="poppins"
                    >
                        {item.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AdminDropdownMenu;
