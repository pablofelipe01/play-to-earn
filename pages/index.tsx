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
          <Heading my={"40px"}>Welcome to Ethereal Quest</Heading>
          <ConnectWallet />
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
