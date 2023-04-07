import { useDrop } from "react-dnd";
import { ColumnType, ItemType } from "../utils/enums";
import { DragItemModel, TaskModel } from "../utils/models";

function useColumnDrop(
  column : ColumnType,
  handleDrop : ( fromColumn : ColumnType, taskId : TaskModel['id'] ) => void
){
  const [{ isOver }, dropRef] =  useDrop< DragItemModel, void, { isOver : boolean } >({
    accept : ItemType.TASK,
    drop : (dragItem) => {
      if(!dragItem || dragItem.from === column){
        return;
      }

      handleDrop(dragItem.from, dragItem.id);

    },
    collect : (monitor) => ({
      isOver : monitor.isOver(),
    })
  });

  return {
    isOver,
    dropRef
  }

};

export default useColumnDrop;