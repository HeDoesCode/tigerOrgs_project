import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

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

function FormBuilder({ orgID, formData, criterias }) {
    const [items, setItems] = useState(formData?.formLayout?.layout || []);

    const { data, setData, post, patch, processing, errors } = useForm({
        name: formData?.formLayout?.name || "",
        desc: formData?.formLayout?.desc || "",
        criteria: formData?.criteriaID || "",
        layout: formData?.formLayout?.layout || [],
    });

    function getItemPos(id) {
        return items.findIndex((item) => item.id === id);
    }

    function handleDragEnd(e) {
        const { active, over } = e;

        if (active.id === over.id) return;

        setItems((items) => {
            const originalPos = getItemPos(active.id);
            const newPos = getItemPos(over.id);

            const newItems = arrayMove(items, originalPos, newPos);
            setData("layout", newItems);
            return newItems;
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
        const newItems = [...items, newItem];
        setItems(newItems);
        setData("layout", newItems);
    }

    function handleEditItem(id, itemData) {
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
                    name: itemData.question,
                    required: itemData.required,
                    options: itemData.options,
                };
                break;
            default:
                updatedItems[editedItemIndex] = {
                    ...updatedItems[editedItemIndex],
                    name: itemData.question,
                    required: itemData.required,
                };
        }

        setItems(updatedItems);
        setData("layout", updatedItems);
    }

    function handleDeleteItem(id) {
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
        setData("layout", newItems);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!e.target.checkValidity()) {
            e.target.reportValidity();
            return;
        }

        const dataToBeSent = {
            name: data.name,
            desc: data.desc,
            layout: data.layout,
            criteria: data.criteria,
        };

        if (!formData) {
            post(`/admin/${orgID}/form-builder/save`);
        } else {
            patch(`/admin/${orgID}/form-builder/save/${formData.formID}`);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center m-4 p-4 max-w-3xl mx-auto rounded-xl"
                noValidate={false}
            >
                <h1 className="font-semibold text-3xl mb-4 px-2 text-center">
                    {formData ? "Modify" : "Create"} Form
                </h1>
                <input
                    type="text"
                    className="w-full bg-transparent rounded-xl border-[1.5px] border-x-stone-600 mb-4 p-2"
                    placeholder="Form title..."
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                />
                {errors.name && (
                    <div className="text-red-500">{errors.name}</div>
                )}

                <input
                    type="text"
                    className="w-full bg-transparent rounded-xl border-[1.5px] border-x-stone-600 mb-2"
                    placeholder="Form description..."
                    value={data.desc}
                    onChange={(e) => setData("desc", e.target.value)}
                />
                {errors.desc && (
                    <div className="text-red-500">{errors.desc}</div>
                )}

                <select
                    value={data.criteria}
                    onChange={(e) => setData("criteria", e.target.value)}
                    className="w-full mt-2 bg-transparent rounded-xl border-[1.5px] border-x-stone-600 mb-2"
                >
                    <option value="">No Criteria Selected</option>
                    {criterias.map((criteria) => (
                        <option
                            key={criteria.criteriaID}
                            value={criteria.criteriaID}
                        >
                            {criteria.name}
                        </option>
                    ))}
                </select>
                {errors.criteria && (
                    <div className="text-red-500">{errors.criteria}</div>
                )}

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

                <div className="flex flex-wrap sm:flex-nowrap  text-xs text-center rounded-3xl bg-gray-200 m-2">
                    {inputTypes.map((input) => (
                        <button
                            type="button"
                            key={input.type}
                            className="flex flex-col items-center justify-center rounded-3xl w-1/4 sm:w-full py-3 sm:py-4 px-1 hover:bg-gray-300 transition ease-in-out duration-200"
                            onClick={() => handleAddItem(input.type)}
                        >
                            <div className="w-6 h-6 mx-auto">
                                {input.icon && <input.icon />}
                            </div>
                            <span className="mt-1 text-[10px] sm:text-xs">
                                {input.type}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="flex justify-end space-x-3">
                    {formData && (
                        <Link
                            className="bg-[#e25454] hover:bg-[#d44040] text-white font-medium text-lg transition ease-in-out duration-300 w-fit text-right px-4 py-1 border rounded-full"
                            href={route("admin.forms", [orgID])}
                        >
                            Cancel
                        </Link>
                    )}
                    <button
                        type="submit"
                        disabled={processing || data.layout.length === 0}
                        className="bg-[#04aa6dd5] hover:bg-[#04AA6D] text-white font-medium text-lg transition ease-in-out duration-300 w-fit text-right px-4 py-1 border rounded-full disabled:opacity-50"
                    >
                        {processing ? "Saving..." : "Save Draft"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormBuilder;
