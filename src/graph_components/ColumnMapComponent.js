//  Graph Components -> Bar Plot
//  Desc (TODO)

//  Local Imports
//  Local Imports -> Graphic
import LayersMapDeckgl from "../libraries/deckgl/LayersMap";
import { getGeneralOptions } from "../utils/options/DrawerSegments/OptionsMapGeneral";
import { getColorOptions } from "../utils/options/DrawerSegments/OptionsColor";
//  Local Imports -> Utils
import { WAITING_ADAPT } from "../utils/text/TextInfo-pt";
import { drawerOptions } from "../utils/options/OptionsDrawer";
import { VALUE_LEGEND, VALUE_LEGEND_POS, VALUE_LEGEND_ALIGN, 
        VALUE_COLOR_OBJ,
        VALUE_MARGIN_TOP, VALUE_MARGIN_BOTTTOM, VALUE_MARGIN_LEFT, VALUE_MARGIN_RIGHT,
        MAP_VECTOR_ARRAY } from "../utils/Conf";

//  External Imports
import React from "react";
//  External Imports -> Material UI
import LinearProgress from '@material-ui/core/LinearProgress';


export default class ColumnMapComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            options: {
                //  General
                height: 900,
                //  Legend
                legend: VALUE_LEGEND,
                legend_pos: VALUE_LEGEND_POS,
                legend_align: VALUE_LEGEND_ALIGN,
                //  Color
                colors: [...VALUE_COLOR_OBJ['color']],
                colors_lock: true,
                opacity: 50,
                //  Margin
                margin_top: VALUE_MARGIN_TOP,
                margin_bottom: VALUE_MARGIN_BOTTTOM,
                margin_left: VALUE_MARGIN_LEFT,
                margin_right: VALUE_MARGIN_RIGHT,

                //  Map Selection
                maps: MAP_VECTOR_ARRAY,
                map: 0,
            },

            //  Sidebar
            sidebar: true,
            sidebarOpen: true,
            sidebarPos: this.props.plotSelection[3],
            sidebarPosOpen: false,
            anchorEl: null,

            //  Color
            displayColorPicker: Array(1).fill(false),

            //  Change Counter
            oldCounter: 0,
            counter: 0,

            needAdapt: false,

            colors: VALUE_COLOR_OBJ['color']
        };
    }

    componentDidUpdate(){
        if(this.state.colors !== VALUE_COLOR_OBJ['color']){
            this.setState({colors: VALUE_COLOR_OBJ['color']})
        }
    }

    componentDidMount(){
        //this.interval = setInterval(() => this.submitOptions(), SAVE_TIMER); //   DB CYCLE CHECK
        
    }

    submitOptions = () => {
        if(this._ismounted){
            if(this.state.oldCounter !== this.state.counter){
                let tempCounter = this.state.counter;
                this.setState({oldCounter: tempCounter});
                //this.props.watchOptions(this.state.options, this.props.position); //  SAVE TO DB
            }
        } 
    }

    drawerOptions = () => {
        let options = <React.Fragment key={"drawer-options"}>
            {getGeneralOptions(this)}
            {getColorOptions(this,this.props.data.header.value.length,true)}
        </React.Fragment>;
        return drawerOptions(this, this.props.plotSelection, this.state.sidebarPosOpen, this.state.anchorEl, options, this.state.sidebarOpen, this.state.sidebarPos);
    }

    handleOptions = () => {
        let options;
        (this.props.options[0] && this.state.sidebar) ? options = this.drawerOptions() : options = <span></span>;
        return options;
    }

    handlePlot = () => {
        let content;
        if(this.state.needAdapt) {
            content = <div>{WAITING_ADAPT}<LinearProgress/></div>;
        } else {
            content = <LayersMapDeckgl
                        type={'column'}
                        data={this.props.data}
                        options={this.state.options} 
                        colors={this.state.colors}
            />;
        }
        return content;
    }

    render(){
        let content = this.handlePlot();
        let options = this.handleOptions();
        return(
            <div>
                {content}
                {options}
            </div>
        )
    }
}