

import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Error404() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="404 Error">
            <section className="error-section p_relative centred">
                <div className="auto-container">
                    <div className="inner-box">
                        <figure className="error-image">
                            <img src="assets/images/icons/error-1.png" alt="" />
                        </figure>
                        <h2>Oops! That Page Can Not <br />be Found.</h2>
                        <Link href="/" className="theme-btn-one">
                            <i className="icon-5"></i>Back to Homepage
                        </Link>
                    </div>
                </div>
            </section>

            </Layout>
        </>
    )
}
