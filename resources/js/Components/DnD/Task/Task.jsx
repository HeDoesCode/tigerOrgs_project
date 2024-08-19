import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal } from "lucide-react";

function Task({ id, title, Component }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id,
        });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div className="p-2" ref={setNodeRef} style={style} {...attributes}>
            <div
                className=" drag-handle justify-center items-center flex bg-neutral-200 rounded-t-3xl"
                {...listeners}
            >
                <GripHorizontal />
            </div>
            <div>
                {Component ? <Component /> : <input type="checkbox" />}
                {title}
            </div>
        </div>
    );
}

export default Task;
