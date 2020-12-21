class App {
	constructor(recipes) {
		this.recipes = recipes;
		this.ingrListContainer = document.querySelector('#ingredients-list');
		this.ingrSearchBar = document.querySelector('#ingredients-search');
		this.mainSearchBar = document.querySelector('#searchbar');
		this.cardsContainer = document.querySelector('#cards-container');
		this.displayedRecipes = [];
		this.ingrTags = '';
		this.tagsFilter = [];
	}

	init() {
		this.fillIngrtags(this.recipes);
		this.ingrSearchBar.addEventListener('input', this.callSearchIngr);
		this.mainSearchBar.addEventListener('input', this.callMainSearch);
		this.mainSearchBar.addEventListener('keydown', (e) => {
			if (e.key === 'Backspace') {
				this.resetMain();
			}
		});
	}

	fillIngrtags(list) {
		this.ingrTags = '';
		for (let i = 0; i < list.length; i++) {
			list[i].ingredients.forEach((n) => {
				if (!this.ingrTags.includes(n.ingredient)) {
					this.ingrTags += `<li onclick="app.clickTag(this)">${n.ingredient}</li>`;
				}
			});
		}
		this.ingrListContainer.innerHTML = `${this.ingrTags}`;
	}

	createRecipeCards(name, time, ingredients, description) {
		const newCard = document.createElement('div');
		newCard.className = 'recipe-card';
		newCard.innerHTML = `
			<div class="img-placeholder"></div>
			<div id="test">
				<div class="top">
					<h3>${name}</h3>
					<p class="time bold">${time} min</p>
				</div>
				<div class="bottom">
					<ul class="ingredients">${ingredients}</ul>
					<p class="description">${description}</p>
				</div>
			</div>
		`;
		this.cardsContainer.appendChild(newCard);
	}

	clickTag(tag) {
		this.resetMain();
		this.tagsFilter.push(tag.innerText);
		let recipeIngrList = '';
		if (this.displayedRecipes.length === 0) {
			for (let i = 0; i < this.recipes.length; i++) {
				let result;
				this.recipes[i].ingredients.forEach((n) => {
					recipeIngrList += `<li><span class="bold">${n.ingredient} :</span> ${
						n.quantity || ''
					}${n.unit || ''}</li> `;
					result = n.ingredient.search(new RegExp(tag.innerText, 'i'));
					if (result >= 0) {
						this.createRecipeCards(
							this.recipes[i].name,
							this.recipes[i].time,
							recipeIngrList,
							this.recipes[i].description
						);
						this.displayedRecipes.push(this.recipes[i]);
						this.fillIngrtags(this.displayedRecipes);
					}
				});
			}
		}

		// for (let i = 0; i < recipes.length; i++) {
		// 	tagsFilter.forEach((n) => {
		// 		recipes[i].ingredients.forEach((l) => {
		// 			recipeIngrList += `<li><span class="bold">${l.ingredient} :</span> ${
		// 				l.quantity || ''
		// 			}${l.unit || ''}</li> `;
		// 			if (l.ingredient.includes(n)) {
		// 				createRecipeCards(
		// 					recipes[i].name,
		// 					recipes[i].time,
		// 					recipeIngrList,
		// 					recipes[i].description
		// 				);
		// 				displayedRecipes.push(recipes[i]);
		// 				fillIngrtags(displayedRecipes);
		// 			}
		// 		});
		// 	});
		// }

		// if (displayedRecipes.length === 0) {
		// for (let i = 0; i < recipes.length; i++) {
		// 	let result;
		// 	recipes[i].ingredients.forEach((n) => {
		// 		result = n.ingredient.search(new RegExp(tag.innerText, 'i'));
		// 		recipeIngrList += `<li><span class="bold">${n.ingredient} :</span> ${
		// 			n.quantity || ''
		// 		}${n.unit || ''}</li> `;
		// 		if (result >= 0) {
		// createRecipeCards(
		// 	recipes[i].name,
		// 	recipes[i].time,
		// 	recipeIngrList,
		// 	recipes[i].description
		// );

		// 			fillIngrtags(displayedRecipes);
		// 			displayedRecipes.push(recipes[i]);
		// 		}
		// 	});
		// }
		// }
		// else {
		// 	for (let i = 0; i < displayedRecipes.length; i++) {
		// 		let result;
		// 		displayedRecipes[i].ingredients.forEach((n) => {
		// 			result = n.ingredient.search(new RegExp(tag.innerText, 'i'));
		// 			recipeIngrList += `<li><span class="bold">${n.ingredient} :</span> ${
		// 				n.quantity || ''
		// 			}${n.unit || ''}</li> `;
		// 			if (result >= 0) {
		// 				console.log(displayedRecipes[i]);
		// 				createRecipeCards(
		// 					displayedRecipes[i].name,
		// 					displayedRecipes[i].time,
		// 					recipeIngrList,
		// 					displayedRecipes[i].description
		// 				);

		// 				fillIngrtags(displayedRecipes);
		// 				displayedRecipes.push(recipes[i]);
		// 			}
		// 		});
		// 	}
		// }
	}

	searchIngr(list, value) {
		this.ingrTags = '';
		for (let i = 0; i < list.length; i++) {
			let result;
			list[i].ingredients.forEach((n) => {
				result = n.ingredient.search(new RegExp(value, 'i'));
				if (result >= 0 && !this.ingrTags.includes(n.ingredient)) {
					this.ingrTags += `<li onclick="clickTag(this)">${n.ingredient}</li>`;
				}
			});
		}
		this.ingrListContainer.innerHTML = `${this.ingrTags}`;
	}

	callSearchIngr(e) {
		console.log(this);
		if (this.displayedRecipes.length === 0) {
			this.searchIngr(this.recipes, e.target.value);
		} else {
			this.searchIngr(this.displayedRecipes, e.target.value);
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
				this.createRecipeCards(
					this.recipes[i].name,
					this.recipes[i].time,
					recipeIngrList,
					this.recipes[i].description
				);

				this.displayedRecipes.push(list[i]);
				this.fillIngrtags(this.displayedRecipes);
			}
		}
	}

	callMainSearch(e) {
		console.log(this);
		if (e.target.value.length >= 3) {
			this.mainSearch(this.recipes, e.target.value);
		}
	}
}
