import { Task } from "./DndList";
import styles from "./DndList.module.scss";
import { Draggable } from "react-beautiful-dnd";

function TaskComponent({ task, index }: { task: Task, index: number }) {

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className={styles["taskWrapper"]}>{task.content}</div>
            )}
        </Draggable>
    );
}

export default TaskComponent;
