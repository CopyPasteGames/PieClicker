const quotes = [
    'After 100%ing this game I can safely say it is the <span class="special_text">best game I have ever played</span> and it is truly life changing<br>- <i>Paul</i>',
    'I love PieClicker, fun with <span class="special_text">beautiful art and music</span><br>A relaxing game I would highly recommend<br>- <i>[insert generic username]</i>',
    'I made enough pies to force humanity off of earth and relocate to a different solar system on a <span class="special_text">pie-producing nuclear-reactor-powered rocket ship</span>.<br>- <i>Mirage</i>',
    'This is a fun, chill casual game. Sometimes it\'s nice to just kick back and click aggressively on my mouse. I like the graphics and features. Nice for <span class="special_text">instant gratification</span> to earn achievements while still having some harder to get ones built in.<br>- <i>enbliththefair</i>',
    'i\'ve never played a clicker game before and i don\'t really like pie, but now i see how oddly and wonderfully addictive clicking your way to domination can be. <span class="special_text">cute, satisfying graphics make for tasty visuals</span> and when you start reaping rewards (quickly) it\'s hard not to get sucked in. i really like that you can get a passive reward so you can build your pie empire in the background.<br>- <i>NoBigDill</i>',
    'Totally addicting mindless fun! <span class="special_text">Great implementation</span> of the clicker genre.<br>- <i>trecho7</i>'
]
let qindex = 0
const quoteBox = document.getElementById("quotes")

function render() {
    quoteBox.innerHTML = quotes[qindex]
}

render()

function dwn() {
    qindex -= 1
    if(qindex <= -1) {
        qindex = quotes.length - 1
    }
    render()
}

function up() {
    qindex += 1
    if(qindex >= quotes.length) {
        qindex = 0
    }
    render()
}
