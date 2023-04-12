import { useEffect, type FC } from "react";

import { useApiClient, useUserId, useSignClient } from "../../hooks";
import { createWeb3Modal, getWeb3ModalApproval } from "../../utils";

import classes from "./BindWallet.module.css";

const web3Modal = createWeb3Modal();

export const BindWallet: FC = () => {
  const userId = useUserId();
  const apiClient = useApiClient();
  const signClient = useSignClient();

  useEffect(() => {
    if (signClient) {
      getWeb3ModalApproval({
        signClient,
        web3Modal,
      }).then((r) => {
        const [_, _2, address] =
          r?.namespaces?.eip155?.accounts[0]?.split(":") ?? [];

        if (address) {
          apiClient.crypto
            .walletAddress({
              userId,
              address,
            })
            .then(() => {
              web3Modal.closeModal();
            });
        }
      });
    }
  }, [signClient, apiClient, userId]);

  return <div className={classes.bindWallet}>{null}</div>;
};
