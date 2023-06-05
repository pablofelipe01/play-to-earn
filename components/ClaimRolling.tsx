import { MediaRenderer, Web3Button, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { ROLLING_ADDRESS } from "../constant/addresses";
import { Box, Container, Flex, Heading, Text, Link } from "@chakra-ui/react";

export function ClaimRolling() {
  const { contract } = useContract(ROLLING_ADDRESS);
  const { data: metadata } = useContractMetadata(contract);

  return (
    <Container maxW={"1200px"}>
      <Flex direction={"column"} alignItems={"center"} justifyContent={"center"} h={"100vh"}>
        <Heading>Alpha Visionary</Heading>
        <Box borderRadius={"10px"} overflow={"hidden"} my={10} height="300px">
          <MediaRenderer src={metadata?.image} height="100%" width="100%" />
        </Box>
        <Web3Button
          contractAddress={ROLLING_ADDRESS}
          action={(contract) => contract.erc1155.claim(0, 1)}
        >
          NFT Powerplay
        </Web3Button>
       
        <Text mt={2} fontSize="lg" textAlign="center" color="gray.600">
          All proceeds from this game go directly to supporting Camphill Agualinda, a non-profit community dedicated to empowering individuals with special needs.
        </Text>
        <Link
          href="https://camphillagualinda.com/home"
          target="_blank"
          rel="noopener noreferrer"
          mt={2}
          display="inline-block"
          px={4}
          py={2}
          border="1px solid black"
          borderRadius="md"
          textDecoration="none"
        >
          Visit Agualinda
        </Link>
        <Link
          href="https://www.youtube.com/watch?v=qSZuLdvhT1Q"
          target="_blank"
          rel="noopener noreferrer"
          mt={2}
          display="inline-block"
          px={4}
          py={2}
          border="1px solid black"
          borderRadius="md"
          textDecoration="none"
          ml={2}
          pr={4}
        >
          How to play
        </Link>
      </Flex>
    </Container>
  );
}

export default ClaimRolling;
