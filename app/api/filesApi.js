import axios from 'axios'
let baseUrl = process.env.PORT ?'/' : '/' ;
export const searchFiles = (searchObject)=>{
    return axios({
        method: 'post',
        url: '/api/searchFiles',
        data:searchObject
    });

}
export const postFiles = (file)=>{
    return axios({
        method: 'post',
        url:  '/api/file',
        data:file,

    });



}
export const patchFiles = (id,file)=>{
    return axios({
        method: 'post',
        url: '/api/file/'+id,
        data:file
    });

}
export const deleteFile = (id)=>{
    return axios({
        method: 'delete',
        url:  '/api/file/'+id,
    });

}
export const downloadFile = (id)=>{
    return axios({
        method: 'get',
        url:  '/api/download/'+id,
    });

}
