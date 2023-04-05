const CURRENCIES = {
    RUB: 'RUB',
    USD: 'USD',
    EUR: 'EUR',
    AED: 'AED',
    GEL: 'GEL',
    TRY: 'TRY',
    KZT: 'KZT',
    THB: 'THB',
    GBP: 'GBP'
}

const TRIGGERS = {
    JS: 'js',
    USER: 'user'
}

const CURRENCY_OPTIONS = [
    {
        id: CURRENCIES.RUB,
        text: `${CURRENCIES.RUB} - Российский рубль`,
        selectedOptionText: 'RUB'
    },
    {
        id: CURRENCIES.USD,
        text: `${CURRENCIES.USD} - Доллар США`,
        selectedOptionText: 'USD'
    },
    {
        id: CURRENCIES.EUR,
        text: `${CURRENCIES.EUR} - Евро`,
        selectedOptionText: 'EUR'
    },
    {
        id: CURRENCIES.AED,
        text: `${CURRENCIES.AED} - Дирхам ОАЭ`,
        selectedOptionText: 'AED'
    },
    {
        id: CURRENCIES.GEL,
        text: `${CURRENCIES.GEL} - Грузинский лари`,
        selectedOptionText: 'GEL'
    },
    {
        id: CURRENCIES.TRY,
        text: `${CURRENCIES.TRY} - Турецкая лира`,
        selectedOptionText: 'TRY'
    },
    {
        id: CURRENCIES.KZT,
        text: `${CURRENCIES.KZT} - Казахстанский тенге`,
        selectedOptionText: 'KZT'
    },
    {
        id: CURRENCIES.THB,
        text: `${CURRENCIES.THB} - Тайский бат`,
        selectedOptionText: 'THB'
    },
    {
        id: CURRENCIES.GBP,
        text: `${CURRENCIES.GBP} - Фунт стерлингов`,
        selectedOptionText: 'GBP'
    }
]

const getOptionText = currency => {
    return CURRENCY_OPTIONS.find(option => option.id === currency)?.text || currency
}

const getSelectedOptionText = currencyText => {
    return CURRENCY_OPTIONS.find(option => option.text === currencyText)?.selectedOptionText || currencyText
}