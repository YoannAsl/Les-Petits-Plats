/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
class App {
	constructor(recipes) {
		this.recipes = recipes;
		this.ingrSearchBar = document.querySelector('#ingredients-search');
		this.ingrListContainer = document.querySelector('#ingredients-list');
		this.appliancesSearchBar = document.querySelector('#appliances-search');
		this.appliancesListContainer = document.querySelector('#appliances-list');
		this.utensilsSearchBar = document.querySelector('#utensils-search');
		this.utensilsListContainer = document.querySelector('#utensils-list');
		this.mainSearchBar = document.querySelector('#searchbar');
		this.cardsContainer = document.querySelector('#cards-container');
		this.displayedRecipes = [];
		this.ingrTags = '';
		this.appliancesTags = '';
		this.utensilTags = '';
		this.ingrFilter = [];
		this.applFilter = [];
		this.utlFilter = [];
		this.filteredRecipes = [];
	}

	init() {
		this.fillTagsLists(this.recipes);
		// this.ingrSearchBar.addEventListener(
		// 	'input',
		// 	this.callSearchIngr.bind(this)
		// );
		this.ingrSearchBar.addEventListener(
			'input',
			this.callSecondarySearch.bind(this)
		);
		this.appliancesSearchBar.addEventListener(
			'input',
			this.callSecondarySearch.bind(this)
		);
		this.utensilsSearchBar.addEventListener(
			'input',
			this.callSecondarySearch.bind(this)
		);
		this.mainSearchBar.addEventListener(
			'input',
			this.callMainSearch.bind(this)
		);
		this.mainSearchBar.addEventListener('keydown', (e) => {
			if (e.key === 'Backspace') {
				this.resetMain();
				if (this.mainSearchBar.value.length < 4) {
					this.fillTagsLists(this.recipes);
				}
			}
		});
	}

	fillTagsLists(list) {
		this.ingrTags = '';
		this.appliancesTags = '';
		this.utensilTags = '';
		for (let i = 0; i < list.length; i++) {
			list[i].ingredients.forEach((n) => {
				if (!this.ingrTags.includes(n.ingredient)) {
					this.ingrTags += `<li class="ingredient" onclick="app.clickTag(this)">${n.ingredient}</li>`;
				}
			});
		}
		for (let i = 0; i < list.length; i++) {
			if (!this.appliancesTags.includes(list[i].appliance)) {
				this.appliancesTags += `<li class="appliance" onclick="app.clickTag(this)">${list[i].appliance}</li>`;
			}
		}
		for (let i = 0; i < list.length; i++) {
			list[i].ustensils.forEach((n) => {
				if (!this.utensilTags.includes(n)) {
					this.utensilTags += `<li class="utensil" onclick="app.clickTag(this)">${n}</li>`;
				}
			});
		}
		this.ingrListContainer.innerHTML = `${this.ingrTags}`;
		this.appliancesListContainer.innerHTML = `${this.appliancesTags}`;
		this.utensilsListContainer.innerHTML = `${this.utensilTags}`;
	}

	createRecipeCards(list) {
		for (let i = 0; i < list.length; i++) {
			const newCard = document.createElement('div');
			let cardIngredients = '';
			list[i].ingredients.forEach(
				// eslint-disable-next-line no-return-assign
				(n) =>
					(cardIngredients += `<li><span class="bold">${
						n.ingredient
					} :</span> ${n.quantity || ''}${n.unit || ''}</li> `)
			);
			newCard.className = 'recipe-card';
			newCard.innerHTML = `
				<div class="img-placeholder"></div>
				<div id="test">
					<div class="top">
						<h3>${list[i].name}</h3>
						<p class="time bold">${list[i].time} min</p>
					</div>
					<div class="bottom">
						<ul class="ingredients">${cardIngredients}</ul>
						<p class="description">${list[i].description}</p>
					</div>
				</div>
			`;
			this.cardsContainer.appendChild(newCard);
		}
	}

	hasIngredient(recipe, ingredient) {
		for (const currentIngredient of recipe.ingredients) {
			if (currentIngredient.ingredient.includes(ingredient)) {
				return true;
			}
		}
		return false;
	}

	filterByIngredient(listRecipes, ingredient) {
		const newRecipesList = [];
		for (const currentRecipe of listRecipes) {
			if (this.hasIngredient(currentRecipe, ingredient)) {
				newRecipesList.push(currentRecipe);
			}
		}
		return newRecipesList;
	}

	filterByIngredientTags(listRecipes, listIngredients) {
		for (const currentIngredient of listIngredients) {
			listRecipes = this.filterByIngredient(listRecipes, currentIngredient);
			if (listRecipes.length === 0) {
				break;
			}
		}
		return listRecipes;
	}

	clickTag(tag) {
		switch (tag.className) {
			case 'ingredient':
				this.ingrFilter.push(tag.innerText);
				let newList = [];
				if (this.mainSearchBar.value.length < 3) {
					newList = this.filterByIngredientTags(this.recipes, this.ingrFilter);
				} else {
					newList = this.filterByIngredientTags(
						this.displayedRecipes,
						this.ingrFilter
					);
				}
				this.resetMain();
				this.displayedRecipes = newList;
				this.createRecipeCards(this.displayedRecipes);
				this.fillTagsLists(this.displayedRecipes);
				break;
			case 'appliance':
				this.applFilter.push(tag.innerText);
				break;
			case 'utensil':
				this.utlFilter.push(tag.innerText);
				break;
			default:
				console.log('Erreur');
		}
	}

	// searchIngr(list, value) {
	// 	this.ingrTags = '';
	// 	for (let i = 0; i < list.length; i++) {
	// 		let result;
	// 		list[i].ingredients.forEach((n) => {
	// 			result = n.ingredient.search(new RegExp(value, 'i'));
	// 			if (result >= 0 && !this.ingrTags.includes(n.ingredient)) {
	// 				this.ingrTags += `<li class="ingredient" onclick="app.clickTag(this)">${n.ingredient}</li>`;
	// 			}
	// 		});
	// 	}
	// 	this.ingrListContainer.innerHTML = `${this.ingrTags}`;
	// }

	// callSearchIngr(e) {
	// 	if (this.displayedRecipes.length === 0) {
	// 		this.searchIngr(this.recipes, e.target.value);
	// 	} else {
	// 		this.searchIngr(this.displayedRecipes, e.target.value);
	// 	}
	// }

	secondarySearch(list, value, type) {
		switch (type) {
			case 'ingredients-search':
				this.ingrTags = '';
				for (let i = 0; i < list.length; i++) {
					let result;
					list[i].ingredients.forEach((n) => {
						result = n.ingredient.search(new RegExp(value, 'i'));
						if (result >= 0 && !this.ingrTags.includes(n.ingredient)) {
							this.ingrTags += `<li class="ingredient" onclick="app.clickTag(this)">${n.ingredient}</li>`;
						}
					});
				}
				this.ingrListContainer.innerHTML = `${this.ingrTags}`;
				break;
			case 'appliances-search':
				this.appliancesTags = '';
				for (let i = 0; i < list.length; i++) {
					let result;
					result = list[i].appliance.search(new RegExp(value, 'i'));
					if (result >= 0 && !this.appliancesTags.includes(list[i].appliance)) {
						this.appliancesTags += `<li class="appliance" onclick="app.clickTag(this)">${list[i].appliance}</li>`;
					}
					// list[i].appliance.forEach((n) => {
					// 	result = n.search(new RegExp(value, 'i'));
					// 	if (result >= 0 && !this.appliancesTags.includes(n)) {
					// 		this.appliancesTags += `<li class="appliance" onclick="app.clickTag(this)">${n}</li>`;
					// 	}
					// });
				}
				this.appliancesListContainer.innerHTML = `${this.appliancesTags}`;
				break;
			case 'utensils-search':
				this.utensilTags = '';
				for (let i = 0; i < list.length; i++) {
					let result;
					list[i].ustensils.forEach((n) => {
						result = n.search(new RegExp(value, 'i'));
						if (result >= 0 && !this.utensilTags.includes(n)) {
							this.utensilTags += `<li class="ingredient" onclick="app.clickTag(this)">${n}</li>`;
						}
					});
				}
				this.utensilsListContainer.innerHTML = `${this.utensilTags}`;
				break;
			default:
				console.log('Erreur');
		}
	}

	callSecondarySearch(e) {
		if (this.displayedRecipes.length === 0) {
			this.secondarySearch(this.recipes, e.target.value, e.target.id);
		} else {
			this.secondarySearch(this.displayedRecipes, e.target.value, e.target.id);
		}
	}

	resetMain() {
		this.displayedRecipes = [];
		this.cardsContainer.innerHTML = '';
		this.ingrListContainer.innerHTML = '';
	}

	mainSearch(list, value) {
		this.resetMain();
		for (let i = 0; i < list.length; i++) {
			// let recipeIngrList = '';
			const nameResult = list[i].name.search(new RegExp(value, 'i'));
			let ingrResult;
			list[i].ingredients.forEach((n) => {
				ingrResult = n.ingredient.search(new RegExp(value, 'i'));
				// recipeIngrList += `<li><span class="bold">${n.ingredient} :</span> ${
				// 	n.quantity || ''
				// }${n.unit || ''}</li> `;
			});
			const descrResult = list[i].description.search(new RegExp(value, 'i'));

			if (nameResult >= 0 || ingrResult >= 0 || descrResult >= 0) {
				this.displayedRecipes.push(list[i]);
				this.fillTagsLists(this.displayedRecipes);
			}
		}
	}

	callMainSearch(e) {
		if (e.target.value.length >= 3) {
			this.mainSearch(this.recipes, e.target.value);
			this.createRecipeCards(this.displayedRecipes);
		}
	}
}
