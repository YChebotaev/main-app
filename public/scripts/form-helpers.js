class FormHelpers {
    static formatPhoneValue = (inputValue) => {
        const onlyNumbersValue = FormHelpers.getOnlyNumbers(inputValue)
        let formattedInputValue = ''

        if (onlyNumbersValue.length > 0) {
            formattedInputValue += '(' + onlyNumbersValue.substring(0, 3)
        }

        if (onlyNumbersValue.length >= 4) {
            formattedInputValue += ') ' + onlyNumbersValue.substring(3, 6)
        }

        if (onlyNumbersValue.length >= 7) {
            formattedInputValue += '-' + onlyNumbersValue.substring(6, 8)
        }

        if (onlyNumbersValue.length >= 9) {
            formattedInputValue += '-' + onlyNumbersValue.substring(8, 10)
        }

        return formattedInputValue
    }

    static getOnlyNumbers = value => value.replace(/\D/g, '')
    static getOnlyNumbersAndLatin = value => value.replace(/[^0-9a-zA-Z]/g, '')

    static getOnlyNumbersAndDot = value => value.replace(/([^0-9\.])/g, '')
    static getWithoutNumbers = value => value.replace(/\d/g, '')

    static getFormattedCard = value => value.replace(/([^0-9 -])/g, '')

    static isValidEmail = (email) => {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

        return EMAIL_REGEXP.test(email)
    }

    static isValidCard = value => FormHelpers.getOnlyNumbers(value).length === 16
    static isValidAccount = value => {
        const valueLength = FormHelpers.getOnlyNumbersAndLatin(value).length

        return valueLength >= 19 && valueLength <= 24
    }
    static isEmpty = value => value.length === 0
    static validateName = (value, { withFamily } = {}) => {
        if (!value) {
            return {
                valid: false,
                error: 'Заполните поле.'
            }
        } else if (value.length > 64) {
            return {
                valid: false,
                error: 'Введите менее 64 символов.'
            }
        }

        if (withFamily) {
            const fullName = value
                .trim()
                .replace(/  +/g, ' ')
                .split(' ')

            const [name, family] = fullName

            const validName = name && name.length >= 2
            const validFamily = family && family.length >= 2
            const validFullNameFormat = fullName.length <= 2

            let error = null

            if (withFamily && !validFamily) {
                error = 'Фамилия введена некорректно.'
            }

            if (!validName) {
                error = 'Имя введено некорректно.'
            }

            if (!validFullNameFormat) {
                error = 'Неверный формат.'
            }

            const isValid = validName && (!withFamily || validFamily) && validFullNameFormat

            return {
                valid: isValid,
                ...(!isValid && {error})
            }
        } else {
            const isValid = value.trim().length >= 2

            return {
                valid: isValid,
                ...(!isValid && {error: 'Имя введено некорректно'})
            }
        }
    }

    static formatName = (value, { withFamily } = {}) => {
        const formattedValue = FormHelpers.getWithoutNumbers(value).replace(/[!@#$%^&*()_;:+"'.,></~§±?]+/g, '')

        return withFamily ? formattedValue : formattedValue.trim()
    }

    static getStandardPhone = (phone) => {

        if(phone.length === 0) {
            return phone;
        }

        phone = phone.replace(/[^0-9]/g, '', phone);

        if(phone === '') return '';

        if(phone[0] !== '+') {
            phone = '+'+phone;
        }

        if(phone[1] === '8') {
            phone = '+7'+phone.slice(2);
        }

        return phone;

    }

    static getCardInputType = (bank) => {
        if (!bank) {
            return null
        }

        bank = bank.toLowerCase()

        switch (bank) {
            case 'payeer':
            case 'skrillmoneybookers':
            case 'wise':
                return 'email'
            default:
                return 'text'
        }
    }

    static getCardFieldTitle = (currency, bank, isFrom) => {
        if (!bank || !currency) {
            return null
        }

        bank = bank.toLowerCase()

        const person = isFrom ? 'отправителя' : 'получателя'

        const card = `Номер карты ${person}`
        const account = `IBAN банковского счета ${person}`
        const email = `Email аккаунта ${person}`

        switch (bank) {
            case 'payeer':
            case 'skrillmoneybookers':
            case 'wise':
                return email
            case 'swift':
                return `Счет SWIFT ${person}`
            case 'sepainstant':
                return account
            default:
                break
        }

        switch (currency) {
            case CURRENCIES.RUB:
            case CURRENCIES.KZT:
            case CURRENCIES.USD:
            case CURRENCIES.EUR:
            case CURRENCIES.THB:
            case CURRENCIES.GBP:
                return card
            case CURRENCIES.TRY:
            case CURRENCIES.GEL:
                return account
            case CURRENCIES.AED:
                return `Номер банковского счета ${person}`
            default:
                return card
        }
    }

    static getCardPlaceholder = (currency, bank) => {
        const defaultPlaceholder = 'Введите номер карты'

        if (!bank || !currency) {
            return defaultPlaceholder
        }

        bank = bank.toLowerCase()

        switch (bank) {
            case 'payeer':
            case 'skrillmoneybookers':
            case 'wise':
                return 'Введите email'
            case 'swift':
                return 'XXX'
            case 'sepainstant':
                return 'XXXXXXXXXXXXXXXXXXXXXXXX'
            default:
                break
        }

        switch (currency) {
            case CURRENCIES.RUB:
            case CURRENCIES.KZT:
                return 'XXXX XXXX XXXX XXXX'
            case CURRENCIES.USD:
            case CURRENCIES.EUR:
            case CURRENCIES.THB:
            case CURRENCIES.GBP:
                return defaultPlaceholder
            case CURRENCIES.TRY:
            case CURRENCIES.GEL:
                return 'XXXXXXXXXXXXXXXXXXXXXXXX'
            case CURRENCIES.AED:
                return 'Введите номер банковского счета'
            default:
                return defaultPlaceholder
        }
    }

    static getCardMask = (currency, bank) => {
        if (!bank || !currency) {
            return null
        }

        bank = bank.toLowerCase()

        const USUAL_CARD_MASK = {
            type: 'card',
            prefix: null,
            toMask: $input => Inputmask('9999 9999 9999 9999', {
                jitMasking: true,
                showMaskOnHover: false,
                showMaskOnFocus: false
            }).mask($input),
        }

        switch (bank) {
            case 'payeer':
            case 'skrillmoneybookers':
                return null
            case 'swift': {
                return {
                    prefix: 'TICSRUMM',
                    toMask: $input => {
                        const eventListener = (event) => {
                            const { value } = event.target

                            event.target.value = FormHelpers.getOnlyNumbersAndLatin(value).slice(0, 3).toUpperCase()
                        }

                        $input.get(0).addEventListener('input', eventListener)

                        $input.removeMask = () => {
                            $input.get(0).removeEventListener('input', eventListener)
                        }
                    },
                }
            }
            case 'sepainstant': {
                return {
                    prefix: null,
                    toMask: $input => {
                        const eventListener = (event) => {
                            const { value } = event.target

                            event.target.value = FormHelpers.getOnlyNumbersAndLatin(value).slice(0, 24).toUpperCase()
                        }

                        $input.get(0).addEventListener('input', eventListener)

                        $input.removeMask = () => {
                            $input.get(0).removeEventListener('input', eventListener)
                        }
                    },
                }
            }
            default:
                break
        }

        switch (currency) {
            case CURRENCIES.RUB:
            case CURRENCIES.KZT:
                return {...USUAL_CARD_MASK}
            case CURRENCIES.USD:
            case CURRENCIES.EUR:
            case CURRENCIES.AED:
            case CURRENCIES.THB:
            case CURRENCIES.GBP:
                return null
            case CURRENCIES.TRY:
                return {
                    prefix: 'TR',
                    toMask: $input => {
                        const eventListener = (event) => {
                            const { value } = event.target

                            event.target.value = FormHelpers.getOnlyNumbersAndLatin(value).slice(0, 24).toUpperCase()
                        }

                        $input.get(0).addEventListener('input', eventListener)

                        $input.removeMask = () => {
                            $input.get(0).removeEventListener('input', eventListener)
                        }
                    },
                }
            case CURRENCIES.GEL:
                return {
                    prefix: 'GE',
                    toMask: $input => {
                        const eventListener = (event) => {
                            const { value } = event.target

                            event.target.value = FormHelpers.getOnlyNumbersAndLatin(value).slice(0, 24).toUpperCase()
                        }

                        $input.get(0).addEventListener('input', eventListener)

                        $input.removeMask = () => {
                            $input.get(0).removeEventListener('input', eventListener)
                        }
                    },
                }
            default:
                return null
        }
    }

    static validateCard = (value, currency, bank) => {
        if (!bank || !currency) {
            return null
        }

        bank = bank.toLowerCase()

        const invalidEmailText = 'Неверный формат почты.'
        const invalidCardText = 'Неверный формат карты.'
        const invalidFormatText = 'Неверный формат.'
        const requiredFieldText = 'Заполните поле.'

        if (FormHelpers.isEmpty(value)) {
            return {
                valid: false,
                error: requiredFieldText
            }
        }

        switch (bank) {
            case 'payeer':
            case 'skrillmoneybookers':
            case 'wise': {
                const isValid = FormHelpers.isValidEmail(value)

                return {
                    valid: isValid,
                    ...(!isValid && {error: invalidEmailText})
                }
            }
            case 'swift': {
                const isValid = FormHelpers.getOnlyNumbersAndLatin(value).length === 3

                return {
                    valid: isValid,
                    ...(!isValid && {error: invalidFormatText})
                }
            }
            case 'sepainstant': {
                const isValid = FormHelpers.isValidAccount(value)

                return {
                    valid: isValid,
                    ...(!isValid && {error: invalidFormatText})
                }
            }
        }

        switch (currency) {
            case CURRENCIES.RUB:
            case CURRENCIES.KZT: {
                const isValid = FormHelpers.isValidCard(value)

                return {
                    valid: isValid,
                    ...(!isValid && {error: invalidCardText})
                }
            }
            case CURRENCIES.USD:
            case CURRENCIES.EUR:
            case CURRENCIES.AED:
            case CURRENCIES.THB:
            case CURRENCIES.GBP: {
                const isValid = !FormHelpers.isEmpty(value)

                return {
                    valid: isValid,
                    ...(!isValid && {error: requiredFieldText})
                }
            }
            case CURRENCIES.TRY:
            case CURRENCIES.GEL: {
                const isValid = FormHelpers.isValidAccount(value)

                return {
                    valid: isValid,
                    ...(!isValid && {error: invalidFormatText})
                }
            }
            default:
                return null
        }
    }
}