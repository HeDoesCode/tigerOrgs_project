import { useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FormActionsContext } from "../Context/FormActions";
import EditPropertiesForm from "./EditPropertiesForm";

function EditableItem({ id, item }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    const handleDeleteItem = useContext(FormActionsContext);

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <div>
                {item.type}
                <button onClick={() => handleDeleteItem(id)}>
                    ========== Delete
                </button>
            </div>
            <div>
                <EditPropertiesForm itemType={item.type} />
            </div>
        </div>
    );
}

export default EditableItem;
