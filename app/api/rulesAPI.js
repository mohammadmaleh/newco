


import axios from 'axios'
export const getAllRules = ()=>{
    return axios({
        method: 'get',
        url:  'http://localhost:3000/api/rule',
    });

}




export const postRule = (rule)=>{
    return axios({
        method: 'post',
        url:  'http://localhost:3000/api/rule',
        data:rule
    });

}
export const patchRule = (id,rule)=>{
    return axios({
        method: 'patch',
        url:  'http://localhost:3000/api/rule/'+id,
        data:rule
    });

}

export const deleteRule = (id)=>{
    return axios({
        method: 'delete',
        url:  'http://localhost:3000/api/rule/'+id,
    });

}





