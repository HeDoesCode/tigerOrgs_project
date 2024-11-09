import { useContext, useEffect, useState } from "react";
import { FormActionsContext } from "../Context/FormActionsContext";
import { useForm } from "@inertiajs/react";
import AdminAlertDialog from "@/Components/Admin/AdminAlertDialog";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import IconDelete from "@/Components/Icons/IconDelete";
import IconX from "@/Components/Icons/IconX";
import IconTrash from "@/Components/Icons/IconTrash";

function EditMultiChoiceItem({ id, item, required }) {
    const { delete: handleDeleteItem, edit: handleEditItem } =
        useContext(FormActionsContext);

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const { data, setData, post, processing, errors } = useForm({
        question: item.name !== "" ? item.name : "",
        required: item.required,
        options:
            item.options && item.options.length > 0
                ? item.options
                : ["Option 1"],
    });

    function handleAddOption() {
        const updatedOptions = [
            ...data.options,
            `Option ${data.options.length + 1}`,
        ];
        setData("options", updatedOptions);
    }

    function handleEditOption(index, value) {
        const updatedOptions = [...data.options];
        updatedOptions[index] = value;
        setData("options", updatedOptions);
    }

    function handleDeleteOption(index) {
        if (data.options.length === 1) {
            setShowAlert(true);
            return;
        }

        const updatedOptions = data.options.filter((_, i) => i !== index);
        setData("options", updatedOptions);
    }

    function handleSave(e) {
        e.preventDefault();
        handleEditItem(id, data);
    }

    useEffect(() => {
        handleEditItem(id, data);
    }, [data]);

    return (
        <ul>
            <li className="mb-4 rounded-2xl px-2">
                <input
                    className="w-full bg-white rounded-xl border-1 border-slate-300"
                    type="text"
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
            </li>

            <li className="mb-2 px-2">
                <ul>
                    {data.options.map((option, index) => (
                        <li key={index} className="flex items-center mb-2">
                            <input
                                className="w-full  rounded-xl border-1 border-slate-300 bg-white/80"
                                type="text"
                                value={option}
                                placeholder={option}
                                onChange={(e) =>
                                    handleEditOption(index, e.target.value)
                                }
                                required={required}
                                minLength={1}
                                pattern=".{1,}"
                                title="Option is required"
                                onInvalid={(e) => {
                                    e.target.setCustomValidity(
                                        "Please enter an option"
                                    );
                                }}
                                onInput={(e) => {
                                    e.target.setCustomValidity("");
                                }}
                            />
                            <button
                                className="ml-2 text-black/50"
                                onClick={() => handleDeleteOption(index)}
                                type="button"
                            >
                                <IconX />
                            </button>
                        </li>
                    ))}
                </ul>
            </li>
            <li className="mb-2 px-2">
                <button
                    className=" rounded-xl bg-gray-200 px-4 py-2 border hover:bg-gray-300 w-full transition ease-in-out diuration-200"
                    type="button"
                    onClick={handleAddOption}
                >
                    + Add Option
                </button>
            </li>
            <div className="flex justify-end ">
                <li className="flex items-center gap-2  px-2 rounded-2xl border-black size-fit  ">
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
            {showAlert && (
                <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Options cannot be empty</AlertTitle>
                    <AlertDescription>
                        At least one option is required. Please add more options
                        before removing.
                    </AlertDescription>
                </Alert>
            )}
        </ul>
    );
}

export default EditMultiChoiceItem;
