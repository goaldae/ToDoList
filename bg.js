const body = document.querySelector("body");

const IMG_NUMBER = 3; //사진 개수
const BG_IMAGE = "bgImage"; //추가할 클래스 이름

function paintImage(imgNumber){
    const image = document.createElement("img");
    image.src = `images/${imgNumber}.jpg`
    body.appendChild(image);
    image.classList.add(BG_IMAGE);
}

function genRandom(){
    const number = Math.ceil(Math.random() * IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();