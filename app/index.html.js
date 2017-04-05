module.exports = (obj) => { with(obj) return `<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>${mathEditor}</title>
    <link rel="stylesheet" type="text/css" href="/mathquill/build/mathquill.css">
    <script src="/jquery/dist/jquery.js"></script>
    <script src="/baconjs/dist/Bacon.js"></script>
    <script src="/bacon.jquery/dist/bacon.jquery.js"></script>
    <script src="/mathquill/build/mathquill.js"></script>
    <link rel="stylesheet" type="text/css" href="/student.css">
    <link rel="icon" href="/math-editor-favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="/math-editor-favicon.ico" type="image/x-icon"/>
</head>
<body>
<article>
    <section>
        <a href="https://github.com/digabi/math-editor"><img style="position: absolute; top: 0; right: 0; border: 0;"
                                                             src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67"
                                                             alt="Fork me on GitHub"
                                                             data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"></a>
        <script>

        </script>
        <h3>${title}</h3>
        <p>
            <small>
                <pre>${description}</pre>
            </small>
        </p>

        <hr/>
        <div class="toolbar">
            <!--<div class="tags">-->
            <!--<span class="toggle">${formatting}</span>-->
            <!--<div class="list" style="display: none"></div>-->
            <!--</div>-->
            <div class="characters">
                <span class="special-characters">${specialCharacters}</span>
                <div class="list"></div>
            </div>
            <p>
                <button class="newEquation actionButton" title="Ctrl-L">${insertEquation}</button>
            </p>
            <div class="mathToolbar list"></div>
        </div>

        <div class="answer" contenteditable="true" data-js-handle="answer"></div>
        <div class="outerPlaceholder" style="display: none">
            <div class="math">
                <div class="close" title="Ctrl-Enter">${close}</div>
                <div class="boxes">
                    <div class="equationEditor"></div>
                    <textarea class="latexEditor" placeholder="LaTex"></textarea>
                </div>
            </div>
        </div>
        <button class="save actionButton" style="display: none">${save}</button>
    </section>
</article>
<footer>
    <section>
        <div class="paragraph">
            ${updated} ${startedAt}
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
<script src="/student.js"></script>
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
