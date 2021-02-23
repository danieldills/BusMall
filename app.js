'use strict'

// set these at the top for easy/safe use later in script
const imageOneTag = document.getElementById('left-image');
const imageOneCaption = document.getElementById('left-image-caption');
const imageTwoTag = document.getElementById('center-image');
const imageTwoCaption = document.getElementById('center-image-caption');
const imageThreeTag = document.getElementById('right-image');
const imageThreeCaption = document.getElementById('right-image-caption');
const allImagesTag = document.getElementById('images');

const maxClicks = 5;
let totalClicks = 0;

// Image/caption constructor function
function Picture (caption, url) {
    this.caption = caption;
    this.url = url;
    this.clickCtr = 0;
    this.displayCtr = 0;

    Picture.all.push(this);
};

// Declares empty array to be pushed to later
Picture.all = [];

// instantiate picture objects
new Picture('bag', './images/bag.jpg');
new Picture('banana', './images/banana.jpg');
new Picture('bathroom', './images/bathroom.jpg');
new Picture('boots', './images/boots.jpg');
new Picture('breakfast', './images/breakfast.jpg');
new Picture('bublegum', './images/bubblegum.jpg');
new Picture('chair', './images/chair.jpg');
new Picture('cthulhu', './images/cthulhu.jpg');
new Picture('dog-duck', './images/dog-duck.jpg');
new Picture('dragon', './images/dragon.jpg');
new Picture('pen', './images/pen.jpg');
new Picture('pet-sweep', './images/pet-sweep.jpg');
new Picture('scissors', './images/scissors.jpg');
new Picture('shark', './images/shark.jpg');
new Picture('sweep', './images/sweep.png');
new Picture('tauntaun', './images/tauntaun.jpg');
new Picture('unicorn', './images/unicorn.jpg');
new Picture('usb', './images/usb.gif');
new Picture('water-can', './images/water-can.jpg');
new Picture('wine-glass', './images/wine-glass.jpg');

let leftImageObject = null;
let centerImageObject = null;
let rightImageObject = null;

// fisher style shuffle
// https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
function shuffle(array) {
    for(let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array [j] = temp
    }
}

function pickNewImages() {

    shuffle(Picture.all);

    leftImageObject = Picture.all[0]
    centerImageObject = Picture.all[1]
    rightImageObject = Picture.all[2]

    leftImageObject.displayCtr += 1;
    centerImageObject.displayCtr += 1;
    rightImageObject.displayCtr += 1;
    
    renderNewImages();
}

function renderNewImages() {
    imageOneTag.src = leftImageObject.url;
    imageOneTag.alt = leftImageObject.caption;
    imageOneCaption.textContent = leftImageObject.caption;

    imageTwoTag.src = centerImageObject.url;
    imageTwoTag.alt = centerImageObject.caption;
    imageTwoCaption.textContent = centerImageObject.caption;

    imageThreeTag.src = rightImageObject.url;
    imageThreeTag.alt = rightImageObject.caption;
    imageThreeCaption.textContent = rightImageObject.caption;
}

function imageClickHandler(event) {
    console.log(event.target.alt)
    if (totalClicks <= maxClicks) {
        const clickedID = event.target.id;
        if (clickedID === 'left-image') {
            leftImageObject.clickCtr += 1;
        } else if (clickedID ==='center-image') {
            centerImageObject.clickCtr += 1;
        } else if (clickedID === 'right-image') {
            rightImageObject.clickCtr += 1;
        }
        pickNewImages();
    }
};

pickNewImages();
// totalClicks += 1;

allImagesTag.addEventListener('click', imageClickHandler);







 