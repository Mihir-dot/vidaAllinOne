import Link from "next/link"
import Menu from "../Menu"
import MobileMenu from "../MobileMenu"

export default function Header2({ scroll, isMobileMenu, handleMobileMenu, isSidebar, handlePopup, handleSidebar }) {
    return (
        <>
            {/* <header className="main-header header-style-two"> */}
            <header className={`main-header header-style-two ${scroll ? "fixed-header" : ""}`}>
            <div className="header-top">
          <div className="auto-container">
            <div className="top-inner">
              <div className="top-left">
                <ul className="info clearfix">
                  {/* <li><i className="icon-1"></i>Mon-Fri 8:00 am-6:00 pm</li>
                            <li><i className="icon-2"></i><Link href="tel:912136660027">+91-213-666-0027</Link></li>
                            <li><i className="icon-3"></i><Link href="mailto:info@example.com">info@example.com</Link></li> */}
                </ul>
              </div>
              <div className="top-right">
                <div className="login">
                  {" "}
                  <li>
                    <Link href="/contact">Contact Us</Link>
                  </li>
                </div>
                <ul className="social-links clearfix">
                  <li>
                    <Link href="#">(02) 748 54433</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
                <div className="header-lower">
                    <div className="auto-container">
                        <div className="outer-box">
                            <div className="logo-box">
                                <figure className="logo">
                                    <Link href="/"><img src="/assets/images/logo.png" alt="" className="header-logo"/></Link>
                                </figure>
                            </div>
                            <div className="menu-area clearfix">
                                <div className="mobile-nav-toggler" onClick={handleMobileMenu}>
                                    <i className="icon-bar"></i>
                                    <i className="icon-bar"></i>
                                    <i className="icon-bar"></i>
                                </div>
                                <nav className="main-menu navbar-expand-md navbar-light">
                                    <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                        <Menu />
                                    </div>
                                </nav>
                            </div>
                            <ul className="menu-right-content">
                                <li className="btn-box">
                                    <Link href="/feedBack" className="theme-btn-one">Free Consulting</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={`sticky-header ${scroll ? "animated slideInDown" : ""}`}>
                    <div className="auto-container">
                        <div className="outer-box">
                            <div className="logo-box">
                                <figure className="logo"><Link href="/"><img src="/assets/images/logo.png" alt=""  className="header-logo"/></Link></figure>
                            </div>
                            <div className="menu-area clearfix">
                                <nav className="main-menu navbar-expand-md navbar-light">
                                    <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                        <Menu />
                                    </div>
                                </nav>
                            </div>
                            <ul className="menu-right-content">
                                <li className="btn-box">
                                    <Link href="/feedBack">Free Consulting</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            <MobileMenu handleMobileMenu={handleMobileMenu} handleSidebar={handleSidebar} isSidebar={isSidebar} />


        </>
    )
}
