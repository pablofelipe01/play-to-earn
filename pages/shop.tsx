import { useContract, useNFTs } from "@thirdweb-dev/react";
import { LEGENDS_ADDRESS } from "../constant/addresses";
import Link from "next/link";
import { Text, Button, Container, Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import NFT from "../components/NFT";

export default function Shop() {
  const { contract } = useContract(LEGENDS_ADDRESS);
  const { data: nfts } = useNFTs(contract);
  console.log(nfts);

  return (
    <Container maxW={"1200px"}>
      <Flex
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={4} // Added margin-bottom for spacing
      >
        <Link href="/">
          <Button>Back</Button>
        </Link>
      </Flex>
      <Heading mt={"40px"}>Market Place</Heading>
      <Text>Purchase LEGENDS with $AL to increase your earnings.</Text>
      {!nfts ? (
        <Flex h={"50vh"} justifyContent={"center"} alignItems={"center"}>
          <Spinner />
        </Flex>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={10}>
          {nfts?.map((nftItem) => (
            <NFT key={nftItem.metadata.id} nft={nftItem} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
