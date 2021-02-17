/* eslint-disable no-case-declarations */
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
		this.mainSearchBar = document.querySelector('#main-searchbar');
		this.cardsContainer = document.querySelector('#cards-container');
		this.displayedRecipes = [];
		this.ingrTags = '';
		this.appliancesTags = '';
		this.utensilTags = '';
		this.ingrFilter = [];
		this.applFilter = [];
		this.utlFilter = [];
		this.selectedTagsContainer = document.querySelector(
			'#selected-tags-container'
		);
	}

	init() {
		this.fillTagsLists(this.recipes);
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
				this.resetDisplay();
				if (this.mainSearchBar.value.length < 4) {
					this.fillTagsLists(this.recipes);
				}
			}
		});

		const itemLists = document.querySelectorAll('.list');
		const itemListsTop = document.querySelectorAll('.list-top-part');
		const itemListsArrows = document.querySelectorAll('.arrow');
		for (let i = 0; i < itemListsArrows.length; i++) {
			itemListsArrows[i].addEventListener('click', () => {
				itemLists[i].classList.toggle('open');
				if (itemLists[i].classList.contains('open')) {
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

	fillSelectedTagsContainer() {
		let selectedIngrTags = '';
		let selectedApplTags = '';
		let selectedUtlTags = '';

		this.ingrFilter.forEach((n) => {
			selectedIngrTags += `<li class="selected-item selected-ingr">${n}<i class="far fa-times-circle" onclick="app.removeSelectedTag(this)"></i></li>`;
		});
		this.applFilter.forEach((n) => {
			selectedApplTags += `<li class="selected-item selected-appl">${n}<i class="far fa-times-circle" onclick="app.removeSelectedTag(this)"></i></li>`;
		});
		this.utlFilter.forEach((n) => {
			selectedUtlTags += `<li class="selected-item selected-utl">${n}<i class="far fa-times-circle" onclick="app.removeSelectedTag(this)"></i></li>`;
		});
		this.selectedTagsContainer.innerHTML = `${selectedIngrTags} ${selectedApplTags} ${selectedUtlTags}`;
	}

	removeSelectedTag(tag) {
		let newList = [];
		switch (tag.parentNode.classList[1]) {
			case 'selected-ingr':
				const index = this.ingrFilter.indexOf(tag.parentNode.innerText);
				if (index > -1) {
					this.ingrFilter.splice(index, 1);
				}
				break;

			case 'selected-appl':
				const index2 = this.applFilter.indexOf(tag.parentNode.innerText);
				if (index2 > -1) {
					this.applFilter.splice(index2, 1);
				}
				break;

			case 'selected-utl':
				const index3 = this.utlFilter.indexOf(tag.parentNode.innerText);
				if (index3 > -1) {
					this.utlFilter.splice(index3, 1);
				}
				break;
			default:
				console.log('Erreur switch removeSelectedTag');
		}

		// Créé une nouvelle liste filtrée par les tags restants
		newList = this.filterByTags(this.recipes, this.ingrFilter, 'ingredient');
		newList = this.filterByTags(newList, this.applFilter, 'appliance');
		newList = this.filterByTags(newList, this.utlFilter, 'utensil');
		this.displayedRecipes = newList;

		// Lance une recherche et un nouveau tri si il y a du texte dans la barre de recherche principale
		if (this.mainSearchBar.value.length !== 0) {
			this.mainSearch(this.recipes, this.mainSearchBar.value);
			newList = this.filterByTags(
				this.displayedRecipes,
				this.ingrFilter,
				'ingredient'
			);
			newList = this.filterByTags(newList, this.applFilter, 'appliance');
			newList = this.filterByTags(newList, this.utlFilter, 'utensil');
		}

		this.cardsContainer.innerHTML = '';
		this.displayedRecipes = newList;
		this.fillSelectedTagsContainer();
		this.createRecipeCards(this.displayedRecipes);
		this.fillTagsLists(this.displayedRecipes);
	}

	createRecipeCards(list) {
		if (list.length === 0) {
			this.cardsContainer.innerHTML = `<p>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`;
		}

		for (let i = 0; i < list.length; i++) {
			const newCard = document.createElement('div');
			let cardIngredients = '';
			let newDescription = '';

			if (list[i].description.length > 181) {
				newDescription = `${list[i].description.substring(0, 181)} ...`;
			} else {
				newDescription = list[i].description;
			}

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
				<div id="card-text">
					<div class="top">
						<h3>${list[i].name}</h3>
						<p class="time bold"><i class="far fa-clock"></i> ${list[i].time} min</p>
					</div>
					<div class="bottom">
						<ul class="ingredients">${cardIngredients}</ul>
						<p class="description">${newDescription}</p>
					</div>
				</div>
			`;
			this.cardsContainer.appendChild(newCard);
		}
	}

	hasItem(recipe, item, type) {
		switch (type) {
			case 'ingredient':
				for (const currentIngredient of recipe.ingredients) {
					if (currentIngredient.ingredient.includes(item)) {
						return true;
					}
				}
				break;
			case 'appliance':
				if (recipe.appliance.includes(item)) {
					return true;
				}
				break;
			case 'utensil':
				for (const currentUtensil of recipe.ustensils) {
					if (currentUtensil.includes(item)) {
						return true;
					}
				}
				break;
			default:
				console.log('Erreur switch hasItem');
		}
		return false;
	}

	filterByItem(listRecipes, item, type) {
		const newRecipesList = [];
		for (const currentRecipe of listRecipes) {
			if (this.hasItem(currentRecipe, item, type)) {
				newRecipesList.push(currentRecipe);
			}
		}
		return newRecipesList;
	}

	filterByTags(listRecipes, listTags, type) {
		for (const currentTag of listTags) {
			// eslint-disable-next-line no-param-reassign
			listRecipes = this.filterByItem(listRecipes, currentTag, type);
			if (listRecipes.length === 0) {
				break;
			}
		}
		return listRecipes;
	}

	clickTag(tag) {
		let newList = [];
		switch (tag.className) {
			case 'ingredient':
				if (!this.ingrFilter.includes(tag.innerText)) {
					this.ingrFilter.push(tag.innerText);
				}
				if (this.displayedRecipes.length === 0) {
					newList = this.filterByTags(
						this.recipes,
						this.ingrFilter,
						tag.className
					);
				} else {
					newList = this.filterByTags(
						this.displayedRecipes,
						this.ingrFilter,
						tag.className
					);
				}
				break;
			case 'appliance':
				if (!this.applFilter.includes(tag.innerText)) {
					this.applFilter.push(tag.innerText);
				}
				if (this.displayedRecipes.length === 0) {
					newList = this.filterByTags(
						this.recipes,
						this.applFilter,
						tag.className
					);
				} else {
					newList = this.filterByTags(
						this.displayedRecipes,
						this.applFilter,
						tag.className
					);
				}
				break;
			case 'utensil':
				if (!this.utlFilter.includes(tag.innerText)) {
					this.utlFilter.push(tag.innerText);
				}
				if (this.displayedRecipes.length === 0) {
					newList = this.filterByTags(
						this.recipes,
						this.utlFilter,
						tag.className
					);
				} else {
					newList = this.filterByTags(
						this.displayedRecipes,
						this.utlFilter,
						tag.className
					);
				}
				break;
			default:
				console.log('Erreur switch clickTag');
		}
		this.fillSelectedTagsContainer();
		this.resetDisplay();
		this.displayedRecipes = newList;
		this.createRecipeCards(this.displayedRecipes);
		this.fillTagsLists(this.displayedRecipes);
	}

	secondarySearch(list, value, type) {
		switch (type) {
			case 'ingredients-search':
				this.ingrTags = '';
				for (let i = 0; i < list.length; i++) {
					let result;
					list[i].ingredients.forEach((n) => {
						result = n.ingredient.search(new RegExp(value, 'i'));
						if (result === 0 && !this.ingrTags.includes(n.ingredient)) {
							this.ingrTags += `<li class="ingredient" onclick="app.clickTag(this)">${n.ingredient}</li>`;
						}
					});
				}
				this.ingrListContainer.innerHTML = `${this.ingrTags}`;
				break;
			case 'appliances-search':
				this.appliancesTags = '';
				for (let i = 0; i < list.length; i++) {
					const result = list[i].appliance.search(new RegExp(value, 'i'));
					if (
						result === 0 &&
						!this.appliancesTags.includes(list[i].appliance)
					) {
						this.appliancesTags += `<li class="appliance" onclick="app.clickTag(this)">${list[i].appliance}</li>`;
					}
				}
				this.appliancesListContainer.innerHTML = `${this.appliancesTags}`;
				break;
			case 'utensils-search':
				this.utensilTags = '';
				for (let i = 0; i < list.length; i++) {
					let result;
					list[i].ustensils.forEach((n) => {
						result = n.search(new RegExp(value, 'i'));
						if (result === 0 && !this.utensilTags.includes(n)) {
							this.utensilTags += `<li class="ingredient" onclick="app.clickTag(this)">${n}</li>`;
						}
					});
				}
				this.utensilsListContainer.innerHTML = `${this.utensilTags}`;
				break;
			default:
				console.log('Erreur switch secondarySearch');
		}
	}

	callSecondarySearch(e) {
		if (
			this.cardsContainer.innerHTML !==
			`<p>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`
		) {
			if (this.displayedRecipes.length === 0) {
				this.secondarySearch(this.recipes, e.target.value, e.target.id);
			} else {
				this.secondarySearch(
					this.displayedRecipes,
					e.target.value,
					e.target.id
				);
			}
		}
	}

	resetDisplay() {
		this.displayedRecipes = [];
		this.cardsContainer.innerHTML = '';
	}

	mainSearch(list, value) {
		this.resetDisplay();
		let newList = [];
		newList = list.filter((recipe) => {
			return (
				recipe.name.search(new RegExp(value, 'i')) === 0 ||
				recipe.description.search(new RegExp(value, 'i')) === 0 ||
				recipe.ingredients.some((n) => {
					return n.ingredient.search(new RegExp(value, 'i')) === 0;
				})
			);
		});
		this.displayedRecipes = newList;
	}

	callMainSearch(e) {
		if (e.target.value.length >= 3) {
			this.mainSearch(this.recipes, e.target.value);
			this.createRecipeCards(this.displayedRecipes);
			this.fillTagsLists(this.displayedRecipes);
		}
	}
}
