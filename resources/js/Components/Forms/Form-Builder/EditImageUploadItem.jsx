import { useForm } from "@inertiajs/react";
import { useContext, useEffect, useState } from "react";
import { FormActionsContext } from "../Context/FormActionsContext";
import AdminAlertDialog from "@/Components/Admin/AdminAlertDialog";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import IconTrash from "@/Components/Icons/IconTrash";

function EditImageUploadItem({ id, item, required }) {
    const { data, setData } = useForm({
        question: item.name !== "" ? item.name : "",
        required: item.required,
        allowedTypes: item.allowedTypes || ["image/jpeg", "image/png"],
    });

    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const { delete: handleDeleteItem, edit: handleEditItem } =
        useContext(FormActionsContext);

    const [previewImage, setPreviewImage] = useState(null);
    const MAX_SIZE_MB = 5;

    // Example image upload handler for testing the configuration
    const handleTestUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!data.allowedTypes.includes(file.type)) {
            alert("Invalid file type. Only JPG and PNG files are allowed.");
            e.target.value = "";
            return;
        }

        // Validate file size (5MB)
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
            alert(`File size must be less than ${MAX_SIZE_MB}MB`);
            e.target.value = "";
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        handleEditItem(id, data);
    }, [data]);

    return (
        <ul>
            <li className="mb-2 rounded-2xl px-2">
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

            {/* Image Upload Configuration */}
            <li className="mb-2 px-2">
                <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                        Maximum file size: {MAX_SIZE_MB}MB
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm block">Allowed Types:</label>
                        <div className="flex gap-2">
                            {[
                                { type: "image/jpeg", label: "JPG" },
                                { type: "image/png", label: "PNG" },
                            ].map(({ type, label }) => (
                                <label
                                    key={type}
                                    className="flex items-center gap-1"
                                >
                                    <input
                                        className="rounded-md"
                                        type="checkbox"
                                        checked={data.allowedTypes.includes(
                                            type
                                        )}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setData("allowedTypes", [
                                                    ...data.allowedTypes,
                                                    type,
                                                ]);
                                            } else {
                                                if (
                                                    data.allowedTypes.length > 1
                                                ) {
                                                    setData(
                                                        "allowedTypes",
                                                        data.allowedTypes.filter(
                                                            (t) => t !== type
                                                        )
                                                    );
                                                } else {
                                                    <Alert
                                                        variant="destructive"
                                                        className="mb-4"
                                                    >
                                                        <AlertTitle>
                                                            File type cannot be
                                                            empty
                                                        </AlertTitle>
                                                        <AlertDescription>
                                                            At least one file
                                                            type must be allowed
                                                        </AlertDescription>
                                                    </Alert>;
                                                }
                                            }
                                        }}
                                    />
                                    <span className="text-sm">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Test Upload Section */}
                    <div className="mt-4">
                        <label className="text-sm block mb-2">
                            Test Upload:
                        </label>
                        <input
                            type="file"
                            accept={data.allowedTypes.join(",")}
                            onChange={handleTestUpload}
                            className="w-full"
                        />
                        {previewImage && (
                            <div className="mt-2">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="max-w-[200px] max-h-[200px] object-contain"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </li>

            <div className="flex justify-end">
                <li className="flex items-center gap-2 m-2 px-2 rounded-2xl border-black size-fit">
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
        </ul>
    );
}

export default EditImageUploadItem;
