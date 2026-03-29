"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchServiceName } from "../helper/serviceNameCommonAPI";
export default function MobileMenu({
  isSidebar,
  handleMobileMenu,
  handleSidebar,
}) {
  const [isActive, setIsActive] = useState({
    status: false,
    key: "",
  });

  const [services, setServices] = useState([]);

  useEffect(() => {
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

    const handleServiceClick = (serviceId) => {
        window.location.href = `/service-details?id=${serviceId}`;
    };
  const handleToggle = (key) => {
    if (isActive.key === key) {
      setIsActive({
        status: false,
      });
    } else {
      setIsActive({
        status: true,
        key,
      });
    }
  };

  return (
    <>
      <div className="mobile-menu">
        <div className="menu-backdrop" onClick={handleMobileMenu} />
        <div className="close-btn" onClick={handleMobileMenu}>
          <span className="far fa-times" />
        </div>
        <nav className="menu-box">
          <div className="nav-logo">
            <Link href="/">
              <img src="/assets/images/logo.png" alt="" className="header-logo"/>
            </Link>
          </div>
          <div className="menu-outer">
            <div
              className="collapse navbar-collapse show clearfix"
              id="navbarSupportedContent"
            >
              <ul className="navigation clearfix">
              
                  <li><Link href="/">Home</Link></li>
                     <li
                     className={
                       isActive.key == 1 ? "dropdown current" : "dropdown"
                     }
                   >
                     <Link href="/our-vision">About Us</Link>
                     <ul
                       style={{
                         display: `${isActive.key == 1 ? "block" : "none"}`,
                       }}
                     >
                     <li><Link href="/about-us">What we do?</Link></li>
                     <li><Link href="/our-vision">Our Vision, Pupose, and Values</Link></li>
                       
                     </ul>
                     <div
                       className={
                         isActive.key == 1 ? "dropdown-btn open" : "dropdown-btn"
                       }
                       onClick={() => handleToggle(1)}
                     >
                       <span className="fa fa-angle-right" />
                     </div>
                   </li>
                <li
                  className={
                    isActive.key == 2 ? "dropdown current" : "dropdown"
                  }
                >
                  <Link href="/services">I'm looking for</Link>
                  <ul
                    style={{
                      display: `${isActive.key == 2 ? "block" : "none"}`,
                    }}
                  >
                  {services.map((service) => (
                    <li key={service._id}>
                        <a onClick={() => handleServiceClick(service._id)}>
                            {service.sortName}
                        </a>
                    </li>
                ))}
                  </ul>
                  <div
                    className={
                      isActive.key == 2 ? "dropdown-btn open" : "dropdown-btn"
                    }
                    onClick={() => handleToggle(2)}
                  >
                    <span className="fa fa-angle-right" />
                  </div>
                </li>
                <li
                  className={
                    isActive.key == 3 ? "dropdown current" : "dropdown"
                  }
                >
                  <Link href="/#">Work with us</Link>
                  <ul
                    style={{
                      display: `${isActive.key == 3 ? "block" : "none"}`,
                    }}
                  >
                  <li><Link href="/career">Current Vacancies</Link></li>
                    
                  </ul>
                  <div
                    className={
                      isActive.key == 3 ? "dropdown-btn open" : "dropdown-btn"
                    }
                    onClick={() => handleToggle(3)}
                  >
                    <span className="fa fa-angle-right" />
                  </div>
                </li>
                <li
                  className={
                    isActive.key == 4 ? "dropdown current" : "dropdown"
                  }
                >
                  <Link href="/#">Advocacy</Link>
                  <ul
                    style={{
                      display: `${isActive.key == 4 ? "block" : "none"}`,
                    }}
                  >
                  <li><Link href="/podcast">Podcast</Link></li>
                  <li><Link href="/resources">Resources</Link></li>
                  <li><Link href="/founder">VIDA CEO/Founder Blog</Link></li>
                  </ul>
                  <div
                  className={
                    isActive.key == 4 ? "dropdown-btn open" : "dropdown-btn"
                  }
                  onClick={() => handleToggle(4)}
                >
                  <span className="fa fa-angle-right" />
                </div>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          {/*Social Links*/}
          <div className="social-links">
            <ul className="clearfix">
              <li>
                <Link href="/#">
                  <span className="fab fa-twitter" />
                </Link>
              </li>
              <li>
                <Link href="/#">
                  <span className="fab fa-facebook-square" />
                </Link>
              </li>
              <li>
                <Link href="/#">
                  <span className="fab fa-pinterest-p" />
                </Link>
              </li>
              <li>
                <Link href="/#">
                  <span className="fab fa-instagram" />
                </Link>
              </li>
              <li>
                <Link href="/#">
                  <span className="fab fa-youtube" />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      {/* End Mobile Menu */}
      <div
        className="nav-overlay"
        style={{ display: `${isSidebar ? "block" : "none"}` }}
        onClick={handleSidebar}
      />
    </>
  );
}
