const ingrListContainer = document.querySelector("#ingredients-list");
const ingrSearchBar = document.querySelector("#ingredients-search");
const ingrList = [];

const mainSearchBar = document.querySelector("#searchbar");

// DEMANDER POUR LOWERCASE - UPPERCASE

for (let i = 0; i < recipes.length; i++) {
    recipes[i].ingredients.forEach(l => {
        if (!ingrList.includes(l.ingredient.toLowerCase())) {
            ingrList.push(l.ingredient.toLowerCase());
        } 
    });
}

for (let i = 0; i < ingrList.length; i++) {
    let newIngredient = document.createElement("li");
    newIngredient.innerText = ingrList[i].charAt(0).toUpperCase() + ingrList[i].slice(1);
    ingrListContainer.appendChild(newIngredient);
}

let callSearchIngr = e => {
    if (e.target.value.length >= 3) {
        search(ingrListContainer, e.target.value);
    }
}

let search = (list, value) => {
    for (let i = 0; i < list.children.length; i++) {
        let result = list.children[i].innerText.search(new RegExp(value, "i", "u"));

        if (result >= 0) {
            list.children[i].style.display = "list-item";
        } else {
            list.children[i].style.display = "none";
        }
    }

    // for (let i = 0; i < list.children.length; i++) {
    //     if (!list.children[i].innerText.includes(value)) {
    //         list.children[i].style.display = "none";
    //     } else {
    //         list.children[i].style.display = "list-item";
    //     }
    // }


    // for (let i = 0; i < list.children.length; i++) {
    //     if (list.children[i].innerText.includes(value) && value.length > 0) {
    //         list.children[i].style.display = "list-item";
    //     } else {
    //         list.children[i].style.display = "none";
    //     }
    // }
}

let callMainSearch = e => {
    if (e.target.value.length >= 3) {
        // console.log(recipes[0].name, recipes[0].ingredients, recipes[0].description)
        mainSearch(recipes, e.target.value);
    }
}

let mainSearch = (list, value) => {
    for (let i = 0; i < list.length; i++) {
        let nameResult = list[i].name.search(new RegExp(value, "i"));
        let ingrResult;
        let descrResult = list[i].description.search(new RegExp(value, "i"));

        list[i].ingredients.forEach(n => {
            ingrResult = n.ingredient.search(new RegExp(value, "i"));
        })

        if (nameResult >= 0 || ingrResult >= 0 || descrResult >= 0) {
            console.log(list[i].name)
            console.log(list[i].ingredients)
            console.log(list[i].description)
        }
    }
}

ingrSearchBar.addEventListener("input", callSearchIngr);
mainSearchBar.addEventListener("input", callMainSearch);