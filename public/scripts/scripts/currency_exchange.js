import {sendRequest, getRequestParameter}  from '../scripts/components/request_tools.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import {checkPhone, getStandardPhone, showFieldError} from "../scripts/components/form.js";
import {getCookie, setCookie} from "../scripts/components/cookie.js";

$(() => {

    if(!window.numma) {
        return;
    }

    let intervals = [];

    window.numma.forEach((config, key) => {
        intervals[key] = setInterval(() => init(intervals[key], config), 1000);
    });

});

const init = (interval, config) => {
    let id = uuidv4();

    const fromFiatValueConfig = config.fromFiat;
    const toFiatValueConfig = config.toFiat;
    const firstForm = $(config.firstForm);
    const secondForm = $(config.secondForm);
    const firstSubmitButton = $(config.firstSubmitButton);
    const currencyExchangeField = $(config.currencyEchangeField);
    const firstFormResultContainer = $(config.firstFormResultContainer);
    const secondSubmitButton = $(config.secondSubmitButton);
    const secondFormResultContainer = $(config.secondFormResultContainer);

    const fromFiat = firstForm.find("[name='from_fiat']")
    const toFiat = firstForm.find("[name='to_fiat']")
    const fromTradeMethod = firstForm.find("[name='from_trade_method']");
    const toTradeMethod = firstForm.find("[name='to_trade_method']");
    const fromFiatSum = firstForm.find("[name='from_fiat_sum']");
    const toFiatSum = firstForm.find("[name='to_fiat_sum']");
    const phone = firstForm.find("[name='phone']");
    const firstFormName = firstForm.find("[name='form_name']");
    const fromCard = secondForm.find("[name='from_card']");
    const fromName = secondForm.find("[name='from_name']");
    const toCard = secondForm.find("[name='to_card']");
    const toName = secondForm.find("[name='to_name']");
    const secondFormName = secondForm.find("[name='form_name']");
    let changeAmountWithMessage = false;

    phone.intlTelInput({
        autoHideDialCode: false,
        autoPlaceholder: "aggressive",
        placeholderNumberType: "MOBILE",
        preferredCountries: ['ru'],
        separateDialCode: true,
        nationalMode: true
    })

    phone.on("countrychange", function() {
        Iti.mask(phone);
    });

    Iti.mask(phone);

    // const firstSubmitButton = firstForm.parent().parent().parent().find('.js-fist-send a');
    // const firstSubmitButton = firstForm.querySelector('.submit-button');
    // const submitButton = secondForm.parent().parent().parent().find('.js-send a');
    let currencyExchange;

    if(firstForm.length > 0) {
        clearInterval(interval);
    } else {
        return;
    }

    const getFromFiatValue = () => fromFiat.val() || fromFiatValueConfig
    const getToFiatValue = () => toFiat.val() || toFiatValueConfig

    /**
     * Получение начальных данных.
     */
    const initData = () => {

        /**
         * Обновление значений селекта.
         *
         * @param select
         * @param items
         */
        const updateMethodsSelect = (select, items, selected) => {
            const $select = $(select)
            let options = '';

            items.forEach((tradeMethod) => {
                options += `<option value="${tradeMethod.trade_method}" ${tradeMethod.trade_method == selected ? 'selected' : ''}>${tradeMethod.trade_method_name}</option>`
            });

            $select.html(options);

            if (selected) {
               $select.val(selected).trigger({
                   type: 'change',
                   trigger: TRIGGERS.JS
               })
            }
        }

        const updateFiatsSelect = (select, items, selected) => {
            const $select = $(select)

            $select.select2({
                minimumResultsForSearch: -1,
                dropdownCssClass: 'u-select__dropdown u-select__dropdown_size_sm',
                data: items.map(item => {
                    return {
                        id: item,
                        text: getOptionText(item)
                    }
                })
            })

            if (selected) {
                $select.val(selected).trigger({
                    type: 'change',
                    trigger: TRIGGERS.JS
                })
            }
        }

        const onFiatChange = (otherFiatsList, isFromFiat) => () => {
            console.log('onFiatChange: ', isFromFiat);
            /*
            if (fromFiat.val() === toFiat.val()) {
                const fiatToSelect = otherFiatsList.find(fiat => fiat !== fromFiat.val())

                if (fiatToSelect) {
                    $(isFromFiat ? toFiat : fromFiat).val(fiatToSelect).trigger({
                        type: 'change',
                        trigger: TRIGGERS.JS
                    })

                    return
                }
            }
            */

            sendRequest({
                url: Api.getUrl('currency_exchanges'),
                method: 'GET',
                data: {
                    from_fiat: fromFiat.val(),
                    to_fiat: 'USD', //toFiat.val(),
                },
                success_handle: (response) => {

                    console.log('currency_exchanges: ', response);
                    response.min_amount ? fromFiatSum.val(response.min_amount) : fromFiatSum.val(config.startAmount);
                    //toFiatSum.val(0);

                    updateMethodsSelect(fromTradeMethod, response.from_trade_methods, response.from_trade_method);
                    //updateMethodsSelect(toTradeMethod, response.to_trade_methods, response.to_trade_method);
                },
                enable_preloader: true,
                button_identifier: firstSubmitButton,
                form: firstForm
            });
        }

        /**
         * Список банков.
         */
        sendRequest({
            url: Api.getUrl('currency_exchanges'),
            method: 'GET',
            data: {
                ...(fromFiatValueConfig && { from_fiat: fromFiatValueConfig }),
                ...(toFiatValueConfig && { to_fiat: toFiatValueConfig })
            },
            success_handle: (response) => {
                console.log('currency_exchanges2: ', response);
                response.min_amount ? fromFiatSum.val(response.min_amount) : fromFiatSum.val(config.startAmount);
                //toFiatSum.val(0);

                const fromFiatsList = Object.values(response.fiats.sell)
                const toFiatsList = Object.values(response.fiats.buy)

                updateFiatsSelect(fromFiat, fromFiatsList, response.from_fiat, 'from')
                //updateFiatsSelect(toFiat, toFiatsList, response.to_fiat)

                updateMethodsSelect(fromTradeMethod, response.from_trade_methods, response.from_trade_method);
                //updateMethodsSelect(toTradeMethod, response.to_trade_methods, response.to_trade_method);

                //if(fromTradeMethod.val() !== '' && toTradeMethod.val() !== '') {
                if(fromTradeMethod.val() !== '') {
                    getMainExchange();
                }

                /**
                 * Перерасчет курса при изменении банков.
                 */
                fromTradeMethod.change((event) => {
                    getMainExchange(event)
                    hideFieldError(fromCard)
                });
                /*
                toTradeMethod.change((event) => {
                    getMainExchange(event)
                    hideFieldError(toCard)
                });
                */

                /**
                 * Перерасчет курса при изменении суммы.
                 */
                fromFiatSum.change(getMainExchange)
                //toFiatSum.change((event) => getMainExchange(event, true))

                fromFiat.change(onFiatChange(toFiatsList, true));
                //toFiat.change(onFiatChange(fromFiatsList, false));
            },
            enable_preloader: true,
            button_identifier: firstSubmitButton,
            form: firstForm
        });
    }

    /**
     * Привязка событий.
     */
    const bindEvents = () => {
        const domain = window.location.hostname;

        let event = domain === 'numma.org' ? 'submit' : 'click'

        if (event === 'submit') {
            /**
             * Клик на кнопку отправки в первой форме.
             */
            firstForm.submit(sendFirstForm)

            /**
             * Отправка формы.
             */
            secondForm.submit(sendForm)
        } else {
            /**
             * Клик на кнопку отправки в первой форме.
             */
            firstSubmitButton.click(sendFirstForm);

            /**
             * Отправка формы.
             */
            secondSubmitButton.unbind().click(sendForm);
        }

        /**
         * Скрытие ошибок при фокусе на поля.
         */
        firstForm.find('input').focus((event) => hideFieldError(event.target));
        secondForm.find('input').focus((event) => hideFieldError(event.target));

    }

    /**
     * Получение курса и суммы конвертации.
     */
    const getMainExchange = (event, isFromFiatChange) => {

        /**
         * Валидация сумм.
         */
        if(!validateSums()) {
            return;
        }

        /**
         * Подготовка данных.
         */
        const data = {
            from_fiat: getFromFiatValue(),
            //to_fiat: getToFiatValue(),
            from_trade_method: fromTradeMethod.val(),
            //to_trade_method: toTradeMethod.val(),
            amount: +fromFiatSum.val()
            //is_from_fiat_direction: isFromFiatChange ? 1 : 0,
        };

        toFiatSum.val('0');
        currencyExchangeField.html(`Курс: N/A`);

        console.log('test123');
        hideFieldError(fromFiatSum);

        sendRequest({
            url: Api.getUrl('main_exchange'),
            method: 'GET',
            data,
            success_handle: (response) => {
            	console.log('test123 response: ', response);

                if(response.client_main) {
                	//fromFiatSum.val(response.from_fiat_amount.toFixed(2))
                	toFiatSum.val(response.client_main.toFixed(2))
                	currencyExchange = +response.currency_exchange;
                	currencyExchangeField.html(`Курс: 1 ${getFromFiatValue()} = `+response.currency_exchange.toFixed(2)+` MAIN`);
                } else if(+response.min_amount === 0 && +response.max_amount === 0) {
                        if (response.no_offer === getToFiatValue()) {
                            showFieldError(toTradeMethod, 'Банк не подходит для банка получения. Выберите другой банк.');
                        } else if (response.no_offer === getFromFiatValue()) {
                            showFieldError(fromTradeMethod, 'Банк не подходит для банка отправления. Выберите другой банк.');
                        }
                } else {
                    if(+response.min_amount === 0 && +response.max_amount === 0) {
                        if (response.no_offer === getToFiatValue()) {
                            showFieldError(toTradeMethod, 'Банк не подходит для банка получения. Выберите другой банк.');
                        } else if (response.no_offer === getFromFiatValue()) {
                            showFieldError(fromTradeMethod, 'Банк не подходит для банка отправления. Выберите другой банк.');
                        }
                    } else {
                        //console.log('test3: ', response, fromFiatSum);
                        let sum = fromFiatSum;
                        if (+sum.val() < response.min_amount.toFixed(0)) {
                            sum.val(response.min_amount.toFixed(0));
                            sum.change();

                            if (changeAmountWithMessage) {
                                showFieldError(sum, `Сумма была изменена на минимально возможную.
                                Укажите сумму от ${response.min_amount.toFixed(0)} до ${response.max_amount.toFixed(0)}`);
                            }
                        } else {
                            sum.val(response.max_amount.toFixed(0));
                            sum.change();

                            if (changeAmountWithMessage) {
                                showFieldError(sum, `Сумма была изменена на максимально возможную.
                                Укажите сумму от ${response.min_amount.toFixed(0)} до ${response.max_amount.toFixed(0)}`);
                            }
                        }
                    }
                }
            	/*
                if(response.currency_exchange && (isFromFiatChange ? response.from_fiat_amount : response.to_fiat_amount)) {
                    console.log('test1: ', +response.currency_exchange, +response.currency_exchange_direction);
                    isFromFiatChange ? fromFiatSum.val(response.from_fiat_amount.toFixed(2)) : toFiatSum.val(response.to_fiat_amount.toFixed(2));
                    currencyExchange = +response.currency_exchange;

                    if(+response.currency_exchange_direction === 0) {
                        currencyExchangeField.html(`Курс: 1 ${getFromFiatValue()} = `+response.currency_exchange.toFixed(2)+` ${getToFiatValue()}`);
                    } else {
                        currencyExchangeField.html(`Курс: 1 ${getToFiatValue()} = `+response.currency_exchange.toFixed(2)+` ${getFromFiatValue()}`);
                    }
                } else {
                    console.log('test2: ', +response.currency_exchange);
                    if(+response.min_amount === 0 && +response.max_amount === 0) {
                        if (response.no_offer === getToFiatValue()) {
                            showFieldError(toTradeMethod, 'Банк не подходит для банка получения. Выберите другой банк.');
                        } else if (response.no_offer === getFromFiatValue()) {
                            showFieldError(fromTradeMethod, 'Банк не подходит для банка отправления. Выберите другой банк.');
                        }
                    } else {
                        console.log('test3: ', +response.currency_exchange);
                        let sum = isFromFiatChange ? toFiatSum : fromFiatSum;
                        if (+sum.val() < response.min_amount.toFixed(0)) {
                            sum.val(response.min_amount.toFixed(0));
                            sum.change();

                            if (changeAmountWithMessage) {
                                showFieldError(sum, `Сумма была изменена на минимально возможную.
                                Укажите сумму от ${response.min_amount.toFixed(0)} до ${response.max_amount.toFixed(0)}`);
                            }
                        } else {
                            sum.val(response.max_amount.toFixed(0));
                            sum.change();

                            if (changeAmountWithMessage) {
                                showFieldError(sum, `Сумма была изменена на максимально возможную.
                                Укажите сумму от ${response.min_amount.toFixed(0)} до ${response.max_amount.toFixed(0)}`);
                            }
                        }
                    }
                }
                */
                changeAmountWithMessage = true

            },
            enable_preloader: true,
            button_identifier: firstSubmitButton,
            resultContainerForClear: firstFormResultContainer
        });
    };


    /**
     * Валидация сумм.
     *
     * @returns {boolean}
     */
    const validateSums = () => {

        let isValid = true;
        let value;

        [fromFiatSum].forEach((field) => {
            value = field.val();
            if(!value || value === '' || isNaN(parseFloat(value))) {
                showFieldError(field, 'Укажите число.');
                isValid = false;
            }
        });

        return isValid;
    };

    /**
     * Отправка первой части формы в фоне.
     */
    const sendFirstForm = (event) => {

        event.preventDefault();
        event.stopPropagation();

        /**
         * Валидация.
         */
        if(!validateForm(true)) {
            return;
        }

        const data = getPreparedData(true)

        const amountOfMoney = Number(data.find(({ name }) => name === "from_fiat_sum").value)
        const mainCourse = Number(data.find(({ name }) => name === "currency_exchange").value)
        const bank = data.find(({ name }) => name === "from_trade_method").value
        const coinType = data.find(({ name }) => name === "from_fiat").value
        const getMoney = data.find(({ name }) => name === "to_fiat_sum").value
        const phoneNumber = data.find(({ name }) => name === "phone").value

        __send_form__({
            userId: __user_id__,
            amountOfMoney,
            mainCourse,
            bank,
            coinType,
            getMoney,
            phoneNumber,
            purchaseType: 'Перевод'
        })

        // sendRequest({
        //     url: Api.getUrl('create_part_order'),
        //     method: 'POST',
        //     data: getPreparedData(true),
        //     result_container: firstFormResultContainer,
        //     success_handle: (response) => {
        //         Popup.open(config.cardPopupId)

        //         try {
        //             const domain = window.location.hostname;

        //             if (domain === 'nummasend.ru') {
        //                 ym(91009616,'reachGoal','zayavka')
        //             } else if(domain === 'numma.org') {
        //                 ym(91134462,'reachGoal','zayavka')
        //             } else if (domain === 'numfunds.ru') {
        //                 ym(91608613, 'reachGoal', 'zayavka')
        //             }
        //         } catch (error) {
        //             console.error(error.message)
        //         }
        //     },
        //     enable_preloader: true,
        //     button_identifier: config.firstSubmitButton,
        //     form: firstForm
        // });

    }

    /**
     * Отправка формы.
     */
    const sendForm = (event) => {

        event.preventDefault()
        event.stopPropagation()

        /**
         * Валидация.
         */
        if(!validateForm()) {
            return;
        }

        sendRequest({
            url: Api.getUrl('create_order'),
            method: 'POST',
            data: getPreparedData(),
            result_container: secondFormResultContainer,
            success_handle: (response) => {
                // window.location.href = 'https://numma.info/botlink?start='+id;
                Popup.close(config.cardPopupId)
                Popup.open(config.successPopupId)

                id = uuidv4()
                $(secondFormResultContainer).html('')
                fromCard.val('')
                fromName.val('')
                toCard.val('')
                toName.val('')

                try {
                    const domain = window.location.hostname;

                    if (domain === 'nummasend.ru') {
                        ym(91009616,'reachGoal','zayavka')
                    } else if(domain === 'numma.org') {
                        ym(91134462,'reachGoal','zayavka')
                    } else if (domain === 'numfunds.ru') {
                        ym(91608613, 'reachGoal', 'zayavka')
                    }
                } catch (error) {
                    console.error(error.message)
                }
            },
            enable_preloader: true,
            button_identifier: secondSubmitButton,
            form: secondForm
        });
    };

    /**
     * Получение подготовленных данных.
     *
     * @returns {*}
     */
    const getPreparedData = (isFirstForm) => {

        let data = firstForm.serializeArray()
            .concat(secondForm.serializeArray());

        ['utm_source', 'utm_medium', 'utm_campaign'].forEach((key) => {
            let value = getCookie(key);

            if (value !== 'false' && value) {
                data.push({name: key, value: value});
            } else if (value = getRequestParameter(key)) {
                setCookie(key, value, 60*60*24*30)
                data.push({name: key, value: value});
            }
        });

        data.push({name: 'id', value: id});
        data.push({name: 'from_fiat', value: getFromFiatValue()});
        data.push({name: 'to_fiat', value: getToFiatValue()});
        data.push({name: 'to_fiat_sum', value: toFiatSum.val()});
        data.push({name: 'currency_exchange', value: currencyExchange});

        data.push({name: 'from_fiat_sum', value: fromFiatSum.val()});
        data.push({name: 'from_trade_method', value: fromTradeMethod.val()});
        data.push({name: 'phone', value: phone.intlTelInput('getNumber')});
        data.push({name: 'to_trade_method', value: toTradeMethod.val()});
        data.push({name: 'form_name', value: firstFormName.val()});

        if (!isFirstForm) {
            const $fromCardPrefix = $('.js-from_card-prefix', secondForm)

            data.push({name: 'from_card', value: ($fromCardPrefix.html() || '') + fromCard.val()});
            data.push({name: 'from_name', value: fromName.val()});

            const $toCardPrefix = $('.js-to_card-prefix', secondForm)

            data.push({name: 'to_card', value: ($toCardPrefix.html() || '') + toCard.val()});
            data.push({name: 'to_name', value: toName.val()});
            data.push({name: 'form_name', value: secondFormName.val()});
        }

        return data;
    }

    /**
     * Валидация формы.
     *
     * @returns {boolean}
     */
    const validateForm = (isFirstForm) => {

        let isValid = true;

        isValid = validateSums();

        if(!Iti.isValidNumber(phone)) {
            showFieldError(phone.parent(), 'Укажите корректный номер телефона.');
            isValid = false;
        }

        if(!isFirstForm) {
            [fromName, toName].forEach((field) => {
                const validationRes = FormHelpers.validateName(field.val(), { withFamily: true })

                if (!validationRes.valid) {
                    showFieldError(field, validationRes.error);
                    isValid = false;
                }
            });

            const fromCardValidationRes = FormHelpers.validateCard(fromCard.val(), getFromFiatValue(), fromTradeMethod.val())

            if (!fromCardValidationRes.valid) {
                showFieldError(fromCard, fromCardValidationRes.error);
                isValid = false;
            }

            const toCardValidationRes = FormHelpers.validateCard(toCard.val(), getToFiatValue(), toTradeMethod.val())

            if (!toCardValidationRes.valid) {
                showFieldError(toCard, toCardValidationRes.error);
                isValid = false;
            }
        }

        return isValid;
    };

    /**
     * Скрытие ошибки поля.
     *
     * @param field
     */
    const hideFieldError = (field) => {
        // const errorSelector = $(field).siblings('.t-input-error');
        // errorSelector.html('').hide();
        const errorSelector = $(field).parent().parent().parent();

        $('.u-error', errorSelector).html('').hide();
    };

    initData();
    bindEvents();
};

