import React from "react";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import { HomeOutlined } from '@ant-design/icons';
import { Card, Breadcrumb } from "antd";
import '../../styles/breadcrumb.css';

// map & render your breadcrumb components however you want.
export const Breadcrumbs = withBreadcrumbs()(({ breadcrumbs, description, name }) => (

  <Card className="gx-card gx-custom-breadcrumb-card" title={description}>
    <Breadcrumb>
      {breadcrumbs.map(function(value, index){
        if(breadcrumbs.length === 4){
          delete breadcrumbs[2]
        }
      })}
      {breadcrumbs.map(({ match, breadcrumb}, i) => (
        <Breadcrumb.Item key={i}>
          {i === 0 ? <span className="gx-link custom-breadcrumb-home-icon"><HomeOutlined /></span> : ''}
          <span className="gx-link">
            {breadcrumbs.length === i + 1 ? name : breadcrumb}
          </span>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  </Card>
));
