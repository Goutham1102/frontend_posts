import axios from 'axios';
const CommonAPI = async (httpMethod,url,reqbody) => {
    const reqconfig ={
        method:httpMethod,
        url,
        data :reqbody
    }
    //api call using axios
    return await axios(reqconfig).then(res=>{
        return res
    })
    .catch(err=>{
        return err
    })
}
export default CommonAPI