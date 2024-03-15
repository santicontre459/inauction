import React, { Component } from "react";
import { Card } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const dataslide = [
    {
        id: '1',
        title: 'Create Event',
        link: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
        id: '2',
        title: 'Invite Bidder',
        link: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
        id: '3',
        title: 'Add Expert',
        link: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
        id: '4',
        title: 'Manage Tasks',
        link: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
        id: '5',
        title: 'Manage Dashboard',
        link: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
    {
        id: '6',
        title: 'Manage Activities',
        link: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    }, {
        id: '7',
        title: 'Update Event',
        link: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    }, {
        id: '8',
        title: 'Manage Bidders',
        link: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    }, {
        id: '9',
        title: 'Invite Bidders',
        link: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    },
];


class PdfCarousel extends Component {

    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        if (window.innerWidth < 576) {
            settings.slidesToShow = 1;
        } else if (576 < window.innerWidth && window.innerWidth < 768) {
            settings.slidesToShow = 2;
        } else if (768 < window.innerWidth && window.innerWidth < 992) {
            settings.slidesToShow = 3;
        } else {
            settings.slidesToShow = 4;
        }
        return (

            <Slider {...settings}>
                {dataslide.map(
                    item => (
                        <div>
                            <Card
                                className="gx-card user-profile-gx-card input-form-border"
                                title={item.title}
                                style={{textAlign: 'center', height: '100%', margin: '5px'}}>
                                 <span className="gx-media-input-form-details">
                                           Basic Help - Handbook.pdf
                                        </span>
                                <div style={{paddingTop: '20px'}} className={'user-profile-gx-media-card'}>
                                    <a href={item.link} style={{
                                        boxSizing: 'border-box',
                                        margin: '0',
                                        padding: '0',
                                        color: '#545454',
                                        fontSize: '14px',
                                        fontVariant: 'tabular-nums',
                                        listStyle: 'none',
                                        position: 'relative',
                                        display: 'inline-block',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textAlign: 'center',
                                        verticalAlign: 'middle',
                                        background: '#e8e8e86b',
                                        width: '100px',
                                        height: '100px',
                                        lineHeight: '32px',
                                        borderRadius: '50%',
                                    }}>

                                        <img
                                            alt={'pdfLogo.png'}
                                            src={require("assets/images/pdfLogo.png")}
                                            style={{
                                                padding:'20% 18% 20%',
                                                width: '85%',
                                                marginLeft: '7px'
                                            }}
                                        />
                                    </a>
                                </div>
                            </Card>
                        </div>
                    )
                )}
            </Slider>
        );
    }
}

export default PdfCarousel;


