
const container = document.querySelector('.container');
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;

async function getData(e) {
    let userData = e.target.value; 
    let emptyArray = [];

    if(userData){
        
	await getRepo(userData).then(res => {res.items.forEach(user => emptyArray.push(user))});
      
        emptyArray = emptyArray.map((data)=>{
           
            let name = data.name;
	    let owner = data.owner.login;
	    let stars = data.stargazers_count;
            return data.name = `<li data-owner='${owner}' data-stars='${stars}'>${name}</li>`;
        });
        searchWrapper.classList.add("active"); 
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {

            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); 
    }
}

//inputBox.onkeyup = async function getData(e) {
//    let userData = e.target.value; 
//    let emptyArray = [];
//console.log(userData);
//    if(userData){
        
//	await getRepo(userData).then(res => {res.items.forEach(user => emptyArray.push(user))});
      
//        emptyArray = emptyArray.map((data)=>{
           
//            let name = data.name;
//	    let owner = data.owner.login;
//	    let stars = data.stargazers_count;
//            return data.name = `<li data-owner='${owner}' data-stars='${stars}'>${name}</li>`;
//        });
//        searchWrapper.classList.add("active"); 
//        showSuggestions(emptyArray);
//        let allList = suggBox.querySelectorAll("li");
//        for (let i = 0; i < allList.length; i++) {

//            allList[i].setAttribute("onclick", "select(this)");
//        }
//    }else{
//        searchWrapper.classList.remove("active"); 
//    }
//}
container.addEventListener("click", function(event) {

    let target = event.target;
    if (!target.classList.contains("fa-times")) return;

    target.parentElement.remove();
});
async function select(element){

    let selectData = element.textContent;
    
     const card = document.createElement('div');
     card.classList.add('card');
     const cardBody = document.createElement('div');
     cardBody.classList.add('card-body');
     const cross = document.createElement('i');
     cross.classList.add('fas');
     cross.classList.add('fa-times');
     const title = document.createElement('h5');
     title.classList.add('card-title');
     title.textContent = `Name: ${selectData}`;
     const articleOwner= document.createElement('p');
     articleOwner.classList.add('card-title');
     articleOwner.textContent = `Owner: ${element.dataset.owner}`;
     const articleStars= document.createElement('p');
     articleStars.classList.add('card-title');
     articleStars.textContent = `Stars: ${element.dataset.stars}`;
     cardBody.appendChild(title);
     cardBody.appendChild(articleOwner);
     cardBody.appendChild(articleStars);
     card.appendChild(cardBody);
     card.appendChild(cross);
     container.appendChild(card);

    inputBox.value = '';
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}


async function getRepo(search) {
    return await fetch(`https://api.github.com/search/repositories?q=${search}`).then(response => {
        return response.json();
    });
};

function debounce(fn, timeout) {
    let timer = null;

    return (...args) => {
	clearTimeout(timer);
	return new Promise((resolve) => {
	    timer = setTimeout(
		() => resolve(fn(...args)),
		timeout,
	    );
	});
    };
}
const getDataDebounce = debounce(getData, 500);
inputBox.onkeyup = getDataDebounce;