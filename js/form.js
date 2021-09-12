'use strict';

const form = document.querySelector("#formReg");
const recipeName = document.querySelector("#RecipeName");
const ingredients = document.querySelector("#Ingredients");
const method = document.querySelector("#Method");
const servings = document.querySelector("#servings");
const time = document.querySelector("#time");
const difficulty = document.querySelector("#difficulty");
const outputForm = document.querySelector("#output");


let recipes = [];

function addRecipe(event) {

    event.preventDefault();


    let recipe = {
        Name: recipeName.value,
        Ingredients: ingredients.value,
        Method: method.value,
        Servings: servings.options[servings.selectedIndex].text,
        Difficulty: difficulty.options[difficulty.selectedIndex].text,
        Time: time.options[difficulty.selectedIndex].text
    };

    recipes.push(recipe);

    localStorage.setItem("recipes", JSON.stringify(recipes));
    let storedRecipes = JSON.parse(localStorage.getItem("recipes"));

    //Kontrollerar i konsollen
    console.log(storedRecipes)

    outputForm.setAttribute('style', 'white-space: pre;');
    outputForm.textContent = "Recipe " + recipe.Name + " Successfully Added";


}

form.addEventListener("submit", addRecipe, false);

function fetchJSON() {

    let jsonData;

    fetch("data/data.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            jsonData = data;
        });

    return jsonData;
}

/*
function saveDataToJSON(recipe) {

    let jsonData = JSON.stringify(recipe);
    fs.writeFile("/data/data.json")

}

 */


