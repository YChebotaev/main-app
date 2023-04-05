class ApplicationCreatingPopup {
    static get selectors() {
        return {
            elem: '.b-application-creating-popup',
            form: '.b-application-creating-popup__form',
            formName: '.js-form-name-input',
            submitButton: '.b-application-creating-popup__submit-button',
            resultContainer: '.b-application-creating-popup__result-container',
            nameInput: '.js-name-input',
            phoneInput: '.js-phone-input',
            currencyInput: '.js-currency-input',
            sumInput: '.js-sum-input',
            nameError: '.js-name-error',
            phoneError: '.js-phone-error',
            currencyError: '.js-currency-error',
            sumError: '.js-sum-error',
        }
    }

    static init() {
        const popup = $(ApplicationCreatingPopup.selectors.elem)
        const form = popup.find(ApplicationCreatingPopup.selectors.form)
        const submitButton = $(ApplicationCreatingPopup.selectors.submitButton, popup)
        const formNameInput = $(ApplicationCreatingPopup.selectors.formName, form)

        const nameInput = $(ApplicationCreatingPopup.selectors.nameInput, popup)
        const phoneInput = $(ApplicationCreatingPopup.selectors.phoneInput, popup)
        const currencyInput = $(ApplicationCreatingPopup.selectors.currencyInput, popup)
        const sumInput = $(ApplicationCreatingPopup.selectors.sumInput, popup)

        phoneInput.intlTelInput({
            autoHideDialCode: false,
            autoPlaceholder: "aggressive",
            placeholderNumberType: "MOBILE",
            preferredCountries: ['ru'],
            separateDialCode: true,
            nationalMode: true
        })

        phoneInput.on("countrychange", function() {
            Iti.mask(phoneInput);
        });

        Iti.mask(phoneInput);

        sumInput.get(0).addEventListener('input', event => {
            const { value } = event.target

            event.target.value = FormHelpers.getOnlyNumbers(value)
        })

        nameInput.get(0).addEventListener('input', (event) => {
            event.target.value = FormHelpers.formatName(event.target.value)
        })

        const onSubmit = (event) => {
            event.preventDefault()

            const validationResult = ApplicationCreatingPopup._validate(popup)

            const nameError = $(ApplicationCreatingPopup.selectors.nameError, popup)
            const phoneError = $(ApplicationCreatingPopup.selectors.phoneError, popup)
            const currencyError = $(ApplicationCreatingPopup.selectors.currencyError, popup)
            const sumError = $(ApplicationCreatingPopup.selectors.sumError, popup)

            nameError.html('')
            phoneError.html('')
            currencyError.html('')
            sumError.html('')

            nameError.hide()
            phoneError.hide()
            currencyError.hide()
            sumError.hide()

            if (Object.keys(validationResult).length > 0) {
                if (validationResult.name) {
                    nameError.html(validationResult.name)
                    nameError.show()
                }

                if (validationResult.phone) {
                    phoneError.html(validationResult.phone)
                    phoneError.show()
                }

                if (validationResult.currency) {
                    currencyError.html(validationResult.currency)
                    currencyError.show()
                }

                if (validationResult.sum) {
                    sumError.html(validationResult.sum)
                    sumError.show()
                }
            } else {
                Button.enableLoading(submitButton.get(0))

                const resultContainer = $(ApplicationCreatingPopup.selectors.resultContainer, popup)

                if (resultContainer.children()) {
                    resultContainer.children().remove()
                }

                fetch(Api.getUrl('create_simple_order'), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        phone: phoneInput.intlTelInput('getNumber'),
                        login: nameInput.val(),
                        fiats: currencyInput.val(),
                        from_fiat_sum: +sumInput.val(),
                        form_name: formNameInput.val(),
                    })
                })
                    .then(response => {

                        response.json().then(data => {
                            if (data.operation_status.status === 'error') {
                                const div = $('<div>')

                                div.addClass('u-error u-error_center u-error_mb_10')
                                div.html(data.operation_status.message)

                                resultContainer.append(div)
                            } else if (data.operation_status.status === 'success') {
                                Popup.close('application-creating')
                                Popup.open('application-success')

                                $(ApplicationCreatingPopup.selectors.nameInput, popup).val('')
                                $(ApplicationCreatingPopup.selectors.phoneInput, popup).intlTelInput('setNumber', '')
                                $(ApplicationCreatingPopup.selectors.currencyInput, popup).val('')
                                $(ApplicationCreatingPopup.selectors.sumInput, popup).val('')

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
                            }
                        })
                    })
                    .catch(error => {
                        const div = $('<div>')

                        div.addClass('u-error u-error_center u-error_mb_10')
                        div.html(error.message)

                        resultContainer.append(div)
                    })
                    .finally(() => {
                        Button.disableLoading(submitButton.get(0))
                    })
            }
        }

        const domain = window.location.hostname;

        let event = domain === 'numma.org' ? 'submit' : 'click'

        if (event === 'submit') {
            form.submit(onSubmit)
        } else {
            submitButton.click(onSubmit)
        }
    }

    static _validate(popup) {
        const nameInput = $(ApplicationCreatingPopup.selectors.nameInput, popup)
        const phoneInput = $(ApplicationCreatingPopup.selectors.phoneInput, popup)
        const currencyInput = $(ApplicationCreatingPopup.selectors.currencyInput, popup)
        const sumInput = $(ApplicationCreatingPopup.selectors.sumInput, popup)
        
        const validationResult = {}

        const nameValidationResult = FormHelpers.validateName(nameInput.val())

        if (!nameValidationResult.valid) {
            validationResult.name = nameValidationResult.error
        }

        if (!Iti.isValidNumber(phoneInput)) {
            validationResult.phone = 'Номер введен некорректно'
        }

        if (currencyInput.val().trim().length === 0) {
            validationResult.currency = 'Заполните поле'
        }

        if (sumInput.val().trim().length === 0) {
            validationResult.sum = 'Заполните поле'
        }

        return validationResult
    }
}

ApplicationCreatingPopup.init()

