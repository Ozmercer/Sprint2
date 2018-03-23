'use strict'
console.log('File Loaded');

var gMemes = [];
var gCurrId = 1;
var gCurrMeme;
var keywordRepMap;
var gMemesEditor;
var gTextId = -1;

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
    
    getMeme('img/memes/1.png', ['high', 'happy', 'man', 'drink', 'funny'], '10 Guy');
    getMeme('img/memes/2.png', ['dog', 'look', 'funny', 'pet', 'happy'], 'Doge');
    getMeme('img/memes/3.png', ['cartoon', 'angry', 'man', 'why'], 'Y U No');
    getMeme('img/memes/4.png', ['cartoon', 'man', 'futurama', 'think'], 'Futurama Fry');
    getMeme('img/memes/5.png', ['man', 'satisfied', 'cheers', 'drink', 'tuxedo'], 'Leonardo Dicaprio Cheers');
    getMeme('img/memes/6.png', ['cartoon', 'comics', 'angry', 'funny', 'work', 'look', 'woman', 'high'], 'Boardroom Meeting Suggestion');
    getMeme('img/memes/7.png', ['cartoon', 'comics', 'angry', 'funny', 'slap'], 'Batman Slapping Robin');
    getMeme('img/memes/8.png', ['black', 'get', 'prize', 'shout', 'woman'], 'Oprah You Get A');
    getMeme('img/memes/9.png', ['cartoon', 'toys', 'look'], 'X, X Everywhere');
    getMeme('img/memes/10.png', ['think', 'man', 'satisfied', 'clever', 'work', 'look', 'black'], 'Roll Safe Think About It');
    getMeme('img/memes/11.png', ['point', 'man', 'trump', 'clever','happy'], 'Trump pointing');
    renderGallery();
    keywordRepMap = getKeywordMap()
    renderMemesByPopular();

    gMemesEditor = {
        selectedImgId: null,
        txts: []
    }
    for (var i = 0; i < 2; i++) {
        addTxt();
    }
}

function addTxt() {
    var y_pos;
    var txtsLen = gMemesEditor.txts.length;
    if (txtsLen === 0) y_pos = 0.2;
    else if (txtsLen === 1) y_pos = 0.9;
    else if (txtsLen < 4) y_pos = 0.55;
    else return;
    var txt = {
        line: 'Text',
        size: 80,
        align: 'center',
        color: 'white',
        font: 'Arial',
        shadow: 'rgba(0,0,0,0)',
        y_position: y_pos,
    }
    addTxtInpt();
    gMemesEditor.txts.push(txt)
    if (gCurrMeme) {
        fillCanvas(this);
    }
}

function removeTxt(elBtn, idx) {
    var elTxt = document.querySelector(`.line-${idx}`) 
    gMemesEditor.txts.splice(idx,1);
    elTxt.remove();
    elBtn.remove(); 
    fillCanvas();
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

function closeEditor() {
    var elEditor = document.querySelector('.editor');
    elEditor.classList.toggle('hide');
    gCurrMeme = null;
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
        <span style="font-size:${0.8 + 0.8 * (keywordRepMap[keyword])}em" 
        onclick="searchMeme(this,'${keyword}')">${keyword}</span>
        `
    }
}

function addTxtInpt() {
    var txtsLen = gMemesEditor.txts.length;
    var elTxtInput = document.querySelector('.input-txt');
    var newHtml = `
    <input type="text" placeholder="Enter Text ${txtsLen + 1}..." class="line-${txtsLen}" 
    onkeyup="changeTxt(this)" onfocus="setElIdx(this)">
    <button class="delete" onclick="removeTxt(this, ${txtsLen})">X</button>
    `
    elTxtInput.innerHTML += newHtml;
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
    if (gTextId === -1) {
        for (var i = 0; i < gMemesEditor.txts.length; i++) {
            fillTxt(ctx, img, i);
        }
    }
    else {
        fillTxt(ctx, img, gTextId);
        for (var i = 0; i < gMemesEditor.txts.length; i++) {
            if (i === gTextId) continue;
            fillTxt(ctx, img, i);
        }
    }
}

function alignTxt(direction) {
    if (gTextId > -1) gMemesEditor.txts[gTextId].align = direction;
    else {
        gMemesEditor.txts.forEach(function (txt) { txt.align = direction })
    }
    fillCanvas(this)
}

function changeColor(elColor) {
    if (gTextId > -1) gMemesEditor.txts[gTextId].color = elColor.value;
    else {
        gMemesEditor.txts.forEach(function (txt) { txt.color = elColor.value })
    }
    fillCanvas(this)
}

function changeFont(elFont) {
    if (!elFont.value) return;
    if (gTextId > -1) gMemesEditor.txts[gTextId].font = elFont.value;
    else {
        gMemesEditor.txts.forEach(function (txt) { txt.font = elFont.value })
    }
    fillCanvas(this)
}
function changeTxt(elTxt) {
    if (gTextId > -1) gMemesEditor.txts[gTextId].line = elTxt.value;
    else {
        gMemesEditor.txts.forEach(function (txt) { txt.line = elTxt.value })
    }
    fillCanvas(this)
}

function fillTxt(ctx, img, idx) {
    var txtStart;
    var currTxt = gMemesEditor.txts[idx];
    if (currTxt.align === 'left') txtStart = img.width * 0.05;
    else if (currTxt.align === 'center') txtStart = img.width / 2;
    else txtStart = img.width * 0.95

    ctx.font = `${currTxt.size}px ${currTxt.font}`;
    ctx.textAlign = currTxt.align;
    ctx.fillStyle = currTxt.color;
    ctx.strokeStyle = 'black';
    ctx.shadowBlur = 18;
    ctx.shadowColor = currTxt.shadow;
    ctx.fillText(currTxt.line, txtStart, img.height * currTxt.y_position);
    ctx.strokeText(currTxt.line, txtStart, img.height * currTxt.y_position);

    ctx.fill();
    ctx.stroke();
}

function increaseFontSize() {
    if (gTextId > -1) gMemesEditor.txts[gTextId].size += 4;
    else {
        for (var i = 0; i < gMemesEditor.txts.length; i++) {
            gMemesEditor.txts[i].size += 4;
        }
    }
    fillCanvas(this);
}

function decreaseFontSize() {
    if (gTextId > -1) gMemesEditor.txts[gTextId].size -= 4;
    else {
        for (var i = 0; i < gMemesEditor.txts.length; i++) {
            gMemesEditor.txts[i].size -= 4;
        }
    }
    fillCanvas(this);
}

function addOrRemoveShadow(elShadowCeckBox) {
    var isChecked = elShadowCeckBox.checked;
    if (gTextId > -1) {
        if (isChecked) gMemesEditor.txts[gTextId].shadow = 'black';
        else gMemesEditor.txts[gTextId].shadow = 'rgba(0,0,0,0)';
    }
    else {
        for (var i = 0; i < gMemesEditor.txts.length; i++) {
            if (isChecked) gMemesEditor.txts[i].shadow = 'black';
            else gMemesEditor.txts[i].shadow = 'rgba(0,0,0,0)';
        }
    }
    fillCanvas(this);
}

function moveTextUp() {
    if (gTextId > -1) gMemesEditor.txts[gTextId].y_position -= 0.05;
    else {
        for (var i = 0; i < gMemesEditor.txts.length; i++) {
            gMemesEditor.txts[i].y_position -= 0.05;
        }
    }
    fillCanvas(this);
}

function moveTextDown() {
    if (gTextId > -1) gMemesEditor.txts[gTextId].y_position += 0.05;
    else {
        for (var i = 0; i < gMemesEditor.txts.length; i++) {
            gMemesEditor.txts[i].y_position += 0.05;
        }
    }
    fillCanvas(this);
}

function saveCanvasAsPNG(elSaveLnk) {
    var canvas = document.querySelector('canvas');
    var dataURL = canvas.toDataURL('./image/png');
    elSaveLnk.href = dataURL;
}

function clearValue(elInput) {
    elInput.value = ''
}
function setElIdx(elTxt) {
    var classAttribute = elTxt.getAttribute('class');
    gTextId = parseInt(classAttribute[classAttribute.length - 1]);
}

function selectAll() {
    gTextId = -1;
}

function addURL() {
    var elURL = document.querySelector('.insert-url');
    var url = elURL.value;
    getMeme(url, [], '');
    renderGallery();
}

function sendMail() {
    var elModal = document.querySelector('.modal');
    elModal.classList.toggle('hide');
}