import { searchCitiesInfo } from "./api.js";

let cityRecipes = {};

export const postAddRecipe = async (request, reply) => {
  const { cityId } = request.params;
  const { content } = request.body;

  if (!cityInfo) {
    return reply.status(404).send({ error: `City with ID ${cityId} not found.` });
  }

  if (!content || content.length < 10 || content.length > 2000) {
    return reply.status(400).send({
      error: "The recipe content must be between 10 and 2000 characters.",
    });
  }

  try {
    const cityInfo = await searchCitiesInfo(cityId);

    if (!cityInfo) {
      return reply.status(404).send({ error: `City with ID ${cityId} not found.` });
    }

    if (!cityRecipes[cityId]) {
      cityRecipes[cityId] = [];
    }

    const newRecipe = {
      id: cityRecipes[cityId].length + 1,
      content,
    };

    cityRecipes[cityId].push(newRecipe);

    return reply.status(201).send(newRecipe);

  } catch (error) {
    return reply.status(500).send({ error: error.message });
  }
};
