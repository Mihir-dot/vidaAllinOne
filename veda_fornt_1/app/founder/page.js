"use client";
import { API_ENDPOINTS, getAPIEndpoint, getImageSource } from "@/components/helper/apiPath";
import Layout from "@/components/layout/Layout";
import Footer1 from "@/components/layout/footer/Footer1";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css/thumbs";
export default function Home() {
  const [founder, setFounder] = useState([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(
          getAPIEndpoint(API_ENDPOINTS.GET_FOUNDER_DATA)
        );
        const founderData = response.data;
        setFounder(founderData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromAPI();
  }, []);
  return (
    <>
      <Layout headerStyle={2}>
        {founder.map((founder, index) => (
          <>
            <div>
              <section className="shop-details p_relative vida-founder-section">
                <div className="auto-container">
                  <div className="team-details-content mb_90 vida-founder-inner">
                    <div className="row align-items-center">
                      <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                        <figure className="image-box mr_30">
                          <img src={getImageSource(founder.pictureLocation)} alt="" />
                        </figure>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                        <div className="content-box ml_30">
                          <h2>{founder.title}</h2>
                          
                          <p className="mt-4">
                           {founder.description}
                          </p>
                          <ul className="info-list clearfix">
                            <li>
                              <span>Expertise: </span>{founder.expertise}
                            </li>
                            <li>
                              <span>Email: </span>
                              <Link href="mailto:example@gmail.com">
                              {founder.email}
                              </Link>
                            </li>
                            <li>
                              <span>Phone: </span>
                              <Link href="tel:913336660021">
                               {founder.phone_no}
                              </Link>
                            </li>
                          </ul>
                          <ul className="social-links clearfix">
                            <li>
                              <Link href="/team-details">
                                <i className="fab fa-facebook-f"></i>
                              </Link>
                            </li>
                            <li>
                              <Link href="/team-details">
                                <i className="fab fa-twitter"></i>
                              </Link>
                            </li>
                            <li>
                              <Link href="/team-details">
                                <i className="fab fa-instagram"></i>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <Footer1 />
          </>
        ))}
      </Layout>
    </>
  );
}
