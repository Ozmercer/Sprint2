'use strict'
console.log('File Loaded');

var gImgs = [];
var gCurrId = 1;

function getImg (url, keyWords){
    var img = {
        id: gCurrId++,
        url: url,
        keyWords: keyWords
    }
    gImgs.push(img)
}

getImg('../img/memes/1.png', ['high','stupid', 'happy', 'man', 'drunk', 'funny'])
getImg('../img/memes/2.png', ['dog','look','funny'])
getImg('../img/memes/3.png', ['cartoon','angry','man','why'])
getImg('../img/memes/4.png', ['cartoon','man', 'futurama','think','thinking'])
getImg('../img/memes/5.png', ['man','satisfied','cheers','drink','tuxedo','rich'])
getImg('../img/memes/6.png', ['cartoon','comics','angry','funny','work'])
getImg('../img/memes/7.png', ['cartoon','comics','angry','funny','work'])
getImg('../img/memes/8.png', ['cartoon','comics','angry','funny','work'])
getImg('../img/memes/9.png', ['cartoon','comics','angry','funny','work'])
getImg('../img/memes/10.png', ['cartoon','comics','angry','funny','work'])

function renderGallery() {
    gImgs.forEach(function(img) {
        renderImg(img);
    })

}

function renderImg(img) {
    var elMemes = document.querySelector('.memes');
    var newHtml = `
        <div class="meme" id="meme${img.id}">
            <img src="${img.url}">
        </div>
    `
    elMemes.innerHTML += newHtml;
}