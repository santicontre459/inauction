import React, { useState } from "react";
import { SwapLeftOutlined, SwapOutlined } from '@ant-design/icons';
import { Button, Col, Row, Tabs } from "antd";
import { lotState, lotTypes } from '../Constants';
import LotsContext from "./LotsContext";
import { connect } from "react-redux";
import { addLotsEvent } from "../../redux/eventActions";

const { TabPane } = Tabs;

const Lots = props => {

  const [lotType, setLotType] = useState(1);
  const [lots, setLots] = useState([{ lotName: '', data: [] }]);

  const { currency, currencies } = props;
  const selectedCurrency = currencies.find(item => item.id === currency);

  const addLotComponent = () => {
    const newLots = [...lots];
    newLots.push({ lotName: '', data: [] });
    setLots(newLots);
  }

  const deleteLotComponent = index => {
    const newLots = [...lots];
    newLots.splice(index, 1);
    setLots(newLots);
  }

  const setLotName = (index, lotName) => {
    let newLots = [...lots];
    newLots[index].lotName = lotName;
    setLots(newLots);
  }

  const addLotRow = index => {
    let newLots = [...lots];
    newLots[index].data.push({
      Id: Math.max(...lots[index].data.map(o => o.Id), 0) + 1,
      name: '',
      uom: '',
      quantity: '',
      currentPrice: '',
      qualificationPrice: '',
      currentValue: '',
      qualificationValue: '',
      action: 'EDIT'
    });
    setLots(newLots);
  }

  const updateLotRow = (valueName, value, record, lotIndex) => {
    let newLots = [...lots];
    const dataIndex = newLots[lotIndex].data.findIndex(item => item.Id === record.Id);
    let row = newLots[lotIndex].data[dataIndex];
    row[valueName] = value;
    row.currentValue = +row.quantity * +row.currentPrice;
    row.qualificationValue = +row.quantity * +row.qualificationPrice;
    newLots[lotIndex].data[dataIndex] = row;
    setLots(newLots);
  }

  const deleteLotRow = (record, lotIndex) => {
    let newLots = [...lots];
    const newLotData = newLots[lotIndex].data.filter(item => item.Id != record.Id);
    newLots[lotIndex].data = newLotData;
    setLots(newLots);
  }

  const onFinish = () => {
    const { event } = props.draftEvent;
    let lots_data = lots.filter(lot => lot.data != null && (lot.data.findIndex(d => d.action == lotState.submitted) != -1))
    if (lots_data.length == 0) { return }
    if (lotType == lotTypes.SingleLot) {
      lots_data = lots_data.slice(0, 1);
    }
    console.log(event?.id, lotType, lots_data)
    props.addLotsEvent(event?.id, lotType, lots_data)
      .then((data) => {
        console.log('addLotsEvent ', data)
        props.setLots({ lotType, lots_data });
        props.next();
      })
      .catch((err) => {
        console.log('addLotsEvent err ', err)
      })
  }

  const canSubmit = () => {
    return lots.findIndex(lot =>
      lot.data != null &&
      (lot.data.findIndex(d => d.action == lotState.submitted) != -1)) != -1
  }

  return (
    <>
      <h5 style={{ marginTop: '15px' }}>What type of Lot do you want to use for your Auction?</h5>
      <Row style={{ textAlign: 'center' }} gutter={[16, 0]}>
        <Col sm={24} md={12}>
          <h6><SwapOutlined /> Multiple Lots are used only in cases of complex lots. </h6>
        </Col>
        <Col sm={24} md={12}>
          <h6><SwapLeftOutlined /> Single Lots are used only in cases of single lots.</h6>
        </Col>
      </Row>
      <div>
        <Tabs
          defaultActiveKey={lotTypes[lotType]}
          onChange={key => setLotType(key)}
        >
          <TabPane
            tab={<span> <SwapOutlined /> Multiple Lots </span>}
            key={lotTypes.MultipleLots}
          >
            {lots.map((lot, index) => (
              <LotsContext
                index={index}
                lot={lot}
                lotsLength={lots.length}
                lotType={lotType}
                setLotName={setLotName}
                deleteLotComponent={deleteLotComponent}
                addLotRow={addLotRow}
                updateLotRow={updateLotRow}
                deleteLotRow={deleteLotRow}
                currency={selectedCurrency.slug}
                uomList={props.uomList}
              />
            ))}
            <Button
              onClick={addLotComponent}
              style={{ marginTop: "5px", float: 'right' }}
            >
              Add Lot Component
            </Button>
          </TabPane>
          <TabPane
            tab={<span> <SwapLeftOutlined />  Single Lot </span>}
            key={lotTypes.SingleLot}
          >
            <LotsContext
              index={0}
              lot={lots[0]}
              lotsLength={1}
              lotType={lotType}
              setLotName={setLotName}
              deleteLotComponent={deleteLotComponent}
              addLotRow={addLotRow}
              updateLotRow={updateLotRow}
              deleteLotRow={deleteLotRow}
              currency={selectedCurrency.slug}
              uomList={props.uomList}
            />
          </TabPane>
        </Tabs>
        <div className={"second-step-action"} style={{ float: "right" }}>
          <Button style={{ marginLeft: 8 }} onClick={props.previous}>
            Previous
          </Button>
          <Button type="primary" disabled={!canSubmit()} onClick={onFinish}>
            Save & Next Step
          </Button>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ createEvent, events }) => {
  const { draftEvent } = events;
  return {
    currencies: createEvent.settingsStep.currencies,
    uomList: events.uomList || [],
    draftEvent: draftEvent || {}
  }
};

export default connect(mapStateToProps, { addLotsEvent })(Lots);
