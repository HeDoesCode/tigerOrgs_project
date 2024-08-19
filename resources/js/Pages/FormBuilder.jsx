import Column from "@/Components/DnD/Column/Column";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";

import TextInput from "@/Components/ui/TextInput";
import NumberInput from "@/Components/ui/NumberInput";
import SelectInput from "@/Components/ui/SelectInput";
import RadioInput from "@/Components/ui/RadioInput";
import CheckboxesInput from "@/Components/ui/CheckboxesInput";
import FileUploadInput from "@/Components/ui/FileUploadInput";

const inputTypes = [
    { type: "text", component: TextInput },
    { type: "number", component: NumberInput },
    { type: "select", component: SelectInput },
    { type: "radio", component: RadioInput },
    { type: "checkboxes", component: CheckboxesInput },
    { type: "pdf upload", component: FileUploadInput },
];

function FormBuilder() {
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
            const newTaskId = tasks.length + 1;
            setTasks([
                ...tasks,
                { id: newTaskId, title: type, Component: inputType.component },
            ]);
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center bg-white m-4 p-4 max-w-xl mx-auto">
                <h1 className="text-3xl mb-4">Form Builder test</h1>
                <DndContext
                    onDragEnd={handleDragEnd}
                    collisionDetection={closestCorners}
                >
                    <Column tasks={tasks} />
                </DndContext>
                <br />
                <br />
                <h1>=== Input Types ===</h1>
                <div className="flex items-center space-y-2">
                    {inputTypes.map((input) => (
                        <button
                            key={input.type}
                            className="bg-gray-200 px-4 py-2 border rounded hover:bg-gray-300 "
                            onClick={() => handleAddTask(input.type)}
                        >
                            {input.type}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default FormBuilder;
