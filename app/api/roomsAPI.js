import axios from 'axios'
export const saveRoom = (roomItem)=>{
    return axios({
        method: 'post',
        url:  '/rooms',
        data: roomItem,
        headers: { 'content-type': 'multipart/form-data' }
    });

}
export const getAllRooms = (searchItem)=>{
    console.log(searchItem,'fromapi')
    return axios({
        method: 'post',
        url:   '/searchRooms',
        data: searchItem
    });

}





