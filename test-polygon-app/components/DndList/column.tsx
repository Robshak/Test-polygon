import { Column, Task } from "./DndList";
import styles from "./DndList.module.scss";
import TaskComponent from "./task";
import { Droppable } from "react-beautiful-dnd";

function ColumnComponent({ tasks, column }: { column: Column, tasks: Record<string, Task> }) {

    return (
        <div className={styles["container"]}>
            <h3 className={styles["title"]}>{column.title}</h3>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div className={styles["taskList"]}
                        {...provided.droppableProps}
                        ref={provided.innerRef}>
                        {column.taskIds.map((t, index) => {
                            const task = tasks[t];
                            return <TaskComponent
                                key={task.id}
                                task={task}
                                index={index} />;
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default ColumnComponent;
