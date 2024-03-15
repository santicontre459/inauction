import React, {useEffect} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import { verifyEmail } from '../redux/actions/authActions';

const VerifyIntermediate = (props)=> {

    const {match, errors, authNew} = props;

    useEffect(()=>{
        props.verifyEmail(match.params.email, match.params.token);
    },[]);

    // when user is authenticated
    // response success 1 (200 - verified successfully)
    // response success 2 (202 - already verified)
    if (authNew.isAuthenticated) {
      // if user tries with an url which doesn't contain the same email as the authenticated user
      if (authNew.user.email !== match.params.email){
        switch (authNew.user.verification_status) {
          case "EMAIL_NOT_VERIFIED":
            props.history.replace('/bidder-registration-success');
            break;
          case "COMPANY_NOT_ADDED":
            props.history.replace('/company-verification');
            break;
          case "COMPANY_VERIFICATION_PROCESS":
            props.history.replace('/company-verification-pending');
            break;
          case "COMPANY_VERIFICATION_MORE_INFO_NEEDED":
            props.history.replace('/company-verification-more-info-required');
            break;
          default:
            props.history.replace('/inauction-tool-platform-waiting');
            break;
        }
      }
      else if (authNew.emailAlreadyVerified) {
        switch (authNew.user.verification_status) {
          case "EMAIL_NOT_VERIFIED":
            props.history.replace('/bidder-registration-success');
            break;
          case "COMPANY_NOT_ADDED":
            props.history.replace('/company-verification');
            break;
          case "COMPANY_VERIFICATION_PROCESS":
            props.history.replace('/company-verification-pending');
            break;
          case "COMPANY_VERIFICATION_MORE_INFO_NEEDED":
            props.history.replace('/company-verification-more-info-required');
            break;
          default:
            props.history.replace('/inauction-tool-platform-waiting');
            break;
        }
      } else if (authNew.emailVerified) {
        return <Redirect to={"/company-verification"} />
      }
      else {
        switch (authNew.user.verification_status) {
          case "EMAIL_NOT_VERIFIED":
            props.history.replace('/bidder-registration-success');
            break;
          case "COMPANY_NOT_ADDED":
            props.history.replace('/company-verification');
            break;
          case "COMPANY_VERIFICATION_PROCESS":
            props.history.replace('/company-verification-pending');
            break;
          case "COMPANY_VERIFICATION_MORE_INFO_NEEDED":
            props.history.replace('/company-verification-more-info-required');
            break;
          default:
            props.history.replace('/inauction-tool-platform-waiting');
            break;
        }
      }
    }
    else {
      if (authNew.emailVerified) {
        return <Redirect to={"/company-verification"} />
      }
      else {
        return <Redirect to={"/login"} />
      }
    }

    // manage errors cases
    if (errors && errors.message){
      if (authNew.isAuthenticated) {
        switch (authNew.user.verification_status) {
          case "EMAIL_NOT_VERIFIED":
            props.history.replace('/bidder-registration-success');
            break;
          case "COMPANY_NOT_ADDED":
            props.history.replace('/company-verification');
            break;
          case "COMPANY_VERIFICATION_PROCESS":
            props.history.replace('/company-verification-pending');
            break;
          case "COMPANY_VERIFICATION_MORE_INFO_NEEDED":
            props.history.replace('/company-verification-more-info-required');
            break;
          default:
            props.history.replace('/inauction-tool-platform-waiting');
            break;
        }
      }
      else {
        props.history.replace('/login');
      }

    }
    return(<div>{errors?.message}</div>);
};

const mapStateToProps = ({authNew, errors}) => {
  return {authNew, errors}
};

export default connect(mapStateToProps, {verifyEmail})(VerifyIntermediate);
