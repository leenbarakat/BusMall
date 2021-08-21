'use strict';

let attemptsE1 = document.getElementById('attempts');
let container = document.getElementById('image-container')

let firstImage = document.getElementById('firstImg')
let secondImage = document.getElementById('secondImg')
let thirdImage = document.getElementById('thirdImg')

let result = document.getElementById('results');

let Img = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let maxAttempts = 25;
let attempt = 1;
let showImg = [];
let voteImage = [];
let viewImage = [];
let product = [];
let busNameImage = [];

for (let i = 0; i < Img.length; i++) {
    new ImgOfProduct(Img[i])
}


function   LocalStorageSaver()
{
    let data1 = JSON.stringify(product);
    localStorage.setItem('product',data1);
}
function LocalStorageReader()
{
    let stringObj1 = localStorage.getItem('product');

    
    let normalObj1 = JSON.parse(stringObj1);
  
    if(normalObj1)
    {  
        product = normalObj1;
    }
    // else if (normalObj2)
    // {
    //     viewImage = normalObj2;

    // }
}
LocalStorageReader();

function ImgOfProduct(productName) {
    this.pName = productName.split('.')[0];
    this.imgPath = `Img/${productName}`;
    this.Votes = 0;
    this.Views = 0;
    product.push(this);
    busNameImage.push(this.pName);

}



// console.log(product);

function RanImg() {
    return Math.floor(Math.random() * Img.length) // 0 to 18 array lenght is 19
}

// let firstIndex;
// let secondIndex;
// let thirdIndex;
let firstIndex;
let scondIndex;
let thirdIndex;

function ImageRender() {
    firstIndex =RanImg();
    scondIndex =RanImg();
    thirdIndex =RanImg();

    while (firstIndex === scondIndex || scondIndex == thirdIndex || firstIndex === thirdIndex || showImg.includes(firstIndex) || showImg.includes(scondIndex) || showImg.includes(thirdIndex)) {
        firstIndex =RanImg();
        scondIndex =RanImg();
        thirdIndex =RanImg();
    }
    firstImage.setAttribute('src', product[firstIndex].imgPath);
    secondImage.setAttribute('src', product[scondIndex].imgPath);
    thirdImage.setAttribute('src', product[thirdIndex].imgPath);
    product[firstIndex].Views++;
    product[scondIndex].Views++;
    product[thirdIndex].Views++;
    showImg[0]=firstIndex;
    showImg[1]=scondIndex;
    showImg[2]=thirdIndex;
}
ImageRender();

firstImage.addEventListener('click', HandleClick);
secondImage.addEventListener('click', HandleClick)
thirdImage.addEventListener('click', HandleClick);

function HandleClick(event) 
{
    if (attempt <= maxAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'firstImg') {
            product[firstIndex].Votes++;
        } else if (clickedImage === 'secondImg') {
            product[scondIndex].Votes++
        } else if (clickedImage === 'thirdImg') {
            product[thirdIndex].Votes++
        }
        renderImg();
        attempt++;
        attemptsE1.textContent = `attemps : ${attempt}`
    }
    else
    {
    
    firstImage.removeEventListener('click', HandleClick)
    secondImage.removeEventListener('click', HandleClick)
    thirdImage.removeEventListener('click', HandleClick)
    }

}

let btnEl = document.getElementById('btn');
btnEl.addEventListener('click', ShowScore)

function ShowScore(event) 
{
    let liEl;
    
        for (let i = 0; i < product.length; i++) 
    {
        liEl = document.createElement('li');
        result.appendChild(liEl);
        liEl.textContent = `${product[i].pName} has ${product[i].Votes} votes and  ${product[i].Views} views.`;
        voteImage.push(product[i].Votes);
        viewImage.push(product[i].Views);
    }
    btnEl.removeEventListener('click', ShowScore)
     LocalStorageSaver();
    chartRender()
}

function chartRender() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: busNameImage,
            datasets: [{
                label: '# of Votes',
                data: voteImage,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: '# of views',
                data: viewImage,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
                // Done
            }
        }
    });
    
}