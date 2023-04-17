import { type FC } from "react";

import { Backdrop } from "../Backdrop";
import { Button } from "../Button";
import { useApiClient, useUserId, useSignClient } from "../../hooks";
import { createWeb3Modal, getWeb3ModalApproval } from "../../utils";

import classes from "./BindingDialog.module.css";

const web3Modal = createWeb3Modal();

export const BindingDialog: FC<{
  onClose?(): void;
}> = ({ onClose }) => {
  const apiClient = useApiClient();
  const userId = useUserId();
  const signClient = useSignClient();

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

              web3Modal.closeModal();

              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [_, _2, address] =
                r?.namespaces?.eip155?.accounts[0]?.split(":") ?? [];

              if (address) {
                document.body.innerText = address;

                await apiClient.crypto.walletAddress({
                  userId,
                  address,
                });
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
