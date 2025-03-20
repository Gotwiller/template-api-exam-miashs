const getHeaders = () => {
    return {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //Authorization: `Bearer ${process.env.API_KEY}`,
      },
    };
};

export const searchCitiesInfo = async (query) => {
    const headers = getHeaders();
    const response = await fetch(
      `https://api-ugi2pflmha-ew.a.run.app/cities/${query}/insights?apiKey=${process.env.API_KEY}`,
      {
        ...headers,
      }
    );
  
    if (!response.ok) {
      throw new Error(`Failed to fetch city: ${response.status}`);
    }
  
    const data = await response.json();
  
    if (!data || !data.coordinates || !data.population || !data.knownFor) {
      throw new Error('City data not found or incomplete');
    }
  
    return {
      coordinates: [data.coordinates.latitude, data.coordinates.longitude],
      population: data.population,
      knownFor: data.knownFor,
    };
  };
  