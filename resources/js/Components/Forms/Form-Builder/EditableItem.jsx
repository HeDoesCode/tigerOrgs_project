import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import GripHorizontal from "@/Components/Icons/Grip-Horizontal";
import EditSimpleItem from "./EditSimpleItem";
import EditMultiChoiceItem from "./EditMultiChoiceItem";
import EditImageUploadItem from "./EditImageUploadItem";

// Define a mapping from item types to more descriptive labels
const typeLabels = {
    text: "Text Input",
    number: "Number Input",
    select: "Select Dropdown",
    email: "Email Input",
    radio: "Multiple Choice",
    checkbox: "Checkboxes",
    file_upload: "PDF Upload",
    image_upload: "Image Upload",
};

function EditableItem({ id, item }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div className="py-2" ref={setNodeRef} {...attributes} style={style}>
            <div
                className="drag-handle justify-center items-center flex bg-neutral-200 rounded-t-2xl"
                {...listeners}
            >
                <GripHorizontal />
            </div>
            <div className=" border p-3 bg-[#F3F3F3] rounded-b-2xl ">
                <div className="">
                    <div className="w-44  mb-3">
                        <h3 className="px-3 py-1 text-black/50 text-sm underline font-medium">
                            {typeLabels[item.type] || item.type}
                        </h3>
                    </div>

                    {item.type === "image_upload" ? (
                        <EditImageUploadItem
                            id={id}
                            item={item}
                            required={true}
                        />
                    ) : item.type === "select" ||
                      item.type === "radio" ||
                      item.type === "checkbox" ? (
                        <EditMultiChoiceItem
                            id={id}
                            item={item}
                            required={true}
                        />
                    ) : (
                        <EditSimpleItem id={id} item={item} required={true} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditableItem;
