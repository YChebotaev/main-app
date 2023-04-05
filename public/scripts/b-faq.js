class Faq {
    static get selectors() {
        return {
            elem: '.b-faq',
            questionLine: '.b-faq__question-line',
            button: '.b-faq__button',
            answerContainer: '.b-faq__answer-container'
        }
    }

    static get classes() {
        return {
            active: 'active'
        }
    }

    static init() {
        const [elem] = document.getElementsByClassName('b-faq')
        const questionElems = elem.querySelectorAll(Faq.selectors.questionLine)

        questionElems.forEach(questionElem => {
            questionElem.addEventListener('click', function () {
                const button = this.querySelector(Faq.selectors.button)
                const answerContainer = this.nextSibling.nextSibling

                button.classList.toggle(Faq.classes.active)
                answerContainer.classList.toggle(Faq.classes.active)

                if (answerContainer.classList.contains(Faq.classes.active)) {
                    answerContainer.style.maxHeight = `${answerContainer.scrollHeight}px`
                } else {
                    answerContainer.style.maxHeight = 0
                }
            })
        })
    }
}

Faq.init()