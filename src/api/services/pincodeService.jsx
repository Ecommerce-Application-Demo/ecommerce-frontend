import axios from "axios";
import { pincode_hostname } from "../utilities/utilites"


export const getPincode = async(pincode) => {
    let response = await axios.get(`${pincode_hostname}/${pincode}`);
     response = await response?.data[0];
     let locality = [];
     response?.PostOffice?.forEach(item=>{
        locality.push(item?.Name)
    })
    let dataForReturn;
    if(response?.Status ==='Success') {
      dataForReturn =  {
        state: response?.PostOffice[0]?.State,
        district: response?.PostOffice[0]?.District,
        locality,
     }
    }
    else {
      dataForReturn = {
        message: 'the pincode is not valid'
      }
    }
    return dataForReturn;
}