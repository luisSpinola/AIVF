//  One Numerical
//  Desc (TODO)

//  Local Imports
//  Local Imports -> Graphic Components
import BarPlotComponent from '../graph_components/BarPlotComponent';
import LinePlotComponent from '../graph_components/LinePlotComponent';
import AreaPlotComponent from '../graph_components/AreaPlotComponent';
//  Local Imports -> Utils
import { ERROR_SELECTED_DEFAULT } from '../utils/text/TextInfo';

//  External Imports
//  External Imports -> React
import React from "react";

export default class OneNumerical extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            plots:["Gráfico de Barras", "Gráfico de Setores", "Gráfico de Linha", "Gráfico de Área"],
            selected: this.props.selected,
            sidebarPos: 'right',
        };
    }

    chooseGraph = () => {
        switch(this.state.selected){
            case 0:
                return <BarPlotComponent 
                        data={this.props.data} 
                        options={this.props.options} 
                        plotSelection={[this.state.selected, this.state.plots, this.changeSelected, this.state.sidebarPos, this.changeDrawerPos]}/>;
            case 2:
                return <LinePlotComponent 
                        data={this.props.data} 
                        options={this.props.options} 
                        plotSelection={[this.state.selected, this.state.plots, this.changeSelected, this.state.sidebarPos, this.changeDrawerPos]}/>;
            case 3:
                return <AreaPlotComponent 
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