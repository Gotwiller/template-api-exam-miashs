import { searchCitiesInfo } from "./api.js";

export const getCitiesInfos = async (request, reply) => {
  try {
    const { cityId } = request.params; 
    const infos = await searchCitiesInfo(cityId);
    console.log(infos);
    reply.send(infos);
    } 
    catch (error) {
    reply.status(500).send({ error: error.message });
    }
};
