import SignClient from "@walletconnect/sign-client";
import { Web3Modal } from "@web3modal/standalone";

export const getWeb3ModalApproval = async ({ signClient, web3Modal }: { signClient: SignClient, web3Modal: Web3Modal }) => {
  const namespaces = {
    eip155: {
      methods: ["eth_sign"],
      chains: ["eip155:56"],
      events: ["accountsChanged"],
    },
  };

  const { uri, approval } = await signClient.connect({
    requiredNamespaces: namespaces,
  });

  if (uri) {
    await web3Modal.openModal({
      uri,
      standaloneChains: namespaces.eip155.chains,
    });

    return approval();
  }
}
