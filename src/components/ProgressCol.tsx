import { GridItem, Badge, IconButton, Box, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Task from "./Task";
import useColumnTasks from "../hooks/useColumnTasks";
import { ColumnType } from "../utils/enums";
import useColumnDrop from "../hooks/useColumnDrop";

const ProgressCol = (props : { label : ColumnType, color : string, }) => {

  const {tasks, addEmptyTask, deleteTask, updateTask, handleDrop, swapTasks} = useColumnTasks(props.label);
  const { isOver, dropRef } = useColumnDrop(props.label, handleDrop);

  return (
    <GridItem
      height={{ base : '80', lg : 'full' }}
      bgColor={useColorModeValue('gray.700','white')}
      shadow='base'
      px='4'
      py='4'
      borderRadius={'base'}
      display='flex'
      flexDirection={'column'}
      alignItems={'start'}
      position='relative'
    >
      <Badge 
        colorScheme={props.color} 
        borderRadius={'full'}
        mb={'3'}
        px='3'
        py='1' 
      >
        {props.label}
      </Badge>
      <IconButton 
        aria-label="add-task" 
        colorScheme={useColorModeValue('whiteAlpha', 'blackAlpha')}
        width="full"
        minHeight={'6'}
        maxHeight={'6'}
        mb={'3'}
        icon={<AddIcon boxSize={3}/>}
        borderRadius={"full"}
        onClick={addEmptyTask}
      />
      <Box
        w='full' height={{ base : 'sm', lg : 'lg' }} overflow={'auto'} 
        display='flex' flexDir={{ base : 'row', lg : 'column' }} ref={dropRef}
        alignItems={{ base : 'start', lg : 'center' }} px={{ base : '0', lg : '2' }} 
        py={{ base : '2', lg : '2' }} opacity={ isOver ? 0.85 : 1 }
        css={{
          '&::-webkit-scrollbar': {
            width: '6px',
            height : '6px'
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor : '#ddd'
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '6px',
            backgroundColor : '#aaa'
          },
        }}
      >
        {
          tasks.map((task, index) => (
            <Task
              index={index}
              task={task}
              key={task.id}
              onDelete={deleteTask}
              onUpdate={updateTask}
              onDropHover={swapTasks}
            />
          ))
        }
      </Box>
      
    </GridItem>
  );
}
 
export default ProgressCol;