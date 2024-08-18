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
            <div className="flex flex-col items-center justify-center bg-white o">
                <h1 className="text-3xl min o">Form Builder test</h1>
                <DndContext
                    onDragEnd={handleDragEnd}
                    collisionDetection={closestCorners}
                >
                    <Column tasks={tasks} />
                </DndContext>
                <br />
                <br />
                <h1 className="o">=== Input Types ===</h1>
                {inputTypes.map((input) => (
                    <button
                        key={input.type}
                        style={{ display: "block" }}
                        onClick={() => handleAddTask(input.type)}
                    >
                        {input.type}
                    </button>
                ))}
            </div>
        </>
    );
}

export default FormBuilder;