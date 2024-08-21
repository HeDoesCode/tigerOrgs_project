import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import VerticalCard from "@/Components/VerticalCard";
import IconInvite from "@/Components/Icons/IconInvite";
import IconDotsVertical from "@/Components/Icons/IconDotsVertical";
import Home from "../Organizations/Home";
import IconEdit from "@/Components/Icons/IconEdit";
import IconForms from "@/Components/Icons/IconForms";
import IconHistory from "@/Components/Icons/IconHistory";

import Column from "@/Components/DnD/Column/Column";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import TextInput from "@/Components/ui/TextInput";
import NumberInput from "@/Components/ui/NumberInput";
import SelectInput from "@/Components/ui/SelectInput";
import RadioInput from "@/Components/ui/RadioInput";
import CheckboxesInput from "@/Components/ui/CheckboxesInput";
import FileUploadInput from "@/Components/ui/FileUploadInput";
import { FormActionsContext } from "@/Components/Forms/Context/FormsAction";

const inputTypes = [
    { type: "text", component: TextInput },
    { type: "number", component: NumberInput },
    { type: "select", component: SelectInput },
    { type: "radio", component: RadioInput },
    { type: "checkboxes", component: CheckboxesInput },
    { type: "pdf upload", component: FileUploadInput },
];

function AdminFormBuilder() {
    const [tasks, setTasks] = useState([]);

    function getTaskPos(id) {
        return tasks.findIndex((task) => task.id === id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setTasks((tasks) => {
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);

            return arrayMove(tasks, originalPos, newPos);
        });
    }

    function handleAddTask(type) {
        const inputType = inputTypes.find((input) => input.type === type);
        if (inputType) {
            const newTaskId = uuidv4();
            setTasks([
                ...tasks,
                {
                    id: newTaskId,
                    title: type,
                    Component: inputType.component,
                    value: "",
                    required: false,
                },
            ]);
        }
    }

    function handleDeleItem(id) {
        if (!confirm(`Are you sure you want to delete item ${id}?`)) return;
        setTasks(tasks.filter((item) => item.id !== id));
    }
    function handleChange(id, newTextValue, newNumberValue) {
        setTasks((tasks) =>
            tasks.map((task) =>
                task.id === id
                    ? {
                          ...task,
                          value: newTextValue,
                          numberValue: newNumberValue,
                      }
                    : task
            )
        );
    }

    function saveFormAsDraft() {
        const formData = JSON.stringify(tasks);
        console.log("Form Data to be saved:", formData);
        localStorage.setItem("formDraft", formData);
        alert("Form saved as draft!");
    }

    function loadFormDraft() {
        if (
            tasks.length > 0 &&
            !confirm(
                "Loading the draft will overwrite your current form. Proceed?"
            )
        )
            return;

        const savedForm = localStorage.getItem("formDraft");
        if (savedForm) {
            setTasks(JSON.parse(savedForm));
        } else {
            alert("No draft found!");
        }
    }

    return (
        <div className="w-full">
            <Head title="Admin Dashboard" />
            <AdminLayout>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconCheckBox />,
                            label: "Student Applications",
                            link: "admin.applications",
                        },
                        {
                            icon: <IconForms />,
                            label: "Recruitment Form",
                            link: "admin.forms",
                        },
                        {
                            icon: <IconHistory />,
                            label: "Form History",
                            link: "admin.formhistory",
                        },
                    ]}
                    title="Manage Recruitment Form"
                >
                    <div className="p-5">
                        <div className="flex flex-col justify-center bg-white m-4 p-4 max-w-xl mx-auto">
                            <h1 className="text-3xl mb-4">Form Builder test</h1>
                            <FormActionsContext.Provider value={handleDeleItem}>
                                <DndContext
                                    onDragEnd={handleDragEnd}
                                    collisionDetection={closestCorners}
                                >
                                    <Column
                                        tasks={tasks}
                                        onChange={handleChange}
                                    />
                                </DndContext>
                            </FormActionsContext.Provider>

                            <div className="flex justify-center items-center ">
                                <button
                                    className="bg-gray-200 m-1 px-4 py-2 rounded"
                                    onClick={saveFormAsDraft}
                                >
                                    Save as Draft
                                </button>
                                <button
                                    className="bg-gray-200 px-4 py-2 rounded "
                                    onClick={loadFormDraft}
                                >
                                    Load Draft
                                </button>
                            </div>

                            <br />
                            <br />
                            <h1 className="flex justify-center">
                                === Input Types ===
                            </h1>
                            <div className="flex items-center space-y-2">
                                {inputTypes.map((input) => (
                                    <button
                                        key={input.type}
                                        className="bg-gray-200 px-4 py-2 border rounded hover:bg-gray-300 "
                                        onClick={() =>
                                            handleAddTask(input.type)
                                        }
                                    >
                                        {input.type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default AdminFormBuilder;
