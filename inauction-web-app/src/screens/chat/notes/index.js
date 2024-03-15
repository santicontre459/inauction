import React, { Component } from "react";
import Auxiliary from "../../../util/Auxiliary";
import { Alert } from "antd";
import { Helmet } from "react-helmet";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import '../index.css'
//todo replace this with another library
//import ReactStickies from 'react-stickies';
import { connect } from 'react-redux';
import { onGetSticky } from "../../../iNRedux/actions/Notes";

const customer = JSON.parse(localStorage.getItem('jwtUser'));

//class
class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        }
    }

    componentDidMount() {
        this.props.onGetSticky();
    }

    componentDidUpdate(nextProps) {
        if (nextProps) {
            // this.getListOfNotes();
        }
    }

    getListOfNotes() {
        this.setState({ notes: this.props })
    }

    onAdd = (note) => {
        console.log("new note: ", note);
    }

    onChange = (notes) => {
        console.log("notes: ", notes)
    };

    onTitleChange = (text, note) => {
        console.log(text, note)
    }

    onDelete = (note) => {
        console.log(note)
    }

    render() {
        return (
            <Auxiliary>
                <Helmet>
                    <title>iNauction Tool | {customer.subrole.description} | Notes</title>
                </Helmet>
                <Breadcrumbs description={"Chat Module - Notes"} name={"Notes"} />
                <Alert className="module-informational-notes"
                       message="Informational Notes"
                       description="Use our Notes App to organize all your tasks and events at iNauction. You can create and edit
                                    your notes any time"
                       type="info"
                       showIcon
                />
                {/*<ReactStickies*/}
                {/*    notes={this.state.notes}*/}
                {/*    onChange={this.onChange}*/}
                {/*    onTitleChange={this.onTitleChange}*/}
                {/*    onAdd={this.onAdd}*/}
                {/*    onDelete={this.onDelete}*/}
                {/*/>*/}
            </Auxiliary>
        );
    }
}

function mapStateToProps({ notes }) {
    const { notesList } = notes;
    return { notesList };
}

export default connect(mapStateToProps, { onGetSticky })(Notes);
