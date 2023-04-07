import { Grid, useColorModeValue } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MainLayout = (props : { children? : React.ReactNode }) => {
  return (
    <DndProvider backend={HTML5Backend}>
        <Grid
          width='full'
          height='max-content'
          px={{ base : '8', lg : '8', xl : '16', '2xl' : '32' }}
          py='12'
          gap={4}
          templateColumns={{ base : 'repeat(1, 1fr)', lg : 'repeat(4, 1fr)' }}
          bg={useColorModeValue('gray.800', 'gray.50')}
        >
          {props.children}
      </Grid>
    </DndProvider>
  );
}
 
export default MainLayout;