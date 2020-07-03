import {AsyncStorage} from 'react-native';
import {apiUrl} from '../urlconfig';
import {postRequest,getRequest} from './ajax';

export const getBooks = ( callBack) => {

        const url =apiUrl+"/getBooks";
        console.log(url);
        getRequest(url, callBack);

};
