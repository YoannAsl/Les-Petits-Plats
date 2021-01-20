if (this.ingrFilter.length === 0 && this.mainSearchBar.value.length < 3) {
	newList = this.filterByTags(this.recipes, this.applFilter, 'appliance');
	newList = this.filterByTags(newList, this.utlFilter, 'utensil');
} else if (
	this.ingrFilter.length === 0 &&
	this.mainSearchBar.value.length >= 3
) {
	this.mainSearch(this.recipes, this.mainSearchBar.value);
	newList = this.filterByTags(
		this.displayedRecipes,
		this.applFilter,
		'appliance'
	);
	newList = this.filterByTags(newList, this.utlFilter, 'utensil');
} else if (this.ingrFilter.length > 0 && this.mainSearchBar.value.length >= 3) {
	this.mainSearch(this.recipes, this.mainSearchBar.value);
	newList = this.filterByTags(
		this.displayedRecipes,
		this.ingrFilter,
		'ingredient'
	);
	newList = this.filterByTags(newList, this.applFilter, 'appliance');
	newList = this.filterByTags(newList, this.utlFilter, 'utensil');
} else if (this.ingrFilter.length > 0 && this.mainSearchBar.value.length < 3) {
	newList = this.filterByTags(this.recipes, this.ingrFilter, 'ingredient');
	newList = this.filterByTags(newList, this.applFilter, 'appliance');
	newList = this.filterByTags(newList, this.utlFilter, 'utensil');
}
