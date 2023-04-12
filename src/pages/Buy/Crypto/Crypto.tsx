import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

import { Amount } from "../../../components/Amount";
import { Receive } from "../../../components/Receive";
import { Info } from "../../../components/Info";
import { useUserId, useApiClient } from "../../../hooks";
import { CRYPTO_CURRENCIES } from "../../../constants";
import { BindingDialog } from "../../../components/BindingDialog";
import { Button } from "../../../components/Button";
import { Instruction } from "../../../components/Instruction";
import { Appendum } from "../../../components/Appendum";

import classes from "./Crypto.module.css";

export const Crypto: FC = () => {
  const userId = useUserId();
  const apiClient = useApiClient();
  const {
    control,
    watch,
    getValues,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
  } = useForm<any>({
    defaultValues: {
      amountOfMoney: 10000,
      coinType: CRYPTO_CURRENCIES.find(({ value }) => value === "USDT"),
    },
  });
  const { data } = useQuery(
    [
      "numma",
      "currencyExchange",
      "cryptoExchange",
      {
        fromCrypto: watch("coinType")?.value,
        amount: watch("amountOfMoney"),
      },
    ],
    async () => {
      const data = await apiClient.numma.currencyExchange.cryptoExchange({
        fromCrypto: getValues("coinType")?.value,
        amount: getValues("amountOfMoney"),
      });

      return data;
    },
    {
      onSuccess(data) {
        if (data.client_main) {
          setValue("getMoney", data.client_main);
        }

        if (data.operation_status.message !== "Операция успешно выполнена.") {
          setError("amountOfMoney", {
            type: "custom",
            message: data.operation_status.message,
          });
        }

        const amountOfMoney = getValues("amountOfMoney");
        if ("min_amount" in data) {
          if (amountOfMoney < data.min_amount!) {
            setValue("amountOfMoney", data.min_amount!);
            setError("amountOfMoney", {
              type: "custom",
              message: `Сумма была изменена на минимально возможную. Укажите сумму от ${data.min_amount!} до ${data.max_amount!}`,
            });
          } else if (amountOfMoney > data.max_amount!) {
            setValue("amountOfMoney", data.max_amount!);
            setError("amountOfMoney", {
              type: "custom",
              message: `Сумма была изменена на максимально возможную. Укажите сумму от ${data.min_amount!} до ${data.max_amount!}`,
            });
          }
        }
      },
    },
  );
  const { mutate } = useMutation(
    ["crypto", "purchase"],
    async ({
      amountOfMoney,
      bank,
      coinType,
      getMoney,
      phoneNumber,
    }: {
      amountOfMoney: number;
      bank: {
        name: string;
        value: string;
      };
      coinType: {
        name: string;
        value: string;
      };
      getMoney: number;
      phoneNumber: string;
    }) => {
      const purchaseData = await apiClient.crypto.purchase({
        userId,
        amountOfMoney,
        mainCourse: data?.client_main as number,
        bank: bank.value,
        coinType: coinType.value,
        getMoney,
        phoneNumber,
        purchaseType: "Перевод",
      });

      return purchaseData;
    },
  );
  const [isBindingModalOpen, setIsBindingModalOpen] = useState(false);
  const [isInstructionOpen, setIsInstructionOpen] = useState(false);

  return (
    <>
      <div className={classes.crypto} onSubmit={handleSubmit(mutate as any)}>
        <div className={classes.amountWrapper}>
          <Amount
            isCrypto
            control={control}
            onFocus={() => clearErrors("amountOfMoney")}
          />
        </div>
        <div className={classes.receiveWrapper}>
          <Receive
            control={control}
            onBlur={async () => {
              const amountOfMoney = getValues("amountOfMoney") as number;
              const getMoney = getValues("getMoney") as number;
              const data = await apiClient.numma.currencyExchange.cryptoExchange({
                fromCrypto: getValues("coinType.value"),
                amount: amountOfMoney,
              });

              setValue("amountOfMoney", getMoney / data.currency_exchange);
            }}
          />
        </div>
        <div className={classes.infoWrapper}>
          <Info>
            {data && (
              <Info.Line>
                <b>Курс</b>
                {"  "}1 {watch("coinType.value")} ={" "}
                <b>{Number(data.currency_exchange).toFixed(5)} MAIN</b>
              </Info.Line>
            )}
            <Info.Line colored>
              Курс будет уточнён на момент старта сделки
            </Info.Line>
          </Info>
        </div>
        {isInstructionOpen ? (
          <div className={classes.instructionWrapper}>
            <Instruction onClickYes={() => setIsBindingModalOpen(true)} />
          </div>
        ) : (
          <div className={classes.buttonWrapper}>
            <Button
              type="submit"
              className={classes.button}
              onClick={() => setIsInstructionOpen(true)}
            >
              Отправить заявку
            </Button>
          </div>
        )}
        <div className={classes.appendumWrapper}>
          <Appendum />
        </div>
      </div>
      {isBindingModalOpen && (
        <BindingDialog onClose={() => setIsBindingModalOpen(false)} />
      )}
    </>
  );
};
