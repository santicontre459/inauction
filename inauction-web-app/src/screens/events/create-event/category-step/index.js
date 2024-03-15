import React, { Component } from "react";
import '@ant-design/compatible/assets/index.css';
import { Form, Button, Select } from "antd";
import { connect } from "react-redux";
import { getCategories, getCompanyActivities } from "../../../../redux/actions/ativityActions";
import CircularProgress from "../../../../components/CircularProgress";

const { Option, OptGroup } = Select;
const FormItem = Form.Item;

class Category extends Component {

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    if (this.props.categories.length === 0) await this.props.getCategories();
    if (this.props.company_activities.length === 0) await this.props.getCompanyActivities(this.props.user?.company?.id);
  }

  onFinish = values => {
    const fields = { category: values.category, activity: values.activity };
    this.props.setCategoryFields(fields);
    this.props.next();
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }

  render() {
    const { categories, company_activities, loading } = this.props;
    const { category, activity } = this.props.categoryStepFields;

    console.log('company_activities ',  company_activities);
    return (
      <>
        {loading ?
          <CircularProgress className="gx-loader-400" />
          :
          <Form
            name='category-step-fields'
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
            initialValues={{ category: category, activity: activity }}
            layout="vertical"
          >
            <div className="gx-media gx-align-items-center gx-flex-nowrap">
              <div className="gx-media-body create-event-gx-media-body">

                <FormItem
                  name='category'
                  label={`Choose the type of category for your event to get started.`}
                  rules={[{ required: true, message: 'Category is required!' }]}
                >
                  <Select
                    getPopupContainer={trigger => trigger.parentNode}
                    showSearch
                    style={{ "width": "90%" }}
                    placeholder="Select Category"
                    optionFilterProp="children"
                    className="activities-add-gx-media-card"
                    filterOption={(input, option) =>
                      option.props.children.toString().toLowerCase().indexOf(input.toString().toLowerCase()) >= 0
                    }
                  >
                    {categories && categories.map(category =>
                      <Option key={category.id} value={category.id}>
                        {category.name}
                      </Option>
                    )}
                  </Select>
                </FormItem>

                <FormItem
                  name='activity'
                  label={`Choose the type of activity.`}
                  rules={[{ required: true, message: 'Activity is required!' }]}
                >
                  <Select
                    getPopupContainer={trigger => trigger.parentNode}
                    showSearch
                    style={{ "width": "90%" }}
                    placeholder="Select Activity"
                    optionFilterProp="children"
                    className="activities-add-gx-media-card"
                  >
                    {company_activities && company_activities.map(parentActivity =>
                      <OptGroup key={parentActivity.category_id} label={parentActivity.category_name}>
                        <Option key={parentActivity.id} value={parentActivity.id}>
                          {parentActivity.name}
                        </Option>
                      </OptGroup>
                    )}
                  </Select>
                </FormItem>

              </div>
            </div>

            <div className={"second-step-action"} style={{ float: "right" }}>
              <Button type="primary" htmlType="submit">
                Next Step
              </Button>
            </div>

          </Form>
        }
      </>
    );
  }
}


const mapStateToProps = ({ authNew, activityReducer }) => {
  const {user} = authNew; 
  const categories = activityReducer.categories;
  const company_activities = activityReducer.company_activities;
  const loading = activityReducer.loading || false;
  return {user, loading, categories, company_activities }
};

const mapDispatchToProps = {
  getCategories,
  getCompanyActivities,
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
