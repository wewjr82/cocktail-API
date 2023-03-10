let btn = document.querySelector("button");

btn.addEventListener("click", (getDrink) => {
  let drinkChoice = document.querySelector("input").value;
  const ingredientsDiv = document.querySelector(".ingredients-div");
  const cocktailIngredients = document.createElement("ul")
  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkChoice;

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

      for (let key in getIngredients) {
        let value = getIngredients[key];
        listItem = document.createElement("li");
        listItem.innerHTML = value;
        cocktailIngredients.appendChild(listItem);
        
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
});
