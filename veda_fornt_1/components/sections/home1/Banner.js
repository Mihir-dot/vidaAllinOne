"use client";
import { getImageSource } from "@/components/helper/apiPath";
import {
  fetchHomeData,
  fetchServiceName,
} from "@/components/helper/serviceNameCommonAPI";
import Footer1 from "@/components/layout/footer/Footer1";
import TestimonialSlider1 from "@/components/slider/TestimonialSlider1";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 1,
  spaceBetween: 0,
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  loop: true,

  // Navigation
  navigation: {
    nextEl: ".h1n",
    prevEl: ".h1p",
  },

  // Pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
};

export default function Banner() {
  const [home, setHome] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const data = await fetchHomeData();
        setHome(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchDataFromAPI();
    fetchServiceData();
  }, []);

  const fetchServiceData = async () => {
    try {
      const data = await fetchServiceName();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleServiceClick = (serviceId) => {
    window.location.href = `/service-details?id=${serviceId}`;
  };

  // Filter the last three services
  const lastThreeServices = services.slice(-3);

  return (
    <>
      {home.map((home, index) => (
        <>
          <section className="banner-section style-one p_relative">
            <Swiper {...swiperOptions} className="banner-carousel">
              <>
                <SwiperSlide className="slide-item p_relative">
                  <div
                    className="image-layer p_absolute"
                    style={{
                      backgroundImage: `url(${getImageSource(
                        home.banner1Location
                      )})`,
                    }}
                  ></div>
                  <div className="starshine">
                    <div className="shine shine-1"></div>
                    <div className="shine shine-2"></div>
                  </div>
                  <div className="auto-container">
                    <div className="content-box">
                      <div className="content-inner">
                        <span>{home.card_title}</span>
                        <h2>{home.card_main_title}</h2>
                        <p>{home.card_content}</p>
                        <Link href={home.Link} className="theme-btn-one">
                          Discover More
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="slide-item p_relative">
                  <div
                    className="image-layer p_absolute"
                    style={{
                      backgroundImage: `url(${getImageSource(
                        home.banner2Location
                      )})`,
                    }}
                  ></div>
                  <div className="starshine">
                    <div className="shine shine-1"></div>
                    <div className="shine shine-2"></div>
                  </div>
                  <div className="auto-container">
                    <div className="content-box">
                      <div className="content-inner">
                        <span>{home.card_title}</span>
                        <h2>{home.card_main_title}</h2>
                        <p>{home.card_content}</p>
                        <Link href={home.Link} className="theme-btn-one">
                          Discover More
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <div className="owl-nav">
                  <button type="button" className="owl-prev h1p">
                    <span>‹</span>
                  </button>
                  <button type="button" className="owl-next h1n">
                    <span>›</span>
                  </button>
                </div>
              </>
            </Swiper>
          </section>

          {/* About us section */}
          <section className="about-section p_relative">
            <>
              <div className="auto-container">
                <div className="row clearfix">
                  <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                    <div className="image_block_one">
                      <div className="image-box p_relative pr_50 mr_30">
                        <figure className="image image-1">
                          <img
                            src={getImageSource(home.homageImageOneLocation)}
                            alt=""
                          />
                        </figure>
                        <figure className="image image-2">
                          <img
                            src={getImageSource(home.homePageImageTwoLocation)}
                            alt=""
                          />
                        </figure>
                        <div className="video-inner">
                          <div className="video-btn">
                            {/* <VideoPopup /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                    <div className="content_block_one">
                      <div className="content-box p_relative ml_30">
                        <div className="sec-title mb_25">
                          <span className="sub-title">
                            {home.homePageTitleOne}
                          </span>
                          <h2>{home.homePageTitleTwo}</h2>
                        </div>
                        <div className="text mb_35">
                          <p>{home.homePageDescription}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </section>

          {/* Why we choose us section */}

          <section className="chooseus-section p_relative bg-color-2 vida-chooseus-section">
            <div
              className="pattern-layer"
              style={{
                backgroundImage: "url(assets/images/shape/shape-13.png)",
              }}
            ></div>
            <div
              className="bg-layer"
              style={{
                backgroundImage:
                  "url(assets/images/background/chooseus-bg.jpg)",
              }}
            ></div>
            <div className="auto-container">
              <div className="row clearfix">
                <div className="col-lg-5 col-md-12 col-sm-12 content-column">
                  <div className="content_block_two">
                    <div className="content-box p_relative">
                      <div className="sec-title light mb_45">
                        <span className="sub-title">Why Choose Vida</span>
                        <h2>Reason For Choosing Our Consultancy</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Adipiscing integer ultrices suspendisse varius
                          etiam est.
                        </p>
                      </div>
                      <div className="inner-box">
                        <div className="single-item">
                          <div className="icon-box">
                            <i className="icon-11"></i>
                          </div>
                          <h3>Quick Response</h3>
                          <p>
                            Lorem ipsum dolor sit amet tempus consectetur
                            adipiscing.
                          </p>
                        </div>
                        <div className="single-item">
                          <div className="icon-box">
                            <i className="icon-11"></i>
                          </div>
                          <h3>Experience Consultant</h3>
                          <p>
                            Lorem ipsum dolor sit amet tempus consectetur
                            adipiscing.
                          </p>
                        </div>
                        <div className="single-item">
                          <div className="icon-box">
                            <i className="icon-11"></i>
                          </div>
                          <h3>Flexible Payment</h3>
                          <p>
                            Lorem ipsum dolor sit amet tempus consectetur
                            adipiscing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="outer-box">
              <h2>
                Looking for the Best <br />
                Consulting?
              </h2>
              <Link href="/contact" className="theme-btn-one">
                Let’s Contact
              </Link>
            </div>
          </section>

          {/* review section */}

          <section className="testimonial-section p_relative bg-color-1">
            <div
              className="pattern-layer"
              style={{
                backgroundImage: "url(assets/images/shape/shape-16.png)",
              }}
            ></div>
            <div className="auto-container">
              <div className="row clearfix">
                <div className="col-lg-4 col-md-12 col-sm-12 title-column">
                  <div className="sec-title">
                    <span className="sub-title">Testimonials</span>
                    <h2>What They’re Say About Us?</h2>
                    <p>
                      Amet dui scelerisque vel habitant eget tincidunt facilisis
                      pretium. Porttitor mi nisi, non vitae tempus. Amet dui
                      scelerisque vel habitant eget tincidunt facilisis pretium.
                      Porttitor mi nisi, non vitae tempus. Amet dui scelerisque
                      vel habitant eget tincidunt facilisis pretium. Porttitor
                      mi nisi, non vitae tempus.
                    </p>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12 content-column">
                  <div className="content-box">
                    {/*Theme Carousel*/}
                    <TestimonialSlider1 />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* service section */}

          <section className="news-section sec-pad vida-home-news-section">
            <>
              <div className="auto-container">
                <div className="sec-title centred mb_50">
                  <span className="sub-title">Our Services</span>
                  <h2>
                    Get More Update For <br />
                    Services
                  </h2>
                </div>
                <div className="row clearfix">
                  {lastThreeServices.map((service) => (
                    <div
                      className="col-lg-4 col-md-6 col-sm-12 news-block"
                      key={service._id}
                    >
                      <div
                        className="news-block-one wow fadeInUp animated"
                        data-wow-delay="0ms"
                        data-wow-duration="1500ms"
                      >
                        <div
                          className="inner-box"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="image-box">
                            <figure className="image">
                              <a
                                onClick={() => handleServiceClick(service._id)}
                              >
                                <img
                                  src={getImageSource(service.imageLocation)}
                                  alt="Article 1"
                                />{" "}
                              </a>
                            </figure>
                            {/* <h2>15<span>APRIL</span></h2> */}
                          </div>
                          <div className="lower-content">
                            <h3>
                              <a
                                onClick={() => handleServiceClick(service._id)}
                              >
                                {service.sortName}
                              </a>
                            </h3>
                            <p>{service.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          </section>
          <Footer1 />
        </>
      ))}
    </>
  );
}
