import axios from "axios";

const REST_API_POWER_URL = 'http://127.0.0.1:8080/powers'

export const listPowers = () => axios.get(REST_API_POWER_URL);

export const addPower = (power) => axios.post(REST_API_POWER_URL, power);

export const getPower = (id) => axios.get(REST_API_POWER_URL + '/' + id);

export const updatePower = (id) => axios.put(REST_API_POWER_URL + '/' + id);

export const deletePower = (id) => axios.delete(REST_API_POWER_URL + '/' + id);