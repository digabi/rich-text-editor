const updateMath = require('./updateMath')
updateMath.init()
const answer = document.getElementById('answer1')
makeRichText(answer, {
    screenshot: {
        saver: ({data}) =>
            new Promise(resolve => {
                const reader = new FileReader()
                reader.onload = evt => resolve(evt.target.result)
                reader.readAsDataURL(data)
            }),
        limit: 10
    },
    baseUrl: '',
    updateMathImg: ($img, latex) => {
        updateMath.updateMath(latex, svg => {
            $img.prop({
                src: svg,
                alt: latex
            })
            $img.closest('[data-js="answer"]').trigger('input')
        })
    }
})
answer.focus()
