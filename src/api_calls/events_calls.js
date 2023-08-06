import { JAVA_SERVER_BASE_URL, JAVA_SERVER_EVENTS_BASE_URL } from "./consts";
import {status,json} from "./utils";

export function getAllEvents() 
{
    let username = 'pop_adrian@gmail.com';
    let password = '1234';

    // Encode the username and password in Base64
    let encodedCredentials = btoa(username + ':' + password);
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ' + encodedCredentials);

    let options = { method: 'GET',
    headers: headers,
     mode: 'cors'
    };

    return fetch(JAVA_SERVER_EVENTS_BASE_URL,options)
        .then(status)
        .then(json)
        .then(data=> {
            console.log('Request succeeded with JSON response', data);
            return data;
        }).catch(error=>{
            console.log('Request failed', error);
            return Promise.reject(error);
        });
}