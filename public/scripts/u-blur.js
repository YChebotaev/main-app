class Blur {
    static get selectors() {
        return {
            introBlock: '.b-intro-block',
            securityBlock: '.b-security-block',
            itWorksBlock: '.b-it-works',
            actionsBlock: '.b-actions',
            reviewsBlock: '.b-reviews',
            feedbackBlock: '.b-feedback',
        }
    }

    static init() {
        const isChrome = /chrome|chromium|crios/i.test(window.navigator.userAgent)

        if (isChrome) {
            $('<div>', { class: 'u-blur u-blur_intro-block-1' }).appendTo(Blur.selectors.introBlock)
            $('<div>', { class: 'u-blur u-blur_intro-block-2' }).appendTo(Blur.selectors.introBlock)
            $('<div>', { class: 'u-blur u-blur_intro-block-3 u-blur_mobile' }).appendTo(Blur.selectors.introBlock)

            $('<div>', { class: 'u-blur u-blur_security-block-1' }).appendTo(Blur.selectors.securityBlock)

            $('<div>', { class: 'u-blur u-blur_it-works-1' }).appendTo(Blur.selectors.itWorksBlock)
            $('<div>', { class: 'u-blur u-blur_it-works-2 u-blur_mobile' }).appendTo(Blur.selectors.itWorksBlock)

            $('<div>', { class: 'u-blur u-blur_actions-1' }).appendTo(Blur.selectors.actionsBlock)
            $('<div>', { class: 'u-blur u-blur_actions-2 u-blur_mobile' }).appendTo(Blur.selectors.actionsBlock)
            $('<div>', { class: 'u-blur u-blur_actions-3 u-blur_mobile' }).appendTo(Blur.selectors.actionsBlock)

            $('<div>', { class: 'u-blur u-blur_reviews-1' }).appendTo(Blur.selectors.reviewsBlock)
            $('<div>', { class: 'u-blur u-blur_reviews-2' }).appendTo(Blur.selectors.reviewsBlock)
            $('<div>', { class: 'u-blur u-blur_reviews-3' }).appendTo(Blur.selectors.reviewsBlock)
            $('<div>', { class: 'u-blur u-blur_reviews-4 u-blur_mobile' }).appendTo(Blur.selectors.reviewsBlock)

            $('<div>', { class: 'u-blur u-blur_feedback-1' }).appendTo(Blur.selectors.feedbackBlock)
            $('<div>', { class: 'u-blur u-blur_feedback-2' }).appendTo(Blur.selectors.feedbackBlock)
        }
    }
}

Blur.init()