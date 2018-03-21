'use strict'
console.log('File Loaded');

var gMemes = [];
var gCurrId = 1;
var gCurrMeme;

function getMeme(url, keyWords, desc) {
    var meme = {
        id: gCurrId++,
        url: url,
        keyWords: keyWords,
        desc: desc,
    }
    gMemes.push(meme)
}

getMeme('../img/memes/1.png', ['high', 'stupid', 'happy', 'man', 'drunk', 'funny'], '10 Guy')
getMeme('../img/memes/2.png', ['dog', 'look', 'funny'], 'Doge')
getMeme('../img/memes/3.png', ['cartoon', 'angry', 'man', 'why'], 'Y U No')
getMeme('../img/memes/4.png', ['cartoon', 'man', 'futurama', 'think', 'thinking'], 'Futurama Fry')
getMeme('../img/memes/5.png', ['man', 'satisfied', 'cheers', 'drink', 'tuxedo', 'rich'], 'Leonardo Dicaprio Cheers')
getMeme('../img/memes/6.png', ['cartoon', 'comics', 'angry', 'funny', 'work'], 'Boardroom Meeting Suggestion')
getMeme('../img/memes/7.png', ['cartoon', 'comics', 'angry', 'funny', 'work'], 'Batman Slapping Robin')
getMeme('../img/memes/8.png', ['cartoon', 'comics', 'angry', 'funny', 'work'], 'Oprah You Get A')
getMeme('../img/memes/9.png', ['cartoon', 'comics', 'angry', 'funny', 'work'], 'X, X Everywhere')
getMeme('../img/memes/10.png', ['cartoon', 'comics', 'angry', 'funny', 'work'], 'Roll Safe Think About It')

function renderGallery() {
    gMemes.forEach(function (meme) {
        renderMeme(meme, '.memes');
    })
}

function renderMeme(meme, selector, clear) {
    var elMemes = document.querySelector(selector);
    var newHtml = `
        <div class="meme" id="${meme.id}" onclick="openEditor(${meme.id})" href="#editor">
            <a href="#editor"><img src="${meme.url}" title="${meme.desc}"></a>
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

function searchMeme(elInput) {
    var filter = elInput.value.toUpperCase();
    console.log(filter);
    for (var i = 0; i < gMemes.length; i++) {
        var imgId = gMemes[i].id;
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