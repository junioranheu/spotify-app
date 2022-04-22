import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../outros/urlApi';

const ENDPOINTS = {
    GET_POR_CAMINHO_ID: 'api/Imagens/getBase64PorCaminhoId'
};

const DEV = {
    API_URL_GET_POR_CAMINHO_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_POR_CAMINHO_ID}`
};

const PROD = {
    API_URL_GET_POR_CAMINHO_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_POR_CAMINHO_ID}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;