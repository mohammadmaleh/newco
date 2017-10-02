import axios from 'axios'
export const signUpAPI = (email,password,username)=>{
    console.log(email,password,username)
   return axios({
        method: 'post',
        url: '/api/users/signup',
        data: {
            email,
            password,
            username,
        }
    });

}
export const loginAPI = (username,password)=>{
   return axios({
        method: 'post',
        url: '' +
        '/api/users/login',
        data: {
            username,
            password,
        }
    });

}




