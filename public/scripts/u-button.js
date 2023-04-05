class Button {
    static get selectors() {
        return {
            elem: '.u-button',
            loader: '.u-button__loader'
        }
    }

    static get classes() {
        return {
            loading: 'u-button_loading',
            loader: 'u-button__loader'
        }
    }

    static enableLoading(buttonElem) {
        buttonElem.setAttribute('disabled', true)
        buttonElem.classList.add(Button.classes.loading)

        const loader = document.createElement('span')
        loader.classList.add(Button.classes.loader)

        buttonElem.appendChild(loader)
    }

    static disableLoading(buttonElem) {
        buttonElem.classList.remove(Button.classes.loading)
        const loader = buttonElem.querySelector(Button.selectors.loader)

        loader?.remove()
        buttonElem.removeAttribute('disabled')
    }

}
