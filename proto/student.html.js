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
        <h1>${title}</h1>

        <div class="instructions">
            <div style="width: 55%">
                ${description}
            </div>
            <div style="width:45%">
                ${shortcuts}
            </div>
        </div>

        <h2>${answerTitle} 1</h2>
        <div class="answer" id="answer1"></div>
        <h2>${answerTitle} 2</h2>
        <div class="answer" id="answer2"></div>
        <button class="save actionButton" style="display: none">${save}</button>
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

    $answer.each((i, answer) => {
        $.get('/load?answerId=' + answer.id, data => {
            !window.IS_TEST && data && $(answer).html(data.html)
            makeRichText(answer, richTextOptions(answer.id), onValueChange)
        })
    }).on('keypress', e => {
        if (e.ctrlKey && !e.altKey && !e.shiftKey && e.key === 's') {
            e.preventDefault()
            save($(e.target))
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
<script>
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-49446143-7', 'auto');
    ga('send', 'pageview');

</script>
</body>
</html>`}
