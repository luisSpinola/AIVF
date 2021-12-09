//  One Numerical
//  Desc (TODO)

//  Local Imports
//  Local Imports -> Graphic Components
import BarPlotComponent from '../graph_components/BarPlotComponent';
import LinePlotComponent from '../graph_components/LinePlotComponent';
import AreaPlotComponent from '../graph_components/AreaPlotComponent';
import PiePlotComponent from '../graph_components/PiePlotComponent';
//  Local Imports -> Utils
import { LANGUAGE, LANGUAGE_FILES } from "../utils/Conf";

//  External Imports
import React from "react";

export default class OneNumerical extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            plots:["Gráfico de Barras", "Gráfico de Setores", "Gráfico de Linha", "Gráfico de Área"],
            selected: this.props.propsObj.selected,
            sidebarPos: 'right'
        };
    }

    chooseGraph = () => {
        let propsObj = {
            identifier: this.props.propsObj.identifier,
            watchOptions: this.props.propsObj.watchOptions,
            previousOptions: this.props.propsObj.previousOptions,
            plotSelection:[this.state.selected, this.state.plots, this.changeSelected, this.state.sidebarPos, this.changeDrawerPos]
        }
        switch(this.state.selected){
            case 0:
                return <BarPlotComponent propsObj={propsObj}
                        data={this.props.propsObj.data} 
                        options={this.props.propsObj.options} />;
            case 1:
                return <PiePlotComponent propsObj={propsObj}
                        data={this.props.propsObj.data} 
                        options={this.props.propsObj.options} />;
           
            case 2:
                return <LinePlotComponent propsObj={propsObj}
                        data={this.props.propsObj.data} 
                        options={this.props.propsObj.options} />;
            case 3:
                return <AreaPlotComponent propsObj={propsObj}
                        data={this.props.propsObj.data} 
                        options={this.props.propsObj.options} />;       
            default:
                return <div>{LANGUAGE_FILES[LANGUAGE['current']].ERROR_SELECTED_DEFAULT}</div>
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