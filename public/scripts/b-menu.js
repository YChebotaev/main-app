class Menu {
    static get selectors() {
        return {
            menu: '.b-menu',
            mobileMenu: '.b-menu_mobile',
            openButton: '.js-open-mobile-menu',
            closeButton: '.js-close-mobile-menu',
            menuBurger: '.js-menu-burger'
        }
    }

    static get classes() {
        return {
            mobileMenuVisible: 'b-menu_mobile_visible'
        }
    }

    static init() {
        const menu = document.querySelector(Menu.selectors.menu)
        const mobileMenu = document.querySelector(Menu.selectors.mobileMenu)
        const menuBurger = document.querySelector(Menu.selectors.menuBurger)

        const openButtons = menu.querySelectorAll(Menu.selectors.openButton)
        const closeButtons = mobileMenu.querySelectorAll(Menu.selectors.closeButton)

        openButtons.forEach(openButton => {
            openButton.addEventListener('click', () => {
                mobileMenu.classList.add(Menu.classes.mobileMenuVisible)

                Overlay.onClick(() => {
                    mobileMenu.classList.remove(Menu.classes.mobileMenuVisible)

                    Overlay.hide()
                })
            })
        })

        closeButtons.forEach(closeButton => {
            closeButton.addEventListener('click', () => {
                mobileMenu.classList.remove(Menu.classes.mobileMenuVisible)
            })
        })

        document.addEventListener('scroll', function (e) {
            if (window.innerWidth <= 767) {
                if (window.scrollY > 200) {
                    menuBurger.style.display = 'flex'
                } else {
                    menuBurger.style.display = 'none'
                }
            }
        })

        menuBurger.addEventListener('click', () => {
            mobileMenu.classList.add(Menu.classes.mobileMenuVisible)

            Overlay.onClick(() => {
                mobileMenu.classList.remove(Menu.classes.mobileMenuVisible)

                Overlay.hide()
            })
        })
    }
}

Menu.init()