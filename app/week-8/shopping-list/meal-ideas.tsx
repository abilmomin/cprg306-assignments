"use client";

import { useState, useEffect } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealIdeasProps {
  ingredient: string;
}

async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  if (!ingredient) {
    return [];
  }

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
}

export default function MealIdeas({ ingredient }: MealIdeasProps) {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMealIdeas = async () => {
    const mealList = await fetchMealIdeas(ingredient);
    setMeals(mealList);
  };

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Meal Ideas for {ingredient || "Selected Ingredient"}
      </h2>

      {meals.length > 0 ? (
        <ul className="space-y-3 max-h-96 overflow-y-auto">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-16 h-16 rounded object-cover"
              />
              <span className="text-lg font-medium text-gray-800">
                {meal.strMeal}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 py-8">
          {ingredient
            ? "No meals found for this ingredient."
            : "Select an item from the shopping list to see meal ideas."}
        </p>
      )}
    </div>
  );
}
