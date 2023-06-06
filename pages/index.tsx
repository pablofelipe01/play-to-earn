import {
  ConnectWallet,
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";

import { ClaimRolling } from "../components/ClaimRolling";
import { Inventory } from "../components/Inventory";
import { Equipped } from "../components/Equipped";

import {
  ROLLING_ADDRESS,
  LEGENDS_ADDRESS,
  STAKING_ADDRESS,
  REWARDS_ADDRESS,
} from "../constant/addresses";
import type { NextPage } from "next";
import {
  Text,
  Box,
  Card,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Skeleton,
  Stack,
  useMediaQuery,
  Image
} from "@chakra-ui/react";

const Home: NextPage = () => {
  const address = useAddress();

  const { contract: rollingContract } = useContract(ROLLING_ADDRESS);
  const { contract: legendsContract } = useContract(LEGENDS_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);
  const { contract: rewardContract } = useContract(REWARDS_ADDRESS);

  const { data: ownedRollings, isLoading: loadingOwnedRollings } = useOwnedNFTs(
    rollingContract,
    address
  );

  const { data: ownedLegends, isLoading: loadingOwnedLegends } = useOwnedNFTs(
    legendsContract,
    address
  );

  const { data: equippedLegends } = useContractRead(
    stakingContract,
    "getStakeInfo",
    [address]
  );
  const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [
    address,
  ]);

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  if (!address) {
    return (
      <Container maxW={"1200px"}>
      <Flex
        direction={"column"}
        h={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          as="a" // Use "a" tag for external links
          href="https://onramp.pokoapp.xyz/?apiKey=734c4a23-e256-46c4-b917-974f759a6aee&userId=poko_prod&cryptoList=MATIC-polygon" // Replace with your external link
          target="_blank" // Open link in a new tab
          rel="noopener noreferrer" // Security best practice
          fontSize="sm"
          display="block"
          py={2}
          px={4}
          borderWidth={1}
          borderRadius="md"
          borderColor="gray.500"
          _hover={{ bg: "gray.100" }}
          width={{ base: "50%", md: "auto" }}
          textAlign="center"
        >
          New In Crypto <br /> Click here
        </Box>
        <br />
        <Box
          mb={8}
          display="flex"
          alignItems="center"
          flexDirection={{ base: "column", md: "row" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Image
            src="https://i.imgur.com/Msg51g7.png" // Replace with the path to your image
            alt="Image"
            width="300px"
            height="300px"
            objectFit="cover"
            borderRadius="full"
            mb={{ base: 4, md: 0 }}
          />
          <Flex direction="column" ml={{ base: 0, md: 4 }}>
            <Heading my={"40px"}>
              Welcome to <br /> Ethereal Quest
            </Heading>
            <Box alignSelf="flex-start">
              <ConnectWallet />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Container>
    );
  }

  if (loadingOwnedRollings) {
    return (
      <Container maxW={"1200px"}>
        <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
          <Spinner />
        </Flex>
      </Container>
    );
  }

  if (ownedRollings?.length === 0) {
    return (
      <Container maxW={"1200px"}>
        <ClaimRolling />
      </Container>
    );
  }

  return (
    <Container maxW={"1200px"}>
      <Card p={5}>
        <Heading>Alpha Visionary</Heading>
        <SimpleGrid columns={[1, 1, 2]} spacing={5}>
          <Box>
            {ownedRollings?.map((nft) => (
              <div key={nft.metadata.id}>
                <MediaRenderer src={nft.metadata.image} height="100%" width="100%" style={{ borderRadius: "10px" }}/>
              </div>
            ))}
          </Box>
          <Stack direction="row" spacing={5}>
            <Text fontSize="small" fontWeight="bold">
              $AL Balance:
            </Text>
            {rewardBalance && (
              <Text>{ethers.utils.formatUnits(rewardBalance, 18)}</Text>
            )}
          </Stack>
        </SimpleGrid>
      </Card>
      <Card p={5} my={10}>
        <Heading>Art Cellar</Heading>
        <Skeleton isLoaded={!loadingOwnedLegends}>
          <Inventory nft={ownedLegends} />
        </Skeleton>
      </Card>
      <Card p={5}>
        <Heading mb={"30px"}>My Gallery</Heading>
        <SimpleGrid columns={[1, 3]} spacing={10}>
          {equippedLegends &&
            equippedLegends[0].map((nft: BigNumber) => (
              <Equipped key={nft.toNumber()} tokenId={nft.toNumber()} />
            ))}
        </SimpleGrid>
      </Card>
    </Container>
  );
};

export default Home;
