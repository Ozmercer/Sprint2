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


keywordRepMap = getKeywordMap()

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
    renderMemesByPopular();

    gMemesEditor = {
        selectedImgId: null,
        txts: [
            {
                line: 'Enter Text',
                size: 80,
                align: 'center',
                color: 'white',
                shadow: '',
                y_position: 0
            }
            ,
            {
                line: 'Enter Text',
                size: 80,
                align: 'center',
                color: 'white',
                shadow: '',
                y_position: 0
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
            <a href="#editor"><img src="${meme.url}" title="${meme.desc}" onclick="fillCanvas(this)"></a>
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


    var myCanvas = document.getElementById('canvas-editor');
    var ctx = myCanvas.getContext('2d');

    var img = new Image();
    if (elMeme) img.src = elMeme.src;
    else img.src = gCurrMeme.url;

    myCanvas.width = img.width;
    myCanvas.height = img.height;
    ctx.drawImage(img, 0, 0, myCanvas.width, myCanvas.height);
    img.onload = function () {
        debugger;   
        // Designating the image as the canvas with the width and height are those of the image
        
        for (var i = 0; i < gMemesEditor.txts.length; i++) {
            ctx.textAlign = gMemesEditor.txts[i].align;
            ctx.font = `${gMemesEditor.txts[i].size}px Arial`;
            ctx.fillStyle = gMemesEditor.txts[i].color;
            ctx.shadowBlur = 18;
            ctx.shadowColor = gMemesEditor.txts[i].shadow;
            if (i === 0) {
                ctx.fillText(gMemesEditor.txts[i].line, myCanvas.width / 2, myCanvas.height * 0.2);
            }
            else {
                ctx.fillText(gMemesEditor.txts[i].line, myCanvas.width / 2, myCanvas.height * 0.9);
            }
        }
    };
}

function editor1() {
    // // TODO
    // Align left, right, center
    // Text color
    // Select font
    // Add / Delete txts
}

function editor2() {
    // //TODO
    // Increase / decrease font size`
    // Text shadow (on/off)
    // Move lines up/down by buttons
    // Save button
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

