import React, {Component} from "react";
import {connect} from "react-redux";
import URLSearchParams from 'url-search-params'
import {Redirect, Route, Switch} from "react-router-dom";
import {ConfigProvider} from "antd";
import {IntlProvider} from "react-intl";
import AppLocale from "lngProvider";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import VerifyIntermediate from "../VerifyIntermediate";
import ForgotPassword from "../ForgotPassword";
import ResetPassword from "../ResetPassword";
import CompanyVerification from "../CompanyVerification";
import SignUpHostRegister from "../SignUpHostRegister";
import BidderRegistrationSuccess from '../BidderRegistrationSuccess';
import CompanyVerificationMoreInfoRequired from '../CompanyVerificationMoreInfoRequired';
import CompanyVerificationPending from '../CompanyVerificationPending';
import iNauctionToolPlatformWaiting from '../iNauctionToolPlatformWaiting';
import About from "../../screens/static-screens/About";
import Faq from "../../screens/static-screens/FrequentlyAskedQuestions";
import Contact from "../../screens/static-screens/Contact";
import TermsAndConditions from "../../screens/static-screens/TermsAndConditions";
import PrivacyPolicy from "../../screens/static-screens/PrivacyPolicy";
import Sitemap from "../../screens/static-screens/Sitemap";
import EventList from "../../screens/static-screens/EventList"
import {setInitUrl} from "iNRedux/actions/Auth";
import {onLayoutTypeChange, onNavStyleChange, setThemeType} from "iNRedux/actions/Setting";

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";
import { getAppNotifications } from "../../redux/actions/appNotificationsActions";
import { MainApp } from "./MainApp";

  const RestrictedRoute = ({component: Component, authUser, ...rest}) =>{
    return <Route {...rest} render={
      props => {
        if (authUser.isAuthenticated) {
          return <Component {...props} />
        } else {
          return <Redirect to={{ pathname: '/login', state: {from: props.location}}} />
        }
      }
    }
    />
  };


class App extends Component {

  setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };

  setNavStyle = (navStyle) => {
    if (navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER) {
      document.body.classList.add('full-scroll');
      document.body.classList.add('horizontal-layout');
    } else {
      document.body.classList.remove('full-scroll');
      document.body.classList.remove('horizontal-layout');
    }
  };

  componentDidMount() {
    this.props.getAppNotifications();

    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
    const params = new URLSearchParams(this.props.location.search);

    if (params.has("theme")) {
      this.props.setThemeType(params.get('theme'));
    }

    if (params.has("nav-style")) {
      this.props.onNavStyleChange(params.get('nav-style'));
    }

    if (params.has("layout-type")) {
      this.props.onLayoutTypeChange(params.get('layout-type'));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.authNew.isAuthenticated !== prevProps.authNew.isAuthenticated) {
      this.props.getAppNotifications();
    }
  }

  // check if accessed url (screen path) is a static web page
  isStaticPage = () => {

    const { location } = this.props;
    return (
    location.pathname === '/about'
    || location.pathname === '/faq'
    || location.pathname === '/contact'
    || location.pathname === '/terms-and-conditions'
    || location.pathname === '/privacy-policy'
    || location.pathname === '/sitemap'
    || location.pathname === '/event-list'
    )
  };

  render() {
    const { match, location, layoutType, navStyle, locale, authNew } = this.props;


    if (location.pathname === '/') {
      if (authNew.isAuthenticated === false) {
        return ( <Redirect to={'/login'} /> );
      } else {
        // TODO :BEFORE V1 RELEASE (Manage better this scenario)
        return ( <Redirect to={'/dashboard'}/> );
        // return <Redirect to={'/inauction-tool-platform-waiting'} />;
      }
    }

    if (authNew.isAuthenticated === true) {
      switch (authNew.user.verification_status) {
        case "EMAIL_NOT_VERIFIED":
          if(!(location.pathname ==="/bidder-registration-success" || location.pathname.includes("/verify-intermediate"))){
            return <Redirect to={"/bidder-registration-success"} />
          }else{
            break
          }
        case "COMPANY_NOT_ADDED":
          if (location.pathname !=="/company-verification") {
            return <Redirect to={"/company-verification"} />
          } else {
            break
          }
        case "COMPANY_VERIFICATION_PROCESS":
          if (location.pathname !=="/company-verification-pending") {
            return <Redirect to={"/company-verification-pending"} />
          } else {
            break
          }
        case "COMPANY_VERIFICATION_MORE_INFO_NEEDED":
          if(location.pathname !=="/company-verification-more-info-required"){
            return <Redirect to={"/company-verification-more-info-required"} />
          }else{
            break
          }
        default:
          break;
      }
    }else{
      if (!(
            location.pathname === '/login'
            || location.pathname === '/register'
            || location.pathname === '/forgot-password'
            || location.pathname === '/reset-password'
            || location.pathname === '/host-registration-form'
            || (location.pathname.split("/")[2] === 'email' && location.pathname.split("/")[4] === 'token')
            || this.isStaticPage
            )) {
        return <Redirect to={'/login'} />
      }
    }

    this.setLayoutType(layoutType);

    this.setNavStyle(navStyle);

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <ConfigProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <Switch>
            <Route exact path='/login' component={SignIn} />
            <Route exact path='/register' component={SignUp} />
            <Route exact path='/forgot-password' component={ForgotPassword} />
            <Route exact path='/reset-password' component={ResetPassword} />
            <Route exact path='/company-verification' component={CompanyVerification} />
            <Route exact path='/host-registration-form' component={SignUpHostRegister} />
            <Route exact path='/bidder-registration-success' component={BidderRegistrationSuccess} />
            <Route exact path='/verify-intermediate/email/:email/token/:token' component={VerifyIntermediate} />
            <Route exact path='/company-verification-pending' component={CompanyVerificationPending} />
            <Route exact path='/company-verification-more-info-required' component={CompanyVerificationMoreInfoRequired} />
            <Route exact path='/about' component={About} />
            <Route exact path='/faq' component={Faq} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path ='/terms-and-conditions' component={TermsAndConditions} />
            <Route exact path ='/privacy-policy' component={PrivacyPolicy} />
            <Route exact path ='/sitemap' component={Sitemap} />
            <Route exact path ='/event-list' component={EventList} />
            {/* TODO :BEFORE V1 RELEASE (Manage better this scenario) */}
            {/* <RestrictedRoute exact path='/inauction-tool-platform-waiting' authUser={authNew} component={MainApp} /> */}
            <RestrictedRoute path={`${match.url}`}  authUser={authNew} component={MainApp} />
          </Switch>
        </IntlProvider>
      </ConfigProvider>
    )
  }
}

const mapStateToProps = ({settings, auth, authNew}) => {
  const {locale, navStyle, layoutType} = settings;
  const {initURL} = auth;
  return {locale, navStyle, layoutType, initURL, authNew}
};
export default connect(mapStateToProps, {getAppNotifications, setInitUrl, setThemeType, onNavStyleChange, onLayoutTypeChange})(App);
