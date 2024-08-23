import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

// import TextInput from "@/Components/ui/TextInput";
// import NumberInput from "@/Components/ui/NumberInput";
// import SelectInput from "@/Components/ui/SelectInput";
// import RadioInput from "@/Components/ui/RadioInput";
// import CheckboxesInput from "@/Components/ui/CheckboxesInput";
// import FileUploadInput from "@/Components/ui/FileUploadInput";

import { FormActionsContext } from "../Context/FormActionsContext";
import BuilderWrap from "./BuilderWrap";

const inputTypes = [
    { type: "text" },
    { type: "number" },
    { type: "select" },
    { type: "radio" },
    { type: "checkbox" },
    { type: "pdf upload" },
    { type: "image upload" },
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
            newItem = { ...newItem, options: [] };
        }
        setItems([...items, newItem]);
    }

    function handleEditItem(id, data) {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            const itemIndex = updatedItems.findIndex((item) => item.id === id);

            if (itemIndex !== -1) {
                updatedItems[itemIndex] = {
                    ...updatedItems[itemIndex],
                    name: data.question,
                    required: data.required,
                };
            }
            return updatedItems;
        });
    }

    function handleDeleteItem(id) {
        if (!confirm(`Are you sure you want to delete this item?`)) return;
        setItems(items.filter((item) => item.id !== id));
    }

    return (
        <div className="p-5">
            <div className="flex flex-col justify-center bg-white m-4 p-4 max-w-xl mx-auto">
                <h1 className="text-3xl mb-4">Create Form</h1>
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
                <h1 className="flex justify-center">=== Input Types ===</h1>
                <div className="flex items-center ">
                    {inputTypes.map((input) => (
                        <button
                            key={input.type}
                            className="bg-gray-200 px-4 py-2 border  hover:bg-gray-300 "
                            onClick={() => handleAddItem(input.type)}
                        >
                            {input.type}
                        </button>
                    ))}
                    <button onClick={() => console.log(items)}>
                        Check Items
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FormBuilder;
