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
import { router } from "@inertiajs/react";

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

function FormBuilder() {
    const [items, setItems] = useState([]);

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

        if (type === "select" || type === "radio" || type === "checkbox") {
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

    function handleSave() {
        let dataToBeSent = JSON.stringify(items);

        router.post("/admin/form-builder/save", dataToBeSent, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    return (
        <div className="p-5">
            <div className="flex flex-col justify-center bg-white m-4 p-4 max-w-xl mx-auto">
                <h1 className="text-3xl mb-4 px-2 font-medium">Create Form</h1>
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
                <div className="flex text-xs text-center rounded-2xl bg-gray-200 m-2 ">
                    {inputTypes.map((input) => (
                        <button
                            key={input.type}
                            className="rounded-xl hover:bg-gray-300 w-20 p-2"
                            onClick={() => handleAddItem(input.type)}
                        >
                            <div className="w-6 h-6 mx-auto mb-2 ">
                                {input.icon && <input.icon />}
                            </div>
                            <span>{input.type}</span>
                        </button>
                    ))}
                </div>

                <button onClick={() => console.log(items)}>Check Items</button>
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
}

export default FormBuilder;
