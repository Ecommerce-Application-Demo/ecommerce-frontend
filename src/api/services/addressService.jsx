import axios from "axios"
import { hostname } from "../utilities/utilites"
import axiosInstanceProtected from "../utilities/axiosInstanceProtected";


const viewAddress = async () => {
    console.log('viewAddress');
    const response = await axiosInstanceProtected.get(`api/my/addresses`,
    );
    return  response.data;
}

const addAddress = async (data) => {
    const response = await axiosInstanceProtected.post(`api/my/address`, data
    );
    return  response.data;
}

const editAddress = async (data) => {
    console.log('edit');
  const response = await axiosInstanceProtected.put(`api/my/address`, data
  );
  return  response.data;
}

const removeAddress = async (data) => {
    const response = await axiosInstanceProtected.delete(`api/my/address/${data}`
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