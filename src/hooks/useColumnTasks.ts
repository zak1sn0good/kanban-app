import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { ColumnType } from "../utils/enums";
import { pickChakraRandomColor, swap } from "../utils/helpers";
import { TaskModel } from "../utils/models";
import useTaskCollection from "./useTaskCollection";

const MAX_TASKS_PER_COL = 100;

function useColumnTasks(column : ColumnType){
  
  const [tasks, setTasks] = useTaskCollection();
  
  const addEmptyTask = useCallback(() => {
    setTasks(allTasks => {
      const colTasks = allTasks[column];
        if(colTasks.length === MAX_TASKS_PER_COL){
          console.log('too many tasks!');
          return allTasks;
        }else{
          const newTask : TaskModel = {
            column : column,
            title : 'new task!',
            color : pickChakraRandomColor('.300'),
            id : uuidv4()
          };
          return {
            ...allTasks,
            [column] : [ newTask, ...colTasks ]
          };
        }
    });
  },[column, setTasks]);

  const updateTask = useCallback((id : TaskModel['id'], updatedTask : TaskModel) => {
    setTasks(allTasks => {
      const colTasks = allTasks[column].map((task, _) => id === task.id ? updatedTask : task );
      
      return {
        ...allTasks,
        [column] : colTasks
      }
    });
  }, [column, setTasks]);

  const deleteTask = useCallback((id : TaskModel['id']) => {
    setTasks(allTasks => {
      const colTasks = allTasks[column];
      return {
        ...allTasks,
        [column] : colTasks.filter(task => task.id !== id)
      }
    });
  }, [column, setTasks]);

  const handleDrop = useCallback((from  : ColumnType, id : TaskModel['id']) : void => {
    setTasks(allTasks => {
      
      const fromColumnTasks = allTasks[from];
      const colTasks = allTasks[column];
      const movingTask = fromColumnTasks.find(task => task.id === id);

      if(!movingTask){
        return allTasks;
      }

      return {
        ...allTasks,
        [column] : [ { ...movingTask, column } , ...colTasks],
        [from] : fromColumnTasks.filter(task => task.id !== id) 
      };

    });
  }, [column, setTasks]);

  const swapTasks = useCallback((i : number, j : number) => {
    setTasks(allTasks => {
      const colTasks = allTasks[column];
      return {
        ...allTasks,
        [column] : swap(colTasks, i, j)
      }
    });
  }, [column, setTasks]);

  return {
    tasks : tasks[column],
    addEmptyTask,
    updateTask,
    deleteTask,
    handleDrop,
    swapTasks
  }
};

export default useColumnTasks;
