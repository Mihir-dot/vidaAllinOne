'use client'
import { getImageSource } from "@/components/helper/apiPath";
import { fetchHomeData } from "@/components/helper/serviceNameCommonAPI";
import { useEffect, useState } from "react";
export default function About() {
    const [home, setHome] = useState([])

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
    }, []);

    return (
        <>
            <section className="about-section p_relative">
               
                    <>
                        <div className="auto-container">
                            <div className="row clearfix">
                                <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                                    <div className="image_block_one">
                                        <div className="image-box p_relative pr_50 mr_30">
                                            <figure className="image image-1"><img src={getImageSource(home.homageImageOneLocation)} alt="" /></figure>
                                            <figure className="image image-2"><img src={getImageSource(home.homePageImageTwoLocation)} alt="" /></figure>
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
                                                <span className="sub-title">{home.homePageTitleOne}</span>
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
        </>
    )
}
