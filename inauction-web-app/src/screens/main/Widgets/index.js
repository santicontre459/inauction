import React from "react";
import { Col, Row } from "antd";
import Productivity from "./components/Productivity";
import Newseletter from "./components/Newsletter";
import SocialMedia from "./components/SocialMedia";
import ProjectWidget from "./components/ProjectWidget";
import RoadMap from "./components/RoadMap";
import FlyingBird from "./components/FlyingBird";
import DryFruit from "./components/DryFruit";
import AayurvedaCard from "./components/AayurvedaCard";
import ToolTheDay from "./components/ToolTheDay";
import SmartHomeCard from "./components/SmartHomeCard";
import PhotosCard from "./components/PhotosCard";
import UnreadMessagesCard from "./components/UnreadMessagesCard";
import IconCard from "./components/IconCard";
import WorkStatusCard from "./components/WorkStatusCard";
import UserCard from "./components/UserCard";
import IncreamentCard from "./components/IncreamentCard";
import CampaignCard from "./components/CampaignCard";
import BuildingCard from "./components/BuildingCard";
import GreenStepCard from "./components/GreenStepCard";
import FriendshipCard from "./components/FriendshipCard";
import NewPhotos from "./components/NewPhotos";
import Auxiliary from "../../../util/Auxiliary";

const Widgets = () => {
  return (
    <Auxiliary>
      <Row>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <ProjectWidget/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <Productivity/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <SocialMedia/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <RoadMap/>
        </Col>
        <Col xl={8} lg={12} md={12} sm={12} xs={24}>
          <Newseletter/>
        </Col>
        <Col xl={8} lg={12} md={12} sm={12} xs={24}>
          <NewPhotos/>
        </Col>
        <Col xl={8} lg={12} md={12} sm={12} xs={24}>
          <FlyingBird/>
        </Col>

        <Col xl={4} lg={12} md={12} sm={12} xs={24}>
          <DryFruit/>
        </Col>

        <Col xl={4} lg={8} md={8} sm={12} xs={24}>
          <AayurvedaCard/>
        </Col>

        <Col xl={4} lg={8} md={8} sm={12} xs={24}>
          <ToolTheDay/>
        </Col>

        <Col xl={4} lg={8} md={8} sm={12} xs={24}>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <IconCard icon="noodles"/>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <IconCard icon="donut"/>
            </Col>
          </Row>
          <SmartHomeCard/>
        </Col>

        <Col xl={4} lg={12} md={12} sm={12} xs={24}>
          <PhotosCard/>
          <UnreadMessagesCard/>
        </Col>

        <Col xl={4} lg={12} md={12} sm={24} xs={24}>
          <WorkStatusCard/>
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <IconCard color="gx-bg-orange gx-icon-white" icon="burger"/>
            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={12}>
              <IconCard color="gx-bg-primary gx-icon-white" icon="pizza"/>
            </Col>
          </Row>
        </Col>

        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <UserCard/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <IncreamentCard/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <CampaignCard/>
        </Col>
        <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <BuildingCard/>
        </Col>

        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <GreenStepCard/>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
          <FriendshipCard/>
        </Col>
      </Row>
    </Auxiliary>
  );
};

export default Widgets;
