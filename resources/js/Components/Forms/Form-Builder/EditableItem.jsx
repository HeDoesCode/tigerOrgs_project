import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import GripHorizontal from "@/Components/Icons/Grip-Horizontal";
import EditPropertiesForm from "./EditPropertiesForm";

function EditableItem({ id, item }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div className="p-2" ref={setNodeRef} {...attributes} style={style}>
            <div
                className="drag-handle justify-center items-center flex bg-neutral-200 rounded-t-3xl"
                {...listeners}
            >
                <GripHorizontal />
            </div>
            <div className="border p-3 bg-white rounded-bl-lg rounded-br-lg">
                <h3 className="px-3 py-1 text-zinc-700 text-sm underline">
                    {item.type}
                </h3>
                <EditPropertiesForm id={id} />
            </div>
        </div>
    );
}

export default EditableItem;
