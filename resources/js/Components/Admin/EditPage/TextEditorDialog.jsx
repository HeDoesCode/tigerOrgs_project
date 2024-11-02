import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog"
import { useState } from "react";

/*
Usage:
    <TextEditorDialog
        trigger={contact.address}
        type='Address'
        target={(text) => {
            setEditContacts((prevState) => {
                const updatedContact = [...prevState];
                updatedContact[index] = {
                    ...updatedContact[index],
                    address: text
                }

                return updatedContact;
            })
        }}
    />
*/

export default function TextEditorDialog({ trigger, type, target, required = false, componentProps }) {
    const [text, setText] = useState(typeof trigger === 'string' ? trigger : '');

    const handleTextSave = (e) => {
        if (required && text.length === 0) {
            e.preventDefault();
            return;
        }
        if (typeof target === 'function') {
            target(text);
        }
    };

    return (
        <Dialog>
            <DialogTrigger className={`p-2 text-left hover:outline hover:outline-slate-500 rounded-md ${componentProps?.dialogTriggerCN}`} >
                {trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit {type}</DialogTitle>
                    <DialogDescription className='hidden'>
                    </DialogDescription>
                </DialogHeader>
                {/* other content */}
                <input
                    placeholder={required ? '*required' : ''}
                    className={(required && text.length === 0) ? 'border-2 border-red-500' : ''}
                    type="text"
                    value={text}
                    onBlur={() => setText((prevState) => {
                        const trimmedText = prevState.trim()

                        return trimmedText;
                    })}
                    onChange={(e) => setText(e.target.value)}
                    {...componentProps?.input}
                />
                {componentProps?.input?.maxLength && (
                    <div className="font-bold text-sm text-red-500">{text.length === componentProps.input.maxLength && 'Max. characters: 255'}</div>
                )}
                <DialogFooter className="justify-end">
                    <DialogClose asChild>
                        <button
                            type="button"
                            className="px-3 py-2 bg-cyan-400 rounded-lg"
                            onClick={handleTextSave}
                        >
                            Set {type}
                        </button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
