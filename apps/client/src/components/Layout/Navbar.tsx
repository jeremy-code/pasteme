import NextLink from "next/link";
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Container,
  Heading,
  Text,
  Link,
} from "@chakra-ui/react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      px={4}
      as="header"
      shadow="base"
    >
      <Container
        display="flex"
        h={20}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box />
        <NextLink href="/" passHref>
          <Link _hover={{ textDecor: "none" }}>
            <Heading size="md">
              <Text
                as="span"
                marginRight={2}
                role="img"
                aria-label="Face with Stuck-Out Tongue Emoji"
              >
                😋
              </Text>
              pasteme
            </Heading>
          </Link>
        </NextLink>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? (
                <BsFillMoonStarsFill />
              ) : (
                <BsFillSunFill />
              )}
            </Button>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
