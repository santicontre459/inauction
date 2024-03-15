import React, { Component } from "react";
import Auxiliary from "../../../util/Auxiliary";
import { Alert } from "antd";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import '../Index.css'
import PdfCarousel from "./pdfCarousel";
import Faqs from "./faqs";

const customer = JSON.parse(localStorage.getItem('jwtUser'));

//class
class BasicHelp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }


  render() {
    return (
        <Auxiliary>
          <Helmet>
            <title>iNauction Tool | {customer.subrole.description} | Events - Basic Help</title>
          </Helmet>
          <Breadcrumbs description = {"Events - Help"} name = {"Basic Help"} />

            <Alert className="module-informational-notes"
                   message="Informational Notes"
                   description="Basic Help includes all the documents you need to understand how the events work. Also, you have the
                                FAQ - Frequently asked questions Section where maybe you can find the most useful answer."
                   type="info"
                   showIcon
            />

          <PdfCarousel/>

          <Faqs/>

        </Auxiliary>
    )
  }
}
export default BasicHelp;
