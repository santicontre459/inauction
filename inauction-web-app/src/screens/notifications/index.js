import React, { Component } from "react";
import Auxiliary from "../../util/Auxiliary";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../components/breadcrumbs";
import './index.css';
import Notifications from './components/Notifications';

const customer = JSON.parse(localStorage.getItem('jwtUser'));

//class
class NotificationsList extends Component {
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
                    <title>iNauction Tool | {customer.subrole.description} | Notifications - List</title>
                </Helmet>
                <Breadcrumbs description = {"Notifications - All"} name = {"All"} />
                <Notifications history={this.props.history}/>
            </Auxiliary>
        )
    }
}

export default NotificationsList;
