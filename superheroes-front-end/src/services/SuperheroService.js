import axios from 'axios';

const REST_API_SUPERHERO_URL = 'http://127.0.0.1:8080/superheroes';

export const createSuperhero = (superhero) => axios.post(REST_API_SUPERHERO_URL, superhero)