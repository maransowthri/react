import {
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

import background from "./background.svg";

import Navbar from "./Navbar";

const IndexPage = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <>
      <Navbar />
      <Flex height="80vh" my={6} justifyContent="center">
        <Flex
          direction="column"
          background={formBackground}
          padding={12}
          rounded={6}
        >
          <Heading mb={6}>Log in</Heading>
          <Input
            placeholder="johndoe@gmail.com"
            variant="filled"
            mb={3}
            type="email"
          />
          <Input placeholder="******" variant="filled" mb={6} type="password" />
          <Button mb={6} colorScheme="teal">
            Log in
          </Button>
          <Button onClick={toggleColorMode}>Switch Color Mode</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default IndexPage;
