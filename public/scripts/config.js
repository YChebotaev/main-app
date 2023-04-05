(() => {
    const fiatsByUrl = {
        '/rub-to-usd': {
            from: CURRENCIES.RUB,
            to: CURRENCIES.USD
        },
        '/usd-to-rub': {
            from: CURRENCIES.USD,
            to: CURRENCIES.RUB
        },
        '/eur-to-rub': {
            from: CURRENCIES.EUR,
            to: CURRENCIES.RUB
        },
        '/rub-to-eur': {
            from: CURRENCIES.RUB,
            to: CURRENCIES.EUR
        },
        '/eur-to-aed': {
            from: CURRENCIES.EUR,
            to: CURRENCIES.AED
        },
        '/usd-to-aed': {
            from: CURRENCIES.USD,
            to: CURRENCIES.AED
        },
        '/aed-to-rub': {
            from: CURRENCIES.AED,
            to: CURRENCIES.RUB
        },
        '/rub-to-aed': {
            from: CURRENCIES.RUB,
            to: CURRENCIES.AED
        },
        '/rub-to-gel': {
            from: CURRENCIES.RUB,
            to: CURRENCIES.GEL
        },
        '/rub-to-try': {
            from: CURRENCIES.RUB,
            to: CURRENCIES.TRY
        },
        '/rub-to-kzt': {
            from: CURRENCIES.RUB,
            to: CURRENCIES.KZT
        },
        '/aed-to-usd': {
            from: CURRENCIES.AED,
            to: CURRENCIES.USD
        },
        '/try-to-rub': {
            from: CURRENCIES.TRY,
            to: CURRENCIES.RUB
        },
        '/rub-to-thb': {
            from: CURRENCIES.RUB,
            to: CURRENCIES.THB
        },
        '/rub-to-gbp': {
            from: CURRENCIES.RUB,
            to: CURRENCIES.GBP
        },

    }

    const key = Object.keys(fiatsByUrl).find(url => window.location.href.includes(url))

    if (key) {
        window.numma = [{
            fromFiat: fiatsByUrl[key].from,
            toFiat: fiatsByUrl[key].to,
            firstForm: '.b-intro-block__form',
            secondForm: '.b-card-popup__form',
            firstSubmitButton: '.b-intro-block__form-button',
            secondSubmitButton: '.b-card-popup__form-button',
            currencyEchangeField: '.b-intro-block__rate-label-text',
            firstFormResultContainer: '.b-intro-block__result-container',
            secondFormResultContainer: '.b-card-popup__result-container',
            cardPopupId: 'card-popup',
            successPopupId: 'application-success'
        }]
    } else {
        window.numma = [{
            fromFiat: null,
            toFiat: null,
            firstForm: '.b-intro-block__form',
            secondForm: '.b-card-popup__form',
            firstSubmitButton: '.b-intro-block__form-button',
            secondSubmitButton: '.b-card-popup__form-button',
            currencyEchangeField: '.b-intro-block__rate-label-text',
            firstFormResultContainer: '.b-intro-block__result-container',
            secondFormResultContainer: '.b-card-popup__result-container',
            cardPopupId: 'card-popup',
            successPopupId: 'application-success'
        }]
    }
})()