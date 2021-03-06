import React, { Component } from 'react';
import { FormGroup, FormControl, Button, Grid, Row, Col } from 'react-bootstrap'

export default class BodyStartWorking extends Component {

    constructor() {
        super();
        this.state = {
            server_address: "http://127.0.0.1:8000/",
            work_page: {}
        }
    }

    //Adding new Collection/MS/Page to the DB
    reqAddCollectionListener() {
        console.log(this.responseText);
    }

    addCollection() {
        var coll_name = document.getElementById("collection_name_box");
        var coll_info_dict = {};
        console.log(coll_name.value); // remove
        coll_info_dict["name"] = coll_name.value;

        //Sending the registered user info to the server
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", this.reqAddCollectionListener);
        oReq.open("POST", this.state.server_address.concat("add_collection/"));
        oReq.send(JSON.stringify(coll_info_dict));

        return false;
    }

    reqAddManuscriptListener() {
        console.log(this.responseText);
    }

    addManuscript() {
        var ms_name = document.getElementById("ms_name_box");
        var ms_lang = document.getElementById("auto_comp_lang_add_ms")
        var ms_coll = document.getElementById("auto_comp_coll_add_ms")
        var ms_info_dict = {};
        ms_info_dict["name"] = ms_name.value;
        ms_info_dict["language"] = ms_lang.value;
        ms_info_dict["collection"] = ms_coll.value;

        //Sending the registered user info to the server
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", this.reqAddManuscriptListener);
        oReq.open("POST", this.state.server_address.concat("add_manuscript/"));
        oReq.send(JSON.stringify(ms_info_dict));

        return false;
    }

    reqAddPageListener() {
        console.log(this.responseText);
    }

    addPage() {
        var p_title = document.getElementById("p_title_box");
        var p_coll = document.getElementById("auto_comp_coll_add_page")
        var p_ms = document.getElementById("auto_comp_ms_add_page")
        var p_url = document.getElementById("p_url_box")
        var p_info_dict = {};
        p_info_dict["title"] = p_title.value;
        p_info_dict["collection"] = p_coll.value;
        p_info_dict["manuscript"] = p_ms.value;
        p_info_dict["image_src"] = p_url.value;

        //Sending the registered user info to the server
        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", this.reqAddPageListener);
        oReq.open("POST", this.state.server_address.concat("add_page/"));
        oReq.send(JSON.stringify(p_info_dict));

        return false;
    }

    reqSearchPageListener(req, calling_obj) {
        console.log(req.target.responseText);
        var response_json = JSON.parse(req.target.responseText);
        if (response_json["status"] !== "FAIL") {
            calling_obj.props.loadWorkSpace(response_json["value"]);
        }
        else {
            window.alert("ERROR: ".concat(response_json["value"]));
        }
    }

    searchPage() {
        //------------------Opens the annotation edit page in a new window--------------------//  
        window.open(this.state.server_address.concat("get_annotation_html/?collection=" + this.state.work_page["collection"] +
            "&manuscript=" + this.state.work_page["manuscript"] +
            "&page=" + this.state.work_page["page"] +
            "&user=" + this.props.getConnectedUser()));
    }

        handleChange(e) {
        switch (e.target.name) {
            case "collection":
                this.setState.work_page["collection"] = e.target.value;
                break;
            case "manuscript":
                this.setState.work_page["manuscript"] = e.target.value;
                break;
            case "page":
                this.setState.work_page["page"] = e.target.value;
                break;
            default:
                break;
        }
    }


    render() {
        return (
            <Grid>
                <h1>Start Working</h1>
                <br /><br />
                <Row>
                    <Col md={5}>
                        <FormGroup>
                            <Row>
                                <Col md={8}>
                                    <FormControl
                                        type="text"
                                        value={this.state.work_page["collection"]}
                                        placeholder="Collection"
                                        name="collection"
                                        onChange={this.handleChange.bind(this)}
                                        />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8}>
                                    <FormControl
                                        type="text"
                                        value={this.state.work_page["manuscript"]}
                                        placeholder="Manuscript"
                                        name="manuscript"
                                        onChange={this.handleChange.bind(this)}
                                        />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8}>
                                    <FormControl
                                        type="text"
                                        value={this.state.work_page["page"]}
                                        placeholder="Page"
                                        name="page"
                                        onChange={this.handleChange.bind(this)}
                                        />
                                </Col>
                                <Col>
                                    <Button bsSize="medium" onClick={this.searchPage.bind(this)}>OK</Button>
                                </Col>
                            </Row>
                            <FormControl.Feedback />
                        </FormGroup>
                    </Col>
                </Row>
            </Grid>
        )
    }
}