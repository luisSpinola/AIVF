//  Geo Quantity
//  Desc (TODO)

//  Local Imports
//  Local Imports -> Graphic Components
import ColumnMapComponent from '../graph_components/ColumnMapComponent';
import BubbleMapComponent from '../graph_components/BubbleMapComponent';
//  Local Imports -> Utils
import { ERROR_SELECTED_DEFAULT } from '../utils/text/TextInfo-pt';

//  External Imports
import React from "react";

export default class GeoQuant extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            plots:["Mapa de Colunas", "Mapa de Bolhas"],
            selected: this.props.propsObj.selected,
            sidebarPos: 'right'
        };
    }

    chooseGraph = () => {
        switch(this.state.selected){
            case 0:
                return <ColumnMapComponent 
                        data={this.props.propsObj.data} 
                        options={this.props.propsObj.options} 
                        plotSelection={[this.state.selected, this.state.plots, this.changeSelected, this.state.sidebarPos, this.changeDrawerPos]}/>;
            case 1:
                return <BubbleMapComponent 
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