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

getImg('../img/1.png', ['high','stupid', 'happy', 'man', 'drunk', 'funny'])
getImg('../img/2.png', ['dog','look','funny'])
getImg('../img/3.png', ['cartoon','angry','man','why'])
getImg('../img/4.png', ['cartoon','man', 'futurama','think','thinking'])
getImg('../img/5.png', ['man','satisfied','cheers','drink','tuxedo','rich'])
getImg('../img/6.png', ['cartoon','comics','angry','funny','work'])
getImg('../img/7.png', ['cartoon','comics','angry','funny','work'])
getImg('../img/8.png', ['cartoon','comics','angry','funny','work'])
getImg('../img/9.png', ['cartoon','comics','angry','funny','work'])
getImg('../img/10.png', ['cartoon','comics','angry','funny','work'])