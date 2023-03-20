import { useState, type FC, type CSSProperties } from "react";
import cn from "classnames";

import { Instruction } from "./Instruction";

import classes from "./CryptoInstruction.module.css";
import { Button } from "../Button";

export const CryptoInstruction: FC<{
  className?: string;
  style?: CSSProperties;
}> = ({ className, style }) => {
  const [isHasWallet, setIsHasWallet] = useState<boolean | null>(null);
  const [isWalletInstruction, setIsWalletInstruction] = useState(false);

  if (isHasWallet == null) {
    return (
      <div className={cn(classes.cryptoInstruction, className)} style={style}>
        <div className={classes.title}>Инструкция</div>
        <div className={classes.text}>У вас уже есть криптокошелёк?</div>
        <div className={classes.footer}>
          <div className={classes.footerLeft}>
            <Button
              className={classes.noButton}
              onClick={() => setIsHasWallet(true)}
            >
              Нет
            </Button>
          </div>
          <div className={classes.footerRight}>
            <Button
              className={classes.yesButton}
              onClick={() => setIsHasWallet(false)}
            >
              Да
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(classes.cryptoInstruction, className)} style={style}>
      {isWalletInstruction ? (
        <Instruction>
          <Instruction.Slide>
            <Instruction.Slide.Title>
              Создание криптокошелька
            </Instruction.Slide.Title>
            <Instruction.Slide.Content>
              Можете выбрать наиболее подходящий десктопный или мобильный
              кошелек и установить его на компьютер/смартфон. Наиболее
              популярным и безопасным считается TrustWallet.
            </Instruction.Slide.Content>
          </Instruction.Slide>
          <Instruction.Slide>
            <Instruction.Slide.Title>
              Создание криптокошелька
            </Instruction.Slide.Title>
            <Instruction.Slide.Content>
              Установите расширение для браузера. Если вы используете телефон,
              то можете загрузить кошелек через Google Play или iOS App Store.
            </Instruction.Slide.Content>
          </Instruction.Slide>
          <Instruction.Slide>
            <Instruction.Slide.Title>
              Создание криптокошелька
            </Instruction.Slide.Title>
            <Instruction.Slide.Content>
              Входим в приложение и нажимаем “Создать кошелек”. Далее система
              запросит создание кода безопасности. Создайте его и запомните.
            </Instruction.Slide.Content>
          </Instruction.Slide>
          <Instruction.Slide>
            <Instruction.Slide.Title>
              Создание криптокошелька
            </Instruction.Slide.Title>
            <Instruction.Slide.Content>
              Далее нужно будет создать seed-фразу. Это 12 слов, которые
              позволят вам восстановить кошелёк в случае его утери. Это
              обязательно. Не забудьте также запомнить / записать эту фразу
            </Instruction.Slide.Content>
          </Instruction.Slide>
          <Instruction.Slide>
            <Instruction.Slide.Title>
              Создание криптокошелька
            </Instruction.Slide.Title>
            <Instruction.Slide.Content>
              Верифицируйте свою seed-фразу, введя слова в нужном порядке.
            </Instruction.Slide.Content>
          </Instruction.Slide>
        </Instruction>
      ) : (
        <Instruction>
          <Instruction.Slide>
            <Instruction.Slide.Title>Шаг 1</Instruction.Slide.Title>
            <Instruction.Slide.Content>
              Если у вас нет кошелька TrustWallet, то создайте его, а заодно
              установите расширение для браузера. Если вы используете телефон,
              то можете загрузить кошелек через Google Play или iOS App Store.
            </Instruction.Slide.Content>
            <Instruction.Slide.Content>
              <button
                className={classes.walletInstructionButton}
                onClick={() => setIsWalletInstruction(true)}
              >
                Инструкция по созданию кошелька
              </button>
            </Instruction.Slide.Content>
          </Instruction.Slide>
          <Instruction.Slide>
            <Instruction.Slide.Title>Шаг 2</Instruction.Slide.Title>
            <Instruction.Slide.Content>
              Настройте свой криптовалютный кошелек. Не забудьте сохранить
              кодовую фразу и адрес кошелька.
            </Instruction.Slide.Content>
          </Instruction.Slide>
          <Instruction.Slide>
            <Instruction.Slide.Title>Шаг 3</Instruction.Slide.Title>
            <Instruction.Slide.Content>
              Войдите в аккаунт Binance. Купите BNB Chain в качестве базовой
              валюты.
            </Instruction.Slide.Content>
          </Instruction.Slide>
          <Instruction.Slide>
            <Instruction.Slide.Title>Шаг 4</Instruction.Slide.Title>
            <Instruction.Slide.Content>
              Отправьте BNB Chain с Binance на свой криптокошелек. Перейдите в
              кошелек Binance, чтобы подтвердить получение BNB Chain. Нажмите
              «Вывод» и заполните информацию. Установите сеть на BNB Chain,
              укажите адрес вашего кошелька и сумму, которую вы хотите
              перевести. Нажмите кнопку «Вывод» и ожидайте, пока ваш BNB Chain
              не появится в вашем кошельке.
            </Instruction.Slide.Content>
          </Instruction.Slide>
          <Instruction.Slide>
            <Instruction.Slide.Title>Шаг 5</Instruction.Slide.Title>
            <Instruction.Slide.Content>
              Теперь вам нужно купить MAIN через Pancake Swap. Если вы
              используете кошелек TrustWallet, вы можете перейти на Pancake
              Swap, чтобы совершить транзакцию. Браузер автоматически запросит
              подключение вашего кошелька. Обменяйте BNB Chain на MAIN.
            </Instruction.Slide.Content>
          </Instruction.Slide>
        </Instruction>
      )}
    </div>
  );
};
