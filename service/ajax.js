import {AsyncStorage} from 'react-native';
let postRequest = (url, json, callback) => {

    let opts = {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',

    };

    fetch(url, opts)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};


let getRequest = (url, callback) => {

    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

let deleteRequest = (url, callback) => {

    fetch(url, {method: 'DELETE'})
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};
let get = (key) => {
    return AsyncStorage.getItem(key).then((value) => {
        const jsonValue = JSON.parse(value);
        // console.log(jsonValue);
        return jsonValue;
    });
};
export {postRequest, getRequest, deleteRequest};
