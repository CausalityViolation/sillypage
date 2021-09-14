'use strict';

const recipeName = document.querySelector("#RecipeName");
const ingredients = document.querySelector("#Ingredients");
const method = document.querySelector("#Method");
const servings = document.querySelector("#servings");
const time = document.querySelector("#time");
const difficulty = document.querySelector("#difficulty");
const outputForm = document.querySelector("#output");
const form = document.querySelector("#formReg");
const topRec = document.getElementById("topRecipes");

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


document.getElementById("Show Recipes").onclick = function fetchJSON() {

    fetch("data/data.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            let stringObject = JSON.stringify(data).replaceAll(/['"]/g, '').replaceAll(/""/g, " ").replaceAll(/Recipe Name/g, "")
                .replaceAll(/,/g, "\r\n").replaceAll(/:/g, "").replaceAll(/[{}]/g, "\r\n").replaceAll(/]/g, "")
                .replaceAll(/[\[\]']+/g, '');

            change(stringObject);

        });

    return false;
}

function change(stringObject) {

    let elem = document.getElementById("Show Recipes");

    if (elem.value === "Hide") {
        elem.value = "Show";

        document.getElementById("topRecipes").style.display = "none";

    } else {
        elem.value = "Hide"

        let header = "Most Popular Recipes\r\n\r\n";

        topRec.setAttribute('style', 'white-space: pre;');
        topRec.textContent = header + stringObject;


        document.getElementById("topRecipes").style.fontSize = "130%";
        document.getElementById("topRecipes").style.background = "white";
        document.getElementById("topRecipes").style.borderRadius = "3px";
        document.getElementById("topRecipes").style.margin = "inherit";
        document.getElementById("topRecipes").style.border = "thin solid black";
        document.getElementById("topRecipes").style.height = "auto";
        document.getElementById("topRecipes").style.textAlign = "center";
        document.getElementById("topRecipes").style.padding = "1.5rem";
        document.getElementById("topRecipes").style.boxShadow = "0 4px 5px black";

    }
}

/*
function saveDataToJSON(recipe) {
    let jsonData = JSON.stringify(recipe);
    fs.writeFile("/data/data.json")
}
 */
