class FeedbackForm {
    static get selectors() {
        return {
            elem: '.b-feedback',
            form: '.b-feedback__form',
            submitButton: '.b-feedback__submit-button',
            resultContainer: '.b-feedback__result-container',
            nameInput: '.js-name-input',
            phoneInput: '.js-phone-input',
            emailInput: '.js-email-input',
            questionInput: '.js-question-input',
            nameError: '.js-name-error',
            phoneError: '.js-phone-error',
            emailError: '.js-email-error',
            questionError: '.js-question-error',
            formName: '.js-form-name-input',
        }
    }
    
    values = {
        name: '',
        phone: '',
        email: '',
        question: '',
        form_name: '',
    }

    static init() {
        const form = new FeedbackForm()
        const elem = $(FeedbackForm.selectors.elem)
        const formElem = $(FeedbackForm.selectors.form)
        const submitButton = $(FeedbackForm.selectors.submitButton)

        const nameInput = $(FeedbackForm.selectors.nameInput, elem)
        const phoneInput = $(FeedbackForm.selectors.phoneInput, elem)
        const emailInput = $(FeedbackForm.selectors.emailInput, elem)
        const questionInput = $(FeedbackForm.selectors.questionInput, elem)
        const formNameInput = $(FeedbackForm.selectors.formName, elem)

        nameInput.get(0).addEventListener('input', function(event) {
            const { value } = event.target
            const formattedValue = FormHelpers.formatName(value)

            form.values.name = formattedValue
            event.target.value = formattedValue
        })

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

        emailInput.get(0).addEventListener('input', function(event) {
            const { value } = event.target

            form.values.email = value
            event.target.value = value
        })

        questionInput.get(0).addEventListener('input', function(event) {
            const { value } = event.target

            form.values.question = value
            event.target.value = value
        })

        const domain = window.location.hostname;

        let event = domain === 'numma.org' ? 'submit' : 'click'

        if (event === 'submit') {
            formElem.submit((event) => {
                event.preventDefault()

                form._submit()
            })
        } else {
            submitButton.click((event) => {
                event.preventDefault()

                form._submit()
            })
        }
    }
    
    _validate() {
        const elem = $(FeedbackForm.selectors.elem)
        const phoneInput = $(FeedbackForm.selectors.phoneInput, elem)
        const { name, email, question } = this.values;

        const validationResult = {}

        const nameValidationResult = FormHelpers.validateName(name)

        if (!nameValidationResult.valid){
            validationResult.name = nameValidationResult.error
        }

        if (!Iti.isValidNumber(phoneInput)){
            validationResult.phone = 'Номер введен некорректно'
        }

        if (!FormHelpers.isValidEmail(email)){
            validationResult.email = 'Неверный формат почты'
        }

        if (!email.trim()){
            validationResult.email = 'Заполните поле'
        }

        if (!question.trim()){
            validationResult.question = 'Заполните поле'
        } else if (question.trim().length < 10) {
            validationResult.question = 'Длина поля не должна быть меньше 10 символов'
        }

        return validationResult;
    }
    
    _submit() {
        const validateResult = this._validate()
        const errorFieldsKeys = Object.keys(validateResult)
        const elem = $(FeedbackForm.selectors.elem)
        const phoneInput = $(FeedbackForm.selectors.phoneInput, elem)
        const formName = $(FeedbackForm.selectors.formName, elem)

        if (errorFieldsKeys.length > 0) {
            Object.keys(this.values).forEach(fieldKey => {
                const errorElem = $(FeedbackForm.selectors[`${fieldKey}Error`], elem)

                if (!errorFieldsKeys.includes(fieldKey)) {
                    errorElem.html('')
                    errorElem.hide()
                } else {
                    errorElem.html(validateResult[fieldKey])
                    errorElem.css('display', 'inline-block')
                }
            })
        } else {
            Object.keys(this.values).forEach(fieldKey => {
                const errorElem = $(FeedbackForm.selectors[`${fieldKey}Error`], elem)

                errorElem.html('')
                errorElem.hide()
            })

            const submitButton = $(FeedbackForm.selectors.submitButton)
            const resultContainer = $(FeedbackForm.selectors.resultContainer)

            if (resultContainer.children()) {
                resultContainer.children().remove()
            }

            Button.enableLoading(submitButton.get(0))

            fetch(Api.getUrl('send_feedback'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: phoneInput.intlTelInput('getNumber'),
                    login: this.values.name,
                    email: this.values.email,
                    feedback: this.values.question,
                    form_name: formName.val(),
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
                            Popup.open('feedback-success')

                            this._clearFormValues()

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

    _clearFormValues() {
        const elem = $(FeedbackForm.selectors.elem)

        $(FeedbackForm.selectors.nameInput, elem).val('')
        $(FeedbackForm.selectors.phoneInput, elem).intlTelInput('setNumber', '')
        $(FeedbackForm.selectors.emailInput, elem).val('')
        $(FeedbackForm.selectors.questionInput, elem).val('')

        this.values = {
            name: '',
            phone: '',
            email: '',
            question: '',
        }
    }
}

FeedbackForm.init()