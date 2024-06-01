import React, { useState } from "react";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Item {
    id: string;
    content: string;
}

interface SortableItemProps {
    id: string;
    content: string;
}

function SortableItem({ id, content }: SortableItemProps) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "16px",
        margin: "0 0 8px 0",
        backgroundColor: "#456C86",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {content}
        </div>
    );
}

const DragAndDropList: React.FC = () => {
    const [items, setItems] = useState<Item[]>([
        { id: "1", content: "Item 1" },
        { id: "2", content: "Item 2" },
        { id: "3", content: "Item 3" },
        { id: "4", content: "Item 4" },
        { id: "5", content: "Item 5" },
        { id: "6", content: "Item 6" },
        { id: "7", content: "Item 7" },
        { id: "8", content: "Item 8" },
        { id: "9", content: "Item 9" },
        { id: "10", content: "Item 10" },
        { id: "11", content: "Item 11" },
        { id: "12", content: "Item 12" },
        { id: "13", content: "Item 13" },
        { id: "14", content: "Item 14" },
        { id: "15", content: "Item 15" },
        { id: "16", content: "Item 16" },
        { id: "17", content: "Item 17" },
        { id: "18", content: "Item 18" },
        { id: "19", content: "Item 19" },
        { id: "20", content: "Item 20" },
    ]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div style={{ padding: 8, width: 250, minHeight: 500, backgroundColor: "lightgrey" }}>
                    {items.map((item) => (
                        <SortableItem key={item.id} id={item.id} content={item.content} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

export default DragAndDropList;
