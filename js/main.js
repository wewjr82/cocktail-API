let btn = document.querySelector("button");
let cocktailIngredients = document.createElement("ul"); 

btn.addEventListener("click", (getDrink) => {
  let drinkChoice = document.querySelector("input").value;
  const ingredientsDiv = document.querySelector(".ingredients-div");
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkChoice}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.drinks[0]);
      document.querySelector("h2").innerText = data.drinks[0].strDrink;
      document.querySelector("img").src = data.drinks[0].strDrinkThumb;
      document.querySelector("h3").innerText = data.drinks[0].strInstructions;
      ingredientsDiv.appendChild(cocktailIngredients);

      const getIngredients = Object.keys(data.drinks[0])
        .filter(function (ingredient) {
          return ingredient.indexOf("strIngredient") == 0;
        })
        .reduce(function (ingredients, ingredient) {
          if (data.drinks[0][ingredient] != null) {
            ingredients[ingredient] = data.drinks[0][ingredient];
          }
          return ingredients;
        }, {});

      // Clear the list of ingredients.
      cocktailIngredients.innerHTML = "";

      // Get the ingredients for the next drink.
      const nextIngredients = getIngredients;

      // Add the ingredients to the list.
      for (let key in nextIngredients) {
        let value = nextIngredients[key];
        let listItem = document.createElement("li");
        listItem.innerHTML = value;
        cocktailIngredients.appendChild(listItem);
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
});

