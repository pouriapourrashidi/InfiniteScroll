const imageContainer= document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArray=[];
let ready=false;
let totalImage=0;
let loadedImage=0;
let count=5;
const apiKey='vBSnzv6kxwqtMFoXujIVcczsL_bbucq1LGgUPYdSUwE';

let apiUrl=`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&topics=6sMVjTLSkeQ`;

function scrollTriger(){
    // console.log("scroll");
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready){
        ready=false;
        loadedImage=0;
        getPhoto();
    }
}

function loadingImage(){
    loadedImage++;
    console.log('image loaded');
    if (loadedImage === totalImage){
        ready=true;
        loader.hidden=true;
        count=15;
    }
}

function dispalyPhoto(){
    totalImage=photoArray.length;
    photoArray.forEach((photo) => {
        // console.log(photo);
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        item.appendChild(img);
        imageContainer.appendChild(item);
        img.addEventListener('load',loadingImage);
    });
}

// get photo from API
async function getPhoto(){
    fetch(apiUrl).then(data=>data.json()).then(data=>{photoArray=data;dispalyPhoto();});
    
}

window.addEventListener('scroll', scrollTriger);

getPhoto();
