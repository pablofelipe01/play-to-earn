import React from "react";
import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useNFT,
} from "@thirdweb-dev/react";
import { STAKING_ADDRESS, LEGENDS_ADDRESS } from "../constant/addresses";
import { ethers } from "ethers";
import styles from "../styles/Home.module.css";
import { Text, Box, Card, Flex } from "@chakra-ui/react";

interface EquippedProps {
  tokenId: number;
}

export const Equipped: React.FC<EquippedProps> = (props) => {
  const address = useAddress();

  const { contract: toolContract } = useContract(LEGENDS_ADDRESS);
  const { data: nft } = useNFT(toolContract, props.tokenId);

  const { contract: stakingContract } = useContract(STAKING_ADDRESS);

  const { data: claimableRewards } = useContractRead(
    stakingContract,
    "getStakeInfoForToken",
    [props.tokenId, address]
  );

  return (
    <Box textAlign="center">
      {nft && (
        <Card className={styles.equipcontainer} p={5}>
          <Flex direction={["column", "row"]} alignItems={["center", "flex-start"]}>
            <Box width={["100%", "80%"]} mx="auto" mb={[4, 0]}>
              <MediaRenderer
                src={nft.metadata.image}
                height="100%"
                width="100%"
                style={{ borderRadius: "10px" }}
              />
            </Box>
            <Box ml={[0, 4]} textAlign={["center", "left"]}>
              <Text fontSize={["2xl", "3xl"]} fontWeight="bold">
                {nft.metadata.name}
              </Text>
              <Text>{nft.metadata.description}</Text>
              <Text>in Gallery {ethers.utils.formatUnits(claimableRewards[0], 0)}</Text>
               <Web3Button
                contractAddress={STAKING_ADDRESS}
                action={(contract) => contract.call("withdraw", [props.tokenId, 1])}
              >
                Back to Cellar
              </Web3Button>  
            </Box>
          </Flex>
          <Box mt={5}>
            <Text>Claimable $AL</Text>
            <Text>{ethers.utils.formatUnits(claimableRewards[1], 18)}</Text>
            <Web3Button
              contractAddress={STAKING_ADDRESS}
              action={(contract) => contract.call("claimRewards", [props.tokenId])}
            >
              Claim $AL
            </Web3Button>
          </Box>
        </Card>
      )}
    </Box>
  );
};

export default Equipped;
