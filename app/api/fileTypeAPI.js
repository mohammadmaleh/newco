


import axios from 'axios'
export const getAllFileTypes = ()=>{
    return axios({
        method: 'get',
        url:  '/api/fileType',
    });

}




export const postFileTypes = (fileType)=>{
    return axios({
        method: 'post',
        url:  '/api/fileType',
        data:fileType
    });

}
export const patchFileTypes = (id,fileType)=>{
    return axios({
        method: 'patch',
        url:  '/api/fileType/'+id,
        data:fileType
    });

}

export const deleteFileType = (id)=>{
    return axios({
        method: 'delete',
        url:  '/api/fileType/'+id,
    });

}





