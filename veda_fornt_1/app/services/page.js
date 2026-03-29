"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { API_ENDPOINTS, getAPIEndpoint, getImageSource } from "@/components/helper/apiPath";
import { fetchServiceName } from "@/components/helper/serviceNameCommonAPI";
import axios from "axios";
import Footer1 from "@/components/layout/footer/Footer1";

export default function Home() {
  const [serviceDetails, setServiceDetails] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const serviceId = searchParams ? searchParams.get("id") : null;

  useEffect(() => {
    if (serviceId) {
      fetchServiceDetails();
    }
    const fetchDataFromAPI = async () => {
      try {
        const data = await fetchServiceName();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchDataFromAPI();
  }, []);

  const fetchServiceDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${getAPIEndpoint(API_ENDPOINTS.GET_SERVICE_BY_ID)}/${serviceId}`
      );
      setIsLoading(false);
      setServiceDetails(response.data);
    } catch (error) {
      console.error("Error fetching service details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceClick = (serviceId) => {
    window.location.href = `/service-details?id=${serviceId}`;
  };

  return (
    <>
      <Layout headerStyle={2}>
    
          <>
            <section className="page-title centred">
              <div
                className="bg-layer"
                style={{
                  backgroundImage:
                    "url(assets/images/shop/ppp.jpg)",
                }}
              ></div>
              <div className="auto-container">
                <div className="content-box">
                  <h1>Our Services</h1>
                  <ul className="bread-crumb clearfix">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>Our Services</li>
                  </ul>
                </div>
              </div>
            </section>
            <section className="news-section sec-pad vida-services-section">
              <div className="auto-container">
                <div className="row clearfix">
                  {services.map((service, index) => (
                    <div className="col-lg-4 col-md-6 col-sm-12 news-block">
                      <div
                        className="news-block-one wow fadeInUp animated"
                        data-wow-delay="0ms"
                        data-wow-duration="1500ms"
                      >
                        <div className="inner-box">
                          <div className="image-box">
                            <figure className="image" style={{cursor:"pointer"}}>
                            <a onClick={() => handleServiceClick(service._id)}>
                            <img
                            src={getImageSource(service.imageLocation)}
                            alt="Article 1"
                          />
                          </a>
                            </figure>
                          </div>
                          <div className="lower-content">
                            <a onClick={() => handleServiceClick(service._id)}>
                              <h3 style={{cursor:"pointer"}}> {service.sortName}</h3>
                            </a>
                            <p>
                            {service.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
          <Footer1/>
      </Layout>
    </>
  );
}
