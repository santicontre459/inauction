import React from "react";
import './index.css';
import Logo from './Logo';
import Navigation from './Navigation';
import MobileNavigation from './MobileNavigation';
import useWindowDimensions from './useDimensionalHook';

const NotLoggedHeader = props => {

  const { width } = useWindowDimensions();
    return(
      <div className="gx-layout-header-content">
        <div className="app-header-left">
          <Logo/>
        </div>
        <div className="app-header-right">
          {width < '768' ? <MobileNavigation/> :  <Navigation history={props.history} /> }
        </div>

      </div>
    )
};

export default NotLoggedHeader;
