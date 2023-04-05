class IntroBlock {
    static get selectors() {
        return  {
            introBlock: '.b-intro-block',
            button: '.b-intro-block__button',
            form: '.b-intro-block__form',
            formSubmitButton: '.b-intro-block__form-button',
            formName: '.js-form-name-input',
            rateLabelText: '.b-intro-block__rate-label-text',
            secondForm: '.b-card-popup',
            phoneInput: '.js-phone-input',
            //toFiatSumInput: '.js-to_fiat_sum-input',
            fromFiatSumInput: '.js-from_fiat_sum-input',
            fromTradeMethod: '[name="from_trade_method"]',
            //toTradeMethod: '[name="to_trade_method"]',
            resultContainer: '.b-intro-block__result-container',
            introTitle: '.js-intro-title',
            introList: '.js-intro-list',
            fromFiatLabel: '.js-from-fiat-label',
            toFiatLabel: '.js-to-fiat-label'
        }
    }

    static init() {
        const form = $(IntroBlock.selectors.form)
        const fromFiatSumInput = form.find(IntroBlock.selectors.fromFiatSumInput)
        //const toFiatSumInput = form.find(IntroBlock.selectors.toFiatSumInput)
        const phoneInput = form.find(IntroBlock.selectors.phoneInput)
        const fromTradeMethod = form.find(IntroBlock.selectors.fromTradeMethod)
        //const toTradeMethod = form.find(IntroBlock.selectors.toTradeMethod)
        const button = $(IntroBlock.selectors.button)
        const formName = $(IntroBlock.selectors.formName)

        button.get(0) && button.click(() => {
            Popup.open('application-creating')
        })

        const formElem = form.get(0)

        const domain = window.location.hostname;

        const sendMetric = (metricName) => {
            try {
                if (domain === 'numma.org') {
                    ym(91134462,'reachGoal', metricName)
                }
            } catch (error) {
                console.error(error.message)
            }
        }

        if (formElem) {
            fromFiatSumInput && fromFiatSumInput.get(0).addEventListener('input', event => {
                const { value } = event.target

                event.target.value = FormHelpers.getOnlyNumbersAndDot(value)

                sendMetric('hochyotpravit')
            })
            /*
            toFiatSumInput && toFiatSumInput.get(0).addEventListener('input', event => {
                const { value } = event.target

                event.target.value = FormHelpers.getOnlyNumbersAndDot(value)

                sendMetric('polychy')
            })
            */

            phoneInput.on('input', () => {
                sendMetric('phonenumber')
            })

            fromTradeMethod.change((event) => {
                if (event.trigger !== TRIGGERS.JS) {
                    sendMetric('bankotpravitely')
                }
            })
            /*
            toTradeMethod.change((event) => {
                if (event.trigger !== TRIGGERS.JS) {
                    sendMetric('bankpolychately')
                }
            })
            */
        }
    }
}

IntroBlock.init()