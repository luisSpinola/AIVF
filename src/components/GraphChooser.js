//  Graph Chooser
//  Desc (TODO)

//  Local Imports
//  Local Imports -> Data Types
import OneNumerical from "../data_types/OneNumerical";
import NNumerical from "../data_types/NNumerical";
import DoubleNumerical from "../data_types/DoubleNumerical";
import TimeSeries from "../data_types/TimeSeries";
import GeoDens from "../data_types/GeoDens";
import GeoQuant from "../data_types/GeoQuant";
import GeoPathIcon from "../data_types/GeoPathIcon";
//  Local Imports -> Utils
import { LANGUAGE, LANGUAGE_FILES, API_GRAPH_EXISTS, API_GRAPH_GET, API_GRAPH_CREATE, API_SAVE_TO_DB, API_GET_FROM_DB } from "../utils/Conf";

//  External Imports
import React from "react";
//  External Imports -> Material-UI
import LinearProgress from '@material-ui/core/LinearProgress';
//  External Imports -> Database
import Cookies from 'js-cookie';
import axios from 'axios';


export default class GraphChooser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOptionsLoaded: true,
            data: null,
            selected: 0,
            previousOptions: null
        };
    }

    componentDidMount(){
        this.getOptions();
    }

    containsData = (data) => {
        let returnBool = false;
        (data.data && data.data.length) ? returnBool = true : returnBool = false;
        return returnBool;
    }

    chooseGraph = () => {
        if(this.state.isOptionsLoaded){
            let propsObj = {
                selected:this.state.selected, 
                identifier:this.props.identifier,
                data:this.props.data,
                options:this.props.options ,
                previousOptions: this.state.previousOptions,
                watchOptions: this.watchOptions,
                getOptions: this.getOptions       
            }
            switch(this.props.data.header.type){
                case "one_numerical":
                    return <OneNumerical propsObj={propsObj}/>;
                case "n_numerical":
                    return <NNumerical propsObj={propsObj}/>;
                case "double_numerical":
                    return <DoubleNumerical propsObj={propsObj}/>;
                case "time_series":
                    return <TimeSeries propsObj={propsObj}/>;
                case "geo_dens":
                    return <GeoDens propsObj={propsObj}/>;
                case "geo_quant":
                    return <GeoQuant propsObj={propsObj}/>;
                case "geo_path":
                    return <GeoPathIcon propsObj={propsObj}/>;
                default:
                    return <div></div>;
            }
        } else {
            return <div>{LANGUAGE_FILES[LANGUAGE['current']].WAITING_OPTIONS}<LinearProgress/></div>;
        }
    }

    watchOptionsUpdateDB = (userID, pageID, graphID, newGraphOptions, position) => {
        const csrftoken = Cookies.get('csrftoken');
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json", 'X-CSRFToken': csrftoken },
            body: JSON.stringify({
                    id_user: userID,
                    page_name: pageID, 
                    page_index: graphID, 
                    graph_options: newGraphOptions,
                    selected:position
            }),
        };
        fetch(API_GRAPH_CREATE,requestOptions);
    }

    watchOptions = (options, position) => {
        if(API_SAVE_TO_DB){
            axios.get(API_GRAPH_EXISTS + '/' + this.props.identifier[2] + '/' + this.props.identifier[0] + '/' + this.props.identifier[1]).then(response => {
                if(response.data[0].exists){ // it exists -> replace graph_options (where index === position) with new options
                    axios.get(API_GRAPH_GET + '/' + this.props.identifier[2] + '/' + this.props.identifier[0] + '/' + this.props.identifier[1]).then(response2 => {
                        let graph_options = JSON.parse(response2.data[0].graph_options);
                        graph_options[position] = options;
                        let graph_options_string = JSON.stringify(graph_options);
                        this.watchOptionsUpdateDB(this.props.identifier[2], this.props.identifier[0], this.props.identifier[1], graph_options_string, position);
                    });
                } else { // does not exist -> create
                    let graph_options = {};
                    graph_options[position] = options;
                    let graph_options_string = JSON.stringify(graph_options);
                    this.watchOptionsUpdateDB(this.props.identifier[2], this.props.identifier[0], this.props.identifier[1], graph_options_string, position);
                }
            });
        }
    }

    getOptions = () => {
        if(API_GET_FROM_DB){
            axios.get(API_GRAPH_EXISTS + '/' + this.props.identifier[2] + '/' + this.props.identifier[0] + '/' + this.props.identifier[1]).then(response => {
                if(response.data[0].exists){
                    axios.get(API_GRAPH_GET + '/' + this.props.identifier[2] + '/' + this.props.identifier[0] + '/' + this.props.identifier[1]).then(response2 => {
                        this.setState({
                            selected: response2.data[0].selected,
                            previousOptions: response2.data[0].graph_options,
                            isOptionsLoaded: true
                        });
                    });  
                } else {
                    this.setState({ isOptionsLoaded: true});
                }    
            });
        }
    }

    render(){
        return(
            <div>
                {this.chooseGraph()}
            </div>
        );
    }
}