/* eslint-disable no-undef */
module.exports = (obj) => { with(obj) return `
<html>
<head>
    <meta charset='utf-8'>
    <title>${title} - ${mathEditor}</title>
    <link rel="stylesheet" type="text/css" href="/teacher.css">
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
        <p>
            <a href="${backLink}">${backLinkLabel}</a>
        </p>
        <div class="answer"></div>
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
<script src="/teacher.js"></script>
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
