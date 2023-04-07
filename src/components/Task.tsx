import { Box, IconButton } from "@chakra-ui/react";
import { TaskModel } from "../utils/models";
import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import AutoResizeTextArea from "./AutoResizeTextArea";
import { useTaskDnd } from "../hooks/useTaskDnd";

type TaskProps =  {
  index : number,
  task : TaskModel,
  onDelete : (id : TaskModel['id']) => void,
  onUpdate : (id : TaskModel['id'], updatedTask: TaskModel) => void,
  onDropHover : (i : number, j : number) => void
}

const Task = ({
  index,
  task,
  onUpdate,
  onDelete,
  onDropHover
} : TaskProps) => {

  const { ref, isDragging } = useTaskDnd<HTMLDivElement>({ task : task, index : index, handleDropHover : onDropHover });

  return (
    <Box 
      ref={ref} px='2' py='2' borderRadius='md' bgColor={task.color}
      display='flex' alignItems='start' position='relative' boxShadow='xl' as="div"
      role='group' cursor='grab' width='full' minW='fit-content' maxW='fit-content' 
      mb={{ base : '0', lg : '3' }} mr={{ base : '3', lg : '0' }} height='fit-content'
      opacity={ isDragging ? 0.8 : 1 }
    >
      <IconButton 
        aria-label="delete-task" colorScheme='solid' zIndex='10' size='md' 
        icon={<DeleteIcon/>} position='absolute' right='2' top='0' color='gray.700'
        opacity={0} _groupHover={{ opacity : 1 }}
        onClick={() => onDelete(task.id)}
      />
      <AutoResizeTextArea 
        value={task.title} fontWeight='semibold' cursor='inherit'
        border='none' resize='none' w='full' minH={70} maxH={200} 
        _focusVisible={{ outline : 'none' }} color={'gray.700'}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onUpdate(task.id, {id : task.id, color : task.color, title : e.target.value, column : task.column }) }
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor : '#eee'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor : '#888'
          },
        }} 
      />
    </Box>
  );
}
 
export default Task;