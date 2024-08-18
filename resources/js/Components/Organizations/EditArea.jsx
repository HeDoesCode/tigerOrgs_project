import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import IconPencil from "../Icons/IconPencil";

function EditArea({ children, title, description }) {
    return (
        <Dialog>
            <DialogTrigger className="contents">
                <div className="absolute inset-0 h-full w-full flex items-center justify-center group hover:border hover:border-red-500 hover:backdrop-blur-sm transition-all">
                    <div className="bg-gray-300/50 group-hover:bg-gray-500/90 px-3 py-2 opacity-50 group-hover:opacity-100 text-black group-hover:text-white rounded-xl flex flex-nowrap">
                        <IconPencil /> Edit
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}


export default EditArea
