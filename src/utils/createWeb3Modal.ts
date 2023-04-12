import { Web3Modal } from "@web3modal/standalone";

export const createWeb3Modal = () => {
  return new Web3Modal({
    projectId: process.env["REACT_APP_WALLET_CONNECT_PROJECT_ID"]!,
    walletConnectVersion: 2,
  });
}
