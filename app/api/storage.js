
export const saveUserInfo = (User)=>{

    console.log(User)
        localStorage.setItem('userInfo', JSON.stringify(User));



}
export const getUserInfo = ()=>{
    var data = JSON.parse(localStorage.getItem('userInfo'));
    return data;

}





