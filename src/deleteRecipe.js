import { searchCitiesInfo } from "./api.js";

let cityRecipes = {};  

export const deleteRecipe = async (request, reply) => {
  const { cityId, recipeId } = request.params;

  try {
    const cityInfo = await searchCitiesInfo(cityId);

    if (!cityInfo) {
      return reply.status(404).send({ error: `City with ID ${cityId} not found.` });
    }

    if (!cityRecipes[cityId] || cityRecipes[cityId].length === 0) {
      return reply.status(404).send({ error: `No recipes found for city ${cityId}.` });
    }

    const recipeIndex = cityRecipes[cityId].findIndex((recipe) => recipe.id === parseInt(recipeId));

    if (recipeIndex === -1) {
      return reply.status(404).send({ error: `Recipe with ID ${recipeId} not found in city ${cityId}.` });
    }

    cityRecipes[cityId].splice(recipeIndex, 1);

    return reply.status(204).send();  // No Content

  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
