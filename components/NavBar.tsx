import { Box, Container, Flex, Heading, IconButton, Link, Stack, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Container maxW={"100%"} py={4}>
      <Flex direction={"row"} justifyContent={"space-between"} alignItems="center">
        <IconButton
          aria-label="Menu"
          icon={<HamburgerIcon />}
          display={{ base: "block", md: "none" }}
          onClick={onToggle}
        />
        <Box display={{ base: isOpen ? "block" : "none", md: "flex" }} alignItems="center">
          <Stack direction={{ base: "column", md: "row" }} spacing={2}>
            <Box
              as={Link}
              href={"/"}
              fontSize="sm"
              display="block"
              py={2}
              px={4}
              borderWidth={1}
              borderRadius="md"
              borderColor="gray.500"
              _hover={{ bg: "gray.100" }}
              width={{ base: "100%", md: "auto" }}
              textAlign={{ base: "center", md: "left" }}
            >
              Play
            </Box>
            <Box
              as={Link}
              href={"/shop"}
              fontSize="sm"
              display="block"
              py={2}
              px={4}
              borderWidth={1}
              borderRadius="md"
              borderColor="gray.500"
              _hover={{ bg: "gray.100" }}
              width={{ base: "100%", md: "auto" }}
              textAlign={{ base: "center", md: "left" }}
            >
            Market Place
            </Box>
            <Box
              as="a"  // Use "a" tag for external links
              href="https://metamask.io/"  // Replace with your external link
              target="_blank"  // Open link in a new tab
              rel="noopener noreferrer"  // Security best practice
              fontSize="sm"
              display="block"
              py={2}
              px={4}
              borderWidth={1}
              borderRadius="md"
              borderColor="gray.500"
              _hover={{ bg: "gray.100" }}
              width={{ base: "100%", md: "auto" }}
              textAlign={{ base: "center", md: "left" }}
            >
              Wallet
            </Box>
            <Box
              as="a"  // Use "a" tag for external links
              href="https://onramp.pokoapp.xyz/?apiKey=734c4a23-e256-46c4-b917-974f759a6aee&userId=poko_prod&cryptoList=MATIC-polygon"  // Replace with your external link
              target="_blank"  // Open link in a new tab
              rel="noopener noreferrer"  // Security best practice
              fontSize="sm"
              display="block"
              py={2}
              px={4}
              borderWidth={1}
              borderRadius="md"
              borderColor="gray.500"
              _hover={{ bg: "gray.100" }}
              width={{ base: "100%", md: "auto" }}
              textAlign={{ base: "center", md: "left" }}
            >
              New In Crypto
            </Box>
            <Box
              as="a"  // Use "a" tag for external links
              href="https://bitso.com/"  // Replace with your external link
              target="_blank"  // Open link in a new tab
              rel="noopener noreferrer"  // Security best practice
              fontSize="sm"
              display="block"
              py={2}
              px={4}
              borderWidth={1}
              borderRadius="md"
              borderColor="gray.500"
              _hover={{ bg: "gray.100" }}
              width={{ base: "100%", md: "auto" }}
              textAlign={{ base: "center", md: "left" }}
            >
              Exchange
            </Box>
          </Stack>
        </Box>
        <Box display={{ base: "none", md: "block" }}>
          <ConnectWallet />
        </Box>
      </Flex>
    </Container>
  );
}
