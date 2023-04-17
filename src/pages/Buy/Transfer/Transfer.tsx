import { useState, type FC } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";

import { Amount } from "../../../components/Amount";
import { Bank } from "../../../components/Bank";
import { Receive } from "../../../components/Receive";
import { Phone2 } from "../../../components/Phone2";
import { Info } from "../../../components/Info";
import { Appendum } from "../../../components/Appendum";
import { Button } from "../../../components/Button";
import { useApiClient, useUserId } from "../../../hooks";
import { CURRENCIES } from "../../../constants";
import { BindingDialog } from "../../../components/BindingDialog";
import { Instruction } from "../../../components/Instruction";
import timeIcon from "../../../assets/images/time.svg";
import courseIcon from "../../../assets/images/course.svg";

import classes from "./Transfer.module.css";

export const Transfer: FC = () => {
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
      coinType: CURRENCIES.find(({ value }) => value === "RUB"),
    },
  });
  const { data } = useQuery(
    [
      "numma",
      "currencyExchange",
      "mainExchange",
      {
        fromFiat: watch("coinType")?.value,
        fromTradeMethod: watch("bank")?.value,
        amount: watch("amountOfMoney"),
      },
    ],
    async () => {
      const data = apiClient.numma.currencyExchange.mainExchange({
        fromFiat: getValues("coinType.value"),
        fromTradeMethod: getValues("bank.value"),
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
  const [isBindingModalOpen, setIsBindingModalOpen] = useState(false);
  const [isInstructionOpen, setIsInstructionOpen] = useState(false);

  return (
    <>
      <form className={classes.transfer}>
        <div className={classes.amountWrapper}>
          <Amount
            control={control}
            onFocus={() => clearErrors("amountOfMoney")}
          />
        </div>
        <div className={classes.bankWrapper}>
          <Bank control={control} />
        </div>
        <div className={classes.receiveWrapper}>
          <Receive
            control={control}
            onBlur={async () => {
              const amountOfMoney = getValues("amountOfMoney") as number;
              const getMoney = getValues("getMoney") as number;
              const data = await apiClient.numma.currencyExchange.mainExchange({
                fromFiat: getValues("coinType.value"),
                fromTradeMethod: getValues("bank.value"),
                amount: amountOfMoney,
              });

              setValue("amountOfMoney", getMoney / data.currency_exchange);
            }}
          />
        </div>
        <div className={classes.phoneWrapper}>
          <Phone2 control={control} />
        </div>
        <div className={classes.infoWrapper}>
          <Info>
            {data && (
              <Info.Line icon={<img src={courseIcon} alt="" />}>
                <b>Курс</b>
                {"  "}1 {watch("coinType.value")} ={" "}
                <b>{Number(data.currency_exchange).toFixed(5)} MAIN</b>
              </Info.Line>
            )}
            <Info.Line icon={<img src={timeIcon} alt="" />}>
              Время перевода: 15 мин.
            </Info.Line>
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
              onClick={async (e) => {
                e.preventDefault();

                await apiClient.crypto.purchase({
                  userId,
                  amountOfMoney: getValues("amountOfMoney"),
                  mainCourse: data?.client_main as number,
                  bank: getValues("bank").value,
                  coinType: getValues("coinType").value,
                  getMoney: getValues("getMoney"),
                  phoneNumber: getValues("phoneNumber"),
                  purchaseType: "Перевод",
                });

                setIsInstructionOpen(true);
              }}
            >
              Отправить заявку
            </Button>
          </div>
        )}
        <div className={classes.appendumWrapper}>
          <Appendum />
        </div>
      </form>
      {isBindingModalOpen && (
        <BindingDialog onClose={() => setIsBindingModalOpen(false)} />
      )}
    </>
  );
};
