import React, { useEffect } from "react";
import { QuestionCircleOutlined } from '@ant-design/icons';
import Auxiliary from "../../../../util/Auxiliary";
import { Form, Col, Input, Row, Statistic, Popconfirm, Button } from "antd";
import QuestionSection from './QuestionSection';
import '../style.css';

const SectionModal = ({
	section,
	sectionIndex,
	questionnaire,
	updateSection,
	removeQuestionnaireSection,
	updateQuestion,
	addQuestionInSection,
	removeQuestionInSection,
	allSectionsWeighting,
	allQuestionsWeighting,
	validateFormFlag,
}) => {

	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue({
			sectionName: section.sectionName,
			sectionDescription: section.sectionDescription,
			weighting: section.weighting,
		});
	}, [questionnaire]);

	useEffect(()=>{
		if (validateFormFlag) {
			form.validateFields()
		}
	}, [validateFormFlag])

	const onValuesChange = value => {
		const propName = Object.keys(value)[0];
		const propValue = value[Object.keys(value)];
		const validatedInput = getValidatedNumberInput(propName, propValue);
		updateSection(propName, validatedInput, sectionIndex);
	}

	const getValidatedNumberInput = (propName, propValue) => {
        if (propName !== 'weighting') return propValue;
		let newWeighting = +propValue;
		const restOfSectionsWeighting = allSectionsWeighting - section.weighting;
		const newAllSectionsWeighting = restOfSectionsWeighting + newWeighting;
		if (newAllSectionsWeighting > 100) newWeighting = 100 - restOfSectionsWeighting;
		if (newWeighting < 0) newWeighting = 0;
		form.setFieldsValue({ weighting: newWeighting.toString() });
		return newWeighting;
    }

	return (
		<Auxiliary key={section.id}>
		  	<Col span={24} className='sectionBackground'>
				<Row gutter={[16, 0]}>
					<Col span={24}>
						<span style={{"float": "right"}}>
			  				<Popconfirm
								title={questionnaire.sections.length > 1 ? "Are you sure delete this section？" : "You must have at least one section"}
								onConfirm={() => removeQuestionnaireSection(sectionIndex)}
								icon={<QuestionCircleOutlined style={{color: 'red'}} />}
							>
								<a><i className="icon icon-trash"/></a>
			  				</Popconfirm>
						</span>
					</Col>
				</Row>
				<Row gutter={[16, 0]}>
			  		<Col span={24} style={{display: 'inline-flex'}}>
						<h3 style={{textAlign: "center", flex: 'auto'}}>SECTION {sectionIndex + 1}</h3>
						{(questionnaire.weighting_type === 1 || questionnaire.weighting_type === 3) &&
							<Statistic
								style={{float: 'right'}}
								title="Weight"
								value={section.weighting}
								suffix="/ 100%"
							/>
						}
			  		</Col>
				</Row> 
				<Form
					form={form}
					name={`Section ${sectionIndex}`}
					onValuesChange={onValuesChange}
					layout="vertical"
				>
					<Form.Item 
						label="Section Name"
						name="sectionName"
						rules={[{ required: true, message: 'Please input section name!'}]}
					>
						<Input placeholder='Enter section name'/>
					</Form.Item>
					<Form.Item 
						label="Description"
						name="sectionDescription"
						rules={[{ required: true, message: 'Please input section description!'}]}
					>
						<Input placeholder='Enter section description'/>
					</Form.Item>
					{(questionnaire.weighting_type === 1 || questionnaire.weighting_type === 3) &&
						<Form.Item 
							label="Weighting"
							name="weighting"
							rules={[{ required: true, message: 'Please select section weight!'}]}
						>
							<Input
								addonAfter="%"
								type="number"
							/>
						</Form.Item>
					}
				</Form>
				<QuestionSection
					questionnaire={questionnaire}
					sectionIndex={sectionIndex}
					updateQuestion={updateQuestion}
					addQuestionInSection={addQuestionInSection}
					removeQuestionInSection={removeQuestionInSection}
					allQuestionsWeighting={allQuestionsWeighting}
					validateFormFlag={validateFormFlag}
				/>
		  	</Col>
		</Auxiliary>
	);
};

export default SectionModal;
