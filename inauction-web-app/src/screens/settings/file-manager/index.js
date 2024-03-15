import React, { Component } from "react";
import Auxiliary from "../../../util/Auxiliary";
import { Badge, Button, Menu, Alert } from "antd";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import '../index.css'
import CustomScrollbars from "../../../util/CustomScrollbars";

const customer = JSON.parse(localStorage.getItem('jwtUser'));

//class
class FileManager extends Component {

    MenuManagerSideBar = () => {
        const SubMenu = Menu.SubMenu;
        return (
            <div className="gx-module-side">
                <div className="gx-module-side-content">
                    <Menu
                        defaultOpenKeys={['sub1']}
                        mode="inline">

                        <SubMenu key="sub1" title={<span> <strong>File list group</strong></span>}>
                            <Menu.Item className="li-padding-left-menu" key="2">Verification Documents &nbsp; <span className="badge-left"> <Badge style={{ backgroundColor: '#52c41a' }} count={25} /></span>    </Menu.Item>
                            <Menu.Item className="li-padding-left-menu" key="3">Event Documents&nbsp;<span className="badge-left"> <Badge style={{ backgroundColor: '#ffb606' }} count={25} /></span> </Menu.Item>
                            <Menu.Item className="li-padding-left-menu" key="4">Other Documents&nbsp;<span className="badge-left"> <Badge style={{ backgroundColor: '##34495e' }} count={25} /></span> </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        )
    }

    FileManagerSideBar = () => {
        return (
            <div style={{ "border": "1px solid #e4e5e7;" }}>
                <div className="gx-module-side">
                    <div className="gx-module-side-content">
                        <CustomScrollbars className="gx-module-side-scroll">
                            <div className="gx-module-add-task">
                                <Button type="primary" className="gx-btn-block"> File Manager </Button>
                            </div>
                            {/* <Card className="gx-card"> */}
                            <ul className="gx-module-nav" >
                                <li className="gx-module-nav-label first-item-menu">
                                    <span><i className={`icon icon-folder`} /> Files</span>
                                </li>
                                <li className="li-padding-left">
                                    <span className='gx-link'>
                                        <span>  <i className={`icon icon-files green-badge`} />   Verification Documents</span>
                                    </span>
                                </li>
                                <li className="li-padding-left">
                                    <span className='gx-link'>
                                        <span>  <i className={`icon icon-files yellow-badge`} />   Event Documents</span>
                                    </span>
                                </li>
                                <li className="li-padding-left">
                                    <span className='gx-link'>
                                        <span>  <i className={`icon icon-files darkblue-badge`} />   Other Documents</span>
                                    </span>
                                </li>
                            </ul>
                            <hr></hr>
                            {this.MenuManagerSideBar()}

                        </CustomScrollbars>
                    </div>
                </div>
            </div>
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            drawerState: false,
            documents: {
                verificationDocuments: 0,
                eventDocuments: 0,
                otherDocuments: 0
            }
        }
    }

    componentDidMount() {
    }

    render() {
        const { selectedToDos, loader, drawerState, toDos, alertMessage, showMessage } = this.state;
        return (
            <Auxiliary>
                <Helmet>
                    <title>iNauction Tool | {customer.subrole.description} | Settings - File Manager</title>
                </Helmet>
                <Breadcrumbs description={"Settings - File Manager"} name={"File Manager"} />
                <Alert className="module-informational-notes"
                       message="Informational Notes"
                       description="Here are listed all the documents that you have interacted with. The documents are categorized based
                                    on Events Related, Verifications Related and Other Documents"
                       type="info"
                       showIcon
                />

                <div className="gx-main-content">
                    <div className="main-content-custom">
                        <div className="gx-d-block gx-d-lg-none">
                            {this.FileManagerSideBar()}
                        </div>
                        <div className="gx-module-sidenav gx-d-none gx-d-lg-flex">
                            {this.FileManagerSideBar()}
                        </div>
                        <div className="gx-module-box">
                            <div className="gx-module-box-header">
                                <span className="gx-drawer-btn gx-d-flex gx-d-lg-none">
                                    <i className="icon icon-menu gx-icon-btn" aria-label="Menu" />
                                </span>
                                <span>All Files</span>
                            </div>
                            <div className="gx-module-box-content"></div>
                        </div>
                    </div>
                </div>
            </Auxiliary>
        )
    }
}
export default FileManager;