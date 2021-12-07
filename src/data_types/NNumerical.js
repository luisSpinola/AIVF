//  N Numerical
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

export default class NNumerical extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            plots:["Gráfico de Linha", "Gráfico de Área", "Gráfico de Barras"],
            selected: this.props.selected,
            sidebarPos: 'right'
        };
    }

    chooseGraph = () => {
        switch(this.state.selected){
            case 0:
                return <MultiLinePlotComponent 
                        data={this.props.data} 
                        options={this.props.options} 
                        plotSelection={[this.state.selected, this.state.plots, this.changeSelected, this.state.sidebarPos, this.changeDrawerPos]}/>;
            case 1:
                return <MultiAreaPlotComponent 
                        data={this.props.data} 
                        options={this.props.options} 
                        plotSelection={[this.state.selected, this.state.plots, this.changeSelected, this.state.sidebarPos, this.changeDrawerPos]}/>;
            case 2:
                return <MultiBarPlotComponent 
                        data={this.props.data} 
                        options={this.props.options} 
                        plotSelection={[this.state.selected, this.state.plots, this.changeSelected, this.state.sidebarPos, this.changeDrawerPos]}/>;
            default:
                return <div>{ERROR_SELECTED_DEFAULT}</div>
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(!prevProps.options && this.props.options){
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