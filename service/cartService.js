import {getRequest, postRequest, deleteRequest, get} from './ajax';
import {AsyncStorage} from 'react-native';
import {apiUrl} from '../urlconfig';

export const addToCart = (bookid) => {
    // alert(bookid);   AsyncStorage.removeItem("@Bookstore:token");
    AsyncStorage.getItem('@Bookstore:userId').then((value) => {
        const jsonValue = JSON.parse(value);
        console.log(jsonValue);
        const url =apiUrl+'/addToCart?userId=' + jsonValue + '&bookId=' + bookid;
        console.log(url);
        postRequest(url, {}, callback);
    });
    // console.log((get('@Bookstore:token')));


    const callback = (data) => {

    };
    // postRequest(url, {}, callback);
};
export const addToCartByButtom = (itemid, callback) => {
    AsyncStorage.getItem('@Bookstore:userId').then((value) => {
        const jsonValue = JSON.parse(value);
        console.log(jsonValue);
        const url =apiUrl+'/addToCart?userId=' + jsonValue +  '&itemId=' + itemid;
        console.log(url);
        postRequest(url, {}, callback);
    });


};
export const getCartItems = (callback) => {
    // const url = `${config.apiUrl}/getBooks`;
    const url = 'http://localhost:8080/getCartItems?userId=' + JSON.parse(AsyncStorage.getItem('user')).userId;
    getRequest(url, callback);
};

export const removeByItemId = (itemid, callback) => {
    // const url = 'http://localhost:8080/removeCartItem?userId=' + JSON.parse(AsyncStorage.getItem('user')).userId + '&itemId=' + itemid;
    AsyncStorage.getItem('@Bookstore:userId').then((value) => {
        const jsonValue = JSON.parse(value);
        console.log(jsonValue);
        const url =apiUrl+'/removeCartItem?userId=' + jsonValue +  '&itemId=' + itemid;
        console.log(url );
        deleteRequest(url, callback);
    });


};

export const placeOrder = (select)=>{
    AsyncStorage.getItem('@Bookstore:userId').then((value) => {
        const jsonValue = JSON.parse(value);
        console.log(jsonValue);
        const url =apiUrl+'/placeOrder?userId=' + jsonValue;
        console.log(url);
        postRequest(url,select,callback);
    });
    const callback = (data) => {

    };


};

