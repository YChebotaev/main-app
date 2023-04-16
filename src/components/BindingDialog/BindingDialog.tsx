import { /* useState, useEffect, */ type FC } from "react";
// import { Web3Modal } from "@web3modal/standalone";
// import SignClient from "@walletconnect/sign-client";

import { Backdrop } from "../Backdrop";
import { Button } from "../Button";
import { useApiClient, useUserId, useSignClient } from "../../hooks";
import { createWeb3Modal, getWeb3ModalApproval } from "../../utils";

import classes from "./BindingDialog.module.css";

// const web3Modal = new Web3Modal({
//   projectId: process.env["REACT_APP_WALLET_CONNECT_PROJECT_ID"]!,
//   walletConnectVersion: 2,
// });

const web3Modal = createWeb3Modal();

export const BindingDialog: FC<{
  onClose?(): void;
}> = ({ onClose }) => {
  const apiClient = useApiClient();
  const userId = useUserId();
  const signClient = useSignClient();
  // const [signClient, setSignClient] = useState<any>(undefined);

  // useEffect(() => {
  //   SignClient.init({
  //     projectId: process.env["REACT_APP_WALLET_CONNECT_PROJECT_ID"]!,
  //   }).then((client) => {
  //     setSignClient(client);
  //   });
  // }, []);

  return (
    <Backdrop className={classes.backdrop}>
      <div className={classes.bindingDialog}>
        <div className={classes.text}>
          Сейчас вы будете перенаправлены на выбор кошелька для привязки к боту
          MAIN
        </div>
        <Button
          // to="/bind_wallet"
          // target="_top"
          className={classes.button}
          onClick={async (e) => {
            e.preventDefault();

            if (typeof onClose === "function") {
              onClose();
            }

            if (signClient) {
              const r = await getWeb3ModalApproval({
                signClient,
                web3Modal,
              });
              // const namespaces = {
              //   eip155: {
              //     methods: ["eth_sign"],
              //     chains: ["eip155:56"],
              //     events: ["accountsChanged"],
              //   },
              // };

              // const { uri, approval } = await signClient.connect({
              //   requiredNamespaces: namespaces,
              // });

              // if (uri) {
              //   await web3Modal.openModal({
              //     uri,
              //     standaloneChains: namespaces.eip155.chains,
              //   });

              //   const r = await approval();

              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [_, _2, address] =
                r?.namespaces?.eip155?.accounts[0]?.split(":") ?? [];

              if (address) {
                await apiClient.crypto.walletAddress({
                  userId,
                  address,
                });
              }

              web3Modal.closeModal();
              // }
            }
          }}
        >
          Продолжить
        </Button>
      </div>
    </Backdrop>
  );
};
