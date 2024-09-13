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

function AdminDialog({ children, small, ...props }) {
    return (
        <Dialog>
            <DialogTrigger>{props.trigger}</DialogTrigger>
            <DialogContent
                className={`${
                    small
                        ? "w-80 sm:min-w-[400px] h-[40px]"
                        : "w-80 sm:min-w-[800px] h-[440px]"
                }overflow-auto max-h-[700px] flex flex-col `}
            >
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                    <DialogDescription>{props.description}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col p-4 space-y-4 overflow-auto">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default AdminDialog;
