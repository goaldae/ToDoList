const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos"; //key값
let toDos = []; //할 일들을 저장하는 배열 //바뀌어야하기때문에 let으로 선언

function deletToDo(event){
    //event.target 이벤트가 일어나는 것 태그
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li); //html상에서 지워짐 (로컬 스토리지는 안지워짐)

    const cleanToDos = toDos.filter(function(toDo){ //forEach 함수와 같이 각각의 배열 값에 따라 인자의 함수 반환값이 참인 것만 저장한다.
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
    console.log(toDos);
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); //로컬 스토리지는 자바스크립트 데이터를 저장하지 못해서 문자열로 바꿔줘야함
}

function showToDo(text){
    const li = document.createElement("li"); //태그를 만드는 메소드 createElement()
    const delBtn = document.createElement("button"); //버튼 만들기
    const span = document.createElement("span"); //span만들기
    
    const newId = toDos.length + 1;
    
    const toDoObj = { //todo객체
        text : text, //key는 text, value는 입력한 todo
        id : newId //나중에 선택해서 지우기 위한 id값
    }

    delBtn.addEventListener("click", deletToDo); //X버튼 눌렀을 때 deletToDo 함수 실행
    
    li.id = newId; //li에 1부터 id값 주기
    delBtn.innerText = "X"; //각 태그에 텍스트 추가 
    span.innerText = text;

    toDoList.appendChild(li); //태그에 자식 태그들 추가하기 안하면 안보임
    li.appendChild(delBtn);
    li.appendChild(span);

    toDos.push(toDoObj); //할일 배열에 todo객체 추가
    saveToDos(); //배열에 저장돼있는거 로컬스토리지에 저장하는 함수 실행
}

function handleSubmit(event){
    event.preventDefault(); //submit(엔터)를 입력했을 때 새로고침 없앰
    const currentValue = toDoInput.value; //input의 값(value) 가져오기
    showToDo(currentValue); //그 값을 보여주는 함수
    toDoInput.value = ""; //input창 초기화
}

function loadToDo(){//기존에 로컬 스토리지에 저장되어있는 값을 불러옴
    const loadedtoDos = localStorage.getItem(TODOS_LS); //로컬 스토리지의 값을 가져옴
    if(loadedtoDos !== null){ //로컬 스토리지에 값이 있다면
        const parsedToDos = JSON.parse(loadedtoDos); //string으로 저장한 배열을 객체로 바꿔서 상수에 저장
        //중요한 부분
        parsedToDos.forEach(function(toDo){ //배열의 원소에 대해 각각 함수를 실행하는 forEach 인자 이름은 toDo
            showToDo(toDo.text); //toDo의 text를 넣어서 실행함
        });
    }
}

function init(){
    loadToDo();
    toDoForm.addEventListener("submit", handleSubmit)
}
init();