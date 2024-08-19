import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "../Task/Task";

function Column({ tasks }) {
    return (
        <div>
            <SortableContext
                items={tasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
            >
                {tasks.map((task) => (
                    <Task
                        id={task.id}
                        key={task.id}
                        Component={task.Component}
                        value={task.value}
                    />
                ))}
            </SortableContext>
        </div>
    );
}

export default Column;
