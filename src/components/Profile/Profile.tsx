import { useState, type FC } from "react";
import cn from "classnames";
import { useQuery, useMutation } from "react-query";

import profileAvatar from "../../assets/images/profile-avatar.jpg";
import { Button } from "../Button";
import { BindingDialog } from "../../components/BindingDialog";
import { UnbindDialog } from "../UnbindDialog";
import { WalletId } from "../WalletId";
import { useApiClient, useUserId } from "../../hooks";

import classes from "./Profile.module.css";

export const Profile: FC = () => {
  // const [walletBound, setIsWalletBound] = useState(false);
  const apiClient = useApiClient();
  const userId = useUserId();
  const { data, refetch } = useQuery(
    ["crypto", "wallet_address", userId],
    async () => {
      return apiClient.crypto.walletAddressByUserId(userId);
    },
  );
  const [isBindingModalOpen, setIsBindingModalOpen] = useState(false);
  const [isUnbindModalOpen, setIsUnbindModalOpen] = useState(false);
  const walletBound = data ? data.address != null : false;
  const { mutate } = useMutation(["crypto", "wallet_address"], async () => {
    return apiClient.crypto.walletAddress({ userId, address: undefined });
  });

  if (walletBound) {
    return (
      <>
        <div className={classes.profile}>
          <div className={classes.left}>
            <img
              className={cn(classes.avatar, walletBound && classes.smallAvatar)}
              src={profileAvatar}
              alt=""
            />
          </div>
          <div className={classes.right}>
            <div className={classes.name}>Алексей К.</div>
            <div className={classes.walletInfo}>
              {data && <WalletId address={data.address} />}
              <div className={classes.unbindWrapper}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  className={classes.unbind}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();

                    setIsUnbindModalOpen(true);
                  }}
                >
                  Отвязать
                </a>
              </div>
            </div>
          </div>
        </div>
        {isUnbindModalOpen && (
          <UnbindDialog
            address={data?.address}
            onClickYes={async () => {
              setIsUnbindModalOpen(false);

              await mutate();
              await refetch();
            }}
            onClickNo={() => {
              setIsUnbindModalOpen(false);
            }}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        <div className={classes.profile}>
          <div className={classes.left}>
            <img className={classes.avatar} src={profileAvatar} alt="" />
          </div>
          <div className={classes.right}>
            <div className={classes.name}>Здравствуйте, Алексей!</div>
            <div className={classes.text}>
              У вас не привязан ни один криптокошелёк
            </div>
            <Button
              className={classes.button}
              onClick={() => setIsBindingModalOpen(true)}
            >
              Привязать кошелёк →
            </Button>
          </div>
        </div>
        {isBindingModalOpen && <BindingDialog />}
      </>
    );
  }
};
