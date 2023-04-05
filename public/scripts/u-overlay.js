class Overlay {
    static get selectors() {
        return {
            overlay: '.u-overlay',
            showOverlay: '.js-show-overlay',
            hideOverlay: '.js-hide-overlay'
        }
    }

    static get classes() {
        return {
            overlayVisible: 'u-overlay_visible'
        }
    }

    static init() {
        this.overlay = document.querySelector(Overlay.selectors.overlay)
        const targetsToShowOverlay = document.querySelectorAll(Overlay.selectors.showOverlay)
        const targetsToHideOverlay = document.querySelectorAll(Overlay.selectors.hideOverlay)

        targetsToShowOverlay.forEach(target => {
            target.addEventListener('click', () => {
                Overlay.show()
            })
        })

        targetsToHideOverlay.forEach(target => {
            target.addEventListener('click', () => {
                Overlay.hide()
            })
        })
    }

    static show() {
        this.overlay.classList.add(Overlay.classes.overlayVisible)
    }

    static hide() {
        this.overlay.classList.remove(Overlay.classes.overlayVisible)
    }

    static onClick(handler) {
        if (this.onClickHandler) {
            this.overlay.removeEventListener('click', this.onClickHandler)
        }

        this.onClickHandler = (e) => handler(e)

        this.overlay.addEventListener('click', this.onClickHandler)
    }
}

Overlay.init()
