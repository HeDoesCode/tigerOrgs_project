import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
        <div ref={setNodeRef} style={style} {...attributes}>
            <div className="drag-handle" {...listeners}>
                Drag Here
            </div>
            <div>
                {Component ? <Component /> : <input type="checkbox" />}
                {title}
            </div>
        </div>
    );
}

export default Task;
