import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import AdminButton from "@/Components/Admin/AdminButton";
import IconInvite from "@/Components/Icons/IconInvite";

function AdminDialog({ children, ...props }) {
    return (
        <Dialog>
            <DialogTrigger>{props.trigger}</DialogTrigger>
            <DialogContent className="w-80 sm:min-w-[800px]">
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                    <DialogDescription>{props.description}</DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}

export default AdminDialog;
