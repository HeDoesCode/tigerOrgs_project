import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import GripHorizontal from "@/Components/Icons/Grip-Horizontal";
import EditSimpleItem from "./EditSimpleItem";
import EditMultiChoiceItem from "./EditMultiChoiceItem";

// Define a mapping from item types to more descriptive labels
const typeLabels = {
    text: "Text Input",
    number: "Number Input",
    select: "Select Dropdown",
    radio: "Multiple Choice",
    checkbox: "Checkboxes",
    "pdf upload": "PDF Upload",
};

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
                <div className="flex ">
                    <h3 className="w-fit px-3 py-1 text-zinc-700 text-sm underline">
                        {typeLabels[item.type] || item.type}
                    </h3>
                </div>
                {item.type === "Select" ||
                item.type === "Radio Group" ||
                item.type === "Checkbox" ? (
                    <EditMultiChoiceItem id={id} />
                ) : (
                    <EditSimpleItem id={id} />
                )}
            </div>
        </div>
    );
}

export default EditableItem;
