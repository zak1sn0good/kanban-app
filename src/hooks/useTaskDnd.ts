import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { ItemType } from "../utils/enums";
import { DragItemModel, TaskModel } from "../utils/models";

export function useTaskDnd<T extends HTMLElement>({
  task,
  index,
  handleDropHover
} : {
  task : TaskModel,
  index : number,
  handleDropHover : (i : number, j : number) => void
}){

  const ref = useRef<T>(null);

  const [{ isDragging }, dragRef] = useDrag<
    DragItemModel,
    void,
    { isDragging : boolean }
  >({
    type : ItemType.TASK,
    item : {
      from : task.column,
      id : task.id,
      index : index
    },
    collect : (monitor) => ({
      isDragging : monitor.isDragging()
    })
  });

  const [_, drop] = useDrop<DragItemModel, void, unknown>({
    accept : ItemType.TASK,
    hover : (item, monitor) => {
      if(!ref.current){
        return;
      }

      const draggedItemIndex = item.index;
      const hoveredItemIndex = index;

      if(draggedItemIndex === hoveredItemIndex){
        return;
      }

      const draggedItemAboveHovered = draggedItemIndex > hoveredItemIndex;
      const draggedItemBelowHovered = draggedItemIndex < hoveredItemIndex;
      const { x : mouseX, y : mouseY } = monitor.getClientOffset() as XYCoord;
      const hoveredBoundingRect = ref.current.getBoundingClientRect();

      const hoveredMiddleHeight = (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2;
      const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top;
      
      const isMouseAboveHoveredMiddleHeight = mouseYRelativeToHovered < hoveredMiddleHeight;
      const isMouseBelowHoveredMiddleHeight = mouseYRelativeToHovered > hoveredMiddleHeight;

      if(draggedItemAboveHovered && isMouseAboveHoveredMiddleHeight){
        return;
      }

      if(draggedItemBelowHovered && isMouseBelowHoveredMiddleHeight){
        return;
      }

      handleDropHover(draggedItemIndex, hoveredItemIndex);

      item.index = hoveredItemIndex;

    }
  });

  dragRef(drop(ref));

  return{
    isDragging,
    ref
  }

}; 