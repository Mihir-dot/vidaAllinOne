"use client";
import { useEffect, useState } from "react";
import { API_ENDPOINTS, getAPIEndpoint } from "@/components/helper/apiPath";
import Layout from "@/components/layout/Layout";
import axios from "axios";
import Link from "next/link";
import Footer1 from "@/components/layout/footer/Footer1";
import {
  FIRST_MESSAGE,
  SECOND_MESSAGE,
  Toastify,
} from "@/components/helper/toastMessage";
import { validateFaqContactForm } from "@/components/helper/validation";

export default function Home() {
  const [isActive, setIsActive] = useState(0); // Initialize with index 0
  const [faq, setFaq] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const response = await axios.get(
          getAPIEndpoint(API_ENDPOINTS.GET_FAQ_DATA)
        );
        const faqData = response.data;
        setFaq(faqData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchDataFromAPI();
  }, []);

  const handleToggle = (key) => {
    setIsActive(isActive === key ? null : key);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the current input field
    const errors = validateFaqContactForm({ ...formData, [name]: value });

    // Update validation errors for the current input field
    setValidationErrors({
      ...validationErrors,
      [name]: errors[name] || "", // Set the error message if there's an error, otherwise clear the message
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form
    const errors = validateFaqContactForm(formData);

    if (Object.keys(errors).length > 0) {
      // If there are validation errors, set them in state
      setValidationErrors(errors);
    } else {
      try {
        // Clear validation errors
        setIsLoading(true);
        setValidationErrors({});

        const response = await axios.post(
          getAPIEndpoint(API_ENDPOINTS.ADD_CONTACT),
          formData
        );
        if (response.data) {
          Toastify({
            message: {
              firstLine: FIRST_MESSAGE,
              secondLine: SECOND_MESSAGE,
            },
          });
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        }
      } catch (error) {
        console.error("Error sending email:", error);
        // Handle error, show an error message to the user, etc.
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <Layout headerStyle={2}>
      <div>
        <section className="page-title centred">
          <div
            className="bg-layer"
            style={{
              backgroundImage: `url(assets/images/background/page-title.jpg)`,
            }}
          ></div>
          <div className="auto-container">
            <div className="content-box">
              <h1>FAQs</h1>
              <ul className="bread-crumb clearfix">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>FAQs</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="faq-page-section p_relative sec-pad">
          <div className="auto-container">
            <div className="sec-title mb_50 centred">
              <span className="sub-title">Frequently Asked Questions</span>
              <h2>How Can We Help You?</h2>
            </div>
            <div className="row clearfix">
              {faq.map((faqItem, index) => (
                <div
                  className="col-lg-12 col-md-12 col-sm-12 content-column"
                  key={index}
                >
                  <ul className="accordion-box mt-3">
                    <li className="accordion block">
                      <div
                        className={
                          isActive === index ? "acc-btn active" : "acc-btn"
                        }
                        onClick={() => handleToggle(index)}
                      >
                        <div className="icon-box"></div>
                        <h3>{faqItem.question}</h3>
                      </div>
                      <div
                        className={
                          isActive === index
                            ? "acc-content current"
                            : "acc-content"
                        }
                      >
                        <div className="content">
                          <div className="text">{faqItem.answer}</div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="contact-section sec-pad p_relative centred bg-color-1">
          <div
            className="pattern-layer"
            style={{ backgroundImage: "url(assets/images/shape/shape-40.png)" }}
          ></div>
          <div className="auto-container">
            <div className="sec-title mb_50">
              <span className="sub-title">Contact</span>
              <h2>
                Do You Have Any <br />
                Questions?
              </h2>
            </div>
            <div className="form-inner">
              <form action="faq.html" method="post" onSubmit={handleSubmit}>
                <div className="row clearfix">
                  <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {validationErrors.name && (
                      <span
                        className="text-danger"
                        style={{ fontSize: "15px",display:"flex", justifyContent:"flex-start" }}
                      >
                        {validationErrors.name}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {validationErrors.email && (
                      <span
                        className="text-danger"
                        style={{ fontSize: "15px",display:"flex", justifyContent:"flex-start" }}
                      >
                        {validationErrors.email}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {validationErrors.phone && (
                      <span
                        className="text-danger"
                        style={{ fontSize: "15px",display:"flex", justifyContent:"flex-start" }}
                      >
                        {validationErrors.phone}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <textarea
                      name="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      autoComplete="off"
                    ></textarea>
                    {validationErrors.message && (
                      <span
                        className="text-danger"
                        style={{ fontSize: "15px",display:"flex", justifyContent:"flex-start" }}
                      >
                        {validationErrors.message}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                    <div className="message-btn">
                      <button type="submit" className="theme-btn-one">
                      {isLoading ? (
                        <>
                          <div
                            className="spinner-border spinner-border-sm  text-light"
                            role="status"
                          >
                            <span className="visually-hidden">
                              Loading...
                            </span>
                          </div>
                          <span className="ms-2">Loading...</span>
                        </>
                      ) : (
                        " Send Request"
                      )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer1 />
    </Layout>
  );
}
