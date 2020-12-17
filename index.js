const ingrListContainer = document.querySelector('#ingredients-list');
const ingrSearchBar = document.querySelector('#ingredients-search');
// const ingrList = [];

const mainSearchBar = document.querySelector('#searchbar');

const cardsContainer = document.querySelector('#cards-container');
let displayedRecipes = [];
let ingrTags = '';
// DEMANDER POUR LOWERCASE - UPPERCASE

// for (let i = 0; i < recipes.length; i++) {
// 	recipes[i].ingredients.forEach((l) => {
// 		if (!ingrList.includes(l.ingredient.toLowerCase())) {
// 			ingrList.push(l.ingredient.toLowerCase());
// 		}
// 	});
// }

// for (let i = 0; i < ingrList.length; i++) {
// 	const newIngredient = document.createElement('li');
// 	newIngredient.innerText =
// 		ingrList[i].charAt(0).toUpperCase() + ingrList[i].slice(1);
// 	ingrListContainer.appendChild(newIngredient);
// }

const fillIngrtags = (list) => {
	ingrTags = '';
	for (let i = 0; i < list.length; i++) {
		list[i].ingredients.forEach((n) => {
			if (!ingrTags.includes(n.ingredient)) {
				ingrTags += `<li>${n.ingredient}</li>`;
			}
		});
	}
	ingrListContainer.innerHTML = `${ingrTags}`;
};

fillIngrtags(recipes);

const searchIngr = (list, value) => {
	for (let i = 0; i < list.length; i++) {
		let result;
		list[i].ingredients.forEach((n) => {
			result = n.ingredient.search(new RegExp(value, 'i'));
			// console.log(n.ingredient);
			if (result >= 0 && !ingrTags.includes(n.ingredient)) {
				// list[i].style.display = 'list-item';
				ingrTags += `<li>${n.ingredient}</li>`;
			}
		});

		// else {
		// 	// list[i].style.display = 'none';
		// 	console.log('no match');
		// }
	}
	ingrListContainer.innerHTML = `${ingrTags}`;

	//   for (let i = 0; i < list.children.length; i++) {
	//     if (!list.children[i].innerText.includes(value)) {
	//       list.children[i].style.display = 'none';
	//     } else {
	//       list.children[i].style.display = 'list-item';
	//     }
	//   }
};

const callSearchIngr = (e) => {
	// if (e.target.value.length >= 3) {
	searchIngr(displayedRecipes, e.target.value);
	// }
};

const resetMain = () => {
	displayedRecipes = [];
	cardsContainer.innerHTML = '';
	ingrListContainer.innerHTML = '';
};

const mainSearch = (list, value) => {
	resetMain();
	for (let i = 0; i < list.length; i++) {
		let recipeIngrList = '';
		const nameResult = list[i].name.search(new RegExp(value, 'i'));
		let ingrResult;
		list[i].ingredients.forEach((n) => {
			ingrResult = n.ingredient.search(new RegExp(value, 'i'));
			recipeIngrList += `<li><span class="bold">${n.ingredient} :</span> ${
				n.quantity || ''
			}${n.unit || ''}</li> `;
		});
		const descrResult = list[i].description.search(new RegExp(value, 'i'));

		if (nameResult >= 0 || ingrResult >= 0 || descrResult >= 0) {
			const newCard = document.createElement('div');
			newCard.className = 'recipe-card';
			newCard.innerHTML = `
                <div class="img-placeholder"></div>
                <div id="test">
                    <div class="top">
                        <h3>${list[i].name}</h3>
                        <p class="time bold">${list[i].time} min</p>
                    </div>
                    <div class="bottom">
                        <ul class="ingredients">${recipeIngrList}</ul>
                        <p class="description">${list[i].description}</p>
                    </div>
                </div>
            `;
			cardsContainer.appendChild(newCard);

			displayedRecipes.push(list[i]);
			fillIngrtags(displayedRecipes);
		}
	}
};

const callMainSearch = (e) => {
	if (e.target.value.length >= 3) {
		// console.log(recipes[0].name, recipes[0].ingredients, recipes[0].description)
		mainSearch(recipes, e.target.value);
	}
};

ingrSearchBar.addEventListener('input', callSearchIngr);
mainSearchBar.addEventListener('input', callMainSearch);
mainSearchBar.addEventListener('keydown', (e) => {
	if (e.key === 'Backspace') {
		resetMain();
	}
});
