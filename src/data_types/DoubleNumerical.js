//  Double Numerical
//  Desc (TODO)

//  Local Imports
//  Local Imports -> Graphic Components
import MultiBarPlotComponent from '../graph_components/MultiBarPlotComponent';
import MultiLinePlotComponent from '../graph_components/MultiLinePlotComponent';
import MultiAreaPlotComponent from '../graph_components/MultiAreaPlotComponent';
import SideBySideBarComponent from '../graph_components/SideBySideBarComponent';
import ScatterPlotComponent from '../graph_components/ScatterPlotComponent';
//  Local Imports -> Utils
import { ERROR_SELECTED_DEFAULT } from '../utils/text/TextInfo-pt';

//  External Imports
import React from "react";

export default class DoubleNumerical extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            plots:["Barras Lado a Lado", "Gráfico de Dispersão", "Gráfico de Linha", "Gráfico de Área", "Gráfico de Barras"],
            selected: this.props.propsObj.selected,
            sidebarPos: 'right'
        };
    }

    chooseGraph = () => {
        switch(this.state.selected){
            case 0:
                return <SideBySideBarComponent 
                        data={this.props.propsObj.data} 
                        options={this.props.propsObj.options} 
                        plotSelection={[this.state.selected, this.state.plots, this.changeSelected, this.state.sidebarPos, this.changeDrawerPos]}/>;
            case 1:
                return <ScatterPlotComponent 
                        data={this.props.propsObj.data} 
                        options={this.props.propsObj.options} 
                        plotSelection={[this.state.selected, this.state.plots, this.changeSelected, this.state.sidebarPos, this.changeDrawerPos]}/>;
            
            case 2:
                return <MultiLinePlotComponent 
                        data={this.props.propsObj.data} 
                        options={this.props.propsObj.options} 
                        plotSelection={[this.state.selected, this.state.plots, this.changeSelected, this.state.sidebarPos, this.changeDrawerPos]}/>;
            case 3:
                return <MultiAreaPlotComponent 
                        data={this.props.propsObj.data} 
                        options={this.props.propsObj.options} 
                        plotSelection={[this.state.selected, this.state.plots, this.changeSelected, this.state.sidebarPos, this.changeDrawerPos]}/>;
            case 4:
                return <MultiBarPlotComponent 
                        data={this.props.propsObj.data} 
                        options={this.props.propsObj.options} 
                        plotSelection={[this.state.selected, this.state.plots, this.changeSelected, this.state.sidebarPos, this.changeDrawerPos]}/>;
            default:
                return <div>{ERROR_SELECTED_DEFAULT}</div>
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(!prevProps.propsObj.options && this.props.propsObj.options){
            this.setState({ sidebarOpen: true});
        }
    }

    changeDrawerPos = (value) => {
        this.setState({sidebarPos: value})
    }

    changeSelected = (e) => {
        this.setState({
          selected: e.target.value
        });
        this.props.propsObj.getOptions();
    }

    render(){
        return(
            <div>
                {this.chooseGraph()}
            </div>
        )
    }
}