import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function RandomCocktail() {
  const [cocktail, setCocktail] = useState();

  const randomCocktailURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  async function getRandomCocktail() {
    const response = await fetch(randomCocktailURL);
    const data = await response.json();
    setCocktail(data.drinks[0]);
  }

  //helper function that pulls ingredients from the returned data into an array and then uses that array to display to user.
  const renderIngredients = () => {
    if (!cocktail) return null;

    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredientKey = `strIngredient${i}`;
      const ingredient = cocktail[ingredientKey];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    return (
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="information">
      <Button className="random-cocktail-button" variant="light" onClick={getRandomCocktail}>
        New Random Cocktail
      </Button>

      <div>
        {cocktail && (
          <Card border="dark" style={{width: '17rem'}}>
          <Card.Img variant='top' src={cocktail.strDrinkThumb} />
            <Card.Body>
              <Card.Title>{cocktail.strDrink}</Card.Title>
              <Card.Text>{cocktail.strInstructions}</Card.Text>
            </Card.Body>
            <Card.Body>
              Ingredients:
              {renderIngredients()} 
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
}
