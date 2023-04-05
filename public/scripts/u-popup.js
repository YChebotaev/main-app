class Popup {
    static get selectors() {
        return {
            popup: '.u-popup',
            popupRoot: '.u-popup-root',
            closeBtn: '.js-popup-close-btn'
        }
    }

    static init() {
        const popupRoot = document.querySelector(Popup.selectors.popupRoot)
        const popupElems = document.querySelectorAll(Popup.selectors.popup)

        popupRoot.addEventListener('click', (event) => {
            if (popupRoot === event.target) {
                Overlay.hide()

                popupRoot.style.display = 'none'

                popupElems.forEach(popupElem => popupElem.style.display = 'none')
            }
        })

        popupElems.forEach(popup => {
            const closeBtn = popup.querySelector(Popup.selectors.closeBtn)

            closeBtn.addEventListener('click', () => Popup.close(popup.getAttribute('id')))
        })
    }

    static open(popupId) {
        const popupRoot = document.querySelector(Popup.selectors.popupRoot)
        const popupElem = document.getElementById(popupId)

        Overlay.show()

        popupRoot.style.display = 'flex'
        popupElem.style.display = 'flex'
    }

    static close(popupId) {
        const popupRoot = document.querySelector(Popup.selectors.popupRoot)
        const popupElem = document.getElementById(popupId)

        Overlay.hide()

        popupRoot.style.display = 'none'
        popupElem.style.display = 'none'
    }
}

Popup.init()