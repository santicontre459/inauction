import React, { Component } from "react";
import { PageHeader, Tag, Card } from "antd";
import moment from "moment";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import Auxiliary from "../../../../util/Auxiliary";
import Img_pdf from '../../../../assets/images/icons/pdf.png';
import Img_word from '../../../../assets/images/icons/icons-word.svg';
import Img_excel from '../../../../assets/images/icons/icons-excel.svg';
import Img_img from '../../../../assets/images/icons/icons-image.png';
import Img_file from '../../../../assets/images/icons/icons-file.svg';

const fileTypes = [Img_pdf, Img_img, Img_word, Img_excel, Img_file];

class Documents extends Component {

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
            <Auxiliary>
                <PageHeader style={{ paddingTop: "8px" }}
                    title="Uploaded by Host"
                />
                <Slider className="pdf-main-slide" {...settings}>
                    {this.props.files.map(
                        item => (
                            <div>
                                <Card
                                    className="gx-card user-profile-gx-card input-form-border"
                                    title={item.fileName}
                                    style={{ textAlign: 'center', height: '100%', margin: '5px' }}
                                >
                                    <span className="gx-media-input-form-details">
                                        {/* <Tag style={{ width: "100%", textAlign: "center" }} color="green">{item.origin}</Tag>
                                        {item.downloaded ? (
                                            <Tag style={{ width: "100%", textAlign: "center" }} color="green">Downloaded</Tag>
                                        ) : (
                                            <Tag style={{ width: "100%", textAlign: "center" }} color="red">Not downloaded</Tag>
                                        )
                                        }
                                        <br /> */}
                                        <b>Uploaded: </b>{moment(item.createdAt).format('LLLL')}
                                    </span>
                                    <div style={{ paddingTop: '20px' }} className={'user-profile-gx-media-card'}>
                                        <a href={item.path}
                                            onClick={() => {
                                                // let objIndex = this.state.pdfSlide.findIndex((obj => obj.id === item.id));
                                                // this.setState({ state: this.state.pdfSlide[objIndex].downloaded = true });
                                            }}
                                            target="_blank"
                                            style={{
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
                                                background: '#ccc',
                                                width: '128px',
                                                height: '128px',
                                                lineHeight: '32px',
                                                borderRadius: '50%',
                                            }}>

                                            <img
                                                src={fileTypes[item.type || 4]}
                                                style={{
                                                    padding: '13%'
                                                }}
                                            />
                                        </a>
                                    </div>
                                </Card>
                            </div>
                        )
                    )}
                </Slider>

            </Auxiliary>
        );
    }
}

export default Documents;
