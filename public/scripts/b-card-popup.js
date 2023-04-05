class CardPopup {
    static get selectors() {
        return {
            form: '.b-card-popup__form',
            formName: '.js-form-name-input',
            fromCardInput: '.js-from_card-input',
            fromNameInput: '.js-from_name-input',
            toCardInput: '.js-to_card-input',
            toNameInput: '.js-to_name-input',
            resultContainer: '.b-card-popup__result-container',
            submitButton: '.b-card-popup__form-button',
            fromCardLabel: '.js-from_card-label',
            toCardLabel: '.js-to_card-label',
            cardTextPrefix: 'u-input__text-prefix',
            jsFromCardPrefix: '.js-from_card-prefix',
            jsToCardPrefix: '.js-to_card-prefix',
        }
    }

    static get classes() {
        return {
            cardTextPrefix: 'u-input__text-prefix',
            jsFromCardPrefix: 'js-from_card-prefix',
            jsToCardPrefix: 'js-to_card-prefix'
        }
    }

    static init() {
        const form = $(CardPopup.selectors.form)
        const fromCardInput = $(CardPopup.selectors.fromCardInput)
        const toCardInput = $(CardPopup.selectors.toCardInput)

        const fromNameInput = form.find(CardPopup.selectors.fromNameInput)
        const toNameInput = form.find(CardPopup.selectors.toNameInput)

        fromNameInput.get(0).addEventListener('input', (event) => {
            event.target.value = FormHelpers.formatName(event.target.value, { withFamily: true })
        })

        toNameInput.get(0).addEventListener('input', (event) => {
            event.target.value = FormHelpers.formatName(event.target.value, { withFamily: true })
        })

        if (window.numma && window.numma[0]) {
            const fromFiatConfig = window.numma[0].fromFiat
            const toFiatConfig = window.numma[0].toFiat
            const firstForm = $(window.numma[0].firstForm)

            const fromTradeMethod = firstForm.find("[name='from_trade_method']")
            const toTradeMethod = firstForm.find("[name='to_trade_method']")
            const fromFiat = firstForm.find("[name='from_fiat']")
            const toFiat = firstForm.find("[name='to_fiat']")

            fromTradeMethod.change(() => {
                CardPopup.handleTradeMethodChange(
                    fromFiat.val() || fromFiatConfig,
                    fromTradeMethod.val(),
                    true,
                    fromCardInput,
                    CardPopup.selectors.fromCardLabel,
                    CardPopup.classes.jsFromCardPrefix
                )
            })

            toTradeMethod.change(() => {
                CardPopup.handleTradeMethodChange(
                    toFiat.val() || toFiatConfig,
                    toTradeMethod.val(),
                    false,
                    toCardInput,
                    CardPopup.selectors.toCardLabel,
                    CardPopup.classes.jsToCardPrefix
                )
            })
        }
    }

    static _inputListenerNumeric = (event) => {
        const { value } = event.target

        event.target.value = FormHelpers.getOnlyNumbers(value)
    }

    static _inputListenerNumericAndLatin = (event) => {
        const { value } = event.target

        event.target.value = FormHelpers.getOnlyNumbersAndLatin(value)
    }

    static handleTradeMethodChange = (fiat, method, isFrom, $input, cardLabelSelector, jsCardPrefixClass) => {
        $(`.${jsCardPrefixClass}`, $input.parent()).remove()

        const inputType = FormHelpers.getCardInputType(method)
        const cardFieldTitle = FormHelpers.getCardFieldTitle(fiat, method, isFrom)
        const placeholder = FormHelpers.getCardPlaceholder(fiat, method)
        const mask = FormHelpers.getCardMask(fiat, method)

        $(cardLabelSelector).html(cardFieldTitle)
        $input.inputmask && $input.inputmask('remove')
        $input.removeMask && $input.removeMask()
        $input.attr('placeholder', placeholder)
        $input.attr('type', 'text')
        $input.removeAttr('inputmode')
        $input.val('')
        $input.get(0).removeEventListener('input', CardPopup._inputListenerNumeric)
        $input.get(0).removeEventListener('input', CardPopup._inputListenerNumericAndLatin)

        if (mask) {
            if (mask.prefix) {
                const $prefix = $('<div>', { class: `${CardPopup.classes.cardTextPrefix} ${jsCardPrefixClass}` }).html(mask.prefix)

                $input.parent().prepend($prefix)
            }

            if (mask.type === 'card') {
                $input.attr('inputmode', 'numeric')
            }

            mask.toMask($input)
        } else {
            if (inputType === 'email') {
                $input.attr('type', 'email')
            } else {
                if (fiat !== CURRENCIES.AED) {
                    $input.get(0).addEventListener('input', CardPopup._inputListenerNumeric)
                } else {
                    $input.get(0).addEventListener('input', CardPopup._inputListenerNumericAndLatin)
                }
            }

            const maxLength = fiat !== CURRENCIES.AED ? 64 : 20

            $input.attr('maxLength', maxLength)
        }
    }
}

CardPopup.init()