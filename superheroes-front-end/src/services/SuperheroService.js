import axios from 'axios';

const REST_API_SUPERHERO_URL = 'http://127.0.0.1:8080/superheroes';

export const listSuperheroes = () => axios.get(REST_API_SUPERHERO_URL);

export const createSuperhero = (superhero) => axios.post(REST_API_SUPERHERO_URL, superhero);

export const getSuperhero = (id) => axios.get(REST_API_SUPERHERO_URL + '/' + id);

export const updateSuperhero = (id, superhero) => axios.put(REST_API_SUPERHERO_URL + '/' + id, superhero);

export const deleteSuperhero = (id) => axios.delete(REST_API_SUPERHERO_URL + '/' + id);