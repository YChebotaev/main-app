class Actions {
    static get selectors() {
        return {
            button: '.b-actions__button'
        }
    }

    static init() {
        const button = $(Actions.selectors.button)

        button.click(() => Popup.open('application-creating'))
    }
}

Actions.init()