import React, {Component} from "react";
import FAQ from "../../../components/FAQ/FAQ";
import { Card } from "antd";

//class
class Faqs extends Component {
    render() {
        return (
            <Card
                className="gx-card user-profile-gx-card input-form-border"
                title={'FAQs'}
            >
                 <span className="gx-media-input-form-details">
                     Here you can find the most asked questions
                 </span>
                <div className="App user-profile-gx-media-card" style={{paddingTop:'15px'}}>
                    <FAQ>
                        <FAQ.QAItem>
                            <FAQ.Question answerId="q1">
                                {(isOpen, onToggle) => {
                                    return (
                                        <>
                                            {isOpen ? "Open " : "Close "}
                                            <span>What is your question?</span>
                                        </>
                                    );
                                }}
                            </FAQ.Question>
                            <FAQ.Answer id="q1"> Knock Knock! </FAQ.Answer>
                        </FAQ.QAItem>
                        <FAQ.QAItem>
                            <FAQ.Question answerId="q2">
                                {(isOpen, onToggle) => {
                                    return (
                                        <>
                                            {isOpen ? "Open " : "Close "}
                                            <span>Why do you ask such stupid questions?</span>
                                        </>
                                    );
                                }}
                            </FAQ.Question>
                            <FAQ.Answer id="q2"> 42 is the answer. </FAQ.Answer>
                        </FAQ.QAItem>
                        <FAQ.QAItem>
                            <FAQ.Question answerId="q3">
                                {(isOpen, onToggle) => {
                                    return (
                                        <>
                                            {isOpen ? "Open " : "Close "}
                                            <span>Any other questions?</span>
                                        </>
                                    );
                                }}
                            </FAQ.Question>
                            <FAQ.Answer id="q3"> Seek and you shall find. </FAQ.Answer>
                        </FAQ.QAItem>
                        <FAQ.QAItem>
                            <FAQ.Question answerId="q4">
                                {(isOpen, onToggle) => {
                                    return (
                                        <>
                                            {isOpen ? "Open " : "Close "}
                                            <span>Any other questions?</span>
                                        </>
                                    );
                                }}
                            </FAQ.Question>
                            <FAQ.Answer id="q4"> Seek and you shall find. </FAQ.Answer>
                        </FAQ.QAItem>
                        <FAQ.QAItem>
                            <FAQ.Question answerId="q5">
                                {(isOpen, onToggle) => {
                                    return (
                                        <>
                                            {isOpen ? "Open " : "Close "}
                                            <span>Any other questions?</span>
                                        </>
                                    );
                                }}
                            </FAQ.Question>
                            <FAQ.Answer id="q5"> Seek and you shall find. </FAQ.Answer>
                        </FAQ.QAItem>
                    </FAQ>
                </div>
            </Card>
        )
    }
}

export default Faqs;
