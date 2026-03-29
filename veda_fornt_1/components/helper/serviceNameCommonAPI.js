
import axios from "axios";
import { getAPIEndpoint, API_ENDPOINTS } from "./apiPath";

export const fetchServiceName = async () => {
  try {
    const response = await axios.get(getAPIEndpoint(API_ENDPOINTS.ALL_SERVICES));
    return response.data;
  } catch (error) {
    console.error("Error fetching data in service name:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const getAllReviewsData = async()=>{
  try {
    const response = await axios.get(getAPIEndpoint(API_ENDPOINTS.GET_ALL_REVIEWS));
    return response.data;
  } catch (error) {
    console.error("Error fetching data in reviews:", error);
    throw error; 
  }
}

export const fetchAboutData = async () => {
  try {
    const response = await axios.get(getAPIEndpoint(API_ENDPOINTS.GET_ABOUT_DATA));
    console.log("res----",response)
    return response.data;
  } catch (error) {
    console.error("Error fetching data in service name:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export const fetchHomeData = async () => {
  try {
    const response = await axios.get(getAPIEndpoint(API_ENDPOINTS.GET_HOME_DATA));
    console.log("res----",response)
    return response.data;
  } catch (error) {
    console.error("Error fetching data in service name:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};