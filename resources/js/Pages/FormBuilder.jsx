import Column from "@/Components/DnD/Column/Column";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";

const inputTypes = [
    { type: "text" },
    { type: "number" },
    { type: "select" },
    { type: "radio" },
    { type: "checkboxes" },
    { type: "pdf upload" },
    { type: "image upload" },
];

function FormBuilder() {
    const [tasks, setTasks] = useState([]);

    function getTaskPos(id) {
        return tasks.findIndex((task) => task.id === id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id === over.id) return;

        setTasks((tasks) => {
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);

            return arrayMove(tasks, originalPos, newPos);
        });
    }

    function handleAddTask(type) {
        const newTaskId = tasks.length + 1;
        setTasks([...tasks, { id: newTaskId, title: type }]);
    }

    return (
        <>
            <h1>Form Builder test</h1>
            <DndContext
                onDragEnd={handleDragEnd}
                collisionDetection={closestCorners}
            >
                <Column tasks={tasks} />
            </DndContext>
            <br />
            <br />
            <h1>=== Input Types ===</h1>
            {inputTypes.map((input) => (
                <button
                    key={input.type}
                    style={{ display: "block" }}
                    onClick={() => handleAddTask(input.type)}
                >
                    {input.type}
                </button>
            ))}
        </>
    );
}

export default FormBuilder;
