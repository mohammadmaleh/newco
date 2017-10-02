import axios from 'axios'
export const searchFiles = (searchObject)=>{
    return axios({
        method: 'post',
        url: 'http://localhost:3000/api/searchFiles',
        data:searchObject
    });

}
export const postFiles = (file)=>{
    return axios({
        method: 'post',
        url:  'http://localhost:3000/api/file',
        data:file,

    });
}
export const patchFiles = (id,file)=>{
    return axios({
        method: 'post',
        url: 'http://localhost:3000/api/file/'+id,
        data:file
    });

}
export const deleteFile = (id)=>{
    return axios({
        method: 'delete',
        url:  'http://localhost:3000/api/file/'+id,
    });

}
export const downloadFile = (id)=>{
    return axios({
        method: 'get',
        url:  'http://localhost:3000/api/download/'+id,
    });

}
