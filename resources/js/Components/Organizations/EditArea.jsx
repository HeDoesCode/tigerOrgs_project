import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/Components/ui/dialog";
import IconPencil from "../Icons/IconPencil";

function EditArea({ children, footer = null, title, description, transparent, componentProps, editErrors = [] }) {
    return (
        <Dialog {...componentProps?.dialog}>
            <DialogTrigger className={`contents ${transparent && 'pointer-events-none'}`}>
                <div className={`absolute inset-0 h-full w-full flex items-center justify-center group hover:border hover:bg-slate-500/20 hover:backdrop-blur-[2px] rounded-lg transition-all ${componentProps?.dialogTriggerCN}`}>
                    <div className={`${transparent ? 'opacity-50 bg-gray-400/80' : 'opacity-30 bg-gray-300/50'}  group-hover:bg-gray-500/90 px-3 py-2 group-hover:opacity-100 text-black group-hover:text-white rounded-xl flex flex-nowrap select-none pointer-events-auto`}>
                        <IconPencil /> <span className="text-base">Edit</span>
                    </div>
                </div>
                <div className="absolute right-7 bottom-7 max-w-10 bg-red-500 px-1 text-white text-xs rounded-md">{editErrors[0]}{editErrors.length > 1 && ', ...'}</div>
            </DialogTrigger>
            <DialogContent className={`max-h-[27rem] overflow-y-auto ${componentProps?.dialogContentCN}`} {...componentProps?.dialogContent}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {children}
                {footer}
            </DialogContent>
        </Dialog>
    );
}

EditArea.ActionButtons = ({ closeProps, resetProps, previewChangeProps }) => {
    return (
        <DialogFooter className="justify-end h-fit gap-y-3">
            <DialogClose asChild>
                <button
                    type="button"
                    className="px-3 py-2 bg-slate-300 rounded-lg"
                    {...closeProps}
                >
                    Close
                </button>
            </DialogClose>
            {resetProps && (
                <DialogClose asChild>
                    <button
                        type="button"
                        className="px-3 py-2 bg-red-400 rounded-lg"
                        {...resetProps}
                    >
                        Reset
                    </button>
                </DialogClose>
            )}
            {previewChangeProps && (
                <DialogClose asChild>
                    <button
                        type="button"
                        className="px-3 py-2 bg-cyan-400 rounded-lg"
                        {...previewChangeProps}
                    >
                        Preview Change
                    </button>
                </DialogClose>
            )}
        </DialogFooter>
    )
}


export default EditArea
