const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser"; //로컬스토리지에 저장되는 유저 이름의 key값
const SHOWING_CN = "showing"; //showing 클래스 이름 변수에 저장



function showGreeting(text){ //js-greetings 태그에 인사말 표시하기
    const btn = document.createElement("button");
    btn.innerText = "Edit name"; //이름수정하는 버튼

    form.classList.remove(SHOWING_CN); //input창은 showing을 없애야함
    greeting.classList.add(SHOWING_CN); //인사말에 shwoing 클래스를 추가함으로써 보여주기
    greeting.innerText = `Hello ${text}!`;
    greeting.appendChild(btn);

    btn.addEventListener("click", function(){ //수정하기 눌렀을 때 
        greeting.classList.remove(SHOWING_CN); //인사말 없애기
        form.classList.add(SHOWING_CN); //물어보는 창 보여주기
        greeting.removeChild(btn); //버튼 없애기
        localStorage.removeItem(USER_LS); //저장돼있는 유저 이름지우기
    });
}

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){ //submit 이벤트를 인자로 받음
    event.preventDefault(); //submit의 이벤트를 실행하면 기본적으로 새로고침이 되는걸 막음
    const currentValue = input.value; //사용자가 입력한 값을 받아옴
    showGreeting(currentValue); //입력한 값으로 인사말 표시
    //중요한것! value값을 로컬 스토리지에 저장
    saveName(currentValue);
}

function askForName(){ //
    form.classList.add(SHOWING_CN); //인풋창을 보여주고
    form.addEventListener("submit", handleSubmit); //sumit 이벤트를 기다리고 이벤트가 실행되면 handleSubmit 함수 실행
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){ //로컬 스토리지에 저장돼있지 않은 경우
        askForName();
    } else{ //이름이 로컬 스토리지에 저장돼있는 경우
        showGreeting(currentUser);
    }
}

function init(){
    loadName();
}
init();