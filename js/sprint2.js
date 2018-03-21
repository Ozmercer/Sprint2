'use strict'
console.log('File Loaded');

var gMemes = [];
var gCurrId = 1;
var gCurrMeme;
var keywordRepMap;

function getMeme(url, keyWords, desc) {
    var meme = {
        id: gCurrId++,
        url: url,
        keyWords: keyWords,
        desc: desc,
    }
    gMemes.push(meme)
}
getMeme('../img/memes/1.png', ['high', 'happy', 'man', 'drink', 'funny'], '10 Guy')
getMeme('../img/memes/2.png', ['dog', 'look', 'funny', 'pet', 'happy'], 'Doge')
getMeme('../img/memes/3.png', ['cartoon', 'angry', 'man', 'why'], 'Y U No')
getMeme('../img/memes/4.png', ['cartoon', 'man', 'futurama', 'think'], 'Futurama Fry')
getMeme('../img/memes/5.png', ['man', 'satisfied', 'cheers', 'drink', 'tuxedo'], 'Leonardo Dicaprio Cheers')
getMeme('../img/memes/6.png', ['cartoon', 'comics', 'angry', 'funny', 'work', 'look'], 'Boardroom Meeting Suggestion')
getMeme('../img/memes/7.png', ['cartoon', 'comics', 'angry', 'funny', 'slap'], 'Batman Slapping Robin')
getMeme('../img/memes/8.png', ['black', 'get', 'prize', 'shout', 'woman'], 'Oprah You Get A')
getMeme('../img/memes/9.png', ['cartoon', 'toys', 'look'], 'X, X Everywhere')
getMeme('../img/memes/10.png', ['think', 'man', 'satisfied', 'clever', 'work', 'look', 'black'], 'Roll Safe Think About It')

keywordRepMap = getKeywordMap()

function init() {
    renderGallery();
    renderMemesByPopular();
}

function renderGallery() {
    gMemes.forEach(function (meme) {
        renderMeme(meme, '.memes');
    })
}

function renderMeme(meme, selector, clear) {
    var elMemes = document.querySelector(selector);
    var newHtml = `
        <div class="meme" id="meme${meme.id}" onclick="openEditor(${meme.id})" href="#editor">
            <a href="#editor"><img src="${meme.url}" title="${meme.desc}" onclick="fillCanvas(this)"></a>
        </div>
    `;
    if (clear) elMemes.innerHTML = newHtml
    else elMemes.innerHTML += newHtml;
}

function openEditor(memeId) {
    if (!gCurrMeme || gCurrMeme.id === memeId) {
        // toggle only if first meme, or same meme selected twice
        var elEditor = document.querySelector('.editor');
        elEditor.classList.toggle('hide');
    }
    gCurrMeme = gMemes.find(function (meme) {
        return meme.id === memeId
    })

    renderMeme(gCurrMeme, '.canvas', true)
}

function searchMeme(elInput, text) {
    var filter;
    if (text) filter = text.toUpperCase();
    else filter = elInput.value.toUpperCase();

    console.log(filter);
    for (var i = 0; i < gMemes.length; i++) {
        var imgId = 'meme' + gMemes[i].id;
        var elImg = document.getElementById(imgId);
        console.log(elImg);
        var words = gMemes[i].keyWords;
        console.log(words);

        for (var j = 0; j < words.length; j++) {
            var word = words[j];
            console.log(words[j]);
            if (word.toUpperCase().indexOf(filter) > -1) {
                elImg.style.display = 'initial';
                break;
            }
            else elImg.style.display = 'none';
        }
    }
}

function getKeywordMap() {
    var keywordRepsMap = {};
    gMemes.forEach(function (meme) {
        meme.keyWords.forEach(function (keyword) {
            if (!keywordRepsMap[keyword]) keywordRepsMap[keyword] = 1;
            else keywordRepsMap[keyword]++
        })
    })
    return keywordRepsMap;
}

function renderMemesByPopular() {
    var elKeywords = document.querySelector('.keywords');

    for (var keyword in keywordRepMap) {
        elKeywords.innerHTML += `
        <span style="font-size:${12 + 10 * (keywordRepMap[keyword])}px" 
        onclick="searchMeme(this,'${keyword}')">${keyword}</span>
        `
    }
}

function fillCanvas(elMeme) {
    // var canvas = document.getElementById("canvas-editor");
    // var ctx = canvas.getContext("2d");
    // var img = elMeme;
    // ctx.drawImage(img, 0, 0);

    var myCanvas = document.getElementById('canvas-editor');
    var ctx = myCanvas.getContext('2d');
    var img = new Image();
    console.log(elMeme.src);
    img.src = elMeme.src;
    myCanvas.width = img.width;
    myCanvas.height = img.height;
    img.onload = function () {
        ctx.drawImage(img, 0, 0, myCanvas.width, myCanvas.height); // Or at whatever offset you like
    };
}
