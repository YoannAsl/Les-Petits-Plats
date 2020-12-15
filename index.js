const ingrListContainer = document.querySelector("#ingredients-list");
const ingrSearchBar = document.querySelector("#ingredients-search");
const ingrList = [];

for (let i = 0; i < recipes.length; i++) {
    recipes[i].ingredients.forEach(l => {
        if (!ingrList.includes(l.ingredient.toLowerCase())) {
            ingrList.push(l.ingredient.toLowerCase())
        } 
    });
}

for (let i = 0; i < ingrList.length; i++) {
    let newIngredient = document.createElement("li");
    newIngredient.innerText = ingrList[i];
    ingrListContainer.appendChild(newIngredient);
}



let test = e => {
    testt(ingrListContainer, e.target.value)
}

let testt = (list, value) => {
    for (let i = 0; i < list.children.length; i++) {
        if (!list.children[i].innerText.includes(value)) {
            list.children[i].style.display = "none";
        } else {
            list.children[i].style.display = "list-item";
        }
    }
}

ingrSearchBar.addEventListener("input", test);