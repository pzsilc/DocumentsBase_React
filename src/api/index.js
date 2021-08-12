import axios from 'axios';
import packageJson from '../../package.json';
import FormData from 'form-data'
const API = packageJson.backendUrl + '/api';


class ReasonsHandler{
    static getReasons = () => new Promise((resolve, reject) => {
        axios.get(API + '/reasons/')
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static postReason = data => new Promise((resolve, reject) => {
        axios.post(API + '/reasons/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static patchReason = data => new Promise((resolve, reject) => {
        axios.patch(API + `/reasons/${data.id}/`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static deleteReasons = id => new Promise((resolve, reject) => {
        axios.delete(API + `/reasons/${id}/`)
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })
}



class StatusesHandler{
    static getStatuses = () => new Promise((resolve, reject) => {
        axios.get(API + '/statuses/')
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static postStatus = data => new Promise((resolve, reject) => {
        axios.post(API + '/statuses/', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })
}



class MessageHandler{
    static postMessage = data => new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('content', data.content);
        formData.append('sender_email', data.owner_email);
        formData.append('complaint', data.complaint);
        formData.append('images', JSON.stringify(data.images));
        axios.post(API + '/messages/', formData, {
            headers: {
                'Content-Type': `multipart/form-data`,
                'Accept': 'application/json'
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}



class ComplaintsHandler{
    static getComplaints = (filters, token) => new Promise((resolve, reject) => {
        let vars = filters ? Object.keys(filters).map(key => key + '=' + filters[key]).join('&') : "";
        axios.get(API + `/complaints/?${vars}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static getOneComplaint = key => new Promise((resolve, reject) => {
        axios.get(API + `/complaints/${key}/`)
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static postComplaint = data => new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', document.querySelector('textarea[name="_description"]').value);
        formData.append('reason', data.reason);
        formData.append('document_number', data.document_number);
        formData.append('email', data.email);
        formData.append('images', JSON.stringify(data.images));
        axios.post(API + '/complaints/', formData, {
            headers: {
                'Content-Type': `multipart/form-data`,
                'Accept': 'application/json'
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static patchComplaint = (key, data, token) => new Promise((resolve, reject) => {
        axios.patch(API + `/complaints/${key}/`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static deleteComplaint = (key, token) => new Promise((resolve, reject) => {
        axios.put(API + `/complaints/${key}/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(res => res.data)
        .then(res => resolve(res))
        .catch(err => reject(err.response))
    })

    static checkIfExistsByDocumentNumber = document_number => new Promise((resolve, reject) => {
        axios.get(API + `/documents/?code=${document_number}`)
        .then(res => resolve(res))
        .then(err => reject(err));
    })

    static getOrderByComplaintKey = key => new Promise((resolve, reject) => {
        axios.get(API + `/documents/details/${key}/`)
        .then(res => resolve(res))
        .then(err => reject(err));
    })
}



class AuthHandler{
    static login = (username, password) => new Promise((resolve, reject) => {
        axios.post(API + '/auth/login/', {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })

    static logout = token => new Promise((resolve, reject) => {
        axios.post(API + '/auth/logout/', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })

    static getUserInfo = token => new Promise((resolve, reject) => {
        axios.get(API + '/auth/user/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
}






export {
    ReasonsHandler,
    StatusesHandler,
    MessageHandler,
    ComplaintsHandler,
    AuthHandler
}