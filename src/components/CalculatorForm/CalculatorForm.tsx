import { useEffect, useRef, useState, type FC } from "react";
import { Helmet } from "react-helmet";

import { useApiClient, useUserId } from "../../hooks";
import { Appendum } from "../../components/Appendum";
import infoIconColored from "../../assets/images/info-icon-colored.png";
import { CryptoInstruction } from "../../components/CryptoInstruction";

import "./style.css";

export const CalculatorForm: FC = () => {
  const apiClient = useApiClient();
  const userId = useUserId();
  const isRenderedRef = useRef(false);
  const [isFormSended, setIsFormSended] = useState(false);

  useEffect(() => {
    if (isRenderedRef.current === false) {
      isRenderedRef.current = true;

      const loadScript = (src: string, isModule: boolean = false) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          const onLoad = () => {
            resolve(true);
            script.removeEventListener("load", onLoad);
          };

          script.src = src;
          script.defer = true;
          script.addEventListener("load", onLoad);

          if (isModule) {
            script.type = "module";
          } else {
            script.type = "text/javascript";
          }

          document.body.appendChild(script);
        });
      };

      Reflect.set(window, "__user_id__", userId);
      Reflect.set(window, "__send_form__", apiClient.crypto.purchase);
      Reflect.set(window, "__send_form_callback__", () => {
        setIsFormSended(true);
      });

      (async () => {
        await loadScript("/libraries/jquery.js");
        await loadScript("/libraries/intl-tel-input/js/intlTelInput-jquery.js");
        await loadScript("/libraries/intl-tel-input/js/utils.js");
        await loadScript("/libraries/inputmask/jquery.inputmask.min.js");
        await loadScript("/libraries/select2/js/select2.full.min.js");
        await loadScript("/scripts/api.js");
        await loadScript("/scripts/iti.js");
        await loadScript("/scripts/constants.js");
        await loadScript("/scripts/config.js");
        await loadScript("/scripts/form-helpers.js");
        await loadScript("/scripts/u-overlay.js");
        await loadScript("/scripts/u-button.js");
        await loadScript("/scripts/u-popup.js");
        await loadScript("/scripts/u-select.js");
        await loadScript("/scripts/b-menu.js");
        await loadScript("/scripts/b-card-popup.js");
        await loadScript("/scripts/b-intro-block.js");
        await loadScript("/scripts/b-application-creating-popup.js");
        await loadScript("/scripts/b-actions.js");
        await loadScript("/scripts/b-reviews.js");
        await loadScript("/scripts/b-faq.js");
        await loadScript("/scripts/b-feedback.js");
        await loadScript("/scripts/u-blur.js");
        await loadScript("/scripts/b-footer.js");
        await loadScript("/scripts/scripts/currency_exchange.js", true);
        await loadScript("/libraries/slick/slick.min.js");
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <link
          href="/libraries/intl-tel-input/css/intlTelInput.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="/css/reset.css" rel="stylesheet" type="text/css" />
        <link href="/css/main.css" rel="stylesheet" type="text/css" />
        <link
          href="/libraries/slick/slick.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="/libraries/select2/css/select2.min.css" rel="stylesheet" />
        <link href="/css/intl-tel-input.css" rel="stylesheet" type="text/css" />
        <link href="/css/u-container.css" rel="stylesheet" type="text/css" />
        <link href="/css/u-overlay.css" rel="stylesheet" type="text/css" />
        <link href="/css/u-button.css" rel="stylesheet" type="text/css" />
        <link href="/css/u-title.css" rel="stylesheet" type="text/css" />
        <link href="/css/u-link.css" rel="stylesheet" type="text/css" />
        <link href="/css/u-error.css" rel="stylesheet" type="text/css" />
        <link href="/css/u-success.css" rel="stylesheet" type="text/css" />
        <link href="/css/u-popup.css" rel="stylesheet" type="text/css" />
        <link href="/css/u-input.css" rel="stylesheet" type="text/css" />
        <link href="/css/u-blur.css" rel="stylesheet" type="text/css" />
        <link href="/css/u-hidden.css" rel="stylesheet" type="text/css" />
        <link href="/css/u-ws-nowrap.css" rel="stylesheet" type="text/css" />
        <link href="/css/u-select.css" rel="stylesheet" type="text/css" />
        <link
          href="/css/b-whatsapp-button.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/css/b-telegram-button.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="/css/b-page.css" rel="stylesheet" type="text/css" />
        <link href="/css/b-menu.css" rel="stylesheet" type="text/css" />
        <link href="/css/b-intro-block.css" rel="stylesheet" type="text/css" />
        <link
          href="/css/b-application-creating-popup.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/css/b-application-success-popup.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/css/b-feedback-success-popup.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="/css/b-card-popup.css" rel="stylesheet" type="text/css" />
        <link
          href="/css/b-security-block.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/css/b-it-works-block.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="/css/b-you-can.css" rel="stylesheet" type="text/css" />
        <link href="/css/b-actions.css" rel="stylesheet" type="text/css" />
        <link href="/css/b-guarantees.css" rel="stylesheet" type="text/css" />
        <link href="/css/b-reviews.css" rel="stylesheet" type="text/css" />
        <link href="/css/b-faq.css" rel="stylesheet" type="text/css" />
        <link href="/css/b-footer.css" rel="stylesheet" type="text/css" />
        <link href="/css/b-feedback.css" rel="stylesheet" type="text/css" />
      </Helmet>
      <div className="u-overlay"></div>
      <div style={{ /*maxWidth: 400, */ padding: 20 }}>
        <form className="b-intro-block__form">
          <div className="b-intro-block__form-inputs">
            <input
              type="hidden"
              className="js-form-name-input"
              name="form_name"
              defaultValue="transfer_form"
            />
            <div className="b-intro-block__input u-input u-input_with-select">
              <label
                className="b-intro-block__input-label u-input__label"
                htmlFor="from_fiat_sum"
              >
                Хочу отправить
              </label>
              <div className="u-input__input-area">
                <div className="u-input__input-container">
                  <div
                    className="u-select u-select_currency u-select_selected-right u-select_hide-searcher"
                    id="from_fiat"
                  >
                    <select name="from_fiat"></select>
                  </div>
                  <input
                    className="u-input__input js-from_fiat_sum-input"
                    id="from_fiat_sum"
                    placeholder="Введите сумму"
                    type="text"
                    name="from_fiat_sum"
                    defaultValue=""
                  />
                </div>
                <span className="u-input__input-error u-error js-from_fiat_sum-error"></span>
              </div>
            </div>
            <div className="b-intro-block__input u-input">
              <label
                className="b-intro-block__input-label u-input__label"
                htmlFor="from_trade_method"
              >
                Банк отправителя
              </label>
              <div className="u-input__input-area">
                <div className="u-input__input-container">
                  <div className="u-select" id="from_trade_method">
                    <select name="from_trade_method"></select>
                  </div>
                </div>
                <span className="u-input__input-error u-error js-from_trade_method-error"></span>
              </div>
            </div>
            <div className="b-intro-block__input u-input u-input_with-select">
              <label
                className="b-intro-block__input-label u-input__label"
                htmlFor="to_fiat_sum"
              >
                Получу
              </label>
              <div className="u-input__input-area">
                <div className="u-input__input-container">
                  <div
                    className="u-select u-select_currency u-select_selected-right u-select_hide-searcher"
                    id="to_fiat"
                  >
                    <select name="to_fiat">
                      <option defaultValue="MAIN" selected>
                        MAIN
                      </option>
                    </select>
                  </div>
                  <input
                    className="u-input__input js-to_fiat_sum-input"
                    id="to_fiat_sum"
                    type="text"
                    name="to_fiat_sum"
                    defaultValue=""
                  />
                </div>
                <span className="u-input__input-error u-error js-to_fiat_sum-error"></span>
              </div>
            </div>
            <div className="b-intro-block__input u-input">
              <label
                className="b-intro-block__input-label u-input__label"
                htmlFor="phone"
              >
                Ваш номер телефона
              </label>
              <div className="u-input__input-area">
                <div className="u-input__input-container">
                  <input
                    className="u-input__input js-phone-input"
                    id="phone"
                    placeholder=""
                    type="text"
                    inputMode="numeric"
                    name="phone"
                    defaultValue=""
                  />
                </div>
                <span className="u-input__input-error u-error js-phone-error"></span>
              </div>
            </div>
            <div className="b-intro-block__form-info-container">
              <div className="b-intro-block__rate-label">
                <img
                  src="/assets/images/b-intro-block/round-arrows.svg"
                  alt="rate"
                />
                <span className="b-intro-block__rate-label-text">Курс:</span>
              </div>
              <div className="b-intro-block__time">
                <img
                  src="/assets/images/b-intro-block/round-time.svg"
                  alt="rate"
                />
                <span className="b-intro-block__time-text">
                  Время перевода: 15 мин.
                </span>
              </div>
              <div className="b-intro-block__disclaimer">
                <div className="b-intro-block__disclaimer-icon">
                  <img src={infoIconColored} alt="disclaimer" />
                </div>
                <span className="b-intro-block__disclaimer-text">
                  Курс будет уточнён на момент старта сделки
                </span>
              </div>
            </div>
          </div>
          <div className="b-intro-block__form-footer">
            <div className="b-intro-block__result-container"></div>

            {isFormSended ? (
              <CryptoInstruction />
            ) : (
              <>
                <button className="b-intro-block__form-button u-button">
                  <span className="u-button__content">Отправить заявку</span>
                </button>

                <div className="b-intro-block__appendum-wrapper">
                  <Appendum />
                </div>
              </>
            )}
            {/* <div className="b-intro-block__agreement">
              Нажимая кнопку, вы соглашаетесь{" "}
              <span className="u-ws-nowrap">
                с{" "}
                <a className="u-link u-link_usual" href="/terms">
                  условиями сервиса
                </a>
              </span>
            </div> */}
          </div>
        </form>
      </div>
      <div className="u-popup-root">
        <div
          className="b-application-creating-popup u-popup"
          id="application-creating"
        >
          <div className="u-popup__close-btn js-popup-close-btn js-hide-overlay">
            <img
              className="u-popup__close-btn-icon"
              src="/assets/images/u-popup/close-button.svg"
              alt="close-button"
            />
          </div>
          <form className="b-application-creating-popup__form">
            <div className="b-application-creating-popup__inputs">
              <input
                type="hidden"
                className="js-form-name-input"
                name="form_name"
                defaultValue="general_form"
              />
              <div className="b-application-creating-popup__input u-input">
                <label
                  className="b-application-creating-popup__label u-input__label"
                  htmlFor="app-name"
                >
                  Имя
                </label>
                <div className="u-input__input-area">
                  <div className="u-input__input-container">
                    <input
                      className="u-input__input js-name-input"
                      id="app-name"
                      placeholder="Введите ваше имя"
                      type="text"
                      name="name"
                      defaultValue=""
                      maxLength={32}
                    />
                  </div>
                  <span className="u-input__input-error u-error js-name-error"></span>
                </div>
              </div>
              <div className="b-application-creating-popup__input u-input">
                <label
                  className="b-application-creating-popup__label u-input__label"
                  htmlFor="app-phone"
                >
                  Ваш номер телефона
                </label>
                <div className="u-input__input-area">
                  <div className="u-input__input-container">
                    <input
                      className="u-input__input js-phone-input"
                      id="app-phone"
                      placeholder=""
                      type="text"
                      inputMode="numeric"
                      name="phone"
                      defaultValue=""
                      maxLength={32}
                    />
                  </div>
                  <span className="u-input__input-error u-error js-phone-error"></span>
                </div>
              </div>
              <div className="b-application-creating-popup__input u-input">
                <label
                  className="b-application-creating-popup__label u-input__label"
                  htmlFor="app-currency"
                >
                  Из какой в какую валюту
                  <br /> хотите перевести
                </label>
                <div className="u-input__input-area">
                  <div className="u-input__input-container">
                    <input
                      className="u-input__input js-currency-input"
                      id="app-currency"
                      placeholder="Рубли в тенге"
                      type="text"
                      name="currency"
                      defaultValue=""
                      maxLength={64}
                    />
                  </div>
                  <span className="u-input__input-error u-error js-currency-error"></span>
                </div>
              </div>
              <div className="b-application-creating-popup__input u-input">
                <label
                  className="b-application-creating-popup__label u-input__label"
                  htmlFor="app-sum"
                >
                  Сумма
                </label>
                <div className="u-input__input-area">
                  <div className="u-input__input-container">
                    <input
                      className="u-input__input js-sum-input"
                      id="app-sum"
                      placeholder="Введите сумму"
                      type="text"
                      name="name"
                      defaultValue=""
                    />
                  </div>
                  <span className="u-input__input-error u-error js-sum-error"></span>
                </div>
              </div>
            </div>
            <div className="b-application-creating-popup__result-container"></div>
            <button className="b-application-creating-popup__submit-button u-button">
              <span className="u-button__content">Отправить заявку</span>
            </button>
            <div className="b-application-creating-popup__agreement">
              Нажимая кнопку, вы соглашаетесь{" "}
              <span className="u-ws-nowrap">
                с{" "}
                <a className="u-link u-link_usual" href="/terms">
                  условиями сервиса
                </a>
              </span>
            </div>
          </form>
        </div>
        <div
          className="b-application-success-popup u-popup"
          id="application-success"
        >
          <div className="u-popup__close-btn js-popup-close-btn js-hide-overlay">
            <img
              className="u-popup__close-btn-icon"
              src="/assets/images/u-popup/close-button.svg"
              alt="close-button"
            />
          </div>
          <div className="b-application-success-popup__inner">
            <div className="b-application-success-popup__title">
              Теперь выберите удобный мессенджер для продолжения перевода
            </div>
            <div className="b-application-success-popup__socials">
              <a
                className="b-whatsapp-button b-application-success-popup__social-button"
                target="_blank"
                href="https://api.whatsapp.com/send?phone=79587618427&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B0%20%D0%B7%D0%B0%D1%8F%D0%B2%D0%BA%D0%B0%20%D0%BD%D0%B0%20%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B4"
                rel="noreferrer"
              >
                WhatsApp
                <img
                  className="b-whatsapp-button__social-icon"
                  src="/assets/images/whatsapp-icon.svg"
                  alt="whatsapp"
                />
              </a>
              <a
                className="b-telegram-button b-application-success-popup__social-button"
                target="_blank"
                href="https://t.me/nummachat"
                rel="noreferrer"
              >
                Telegram
                <img
                  className="b-telegram-button__social-icon"
                  src="/assets/images/tm-icon.svg"
                  alt="telegram"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="b-card-popup u-popup" id="card-popup">
          <div className="u-popup__close-btn js-popup-close-btn js-hide-overlay">
            <img
              className="u-popup__close-btn-icon"
              src="/assets/images/u-popup/close-button.svg"
              alt="close-button"
            />
          </div>
          <form className="b-card-popup__form">
            <div className="b-card-popup__form-inputs">
              <input
                type="hidden"
                className="js-form-name-input"
                name="form_name"
                defaultValue="transfer_form"
              />
              <div className="b-card-popup__input u-input">
                <label
                  className="b-card-popup__label u-input__label js-from_card-label"
                  htmlFor="from_card"
                >
                  Номер карты отправителя
                </label>
                <div className="u-input__input-area">
                  <div className="u-input__input-container">
                    <input
                      className="u-input__input js-from_card-input"
                      id="from_card"
                      placeholder="Введите номер карты"
                      type="text"
                      name="from_card"
                      defaultValue=""
                      maxLength={64}
                    />
                  </div>
                  <span className="u-input__input-error u-error js-from_card-error"></span>
                </div>
              </div>
              <div className="b-card-popup__input u-input">
                <label
                  className="b-card-popup__label u-input__label"
                  htmlFor="from_name"
                >
                  Имя Фамилия карты отправителя
                </label>
                <div className="u-input__input-area">
                  <div className="u-input__input-container">
                    <input
                      className="u-input__input js-from_name-input"
                      id="from_name"
                      placeholder="Введите имя и фамилию"
                      type="text"
                      name="from_name"
                      defaultValue=""
                      maxLength={64}
                    />
                  </div>
                  <span className="u-input__input-error u-error js-from_name-error"></span>
                </div>
              </div>
              <div className="b-card-popup__input u-input">
                <label
                  className="b-card-popup__label u-input__label js-to_card-label"
                  htmlFor="to_card"
                >
                  Номер карты получателя
                </label>
                <div className="u-input__input-area">
                  <div className="u-input__input-container">
                    <input
                      className="u-input__input js-to_card-input"
                      id="to_card"
                      placeholder="Введите номер карты"
                      type="text"
                      name="to_card"
                      defaultValue=""
                      maxLength={64}
                    />
                  </div>
                  <span className="u-input__input-error u-error js-to_card-error"></span>
                </div>
              </div>
              <div className="b-card-popup__input u-input">
                <label
                  className="b-card-popup__label u-input__label"
                  htmlFor="to_name"
                >
                  Имя Фамилия получателя
                </label>
                <div className="u-input__input-area">
                  <div className="u-input__input-container">
                    <input
                      className="u-input__input js-to_name-input"
                      id="to_name"
                      placeholder="Введите имя и фамилию"
                      type="text"
                      name="to_name"
                      defaultValue=""
                      maxLength={64}
                    />
                  </div>
                  <span className="u-input__input-error u-error js-to_name-error"></span>
                </div>
              </div>
            </div>
            <div className="b-card-popup__result-container"></div>
            <button className="b-card-popup__form-button u-button">
              <span className="u-button__content">Отправить заявку</span>
            </button>
            <div className="b-card-popup__agreement">
              Нажимая кнопку, вы соглашаетесь{" "}
              <span className="u-ws-nowrap">
                с{" "}
                <a className="u-link u-link_usual" href="/terms">
                  условиями сервиса
                </a>
              </span>
            </div>
          </form>
        </div>
        <div className="b-feedback-success-popup u-popup" id="feedback-success">
          <div className="u-popup__close-btn js-popup-close-btn js-hide-overlay">
            <img
              className="u-popup__close-btn-icon"
              src="/assets/images/u-popup/close-button.svg"
              alt="close-button"
            />
          </div>
          <div className="b-feedback-success-popup__inner">
            <img
              className="b-feedback-success-popup__done-icon"
              src="/assets/images/b-feedback-success-popup/done.svg"
              alt="done-icon"
            />
            <div className="b-feedback-success-popup__title">
              Спасибо за обращение.
              <br />
              Наш специалист свяжется с вами в скором времени.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
