import { useForm } from "@inertiajs/react";
import { useContext, useEffect } from "react";
import { FormActionsContext } from "../Context/FormActionsContext";
import AdminAlertDialog from "@/Components/Admin/AdminAlertDialog";
import IconTrash from "@/Components/Icons/IconTrash";

function EditSimpleItem({ id, item, required }) {
    const { data, setData } = useForm({
        question: item.name || "",
        required: item.required || false,
    });

    const { delete: handleDeleteItem, edit: handleEditItem } =
        useContext(FormActionsContext);

    useEffect(() => {
        handleEditItem(id, data);
    }, [data]);

    return (
        <div className="space-y-4">
            <div className="flex flex-col px-2 space-y-2">
                <input
                    type="text"
                    className="w-full bg-white rounded-xl border-1 border-slate-300"
                    value={data.question}
                    onChange={(e) => setData("question", e.target.value)}
                    placeholder="Type question here..."
                    required={required}
                    minLength={1}
                    pattern=".{1,}"
                    title="Question is required"
                    onInvalid={(e) => {
                        e.target.setCustomValidity("Please enter a question");
                    }}
                    onInput={(e) => {
                        e.target.setCustomValidity("");
                    }}
                />
            </div>

            <div className="flex justify-end ">
                <li className="flex items-center gap-2  px-2 rounded-2xl border-black size-fit ">
                    <input
                        className="rounded-md"
                        type="checkbox"
                        id={`required_${id}`}
                        onChange={() => setData("required", !data.required)}
                        checked={data.required}
                    />
                    <label htmlFor={`required_${id}`}> Required</label>
                    <label className="">|</label>
                    <AdminAlertDialog
                        trigger={
                            <div
                                className="py-2 underline text-black/50"
                                type="button"
                            >
                                <IconTrash />
                            </div>
                        }
                        title={`Confirm Deletion?`}
                        description="The component will be deleted from the layout."
                        accept="Confirm"
                        onclick={() => handleDeleteItem(id)}
                    ></AdminAlertDialog>
                </li>
            </div>
        </div>
    );
}

export default EditSimpleItem;
