import React from "react";
import {Button, Card, Input} from "antd";
import '../GeneralInformation/Index.css'
import IntlMessages from "../../../../util/IntlMessages";
import { Link } from "react-router-dom";

const loginDetails = {
    Email: '',
    Password: '',
    };

const LoginDetails  = () => {
    return (
        <Card className="gx-card user-profile-gx-card input-form-border" title={"Login - Details"}>
            <span className="gx-media-input-form-details">
               <IntlMessages id="user.profile.login.information"/>
            </span>
            <div className="gx-media gx-align-items-center gx-flex-nowrap  user-profile-gx-media-card">
                <div className="gx-mr-3 gx-pt-1 input-margin-top-m">
                    <i className={`icon icon-email gx-fs-xxl gx-text-grey`}/>
                </div>

                <div className="gx-media-body custom-profile-gx-media-body">
                    <Input type={'email'} placeholder={'Email'} defaultValue={loginDetails.Email}/>
                </div>

                <div className="gx-ml-3 input-margin-top-m">
                    <Button type="primary" className="gx-mb-0"> {/*onClick={ChangePassword}*/}
                        <IntlMessages id="user.profile.login_details.verify"/>
                    </Button>
                </div>
            </div>
            <div className="gx-media gx-align-items-center gx-flex-nowrap">
                <div className="gx-mr-3 gx-pt-1  input-margin-top-m">
                    <i className={`icon icon-forgot-password gx-fs-xxl gx-text-grey`}/>
                </div>

                <div className="gx-media-body custom-profile-gx-media-body">
                    <Input className={'ant-input-disabled'} id={'passwordInput'} type={'password'} placeholder={'Password'} defaultValue={loginDetails.Password}/>
                </div>

                <div className="gx-ml-3 input-margin-top-m">
                    <Link to={"/account/change-password"}>
                        <Button id="changePassword" type="primary" className="gx-mb-0">
                            <IntlMessages id="user.profile.login_details.change_password"/>
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    )
};


export default LoginDetails;
