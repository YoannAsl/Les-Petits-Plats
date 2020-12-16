const ingrListContainer = document.querySelector('#ingredients-list');
const ingrSearchBar = document.querySelector('#ingredients-search');
const ingrList = [];

const mainSearchBar = document.querySelector('#searchbar');

const cardsContainer = document.querySelector('#cards-container');

// DEMANDER POUR LOWERCASE - UPPERCASE

for (let i = 0; i < recipes.length; i++) {
	recipes[i].ingredients.forEach((l) => {
		if (!ingrList.includes(l.ingredient.toLowerCase())) {
			ingrList.push(l.ingredient.toLowerCase());
		}
	});
}

for (let i = 0; i < ingrList.length; i++) {
	const newIngredient = document.createElement('li');
	newIngredient.innerText =
		ingrList[i].charAt(0).toUpperCase() + ingrList[i].slice(1);
	ingrListContainer.appendChild(newIngredient);
}

const search = (list, value) => {
	for (let i = 0; i < list.children.length; i++) {
		const result = list.children[i].innerText.search(
			new RegExp(value, 'i', 'u')
		);

		if (result >= 0) {
			list.children[i].style.display = 'list-item';
		} else {
			list.children[i].style.display = 'none';
		}
	}

	//   for (let i = 0; i < list.children.length; i++) {
	//     if (!list.children[i].innerText.includes(value)) {
	//       list.children[i].style.display = 'none';
	//     } else {
	//       list.children[i].style.display = 'list-item';
	//     }
	//   }

	//   for (let i = 0; i < list.children.length; i++) {
	//     if (list.children[i].innerText.includes(value) && value.length > 0) {
	//       list.children[i].style.display = 'list-item';
	//     } else {
	//       list.children[i].style.display = 'none';
	//     }
	//   }
};

const callSearchIngr = (e) => {
	if (e.target.value.length >= 3) {
		search(ingrListContainer, e.target.value);
	}
};

const mainSearch = (list, value) => {
	for (let i = 0; i < list.length; i++) {
		let recipeIngrList = '';
		const nameResult = list[i].name.search(new RegExp(value, 'i'));
		let ingrResult;
		list[i].ingredients.forEach((n) => {
			ingrResult = n.ingredient.search(new RegExp(value, 'i'));
			recipeIngrList += `${n.ingredient} : ${n.quantity}${n.unit} `;
		});
		const descrResult = list[i].description.search(new RegExp(value, 'i'));

		if (nameResult >= 0 || ingrResult >= 0 || descrResult >= 0) {
			// console.log(list[i].name)
			// console.log(list[i].ingredients)
			// console.log(list[i].description)

			const newCard = document.createElement('div');
			newCard.innerHTML = `
                <h3>${list[i].name}</h3>
                <p>${recipeIngrList}</p>
                <p>${list[i].description}</p>
            `;
			cardsContainer.appendChild(newCard);
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
