//  Graph Chooser
//  Desc (TODO)

//  Local Imports
//  Local Imports -> Data Types
import OneNumerical from "../data_types/OneNumerical";
import NNumerical from "../data_types/NNumerical";
import DoubleNumerical from "../data_types/DoubleNumerical";
//  Local Imports -> Utils
import { WAITING_OPTIONS } from "../utils/text/TextInfo-pt";

//  External Imports
import React from "react";
//  External Imports -> Material-UI
import LinearProgress from '@material-ui/core/LinearProgress';
export default class GraphChooser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOptionsLoaded: true,
            dataType: null,
            data: null,
            labels: null,
            selected: 0,
        };
    }

    componentDidMount(){
        this.selectedExists();
        if(this.containsData(this.props.data)) this.parseData(this.props.data);
    }

    selectedExists = () => {
        if(this.props.selected !== undefined) this.setState({selected: this.props.selected});  
    }

    containsData = (data) => {
        let returnBool = false;
        (data.data && data.data.length) ? returnBool = true : returnBool = false;
        return returnBool;
    }

    chooseGraph = () => {
        if(this.state.isOptionsLoaded){
            switch(this.state.dataType){
                case "one_numerical":
                    return <OneNumerical 
                                selected={this.state.selected} 
                                identifier={this.props.identifier}
                                data={this.props.data}
                                options={this.props.options}
                                />;
                case "n_numerical":
                    return <NNumerical 
                                selected={this.state.selected} 
                                identifier={this.props.identifier}
                                data={this.props.data}
                                options={this.props.options}
                                />;
                case "double_numerical":
                    return <DoubleNumerical 
                                selected={this.state.selected} 
                                identifier={this.props.identifier}
                                data={this.props.data}
                                options={this.props.options}
                                />;
                default:
                    return <div></div>;
            }
        } else {
            return <div>{WAITING_OPTIONS}<LinearProgress/></div>;
        }
    }

    parseData = (data) => {
        let dataArray = [];

        //  data.data
        for(let i=0; i<data.data.length; i++){
            let tempKey = "";
            let tempValues = [];
            let tempElem = [];
            Object.keys(data.data[i]).forEach(function(key){
                if(key === data.header.id[0]){
                    tempKey = data.data[i][key];
                }
                for(let j=0; j<data.header.value.length; j++){
                    if(key === data.header.value[j]){
                        tempValues.push(data.data[i][key]);
                    }                
                }
            })
            tempElem.push(tempKey);
            for(let j=0;j<tempValues.length; j++){
                tempElem.push(tempValues[j]);
            }
            dataArray.push(tempElem);
        }

        //  data.header.value
        let labelsArray = [""];
        for(let j=0; j<data.header.value.length;j++){
            labelsArray.push(data.header.value[j]);
        }

        this.setState({
            dataType: data.header.type, //  data.header.type
            data: dataArray,
            labels: labelsArray
        });
    }

    render(){
        return(
            <div>
                {this.chooseGraph()}
            </div>
        );
    }
}