import axios from "axios"
import { hostname } from "../utilities/utilites"


const viewAddress = async (token) => {
    const response = await axios.get(`${hostname}/api/my/addresses`,
    {
        headers: {
        Authorization: `Bearer ${token}`
      }
    }
    );
    return  response.data;
}

const addAddress = async (data,token) => {
    const response = await axios.post(`${hostname}/api/my/address`, data,
    {
        headers: {
        Authorization: `Bearer ${token}`
      }
    }
    );
    return  response.data;
}

const editAddress = async (data,token) => {
  const response = await axios.put(`${hostname}/api/my/address`, data,
  {
      headers: {
      Authorization: `Bearer ${token}`
    }
  }
  );
  return  response.data;
}

const removeAddress = async (data,token) => {
    const response = await axios.delete(`${hostname}/api/my/address/${data}`,
    {
        headers: {
        Authorization: `Bearer ${token}`
      }
    }
    );
    return  response.data;
}

const addressService = {
    viewAddress,
    addAddress,
    editAddress,
    removeAddress,
}

export default addressService;