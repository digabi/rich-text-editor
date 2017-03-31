module.exports = `<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <title>Matikkaeditori</title>

    <link rel="stylesheet" type="text/css" href="/mathquill/build/mathquill.css">
    <script src="/jquery/dist/jquery.js"></script>
    <script src="/baconjs/dist/Bacon.js"></script>
    <script src="/bacon.jquery/dist/bacon.jquery.js"></script>
    <script src="/mathquill/build/mathquill.js"></script>
    <link rel="stylesheet" type="text/css" href="/student.css">
    <link rel="icon" href="/math-editor-favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="/math-editor-favicon.ico" type="image/x-icon" />
</head>
<body>
<a href="https://github.com/digabi/math-editor"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png"></a>
<script>

</script>
<h3>Kaavaeditorin ensimmäinen kehitysversio</h3>
<p>
    <small><pre>
Editori toimii parhaiten Firefox-selaimella. “Lisää kaava” -napin alta löydät yleisimpiä matematiikassa, fysiikassa ja
kemiassa käytettäviä merkintöjä. Lisäksi erikoismerkkejä voi käyttää kaavan kirjoittamiseen. Kaavoja voi rakentaa
klikkaamalla valikon merkintöjä ja/tai kirjoittamalla LaTeXia. Editorin vastauskenttään voi kirjoittaa tekstiä ja kaavoja sekä
lisätä kuvia.

Pikanäppäinvinkkejä:

Ctrl-V       Liitä kuva leikepöydältä
Ctrl-L       Kirjoita kaava
Jakoviivan saa myös / -merkillä
Kertomerkin saa myös * -merkillä
</pre>
    </small>
</p>

<hr/>
<div class="toolbar">
    <!--<div class="tags">-->
        <!--<span class="toggle">Muotoilu</span>-->
        <!--<div class="list" style="display: none"></div>-->
    <!--</div>-->
    <div class="characters">
        <span class="special-characters">Erikoismerkit</span>
        <div class="list"></div>
    </div>
    <p>
        <button class="newEquation actionButton" title="Ctrl-L">Lisää kaava</button>
    </p>
    <div class="mathToolbar list"></div>
</div>

<div class="answer" contenteditable="true" data-js-handle="answer"></div>
<div class="outerPlaceholder" style="display: none">
    <div class="math">
        <div class="close" title="Ctrl-Enter">sulje</div>
        <div class="boxes">
            <div class="equationEditor"></div>
            <textarea class="latexEditor" placeholder="LaTex"></textarea>
        </div>
    </div>
</div>
<button class="save actionButton">Tallenna</button>
<div class="paragraph">
    <a href="mailto:abitti@ylioppilastutkinto.fi?subject=Palaute / Math-editor">Lähetä palautetta (abitti@ylioppilastutkinto.fi)</a>
</div>
<div class="paragraph">
    <a href="/sv">På svenska</a>
</div>
<script src="/student.js"></script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-49446143-7', 'auto');
  ga('send', 'pageview');

</script>
</body>
</html>`
