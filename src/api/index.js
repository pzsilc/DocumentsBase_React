import axios from 'axios';
import packageJson from '../../package.json';
import { assign } from '../functions';
const API = packageJson.backendUrl + 'api/';


const getUser = token => new Promise((resolve, reject) => {
    axios.get(API + 'auth/user/', { 
        headers: { 
            'Authorization': token 
        } 
    })
    .then(resolve)
    .catch(reject)
})

const login = (email, token) => new Promise((resolve, reject) => {
    axios.post(API + 'auth/login/', assign({ email, token }), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resolve)
    .catch(reject)
})

const logout = token => new Promise((resolve, reject) => {
    axios.post(API + 'auth/logout/', {}, { 
        headers: { 
            'Authorization': token
        } 
    })
    .then(resolve)
    .catch(reject)
})

const getCategories = () => new Promise((resolve, reject) => {
    axios.get(API + 'categories/')
    .then(resolve)
    .catch(reject)
})

const getDocuments = (token, category, filters = null, page = 1) => new Promise((resolve, reject) => {
    let vars = '';
    if(filters){
        for(const [key, value] of Object.entries(filters)){
            vars += '&' + key + '=' + value;
        }
    }
    if(page){
        vars += '&page=' + page;
    }
    axios.get(API + 'documents/?category=' + category + vars, { 
        headers: { 
            'Authorization': token 
        } 
    })
    .then(resolve)
    .catch(reject)
})

const getDocumentDetails = (token, id) => new Promise((resolve, reject) => {
    axios.get(API + `documents/${id}/`, {
        headers: {
            'Authorization': token
        }
    })
    .then(resolve)
    .catch(reject)
})

const createDocument = (token, number, files, category) => new Promise((resolve, reject) => {
    const images = JSON.stringify(files.map(file => file.localUrl));
    axios.post(API + 'documents/', assign({ images, number, category }), { 
        headers: { 
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data' 
        } 
    })
    .then(resolve)
    .catch(reject)
})

const deleteDocument = (token, id) => new Promise((resolve, reject) => {
    axios.delete(API + 'documents/' + id + '/', { 
        headers: { 
            'Authorization': token
        } 
    })
    .then(resolve)
    .catch(reject)
})

const downloadZipWithFiles = (token, id) => new Promise((resolve, reject) => {
    axios.get(API + `documents/${id}/files/`, { 
        headers: { 
            'Authorization': token
        } 
    })
    .then(resolve)
    .catch(reject)
})


export {
    getUser,
    login,
    logout,
    getCategories,
    getDocuments,
    getDocumentDetails,
    createDocument,
    deleteDocument,
    downloadZipWithFiles
}

