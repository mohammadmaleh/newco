


import axios from 'axios'
export const getAllFileTypes = ()=>{
    return axios({
        method: 'get',
        url:  'http://localhost:3000/api/fileType',
    });

}




export const postFileTypes = (fileType)=>{
    return axios({
        method: 'post',
        url:  'http://localhost:3000/api/fileType',
        data:fileType
    });

}
export const patchFileTypes = (id,fileType)=>{
    return axios({
        method: 'patch',
        url:  'http://localhost:3000/api/fileType/'+id,
        data:fileType
    });

}

export const deleteFileType = (id)=>{
    return axios({
        method: 'delete',
        url:  'http://localhost:3000/api/fileType/'+id,
    });

}





