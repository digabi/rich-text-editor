module.exports = (obj) => { with(obj) return `
<html>
<head>
    <meta charset='utf-8'>
    <title>${mathEditor}</title>
    <link rel="stylesheet" type="text/css" href="/mathquill/build/mathquill.css">
    <link rel="stylesheet" type="text/css" href="/rich-text-editor.css"/>
    <link rel="stylesheet" type="text/css" href="/student.css"/>
    <script src="/jquery/dist/jquery.js"></script>
    <script src="/baconjs/dist/Bacon.js"></script>
    <script src="/bacon.jquery/dist/bacon.jquery.js"></script>
    <script src="/mathquill/build/mathquill.js"></script>
    <link rel="icon" href="/rich-text-editor-favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="/rich-text-editor-favicon.ico" type="image/x-icon"/>
    <script>
        window.locale = '${locale}'
    </script>
</head>
<body>
<article>
    <section>
        <h1>Työkalu tehtävän laadintaan</h1>
        <div class="answer" id="answer1"></div>
        <button id="copy">Kopioi LaTeX leikepöydälle (ctrl-s)</button>
        <textarea disabled id="clipboardContent" placeholder="Tähän tulee leikepöydälle kopioitu sisältö"></textarea>
    </section>
</article>
<footer>
    <section>
        <div class="paragraph">
            ${updated} ${startedAt}
        </div>
        <div class="paragraph">
            <a href="https://github.com/digabi/rich-text-editor">GitHub</a>
        </div>
        <div class="paragraph">
            <a href="mailto:abitti@ylioppilastutkinto.fi?subject=Palaute / Math-editor">${sendFeedback}
                (abitti@ylioppilastutkinto.fi)</a>
        </div>
        <div class="paragraph">
            <a href="${langLink}">${langLabel}</a>
        </div>
    </section>
</footer>
<script src="/saver.js"></script>
<script src="/rich-text-editor-bundle.js"></script>
<script>
    const $answer = $('.answer')
    const save = ($elem, async = true) => $.post({
        url: '/save',
        data: {text: $elem.html(), answerId: $elem.attr('id')},
        async
    })

    const richTextOptions = id => ({
        screenshot: {
            saver: data => saveScreenshot(id)(data),
            limit: 10
        }
    })

    function copyLatexToClipboard() {
        const latex = $('[data-js="latexField"]').val()
        const escapedLatex = '\\\\\\\\(' + latex.replace(/\\\\/g, '\\\\\\\\') + '\\\\\\\\)'
        $('#clipboardContent').removeAttr('disabled').val(escapedLatex).select()
        document.execCommand('copy')
        $('#clipboardContent').attr('disabled', true)
    }

    $('#copy').on('click', e => {
        e.preventDefault()
        copyLatexToClipboard()
    })
    $answer.each((i, answer) => {
        makeRichText(answer, richTextOptions(answer.id), onValueChange)
    }).on('keypress', e => {
        if (e.ctrlKey && !e.altKey && !e.shiftKey && e.key === 's') {
            e.preventDefault()
            copyLatexToClipboard()
        }
    })
    $('#answer1').focus()

    $('.toggleInstructions').click(e => {
        e.preventDefault()
        $('.instructions').toggleClass('hide')
    })
    function onValueChange() {
    }
</script>
</body>
</html>`}
