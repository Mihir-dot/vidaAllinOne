"use client";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { fetchAboutData } from "@/components/helper/serviceNameCommonAPI";
import { getImageSource } from "@/components/helper/apiPath";
import Footer1 from "@/components/layout/footer/Footer1";

export default function Home() {
  const [about, setAbout] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Clear the timeout if the component unmounts before the asynchronous operation completes
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  useEffect(() => {
    fetchAboutDetails();
  }, []);

  const fetchAboutDetails = async () => {
    try {
      const data = await fetchAboutData();
      setAbout(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  return (
    <>
      <Layout headerStyle={2}>
        {/*   {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
        <>*/}

        {about.map((about, index) => (
          <>
            <section className="page-title centred">
              <div
                className="bg-layer"
                style={{
                  backgroundImage: `url(${getImageSource(
                    about.visionBannerLocation
                  )})`,
                }}
              ></div>
              <div className="auto-container">
                <div className="content-box">
                  <h1>{about.visionTitleOne}</h1>
                  <ul className="bread-crumb clearfix">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>{about.visionTitleOne}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="service-details p_relative">
              <div className="auto-container">
                <div className="row clearfix">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="service-details-content">
                      <div className="content-one mb_90">
                        <div className="text">
                          <h2>{about.visionTitleOne}</h2>
                          <p style={{ textAlign: "justify" }}>
                            {about.visionDesscriptionOne}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div
                      className="image-box"
                      style={{ maxWidth: "100%", textAlign: "center" }}
                    >
                      <img
                        src="assets/images/service/service-1.jpg"
                        alt=""
                        style={{ width: "80%", height: "auto" }}
                      />
                    </div>
                  </div>

                  <div className="content-two mb_90">
                    <div className="row clearfix">
                      <div className="col-lg-12 col-md-12 col-sm-12 text-column">
                        <div className="text-box">
                          <h3>
                            <b>{about.visionTitleTwo}</b>
                          </h3>
                          <p style={{ textAlign: "justify" }}>
                            {about.visionDesscriptionTwo}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="content_block_one">
                      <div className="content-box p_relative ml_30">
                        <div className="inner-box mb_35">
                          <div className="single-item">
                            <div className="icon-box">
                              <i className="icon-11"></i>
                            </div>
                            <h3>Putting the person first</h3>
                            <p style={{ textAlign: "justify" }}>
                              {" "}
                              you are the reason why we are here
                            </p>
                          </div>
                          <div className="single-item">
                            <div className="icon-box">
                              <i className="icon-11"></i>
                            </div>
                            <h3>Service excellence </h3>
                            <p style={{ textAlign: "justify" }}>
                              you can count on us
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="content_block_one">
                      <div className="content-box p_relative ml_30">
                        <div className="inner-box mb_35">
                          <div className="single-item">
                            <div className="icon-box">
                              <i className="icon-11"></i>
                            </div>
                            <h3>Making a difference </h3>
                            <p style={{ textAlign: "justify" }}>
                              {" "}
                              creating opportunities
                            </p>
                          </div>
                          <div className="single-item">
                            <div className="icon-box">
                              <i className="icon-11"></i>
                            </div>
                            <h3>Our community</h3>
                            <p style={{ textAlign: "justify" }}>
                              together we are one
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Footer1/>
          </>
        ))}
      </Layout>
    </>
  );
}
