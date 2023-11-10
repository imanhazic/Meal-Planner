function fetchDataByCategory(category) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => {
        const tableBody = document.querySelector('#selected-category-table-body');
        tableBody.innerHTML = '';
  
        if (data.meals && data.meals.length > 0) {
          data.meals.forEach((meal) => {
            const newRow = tableBody.insertRow();
            const newCategoryCell = newRow.insertCell(0);
            const newNameCell = newRow.insertCell(1);
            const newImageCell = newRow.insertCell(2);
            const newIngredientsCell = newRow.insertCell(3);
            const newInstructionsCell = newRow.insertCell(4);
            const newSourceCell = newRow.insertCell(5);
            const newYoutubeCell = newRow.insertCell(6);
  
            newCategoryCell.textContent = category;
            newNameCell.textContent = meal.strMeal;
  
            // Add inline style to the image for smaller size
            newImageCell.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal} Image" style="max-width: 100px; max-height: 100px;">`;
  
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
              .then((response) => response.json())
              .then((detailData) => {
                const firstMeal = detailData.meals[0];
                if (firstMeal) {
                  newIngredientsCell.innerHTML = formatIngredients(firstMeal);
                  newInstructionsCell.innerHTML = formatInstructions(firstMeal.strInstructions);
                  newSourceCell.innerHTML = `<a href="${firstMeal.strSource}" target="_blank">${firstMeal.strSource}</a>`;
                  newYoutubeCell.innerHTML = `<a href="${firstMeal.strYoutube}" target="_blank">Watch on YouTube</a>`;
                }
              })
              .catch((error) => {
                console.error("Error fetching additional details:", error);
              });
  
            // Helper function to format ingredients as a list
            function formatIngredients(meal) {
              let ingredientsList = '';
              for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (ingredient && measure) {
                  ingredientsList += `<li>${measure} ${ingredient}</li>`;
                }
              }
              return `<ul>${ingredientsList}</ul>`;
            }
  
            // Helper function to format instructions as an ordered list
            function formatInstructions(instructions) {
              const instructionsArray = instructions.split('\r\n').filter(Boolean);
              let orderedList = '<ol>';
              instructionsArray.forEach((instruction) => {
                orderedList += `<li>${instruction}</li>`;
              });
              orderedList += '</ol>';
              return orderedList;
            }
  
          });
        } else {
          // Clear the table when there are no results
          tableBody.innerHTML = '';
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the data:", error);
        const tableBody = document.querySelector('#selected-category-table-body');
        tableBody.innerHTML = '';
      });
  }
  
  document.getElementById("food-category-btn").addEventListener("click", function () {
    var dropdownContent = document.getElementById("food-category-dropdown");
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
  
  document.getElementById("dropdownButton").addEventListener("click", function () {
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
  