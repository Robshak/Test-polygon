import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
// import styles from "./DndList.module.scss";
import ColumnComponent from "./column";

export interface Task {
    id: string;
    content: string;
}

export interface Column {
    id: string;
    title: string;
    taskIds: string[];
}

interface IInitialData {
    tasks: Record<string, Task>;
    columns: Record<string, Column>;
    columnOrder: string[];
}

const initialData: IInitialData = {
    tasks: {
        "task-1": { id: "task-1", content: "first" },
        "task-2": { id: "task-2", content: "second" },
        "task-3": { id: "task-3", content: "third" },
        "task-4": { id: "task-4", content: "four" }
    },
    columns: {
        "column-1": {
            id: "column-1",
            title: "To do",
            taskIds: ["task-1", "task-2", "task-3", "task-4"]
        }
    },
    columnOrder: ["column-1"]
};

const DraggableList: React.FC = () => {
    const [state, setState] = useState(initialData);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const column = state.columns[source.droppableId];
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn: Column = {
            ...column,
            taskIds: newTaskIds
        };

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newColumn.id]: newColumn
            }
        };

        setState(newState);
    };

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            {state.columnOrder.map(columnId => {
                const column = state.columns[columnId];
                //const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

                return <ColumnComponent
                    key={column.id}
                    column={column}
                    tasks={state.tasks} />;
            })}
        </DragDropContext>
    );
};

export default DraggableList;
