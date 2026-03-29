"use client";
import { useState } from "react";
import { API_ENDPOINTS, getAPIEndpoint } from "@/components/helper/apiPath";
import {
  FIRST_MESSAGE,
  SECOND_MESSAGE,
  Toastify,
} from "@/components/helper/toastMessage";
import Layout from "@/components/layout/Layout";
import Footer1 from "@/components/layout/footer/Footer1";
import axios from "axios";
import Link from "next/link";
import { validateFeedbackForm } from "@/components/helper/validation";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the current input field
    const errors = validateFeedbackForm({ ...formData, [name]: value });

    // Update validation errors for the current input field
    setValidationErrors({
      ...validationErrors,
      [name]: errors[name] || "", // Set the error message if there's an error, otherwise clear the message
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const errors = validateFeedbackForm(formData);
    if (Object.keys(errors).length > 0) {
      // If there are validation errors, set them in state
      setValidationErrors(errors);
    } else {
      setLoading(true);
      try {
        // Make a POST request to the API endpoint with form data
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
          });
        }
        // Optionally, you can show a success message or redirect the user after successful submission
      } catch (error) {
        console.error("Error sending email:", error);
        // Handle error, show an error message to the user, etc.
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Layout headerStyle={2}>
        <>
          <section className="page-title centred">
            <div
              className="bg-layer"
              style={{
                backgroundImage: `url(assets/images/background/feedback.jpg)`,
              }}
            ></div>
            <div className="auto-container">
              <div className="content-box">
                <h1>Feedback</h1>
                <ul className="bread-crumb clearfix">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>Feedback</li>
                </ul>
              </div>
            </div>
          </section>
          <div>
            {/* Contact Form Section */}
            <section className="contact-style-two sec-pad">
              <h4 className="text-center" style={{ color: "#6f42c1" }}>
                <b>Vida Feedback Form</b>
              </h4>
              <div className="auto-container">
                <div className="row clearfix mt-5">
                  <div className="col-lg-4 col-md-12 col-sm-12 content-column">
                    <div className="content-box mr_70">
                      <div className="sec-title mb_35">
                        <h2>We would love to hear from you!</h2>

                        <p className="mt_20">
                          Use this form to send Vida a complaint, compliment or
                          feedback. Our Quality Improvement Team will review any
                          feedback received and provide a response if required.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8 col-md-12 col-sm-12 form-column">
                    <div className="form-inner">
                      <form
                        method="post"
                        action="sendemail.php"
                        id="contact-form"
                        className="default-form"
                        onSubmit={handleSubmit}
                      >
                        <div className="row clearfix">
                          <div className="col-lg-8 col-md-8 col-sm-8 form-group">
                            <input
                              type="text"
                              name="name"
                              placeholder="Your Name"
                              value={formData.name}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            {validationErrors.name && (
                              <span
                                className="text-danger"
                                style={{ fontSize: "15px" }}
                              >
                                {validationErrors.name}
                              </span>
                            )}
                          </div>
                          <div className="col-lg-8 col-md-8 col-sm-8 form-group">
                            <input
                              type="text"
                              name="phone"
                              placeholder="Your Phone Number"
                              value={formData.phone}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            {validationErrors.phone && (
                              <span
                                className="text-danger"
                                style={{ fontSize: "15px" }}
                              >
                                {validationErrors.phone}
                              </span>
                            )}
                          </div>
                          <div className="col-lg-8 col-md-8 col-sm-8 form-group">
                            <input
                              type="email"
                              name="email"
                              placeholder="Your email"
                              value={formData.email}
                              onChange={handleChange}
                              autoComplete="off"
                            />
                            {validationErrors.email && (
                              <span
                                className="text-danger"
                                style={{ fontSize: "15px" }}
                              >
                                {validationErrors.email}
                              </span>
                            )}<br/>
                            <span>
                              To receive correspondence regarding this feedback
                              please provide an email address.
                            </span>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <p>Do you require an interpreter?</p>
                            <label style={{ marginRight: "10px" }}>
                              <input
                                type="radio"
                                name="interpreter"
                                value="yes"
                              />{" "}
                              Yes
                            </label>
                            <label style={{ marginRight: "10px" }}>
                              <input
                                type="radio"
                                name="interpreter"
                                value="no"
                              />{" "}
                              No
                            </label>
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12 form-group message-btn">
                            <button
                              className="theme-btn theme-btn-one"
                              type="submit"
                              name="submit-form"
                            >
                              {loading ? (
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
                                "Send Feedback"
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Contact Form Section End */}
          </div>
          <Footer1 />
        </>
      </Layout>
    </>
  );
}
