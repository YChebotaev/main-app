class Footer {
    static get selectors() {
        return {
            collapsible: '.b-footer__collapsible',
            collapsibleLabelContainer: '.b-footer__collapsible-label-container',
            collapsibleList: '.b-footer__collapsible-list',
            address: '.js-footer-address'
        }
    }

    static get classes() {
        return {
            open: 'open'
        }
    }

    static init() {
        const domain = window.location.hostname

        if (domain === 'numma.org' && (window.location.href.includes('/terms') || window.location.href.includes('/privacy'))) {
            $(Footer.selectors.address).html('Lokomotīves iela 78 - 20, Rīga, LV-1057, Latvia')
        }
        
        $(Footer.selectors.collapsible).each((e, elem) => {
            const $collapsibleElem = $(elem)
            const $collapsibleList = $(Footer.selectors.collapsibleList, $collapsibleElem)

            $(Footer.selectors.collapsibleLabelContainer, $collapsibleElem).click(() => {
                if (window.innerWidth > 480) {
                    return
                }

                $collapsibleElem.toggleClass(Footer.classes.open)

                if ($collapsibleElem.hasClass(Footer.classes.open)) {
                    $collapsibleList.css('max-height', `${$collapsibleList.get(0).scrollHeight}px`)
                } else {
                    $collapsibleList.css('max-height', 0)
                }
            })
        })
    }
}

Footer.init()
