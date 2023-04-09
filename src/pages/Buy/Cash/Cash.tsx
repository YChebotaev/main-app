import { type FC } from "react";
// import { useForm } from "react-hook-form";
// import { useQuery, useMutation } from "react-query";

// import { Amount } from "../../../components/Amount";
// import { Bank } from "../../../components/Bank";
// import { Receive } from "../../../components/Receive";
// import { City } from "../../../components/City";
// import { Phone } from "../../../components/Phone";
// import { Info } from "../../../components/Info";
// import { Appendum } from "../../../components/Appendum";
// import { Button } from "../../../components/Button";
// import { CURRENCIES } from "../../../constants";
// import { useUserId, useApiClient } from "../../../hooks";

// import classes from "./Cash.module.css";

export const Cash: FC = () => {

  return null

  // const userId = useUserId();
  // const apiClient = useApiClient();
  // const { control, watch, getValues, setValue, handleSubmit } = useForm<any>({
  //   defaultValues: {
  //     coinType: CURRENCIES.find(({ value }) => value === "RUB"),
  //   },
  // });
  // const { data, isLoading } = useQuery(
  //   [
  //     "numma",
  //     "currencyExchange",
  //     "mainExchange",
  //     {
  //       fromFiat: watch("coinType.value"),
  //       fromTradeMethod: watch("bank.value"),
  //       amount: watch("amountOfMoney"),
  //     },
  //   ],
  //   async () => {
  //     const data = apiClient.numma.currencyExchange.mainExchange({
  //       fromFiat: getValues("coinType.value"),
  //       fromTradeMethod: getValues("bank.value"),
  //       amount: getValues("amountOfMoney"),
  //     });

  //     return data;
  //   },
  //   {
  //     onSuccess(data) {
  //       setValue("getMoney", data.client_main);
  //     },
  //   },
  // );
  // const { mutate } = useMutation(
  //   ["crypto", "purchase"],
  //   async ({
  //     amountOfMoney,
  //     bank,
  //     coinType,
  //     getMoney,
  //     phoneNumber,
  //   }: {
  //     amountOfMoney: number;
  //     bank: {
  //       name: string;
  //       value: string;
  //     };
  //     coinType: {
  //       name: string;
  //       value: string;
  //     };
  //     getMoney: number;
  //     phoneNumber: string;
  //   }) => {
  //     const purchaseData = await apiClient.crypto.purchase({
  //       userId,
  //       amountOfMoney,
  //       mainCourse: data?.client_main as number,
  //       bank: bank.value,
  //       coinType: coinType.value,
  //       getMoney,
  //       phoneNumber,
  //       purchaseType: "Наличные",
  //     });

  //     return purchaseData;
  //   },
  // );

  // return (
  //   <form className={classes.cash} onSubmit={handleSubmit(mutate as any)}>
  //     <div className={classes.amountWrapper}>
  //       <Amount control={control} />
  //     </div>
  //     <div className={classes.bankWrapper}>
  //       <Bank control={control} />
  //     </div>
  //     <div className={classes.receiveWrapper}>
  //       <Receive control={control} isLoading={isLoading} />
  //     </div>
  //     <div className={classes.cityWrapper}>
  //       <City control={control} />
  //     </div>
  //     <div className={classes.phoneWrapper}>
  //       <Phone control={control} />
  //     </div>
  //     <div className={classes.infoWrapper}>
  //       <Info>
  //         {data && (
  //           <Info.Line>
  //             <b>Курс</b>
  //             {"  "}1 {watch("coinType.value")} ={" "}
  //             <b>{data.currency_exchange} MAIN</b>
  //           </Info.Line>
  //         )}
  //         <Info.Line>Время перевода: 15 мин.</Info.Line>
  //         <Info.Line colored>
  //           Курс будет уточнён на момент старта сделки
  //         </Info.Line>
  //       </Info>
  //     </div>
  //     <div className={classes.buttonWrapper}>
  //       <Button className={classes.button}>Отправить заявку</Button>
  //     </div>
  //     <div className={classes.appendumWrapper}>
  //       <Appendum />
  //     </div>
  //   </form>
  // );
};
