import { Box, Heading, IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Navbar = () => {

  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <Box 
      width={'full'} 
      px={'10'} 
      py={'4'} 
      display="flex" 
      alignItems={'center'} 
      justifyContent="space-between"
      shadow={'base'}
      bg={useColorModeValue('gray.700', 'white')}
      zIndex={10} 
    >
      <Heading 
        as={'h3'} 
        fontSize={'2xl'} 
        fontWeight={'semibold'}
        color={useColorModeValue('gray.200', 'gray.800')}
      >
        Task's Kanban
      </Heading>
      <IconButton
        onClick={toggleColorMode}
        aria-label="themeButton"
        icon={colorMode === 'dark' ? <SunIcon/> : <MoonIcon/>}
        colorScheme={useColorModeValue('whiteAlpha', 'blackAlpha')}
      />
    </Box>
  );
}
 
export default Navbar;