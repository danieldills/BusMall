'use strict'
/*Globals*/
const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']

const maxClicks = 26;
let totalClicks = 1;

const leftImageElem = document.getElementById('left-image');
const centerImageElem = document.getElementById('center-image');
const rightImageElem = document.getElementById('right-image');
const allImagesElem = document.getElementById('images');

let leftImageObject = null;
let centerImageObject = null;
let rightImageObject = null;

/* Constructor */
function Picture(caption, url) {
    this.caption = caption;
    this.url = url;
    this.clickCtr = 0;
    this.displayCtr = 0;

    Picture.all.push(this);
};

Picture.all = [];

/* Functions begin here */
function createProductsFromScratch() {
    for (let i = 0; i < productNames.length; i++) {
        const productName = productNames[i];
        new Picture(productName, './imgs/' + productName + '.jpg');
    }
}

function createProductsFromStorage(storageGet) {
    const javaScriptPics = JSON.parse(storageGet);

    for (let i = 0; i < javaScriptPics.length; i++) {
        const rawData = javaScriptPics[i];
        const newPictureInstance = new Picture(rawData.caption, rawData.url);
        newPictureInstance.clickCtr = rawData.clickCtr;
        newPictureInstance.displayCtr = rawData.displayCtr;
    }
}

function createPictureInstances() {
    const storageGet = localStorage.getItem('pictures');
    if (storageGet === null) {
        createProductsFromScratch();
    } else {
        createProductsFromStorage(storageGet);
    }
}

function pickNewImages() {

    shuffle(Picture.all);

    const safeProducts = [];

    for (let i = 0; i < Picture.all.length; i++) {

        const product = Picture.all[i];

        if (product !== leftImageObject && product
            !== centerImageObject && product
            !== rightImageObject) {

            safeProducts.push(product);

            if (safeProducts.length === 3) {
                break;
            }
        }
    }

    leftImageObject = safeProducts[0];
    centerImageObject = safeProducts[1];
    rightImageObject = safeProducts[2];

}

function renderNewImages() {
    leftImageElem.src = leftImageObject.url;
    leftImageElem.alt = leftImageObject.caption;
    // imageOneCaption.textContent = leftImageObject.caption;

    centerImageElem.src = centerImageObject.url;
    centerImageElem.alt = centerImageObject.caption;
    // imageTwoCaption.textContent = centerImageObject.caption;

    rightImageElem.src = rightImageObject.url;
    rightImageElem.alt = rightImageObject.caption;
    // imageThreeCaption.textContent = rightImageObject.caption;
}

/* fisher style shuffle
 https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
*/
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function imageClickHandler(event) {

    const imageID = event.target.id;
    leftImageObject.displayCtr += 1;
    centerImageObject.displayCtr += 1;
    rightImageObject.displayCtr += 1;

    switch (imageID) {

        case leftImageElem.id:
            leftImageObject.clickCtr += 1;
            pickNewImages();
            renderNewImages();
            totalClicks += 1;
            break;

        case centerImageElem.id:
            centerImageObject.clickCtr += 1;
            pickNewImages();
            renderNewImages();
            totalClicks += 1;
            break;

        case rightImageElem.id:
            rightImageObject.clickCtr += 1;
            pickNewImages();
            renderNewImages();
            totalClicks += 1;
            break;

        default:
            alert('mind the gap!');
    }

    if (totalClicks === maxClicks) {
        allImagesElem.removeEventListener('click', imageClickHandler);
        alert('Please press the "View Results"')

        const JSONPicture = JSON.stringify(Picture.all);
        localStorage.setItem('pictures', JSONPicture);

        const resultsButton = document.getElementById('button');
        resultsButton.addEventListener('click', renderResults);
    }
}

function renderResults() {
    const likesListElem = document.getElementById('results')
    likesListElem.innerHTML = '';
    for (let i = 0; i < Picture.all.length; i++) {
        const itemProduct = Picture.all[i];
        const itemProductElem = document.createElement('li');
        likesListElem.appendChild(itemProductElem);
        itemProductElem.textContent = itemProduct.caption + ' : ' + itemProduct.clickCtr + ' clicks out of ' + itemProduct.displayCtr + " views.";
    }
    renderChart();
}
/* Chart code */
function renderChart() {

    let displayCounter = [];
    let clickCounter = [];
    let imageTitle = [];

    for (let i = 0; i < Picture.all.length; i++) {
        const productTally = Picture.all[i].clickCtr;
        const productViews = Picture.all[i].displayCtr;
        const productName = Picture.all[i].caption;

        clickCounter.push(productTally);
        displayCounter.push(productViews);
        imageTitle.push(productName);
    }
    const ctx = document.getElementById('canvas').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: imageTitle,
            datasets: [{
                label: '# of clicks',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: clickCounter,
            },
            {
                label: '# of views',
                backgroundColor: 'rgb(103, 38, 255)',
                borderColor: 'rgb(.40, 0.15, 1.00)',
                data: displayCounter,
            }]
        },
        options: {}
    });
}

allImagesElem.addEventListener('click', imageClickHandler);

createPictureInstances();
pickNewImages();
renderNewImages();