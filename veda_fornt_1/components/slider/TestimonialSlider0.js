"use client";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllReviewsData } from "../helper/serviceNameCommonAPI";
import { IMAGE_BASE_URL, getImageSource } from "../helper/apiPath";

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 3,
  spaceBetween: 30,
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

  breakpoints: {
    320: {
      slidesPerView: 1,
      // spaceBetween: 30,
    },
    575: {
      slidesPerView: 1,
      // spaceBetween: 30,
    },
    767: {
      slidesPerView: 2,
      // spaceBetween: 30,
    },
    991: {
      slidesPerView: 2,
      // spaceBetween: 30,
    },
    1199: {
      slidesPerView: 3,
      // spaceBetween: 30,
    },
    1350: {
      slidesPerView: 3,
      // spaceBetween: 30,
    },
  },
};
export default function TestimonialSlider0() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviewsData();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchReviews();
  }, []);
  return (
    <>
      <Swiper {...swiperOptions} className="theme_carousel owl-theme">
        {reviews.map((review, index) => (
          <SwiperSlide className="slide">
            <div className="testimonial-block-two">
              <figure className="thumb-box">
              {review.pictureLocation ? (
                <img src={getImageSource(review.pictureLocation)} alt="" />
              ) : (
                <img src="assets/images/resource/testimonial-3.jpg" alt="" />
              )}
              </figure>
              <div className="inner-box">
                <h3>{review.name}</h3>
                <span className="designation">{review.post}</span>
                <p>“{review.text}”</p>
                <ul className="rating clearfix">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <li key={i}>
                      <i className="fas fa-star"></i>
                    </li>
                  ))}
                  {Array.from({ length: 5 - review.rating }, (_, i) => (
                    <li key={i}>
                      <i className="far fa-star"></i>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
