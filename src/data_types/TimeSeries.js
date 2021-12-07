//  Time Series
//  Desc (TODO)

//  Local Imports
//  Local Imports -> Graphic Components
import MultiBarPlotComponent from '../graph_components/MultiBarPlotComponent';
import MultiLinePlotComponent from '../graph_components/MultiLinePlotComponent';
import MultiAreaPlotComponent from '../graph_components/MultiAreaPlotComponent';
//  Local Imports -> Utils
import { ERROR_SELECTED_DEFAULT } from '../utils/text/TextInfo-pt';

//  External Imports
import React from "react";

export default class TimeSeries extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: null,
            plots:["Gráfico de Linha", "Gráfico de Área", "Gráfico de Barras"],
            selected: this.props.selected,
            sidebarPos: 'right'
        };
    }

    componentDidMount(){
        this.orderByDate();
    }

    componentDidUpdate(prevProps, prevState){
        if(!prevProps.options && this.props.options){
            this.setState({ sidebarOpen: true});
        }
    }

    orderByDate = () => {
        let tempArray = [];
        let tempElem = [];
        for(let i=0;i<this.props.data.data.length;i++){
            tempElem = {};

            if(this.props.data.header.time !== undefined){
                if(this.props.data.header.time.length === 2){
                    tempElem[this.props.data.header.id] = new Date(this.props.data.data[i][this.props.data.header.id]).toLocaleString("pt-PT", { month: "short" });
                } else if(this.props.data.header.time.length === 1){
                    tempElem[this.props.data.header.id] = new Date(this.props.data.data[i][this.props.data.header.id]).toLocaleString("pt-PT", { day : '2-digit'});
                } else {
                    tempElem[this.props.data.header.id] = new Date(this.props.data.data[i][this.props.data.header.id]).toLocaleDateString("pt-PT");
                }
            } else {
                tempElem[this.props.data.header.id] = new Date(this.props.data.data[i][this.props.data.header.id]).toLocaleDateString("pt-PT");
            }
            

            for(let j=0; j<this.props.data.header.value.length; j++){
                tempElem[this.props.data.header.value[j]] = this.props.data.data[i][this.props.data.header.value[j]];
            }
            tempArray.push(tempElem);
        }

        const sortArray = tempArray.sort((a, b) => b[this.props.data.header.id] < a[this.props.data.header.id] ? 1: -1);
        let returnArray = [];
        returnArray['header'] = this.props.data.header;
        returnArray['data'] = sortArray;

        this.setState({
            data: returnArray
        })
    }

    chooseGraph = () => {
        if(this.state.data !== null){
            switch(this.state.selected){
                case 0:
                    return <MultiLinePlotComponent 
                            data={this.state.data} 
                            options={this.props.options} 
                            plotSelection={[this.state.selected, this.state.plots, this.changeSelected, this.state.sidebarPos, this.changeDrawerPos]}/>;
                case 1:
                    return <MultiAreaPlotComponent 
                            data={this.state.data} 
                            options={this.props.options} 
                            plotSelection={[this.state.selected, this.state.plots, this.changeSelected, this.state.sidebarPos, this.changeDrawerPos]}/>;
                case 2:
                    return <MultiBarPlotComponent 
                            data={this.state.data} 
                            options={this.props.options} 
                            plotSelection={[this.state.selected, this.state.plots, this.changeSelected, this.state.sidebarPos, this.changeDrawerPos]}/>;
                default:
                    return <div>{ERROR_SELECTED_DEFAULT}</div>
            }
        }
    }

    

    changeDrawerPos = (value) => {
        this.setState({sidebarPos: value})
    }

    changeSelected = (e) => {
        this.setState({
          selected: e.target.value
        });
        //this.props.getOptions();
    }

    render(){
        return(
            <div>
                {this.chooseGraph()}
            </div>
        )
    }
}