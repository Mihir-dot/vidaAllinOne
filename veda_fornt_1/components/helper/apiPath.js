// Browser: same-origin /api (dev gateway or production reverse proxy).
// Server (SSR): talk to Express directly unless INTERNAL_API_URL is set.
const BASE_URL =
  typeof window !== "undefined"
    ? "/api"
    : `${(process.env.INTERNAL_API_URL || "http://127.0.0.1:5000").replace(/\/$/, "")}/api`;

export const API_ENDPOINTS = {
  ALL_SERVICES: "/get/allservicesname",
  GET_SERVICE_BY_ID: "/get/services",
  GET_CONTACTS_DETAILS: "/get-all-contacts",
  GET_ALL_REVIEWS: "/get/allratting",
  GET_ALL_SECIAL_DATA: "/get/all/social/media",
  GET_ABOUT_DATA: "/get/allabout",
  GET_HOME_DATA: "/get/allDashboard",
  GET_FAQ_DATA: "/get/allFaq",
  GET_PODCAST_DATA: "/get/allprodcast",
  GET_RESOURCES_DATA: "/get/allresource",
  GET_FOUNDER_DATA: "/get/allblog",
  ADD_CONTACT: "/sendEmail"
};

export const getAPIEndpoint = (endpoint) => {
  return BASE_URL + endpoint;
};

const imageBase =
  typeof window !== "undefined"
    ? "/get/image"
    : `${(process.env.INTERNAL_API_URL || "http://127.0.0.1:5000").replace(/\/$/, "")}/get/image`;

export const IMAGE_BASE_URL = imageBase;
export const getImageSource = (urlPath) =>
  `${imageBase}?urlPath=/${urlPath?.replace(/\\/g, "/")}`;
