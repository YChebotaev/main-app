import { useState, useEffect, type FC } from "react";
import { Web3Modal } from "@web3modal/standalone";
import SignClient from "@walletconnect/sign-client";

import { Backdrop } from "../Backdrop";
import { Button } from "../Button";

import classes from "./BindingDialog.module.css";

const web3Modal = new Web3Modal({
  projectId: process.env["REACT_APP_WALLET_CONNECT_PROJECT_ID"]!,
  walletConnectVersion: 2,
});

export const BindingDialog: FC<{
  onClose?(): void
}> = ({ onClose }) => {
  const [signClient, setSignClient] = useState<any>(undefined);

  useEffect(() => {
    SignClient.init({
      projectId: process.env["REACT_APP_WALLET_CONNECT_PROJECT_ID"]!,
    }).then((client) => {
      setSignClient(client);
    });
  }, []);

  return (
    <Backdrop className={classes.backdrop}>
      <div className={classes.bindingDialog}>
        <div className={classes.text}>
          Сейчас вы будете перенаправлены на выбор кошелька для привязки к боту
          MAIN
        </div>
        <Button
          className={classes.button}
          onClick={async () => {
            if (typeof onClose === 'function') {
              onClose()
            }

            if (signClient) {
              const namespaces = {
                eip155: {
                  methods: ["eth_sign"],
                  chains: ["eip155:1"],
                  events: ["accountsChanged"],
                },
              }

              const { uri, approval } = await signClient.connect({
                requiredNamespaces: namespaces
              });

              if (uri) {
                await web3Modal.openModal({
                  uri,
                  standaloneChains: ["eip155:5"]
                });
                await approval();
                web3Modal.closeModal();
              }
            }
          }}
        >
          Продолжить
        </Button>
      </div>
    </Backdrop>
  );
};
