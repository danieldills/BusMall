'use strict'
/*Globals*/
const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass']

const maxClicks = 26;
let totalClicks = 1;

// set these at the top for easy/safe use later in script
const leftImageElem = document.getElementById('left-image');
// const imageOneCaption = document.getElementById('left-image-caption');
const centerImageElem = document.getElementById('center-image');
// const imageTwoCaption = document.getElementById('center-image-caption');
const rightImageElem = document.getElementById('right-image');
// const imageThreeCaption = document.getElementById('right-image-caption');
const allImagesElem = document.getElementById('images');
// const viewResults = document.getElementById('results');

let leftImageObject = null;
let centerImageObject = null;
let rightImageObject = null;

/* Constructor */
function Picture (caption, url) {
    this.caption = caption;
    this.url = url;
    this.clickCtr = 0;
    this.displayCtr = 0;

    Picture.all.push(this);
};

Picture.all = [];

/* Function */
function createProducts() {
    for (let i = 0; i < productNames.length; i++) {
        const productName = productNames[i];
        new Picture(productName, './imgs/' + productName + '.jpg');
    }
}

function pickNewImages() {

    shuffle(Picture.all);

    const safeProducts = [];

    for (let i = 0; i < Picture.all.length; i++) {

        const product = Picture.all[i];

        if (product !== leftImageObject && product !== centerImageObject && product !== rightImageObject) {
            
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
    for(let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array [j] = temp
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
            totalClicks +=1;
            break;

        case centerImageElem.id:
            centerImageObject.clickCtr +=1;
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
        const resultsButton = document.getElementById('show-results');
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

function renderChart() {

    let tallyArray = []

    for (let i = 0; i < Picture.all.length; i++) {
        const productTally = Picture.all[i].clickCtr;
        tallyArray.push(productTally);
    }

    const ctx = document.getElementById('canvas').getContext('2d');
    const chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'horizontalBar',
  
      // The data for our dataset
      data: {
        labels: productNames,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
  
          // TODO: get the "good" product data in here
          data: tallyArray
        }]
      },
  
      // Configuration options go here
      options: {}
    });
  }


allImagesElem.addEventListener('click', imageClickHandler);

createProducts();

pickNewImages();

renderNewImages();



// // instantiate picture objects
// new Picture('bag', './imgs/bag.jpg');
// new Picture('banana', './imgs/banana.jpg');
// new Picture('bathroom', './imgs/bathroom.jpg');
// new Picture('boots', './imgs/boots.jpg');
// new Picture('breakfast', './imgs/breakfast.jpg');
// new Picture('bublegum', './imgs/bubblegum.jpg');
// new Picture('chair', './imgs/chair.jpg');
// new Picture('cthulhu', './imgs/cthulhu.jpg');
// new Picture('dog-duck', './imgs/dog-duck.jpg');
// new Picture('dragon', './imgs/dragon.jpg');
// new Picture('pen', './imgs/pen.jpg');
// new Picture('pet-sweep', './imgs/pet-sweep.jpg');
// new Picture('scissors', './imgs/scissors.jpg');
// new Picture('shark', './imgs/shark.jpg');
// new Picture('sweep', './imgs/sweep.jpg');
// new Picture('tauntaun', './imgs/tauntaun.jpg');
// new Picture('unicorn', './imgs/unicorn.jpg');
// new Picture('usb', './imgs/usb.jpg');
// new Picture('water-can', './imgs/water-can.jpg');
// new Picture('wine-glass', './imgs/wine-glass.jpg');
