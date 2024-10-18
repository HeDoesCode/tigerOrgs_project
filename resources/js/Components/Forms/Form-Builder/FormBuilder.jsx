import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import letterT from "@/Components/Icons/letterT";
import number123 from "@/Components/Icons/number123";
import radiobutton from "@/Components/Icons/radiobutton";
import select from "@/Components/Icons/select";
import checkbox from "@/Components/Icons/checkbox";
import Iconfileupload from "@/Components/Icons/Iconfileupload";
import IconResume from "@/Components/Icons/IconResume";
import emailIcon from "@/Components/Icons/emailIcon";

import { FormActionsContext } from "../Context/FormActionsContext";
import BuilderWrap from "./BuilderWrap";
import { Link, router } from "@inertiajs/react";

const inputTypes = [
    { type: "text", icon: letterT },
    { type: "number", icon: number123 },
    { type: "email", icon: emailIcon },
    { type: "select", icon: select },
    { type: "radio", icon: radiobutton },
    { type: "checkbox", icon: checkbox },
    { type: "file_upload", icon: Iconfileupload },
    { type: "image_upload", icon: IconResume },
];

function FormBuilder({ orgID, formData }) {
    const [items, setItems] = useState(formData?.formLayout?.layout || []);
    const [title, setTitle] = useState(formData?.formLayout?.name || "");
    const [description, setDescription] = useState(formData?.formLayout?.desc || "");

    function getItemPos(id) {
        return items.findIndex((item) => item.id === id);
    }

    function handleDragEnd(e) {
        const { active, over } = e;

        if (active.id === over.id) return;

        setItems((items) => {
            const originalPos = getItemPos(active.id);
            const newPos = getItemPos(over.id);

            return arrayMove(items, originalPos, newPos);
        });
    }

    function handleAddItem(type) {
        const newItemId = uuidv4();
        let newItem = {
            id: newItemId,
            type: type,
            class: "",
            name: "",
            value: "",
            required: false,
        };

        if (
            type === "Select" ||
            type === "Radio Group" ||
            type === "Checkbox"
        ) {
            newItem = {
                ...newItem,
                options: [],
            };
        }
        setItems([...items, newItem]);
    }

    function handleEditItem(id, data) {
        const updatedItems = [...items];
        const editedItemIndex = updatedItems.findIndex(
            (item) => item.id === id
        );

        switch (updatedItems[editedItemIndex].type) {
            case "select":
            case "checkbox":
            case "radio":
                updatedItems[editedItemIndex] = {
                    ...updatedItems[editedItemIndex],
                    name: data.question,
                    required: data.required,
                    options: data.options,
                };
                break;
            default:
                updatedItems[editedItemIndex] = {
                    ...updatedItems[editedItemIndex],
                    name: data.question,
                    required: data.required,
                };
        }

        setItems([...updatedItems]);
    }

    function handleDeleteItem(id) {
        if (!confirm(`Are you sure you want to delete this item?`)) return;
        setItems(items.filter((item) => item.id !== id));
    }

    const handleSave = () => {
        const dataToBeSent = {
            name: title,
            desc: description,
            layout: items,
        };

        if (!formData) {
            router.post(`/admin/${orgID}/form-builder/save`, dataToBeSent, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } else {
            router.patch(`/admin/${orgID}/form-builder/save/${formData.formID}`, dataToBeSent, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    }

    return (
        <div className=" bg-white min-h-screen ">
            <div className="flex flex-col justify-center m-4 p-4 max-w-3xl mx-auto rounded-xl">
                <h1 className="font-semibold text-3xl mb-4 px-2 text-center">
                    {formData ? 'Modify' : 'Create'} Form
                </h1>
                <input
                    type="text"
                    className="w-full bg-transparent rounded-xl border-[1.5px] border-x-stone-600 mb-4 p-2"
                    placeholder="Form title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="w-full bg-transparent rounded-xl border-[1.5px] border-x-stone-600 mb-2"
                    placeholder="Form description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormActionsContext.Provider
                    value={{ delete: handleDeleteItem, edit: handleEditItem }}
                >
                    <DndContext
                        onDragEnd={handleDragEnd}
                        collisionDetection={closestCorners}
                    >
                        <BuilderWrap items={items} />
                    </DndContext>
                </FormActionsContext.Provider>
                <div className="flex text-xs text-center rounded-3xl bg-gray-200 m-2  ">
                    {inputTypes.map((input) => (
                        <button
                            key={input.type}
                            className="rounded-3xl w-full py-4 hover:bg-gray-300  transition ease-in-out duration-200 "
                            onClick={() => handleAddItem(input.type)}
                        >
                            <div className="w-6 h-6 mx-auto">
                                {input.icon && <input.icon />}
                            </div>
                            <span>{input.type}</span>
                        </button>
                    ))}
                </div>

                <button onClick={() => console.log(items)}>Check Items</button>
                <div className="flex justify-end space-x-3">
                    {formData && (
                        <Link
                            className="bg-[#e25454] hover:bg-[#d44040] text-white font-medium text-lg transition ease-in-out duration-300 w-fit text-right px-4 py-1 border rounded-full"
                            href={document.referrer}
                        >
                            Cancel
                        </Link>
                    )}
                    <button
                        onClick={handleSave}
                        className="bg-[#04aa6dd5] hover:bg-[#04AA6D] text-white font-medium text-lg transition ease-in-out duration-300 w-fit text-right px-4 py-1 border rounded-full"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormBuilder;
