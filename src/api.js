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
  
    const response2 = await fetch(
      `https://api-ugi2pflmha-ew.a.run.app/weather-predictions?cityId=${query}&apiKey=${process.env.API_KEY}`,
      {
        ...headers,
      }
    );
  
    if (!response.ok) {
      throw new Error(`Failed to fetch city data: ${response.status}`);
    }
  
    if (!response2.ok) {
      throw new Error(`Failed to fetch weather predictions: ${response2.status}`);
    }
  
    const data = await response.json();
    const data2 = await response2.json();
  
    if (!data || !data.coordinates || !data.population || !data.knownFor) {
      throw new Error('City data not found or incomplete');
    }
  
    if (!data2 || !data2[0] || !data2[0].predictions) {
      throw new Error('Weather predictions not found or incomplete');
    }
  
    const recipes = data.recipes || [];
  
    const weatherPredictions = data2[0].predictions.map((prediction) => ({
      when: prediction.when,
      min: prediction.min,
      max: prediction.max,
    }));
  
    return {
      coordinates: [data.coordinates.latitude, data.coordinates.longitude],
      population: data.population,
      knownFor: data.knownFor,
      weatherPredictions: weatherPredictions,
      recipes: recipes,
    };
  };
  