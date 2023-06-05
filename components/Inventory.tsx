import { MediaRenderer, Web3Button, useAddress, useContract } from '@thirdweb-dev/react';
import { NFT } from '@thirdweb-dev/sdk';
import { STAKING_ADDRESS, LEGENDS_ADDRESS } from '../constant/addresses';
import Link from 'next/link';
import { Text, Box, Button, Card, SimpleGrid, Stack, useMediaQuery } from '@chakra-ui/react';

type Props = {
  nft: NFT[] | undefined;
};

export function Inventory({ nft }: Props) {
  const address = useAddress();
  const { contract: toolContract } = useContract(LEGENDS_ADDRESS);
  const { contract: stakingContract } = useContract(STAKING_ADDRESS);

  async function stakeNFT(id: string) {
    if (!address) {
      return;
    }

    const isApproved = await toolContract?.erc1155.isApproved(
      address,
      STAKING_ADDRESS,
    );

    if (!isApproved) {
      await toolContract?.erc1155.setApprovalForAll(
        STAKING_ADDRESS,
        true,
      );
    }
    await stakingContract?.call("stake", [id, 1]);
  }

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  if (nft?.length === 0) {
    return (
      <Box>
        <Text>No Legends</Text>
        <Link href="/shop">
          <Button>Shop Legends</Button>
        </Link>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={[1, isMobile ? 1 : 3]} spacing={4}>
      {nft?.map((nft) => (
        <Card key={nft.metadata.id} p={5}>
          <Stack alignItems="center">
            <MediaRenderer 
              src={nft.metadata.image} 
              height="100px"
              width="100px"
              style={{ borderRadius: "10px" }}
            />
            <Text>{nft.metadata.name}</Text>
            <Web3Button
              contractAddress={STAKING_ADDRESS}
              action={() => stakeNFT(nft.metadata.id)}
            >
              Send to Gallery
            </Web3Button>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}

export default Inventory;
