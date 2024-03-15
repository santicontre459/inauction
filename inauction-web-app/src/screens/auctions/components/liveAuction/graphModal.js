import React from "react";
import { Modal } from 'antd';
import AmCharts from "@amcharts/amcharts3-react";

const config = {
    "type": "serial",
    "theme": "light",
    "marginRight": 80,
    "marginTop": 17,
    "autoMarginOffset": 20,
    "dataProvider": [{
        "time": "10:40",
        "bid": 12.5
    }, {
        "time": "11:50",
        "bid": 10.08
    }],
    "valueAxes": [{
        "dashLength": 1,
        "guides": [{
            "dashLength": 6,
            "inside": true,
            "label": "average",
            "lineAlpha": 1,
            "value": 90.4
        }],
        "position": "left"
    }],
    "graphs": [{
        "bullet": "round",
        "id": "g1",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 7,
        "lineThickness": 2,
        "title": "Bid",
        "type": "smoothedLine",
        "useLineColorForBulletBorder": true,
        "valueField": "bid"
    }],
    "chartScrollbar": {},
    "chartCursor": {
        "valueLineEnabled": true,
        "valueLineBalloonEnabled": true,
        "valueLineAlpha": 0.5,
        "fullWidth": true,
        "cursorAlpha": 0.05
    },
    "categoryField": "time",
    "export": {
        "enabled": true
    }
};


class GraphModal extends React.Component {
    state = {visible: false};

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    render() {
        return (
            <div>
                <Modal
                    title={"Current Bids: " + this.props.eventName}
                    visible={this.props.visibility}
                    onOk={this.props.onOk}
                    onCancel={this.props.onOk}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    centered={true}
                >
                    <AmCharts.React style={{width: "100%", height: "400px"}} options={config}/>
                </Modal>
            </div>
        );
    }
}

export default GraphModal;
