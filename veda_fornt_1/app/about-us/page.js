"use client";
import Layout from "@/components/layout/Layout";
import TestimonialSlider0 from "@/components/slider/TestimonialSlider0";
import Link from "next/link";
import { useEffect, useState } from "react";
import ModalVideo from "react-modal-video";
import { getImageSource } from "@/components/helper/apiPath";
import {
  fetchAboutData,
  fetchServiceName,
} from "@/components/helper/serviceNameCommonAPI";
import Footer1 from "@/components/layout/footer/Footer1";

export default function Home() {
  const [isOpen, setOpen] = useState(false);
  const [services, setServices] = useState([]);
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
    const fetchDataFromAPI = async () => {
      try {
        const data = await fetchServiceName();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchAboutDetails();
    fetchDataFromAPI();
  }, []);

  const fetchAboutDetails = async () => {
    try {
      const data = await fetchAboutData();
      setAbout(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleServiceClick = (serviceId) => {
    window.location.href = `/service-details?id=${serviceId}`;
  };

  return (
    <>
      <Layout headerStyle={2}>
        {/*  {isLoading ? (
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
                    about.bannerLocation
                  )})`,
                }}
              ></div>
              <div className="auto-container">
                <div className="content-box">
                  <h1>{about.name}</h1>
                  <ul className="bread-crumb clearfix">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>{about.name}</li>
                  </ul>
                </div>
              </div>
            </section>
            {/* service-style-two */}
            <section className="service-style-two p_relative bg-color-1">
              <div className="auto-container">
                <div className="sec-title centred mb_50">
                  <span className="sub-title">{about.titleOne}</span>
                  <h2>{about.titleTwo}</h2>
                  <p className="centred">{about.containtOne}</p>
                </div>

                <div className="row clearfix">
                  {services.map((service, index) => (
                    <div className="col-lg-4 col-md-6 col-sm-12 service-block">
                      <div
                        className="service-block-two wow fadeInUp animated"
                        data-wow-delay="00ms"
                        data-wow-duration="1500ms"
                      >
                        <div className="inner-box">
                          <figure className="image-box">
                            <img
                              src={getImageSource(service.imageLocation)}
                              alt=""
                            />
                          </figure>
                          <div className="lower-content">
                            <div className="inner">
                              <div className="icon-box">
                                <i className="icon-7"></i>
                              </div>
                              <h3>
                                <Link href="/strategy-planning">
                                  {service.sortName}
                                </Link>
                              </h3>
                              <p>{service.name}</p>
                              <div className="btn-box">
                                <li key={service._id} className="theme-btn-one">
                                  <a
                                    onClick={() =>
                                      handleServiceClick(service._id)
                                    }
                                  >
                                    Read More
                                  </a>
                                </li>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="clients-section p_relative">
              <h3 className="centred vida-values-heading">
                Our Values
              </h3>
              <div className="auto-container">
                <div className="inner-box">
                  <figure className="clients-logo">
                    <Link href="/about-us">
                      <img src="assets/images/clients/clients-1.png" alt="" />
                    </Link>
                  </figure>
                  <figure className="clients-logo">
                    <Link href="/about-us">
                      <img src="assets/images/clients/clients-2.png" alt="" />
                    </Link>
                  </figure>
                  <figure className="clients-logo">
                    <Link href="/about-us">
                      <img src="assets/images/clients/clients-3.png" alt="" />
                    </Link>
                  </figure>
                  <figure className="clients-logo">
                    <Link href="/about-us">
                      <img src="assets/images/clients/clients-4.png" alt="" />
                    </Link>
                  </figure>
                  <figure className="clients-logo">
                    <Link href="/about-us">
                      <img src="assets/images/clients/clients-5.png" alt="" />
                    </Link>
                  </figure>
                </div>
              </div>
            </section>
            {/* testimonial-style-two */}
            <section className="testimonial-style-two p_relative">
              <div className="auto-container">
                <div className="sec-title mb_50 centred">
                  <span className="sub-title">Testimonials</span>
                  <h2>
                    What They’re Say <br />
                    About Us?
                  </h2>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 content-column">
                  <div className="content-box">
                    {/*Theme Carousel*/}
                    <TestimonialSlider0 />
                  </div>
                </div>
              </div>
            </section>
            {/* testimonial-style-two end */}

            <ModalVideo
              channel="youtube"
              autoplay
              isOpen={isOpen}
              videoId="vfhzo499OeA"
              onClose={() => setOpen(false)}
            />
            <Footer1/>
          </>
        ))}
      </Layout>
    </>
  );
}
