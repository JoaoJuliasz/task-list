import { useDrag, useDrop } from "react-dnd";
import { Item } from "../types/DragNDrop.type";
export const useDragNDrop = (
    type: "TASK" | "ITEM",
    dragRef: React.RefObject<HTMLDivElement>,
    item: Item,
    hoverFn: (item: Item) => void,
    dropFn?: (item: Item, monitor: any) => void) => {
    const [{ isDragging }, drag] = useDrag({
        type: type,
        item: item,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: type,
        hover(item: Item) {
            hoverFn(item)
        },
        drop: (item, monitor) => { if (dropFn) dropFn(item, monitor) },
    });

    drag(drop(dragRef));

    return { isDragging }
};