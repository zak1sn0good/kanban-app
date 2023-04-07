import { TaskModel } from "../utils/models";
import { ColumnType } from "../utils/enums";
import { useLocalStorage } from "usehooks-ts";

function useTaskCollection(){
  return useLocalStorage<{ [key in ColumnType] : TaskModel[] }>('tasks', {
    Todo : [],
    "In progress" : [],
    Blocked : [],
    Completed : []
  });
};

export default useTaskCollection;