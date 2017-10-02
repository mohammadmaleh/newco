


import axios from 'axios'
export const getAllRules = ()=>{
    return axios({
        method: 'get',
        url:  '/api/rule',
    });

}




export const postRule = (rule)=>{
    return axios({
        method: 'post',
        url:  '/api/rule',
        data:rule
    });

}
export const patchRule = (id,rule)=>{
    return axios({
        method: 'patch',
        url:  '/api/rule/'+id,
        data:rule
    });

}

export const deleteRule = (id)=>{
    return axios({
        method: 'delete',
        url:  '/api/rule/'+id,
    });

}





