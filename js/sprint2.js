'use strict'
console.log('File Loaded');

var gMemes = [];
var gCurrId = 1;
var gCurrMeme;
var keywordRepMap;
var gMemesEditor;

function getMeme(url, keyWords, desc) {
    var meme = {
        id: gCurrId++,
        url: url,
        keyWords: keyWords,
        desc: desc,
    }
    gMemes.push(meme)
}



function init() {

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
    renderGallery();
    keywordRepMap = getKeywordMap()
    renderMemesByPopular();

    gMemesEditor = {
        selectedImgId: null,
        txts: [
            {
                line: 'Text',
                size: 80,
                align: 'center',
                color: 'white',
                shadow: '',
                y_position: 0,
                font: 'Arial'
            }
            ,
            {
                line: 'Enter Text',
                size: 80,
                align: 'center',
                color: 'white',
                shadow: '',
                y_position: 0,
                font: 'Arial'
            }]
    }
}

function renderGallery() {
    gMemes.forEach(function (meme) {
        renderMeme(meme, '.memes');
    })
}

function renderMeme(meme, selector) {
    var elMemes = document.querySelector(selector);
    var newHtml = `
        <div class="meme" id="meme${meme.id}" onclick="openEditor(${meme.id})" href="#editor">
            <a href="#editor"><img src="${meme.url}" title="${meme.desc}" 
            onclick="fillCanvas(this)"></a>
        </div>
    `;
    elMemes.innerHTML += newHtml;
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
    gMemesEditor.selectedImgId = gCurrMeme.id;
}

function searchMeme(elInput, text) {
    var filter;
    if (text) filter = text.toUpperCase();
    else filter = elInput.value.toUpperCase();

    for (var i = 0; i < gMemes.length; i++) {
        var imgId = 'meme' + gMemes[i].id;
        var elImg = document.getElementById(imgId);
        var words = gMemes[i].keyWords;

        for (var j = 0; j < words.length; j++) {
            var word = words[j];
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

    var myCanvas = document.getElementById('canvas-editor');
    var ctx = myCanvas.getContext('2d');

    var img = new Image();

    if (elMeme) img.src = elMeme.src;
    else img.src = gCurrMeme.url;

    myCanvas.width = img.width;
    myCanvas.height = img.height;
    ctx.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
    for (var i = 0; i < gMemesEditor.txts.length; i++) {
        fillTxt(ctx, img, i)
    }
}

function alignTxt(direction) {
    gMemesEditor.txts.forEach(function (txt) { txt.align = direction })
    fillCanvas(this)
}
function changeColor(elColor) {
    gMemesEditor.txts.forEach(function (txt) { txt.color = elColor.value })
    fillCanvas(this)
}
function changeFont(elFont) {
    if (!elFont.value) return;
    gMemesEditor.txts.forEach(function (txt) { txt.font = elFont.value })
    fillCanvas(this)
}
function changeTxt(elTxt) {
    gMemesEditor.txts.forEach(function (txt) { txt.line = elTxt.value})
    fillCanvas(this)
}

function fillTxt(ctx, img, idx) {
    var txtStart;
    var currTxt = gMemesEditor.txts[idx];
    if (currTxt.align === 'left') txtStart = img.width * 0.05;
    else if (currTxt.align === 'center') txtStart = img.width / 2;
    else txtStart = img.width * 0.95

    var txtHight = (idx) ? 0.9 : 0.2;

    ctx.textAlign = currTxt.align;
    ctx.font = `${currTxt.size}px ${currTxt.font}`;
    ctx.fillStyle = currTxt.color;
    ctx.strokeStyle = 'black';
    ctx.shadowBlur = 18;
    ctx.shadowColor = currTxt.shadow;
    ctx.fillText(currTxt.line, txtStart, img.height * txtHight);
    ctx.strokeText(currTxt.line, txtStart, img.height * txtHight)

    ctx.fill();
    ctx.stroke();
}

function increaseFontSize(elIncreaseBtn) {
    var classAttribute = elIncreaseBtn.getAttribute('class');
    var index = parseInt(classAttribute[classAttribute.length - 1]);

    gMemesEditor.txts[index].size += 4;
    fillCanvas(this);
}

function decreaseFontSize(elDecreaseBtn) {
    var classAttribute = elDecreaseBtn.getAttribute('class');
    var index = parseInt(classAttribute[classAttribute.length - 1]);

    gMemesEditor.txts[index].size -= 4;
    fillCanvas(this);
}

function addOrRemoveShadow(elShadowCeckBox) {
    var classAttribute = elShadowCeckBox.getAttribute('class');
    var index = parseInt(classAttribute[classAttribute.length - 1]);
    var isChecked = elShadowCeckBox.checked;

    if (isChecked) gMemesEditor.txts[index].shadow = 'red';
    else gMemesEditor.txts[index].shadow = '';

    fillCanvas(this);
}

// function decreaseFontSize(elMoveUpBtn) {
//     var classAttribute = elMoveUpBtn.getAttribute('class');
//     var index = parseInt(classAttribute[classAttribute.length - 1]);

//     gMemesEditor.txts[index].size -= 4;
//     fillCanvas(this);
// }

// function decreaseFontSize(elMoveDownBtn) {
//     var classAttribute = elDecreaseBtn.getAttribute('class');
//     var index = parseInt(classAttribute[classAttribute.length - 1]);

//     gMemesEditor.txts[index].size -= 4;
//     fillCanvas(this);
// }

