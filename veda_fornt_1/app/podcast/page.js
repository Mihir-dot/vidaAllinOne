"use client";
import {
  API_ENDPOINTS,
  getAPIEndpoint,
  getImageSource,
} from "@/components/helper/apiPath";
import Layout from "@/components/layout/Layout";
import Footer1 from "@/components/layout/footer/Footer1";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [podcast, setPoscast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);

  //   // Clear the timeout if the component unmounts before the asynchronous operation completes
  //   return () => clearTimeout(timeoutId);
  // }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(
          getAPIEndpoint(API_ENDPOINTS.GET_PODCAST_DATA)
        );
        const podcastData = response.data;
        setPoscast(podcastData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromAPI();
  }, []);

  return (
    <>
      <Layout headerStyle={2}>
      { /* {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
        <>*/}
            <div>
              <section className="page-title centred">
                <div
                  className="bg-layer"
                  style={{
                    backgroundImage: `url(assets/images/shop/pb.jpg)`,
                  }}
                ></div>
                <div className="auto-container">
                  <div className="content-box">
                    <h1>Podcast</h1>
                    <ul className="bread-crumb clearfix">
                      <li>
                        <Link href="/">Home</Link>
                      </li>
                      <li>Podcast</li>
                    </ul>
                  </div>
                </div>
              </section>
              <section className="shop-section p_relative">
                <div className="auto-container">
                  <div className="row clearfix">
                    <div className="col-lg-12 col-md-12 col-sm-12 content-side">
                      <div className="our-shop centred">
                        <div className="row clearfix">
                          {podcast.map((podcast, index) => (
                            <>
                              <div className="col-lg-3 col-md-6 col-sm-12 shop-block">
                                <div className="shop-block-one">
                                  <div className="inner-box">
                                    <div className="image-box">
                                      <figure className="image">
                                        <img
                                          src={getImageSource(
                                            podcast.pictureLocation
                                          )}
                                          alt="Wooden Tea Table"
                                        />
                                      </figure>
                                      <ul className="option-list clearfix">
                                        <li>
                                          <Link href={podcast.link}></Link>
                                        </li>
                                        <li>
                                          <Link
                                            href={getImageSource(
                                              podcast.pictureLocation
                                            )}
                                            className="lightbox-image"
                                            data-fancybox="gallery"
                                          ></Link>
                                        </li>
                                      </ul>
                                      <div className="cart-btn">
                                        <button
                                          style={{ background: "#6f42c1" }}
                                        >
                                          <Link
                                            href={podcast.link}
                                            target="_blank"
                                            style={{ color: "#fff" }}
                                          >
                                            Click here
                                          </Link>
                                        </button>
                                      </div>
                                    </div>
                                    <div className="lower-content">
                                      <h4>
                                        <Link
                                          href={podcast.link}
                                          target="_blank"
                                        >
                                          {podcast.name}
                                        </Link>
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <Footer1/>
      </Layout>
    </>
  );
}
