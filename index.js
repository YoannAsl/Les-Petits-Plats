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
		this.tagsFilter = [];
	}

	init() {
		this.fillTagsLists(this.recipes);
		this.ingrSearchBar.addEventListener(
			'input',
			this.callSearchIngr.bind(this)
		);
		this.mainSearchBar.addEventListener(
			'input',
			this.callMainSearch.bind(this)
		);
		this.mainSearchBar.addEventListener('keydown', (e) => {
			if (e.key === 'Backspace') {
				this.resetMain();
			}
		});

		const itemLists = document.querySelectorAll('.list');
		const itemListsTop = document.querySelectorAll('.list-top-part');
		const itemListsArrows = document.querySelectorAll('.arrow');
		for (let i = 0; i < itemListsArrows.length; i++) {
			itemListsArrows[i].addEventListener('click', () => {
				itemLists[i].classList.toggle('open');
				// console.log(itemLists[i].classList);
				if (itemLists[i].classList.contains('open')) {
					// console.log(itemLists[i].childNodes);
					// console.log(itemListsTop[i].childNodes);
					itemListsTop[i].childNodes[1].style.display = 'block';
					itemListsTop[i].childNodes[3].style.display = 'none';
					itemLists[i].childNodes[3].style.display = 'flex';
					itemListsArrows[i].style.transform = 'rotate(180deg)';
				} else {
					itemListsTop[i].childNodes[1].style.display = 'none';
					itemListsTop[i].childNodes[3].style.display = 'block';
					itemLists[i].childNodes[3].style.display = 'none';
					itemListsArrows[i].style.transform = 'rotate(0deg)';
				}
			});
		}
	}

	fillTagsLists(list) {
		this.ingrTags = '';
		this.appliancesTags = '';
		this.utensilTags = '';
		for (let i = 0; i < list.length; i++) {
			list[i].ingredients.forEach((n) => {
				if (!this.ingrTags.includes(n.ingredient)) {
					this.ingrTags += `<p class="ingredient" onclick="app.clickTag(this)">${n.ingredient}</p>`;
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
		switch (tag.className) {
			case 'ingredient':
				this.tagsFilter.push(tag.innerText);
				if (this.displayedRecipes.length === 0) {
					for (let i = 0; i < this.recipes.length; i++) {
						let result;
						let recipeIngrList = '';
						this.recipes[i].ingredients.forEach((n) => {
							result = n.ingredient.search(new RegExp(tag.innerText, 'i'));
							if (result >= 0) {
								recipeIngrList += `<li><span class="bold">${
									n.ingredient
								} :</span> ${n.quantity || ''}${n.unit || ''}</li> `;
								this.createRecipeCards(
									this.recipes[i].name,
									this.recipes[i].time,
									recipeIngrList,
									this.recipes[i].description
								);
								this.displayedRecipes.push(this.recipes[i]);
								this.fillTagsLists(this.displayedRecipes);
							}
						});
					}
				}
				break;
			case 'appliance':
				this.tagsFilter.push(tag.innerText);
				// if (this.displayedRecipes.length === 0) {
				// 	for (let i = 0; i < this.recipes.length; i++) {
				// 		let result;
				// 		this.recipes[i].ingredients.forEach((n) => {
				// 			recipeIngrList += `<li><span class="bold">${
				// 				n.ingredient
				// 			} :</span> ${n.quantity || ''}${n.unit || ''}</li> `;
				// 			result = n.ingredient.search(new RegExp(tag.innerText, 'i'));
				// 			if (result >= 0) {
				// 				this.createRecipeCards(
				// 					this.recipes[i].name,
				// 					this.recipes[i].time,
				// 					recipeIngrList,
				// 					this.recipes[i].description
				// 				);
				// 				this.displayedRecipes.push(this.recipes[i]);
				// 				this.fillTagsLists(this.displayedRecipes);
				// 			}
				// 		});
				// 	}
				// }
				break;
			case 'utensil':
				break;
			default:
				console.log('Erreur');
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
		// 				fillTagsLists(displayedRecipes);
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

		// 			fillTagsLists(displayedRecipes);
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

		// 				fillTagsLists(displayedRecipes);
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
				this.fillTagsLists(this.displayedRecipes);
			}
		}
	}

	callMainSearch(e) {
		if (e.target.value.length >= 3) {
			this.mainSearch(this.recipes, e.target.value);
		}
	}
}
