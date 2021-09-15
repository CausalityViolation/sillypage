'use strict';

const recipeName = document.querySelector("#RecipeName");
const ingredients = document.querySelector("#Ingredients");
const method = document.querySelector("#Method");
const servings = document.querySelector("#servings");
const time = document.querySelector("#time");
const difficulty = document.querySelector("#difficulty");
const outputForm = document.querySelector("#output");
const topRec = document.getElementById("topRecipes");
const displayRec = document.getElementById("addedRecipes");
const form = document.getElementById("formReg");

let recipes = [];


document.getElementById("addRecipe").onclick = function addRecipe() {

    let recipe = {
        Name: recipeName.value,
        Ingredients: ingredients.value,
        Method: method.value,
        Servings: servings.options[servings.selectedIndex].text,
        Difficulty: difficulty.options[difficulty.selectedIndex].text,
        Time: time.options[difficulty.selectedIndex].text
    };

    if (recipe.Name !== "" && recipe.Ingredients !== "" && recipe.Method !== "") {

        recipes.push(recipe);

        localStorage.setItem("recipes", JSON.stringify(recipes));
        let storedRecipes = JSON.parse(localStorage.getItem("recipes"));

        //Kontrollerar i konsollen
        console.log(storedRecipes);

        outputForm.setAttribute('style', 'white-space: pre;');
        outputForm.textContent = "Recipe " + recipe.Name + " Successfully Added";
        displayAddedRecipes(storedRecipes);


        document.getElementById("formReg").reset();

    } else if (recipe.Name === "" || recipe.Ingredients === "" || recipe.Method === "") {
        alert("Fill out all the fields before submitting!")
    }

    return false;
}

document.getElementById("Show Recipes").onclick = function fetchJSON() {

    fetch("data/data.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            let fixedString = removeSymbols(data);

            changeFavoriteRecipeButton(fixedString);

        });

    return false;
}

function changeFavoriteRecipeButton(stringObject) {

    let elem = document.getElementById("Show Recipes");

    if (elem.value === "Hide") {
        elem.value = "Show";

        document.getElementById("topRecipes").style.display = "none";

    } else {
        elem.value = "Hide"

        let header = "Most Popular Recipes\r\n";

        topRec.setAttribute('style', 'white-space: pre;');
        topRec.textContent = header + stringObject;

        createBox("topRecipes");

    }
}

document.getElementById("Show Added Recipes").onclick = function changeAddedRecipesButton() {

    let elem = document.getElementById("Show Added Recipes");

    if (elem.value === "Hide") {
        elem.value = "Show";

        document.getElementById("addedRecipes").style.display = "none";

    } else {
        elem.value = "Hide"

        displayRec.setAttribute('style', 'white-space: pre;');

        let storedRecipes = JSON.parse(localStorage.getItem("recipes"));

        displayRec.textContent = displayAddedRecipes(storedRecipes);


        createBox("addedRecipes");

    }

}

function displayAddedRecipes(storedRecipes) {

    displayRec.setAttribute('style', 'white-space: pre;')
    let stringObject = JSON.stringify(storedRecipes);
    let returnString = displayRec.textContent = "Recently added:\r\n" + stringObject.replaceAll(/['"]/g, ' ').replaceAll(/""/g, " ")
        .replaceAll(/,/g, "\r\n").replaceAll(/[{}]/g, "\r\n").replaceAll(/]/g, "")
        .replaceAll(/[\[\]']+/g, '');

    createBox("addedRecipes")

    return returnString;

}

function removeSymbols(string) {

    return JSON.stringify(string).replaceAll(/['"]/g, '').replaceAll(/""/g, " ").replaceAll(/Recipe Name/g, "")
        .replaceAll(/,/g, "\r\n").replaceAll(/:/g, "").replaceAll(/[{}]/g, "\r\n").replaceAll(/]/g, "")
        .replaceAll(/[\[\]']+/g, '');
}

function createBox(id) {

    document.getElementById(id).style.fontSize = "130%";
    document.getElementById(id).style.background = "white";
    document.getElementById(id).style.borderRadius = "3px";
    document.getElementById(id).style.margin = "inherit";
    document.getElementById(id).style.border = "thin solid black";
    document.getElementById(id).style.height = "auto";
    document.getElementById(id).style.textAlign = "center";
    document.getElementById(id).style.padding = "1.5rem";
    document.getElementById(id).style.boxShadow = "0 4px 5px black";

}
