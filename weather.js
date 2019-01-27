const COORDS = "coords";
const API_KEY = "2518d90c93ebdb790e6f178e8d7aebdc" //api key
const weather = document.querySelector(".js-weather")

//중요한 부분
function getWeather(lat, lng){
    fetch( //url을 불러오는 함수
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric` //api url
    ).then(function(response){ //.then : 데이터를 모두 불러오면 실행하는 함수
        return response.json(); //response를 기다림
    }).then(function(json){ //다 완료하면 json을 가져옴
        const temperature = json.main.temp;
        const city = json.name;
        weather.innerText = `${city}, ${temperature}`;
    });

}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) { //성공했을 때
    const latitude = position.coords.latitude; //위도 경도 저장
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, //키값과 value로 저장하는 변수와 이름이 같을 때, latitude:latitude와 같음
        longitude 
    };
    saveCoords(coordsObj); //로컬 스토리지에 좌표 저장
    getWeather(latitude, longitude); //api로 날씨 json얻기
}

function handleGeoError() { //좌표 불러오기 실패했을 때
    console.log("can't access!")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError); //현재 좌표를 얻는 객체 메소드, 첫번째 인자는 성공했을 때 실행, 두번째 인자는 실패했을 때 실행하는 함수를 입력함
}

function loadCoord() {
    const loadedCoords = localStorage.getItem(COORDS); //로컬 스토리지에서 좌표 값을 가져옴
    if (loadedCoords === null) { //값이 없으면
        askForCoords(); //좌표를 물어봐
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoord();
}

init();