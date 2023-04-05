class Reviews {
    static get selectors() {
        return {
            leftArrow: '.js-left-arrow',
            rightArrow: '.js-right-arrow',
            slider: '.b-reviews__slider',
            slides: '.b-reviews__slides',
            pagination: '.b-reviews__pagination'
        }
    }

    static get classes() {
        return {
            pagination: 'b-reviews__pagination',
        }
    }

    static init() {
        $(document).ready(() => {
            $('<div>', {
                class: Reviews.classes.pagination
            }).appendTo(Reviews.selectors.slider)

            $(Reviews.selectors.slides).slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                prevArrow: $(Reviews.selectors.leftArrow),
                nextArrow: $(Reviews.selectors.rightArrow),
                lazyLoad: true,
                initialSlide: 0,
                responsive: [
                    {
                        breakpoint: 1223,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 940,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            dots: true,
                            appendDots: $(Reviews.selectors.pagination)
                        },
                    },
                    {
                        breakpoint: 540,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true,
                            appendDots: $(Reviews.selectors.pagination)
                        },
                    },
                ]
            })
        })
    }
}

Reviews.init()