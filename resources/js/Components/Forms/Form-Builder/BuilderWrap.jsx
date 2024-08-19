import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import EditableItem from "./EditableItem";

function BuilderWrap({ items }) {
    return (
        <>
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                {items.map((item) => (
                    <EditableItem key={item.id} id={item.id} item={item} />
                ))}
            </SortableContext>
        </>
    );
}

export default BuilderWrap;
