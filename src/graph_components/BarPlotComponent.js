//  Graph Components -> Bar Plot
//  Desc (TODO)

//  Local Imports
//  Local Imports -> Graphic
import BarPlotRecharts from "../libraries/recharts/BarPlot";
//  Local Imports -> Utils
import { WAITING_ADAPT } from "../utils/text/TextInfo-pt";
import { drawerOptions } from "../utils/options/OptionsDrawer";
import { getGridOptions } from '../utils/options/DrawerSegments/OptionsGrid';
import { getGeneralOptions } from "../utils/options/DrawerSegments/OptionsGeneral";
import { getLabelListOptions } from "../utils/options/DrawerSegments/OptionsLabelList";
import { getLegendOptions } from "../utils/options/DrawerSegments/OptionsLegend";
import { getAxesOptions } from "../utils/options/DrawerSegments/OptionsAxes";
import { getMarginOptions } from "../utils/options/DrawerSegments/OptionsMargin";
import { getColorOptions } from "../utils/options/DrawerSegments/OptionsColor";
import { getPercentOptions } from "../utils/options/DrawerSegments/OptionsPercent";
import { getToolsOptions } from "../utils/options/DrawerSegments/OptionsTools";

import { VALUE_GRID, VALUE_GRID_HORIZONTAL, VALUE_GRID_VERTICAL, VALUE_GRID_STROKE, VALUE_GRID_OPACITY,
        VALUE_LABELLIST, VALUE_LABELLIST_POSITION, VALUE_LABELLIST_OFFSET,VALUE_LABELLIST_ANGLE, VALUE_LABELLIST_SIMPLIFY,
        VALUE_LEGEND, VALUE_LEGEND_POS, VALUE_LEGEND_ALIGN, 
        VALUE_COLOR_OBJ, VALUE_SIMPLIFY, VALUE_HEIGHT, VALUE_OPACITY, VALUE_YTICK,
        VALUE_MARGIN_TOP, VALUE_MARGIN_BOTTTOM, VALUE_MARGIN_LEFT, VALUE_MARGIN_RIGHT,
        SAVE_TIMER } from "../utils/Conf";

//  External Imports
import React from "react";
//  External Imports -> Material UI
import LinearProgress from '@material-ui/core/LinearProgress';

export default class BarPlotComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            options: {
                invert_axes: false,
                //  General
                height: VALUE_HEIGHT,
                // Percent
                percent: false,
                decimal_percent: 2,
                //  General -> Y axis
                yTick: VALUE_YTICK,
                simplify: VALUE_SIMPLIFY,
                scale: 0,
                //  General -> X axis
                order: 0,
                //  Legend
                legend: VALUE_LEGEND,
                legend_pos: VALUE_LEGEND_POS,
                legend_align: VALUE_LEGEND_ALIGN,
                //  Label List
                labelList: VALUE_LABELLIST,
                labelList_position: VALUE_LABELLIST_POSITION,
                labelList_offset: VALUE_LABELLIST_OFFSET,
                labelList_angle: VALUE_LABELLIST_ANGLE,
                labelList_simplify: VALUE_LABELLIST_SIMPLIFY,
                //  Grid
                grid: VALUE_GRID,
                grid_horizontal: VALUE_GRID_HORIZONTAL,
                grid_vertical: VALUE_GRID_VERTICAL,
                grid_opacity: VALUE_GRID_OPACITY,
                grid_stroke: VALUE_GRID_STROKE,
                //  Color
                colors: [...VALUE_COLOR_OBJ['color']],
                colors_lock: true,
                opacity: VALUE_OPACITY,
                //  Margin
                margin_top: VALUE_MARGIN_TOP,
                margin_bottom: VALUE_MARGIN_BOTTTOM,
                margin_left: VALUE_MARGIN_LEFT,
                margin_right: VALUE_MARGIN_RIGHT,
                //  Extra
                brush: false
            },

            //  Sidebar
            sidebar: true,
            sidebarOpen: true,
            sidebarPos: this.props.propsObj.plotSelection[3],
            sidebarPosOpen: false,
            anchorEl: null,

            //  Color
            displayColorPicker: Array(1).fill(false),

            //  Data 
            data: [...this.props.data.data],
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
        this.loadPreviousOptions();
        this._ismounted = true;
        this.interval = setInterval(() => this.submitOptions(), SAVE_TIMER*1000); //   DB CYCLE CHECK
    }

    loadPreviousOptions = () => {
        if(this.props.propsObj.previousOptions !== null){
            //  Graph was saved before (atleast one selection of the graph family)
            let optionsJSON = JSON.parse(this.props.propsObj.previousOptions);
            if(optionsJSON[this.props.propsObj.plotSelection[0]] !== undefined){
                //  Was saved before
            } else { 
                //  First time saving this selection
                //  Adapt here
            }
        } else {
            //  User first time seing this graph
            //  Adapt here
        }
    } 

    submitOptions = () => {
        if(this._ismounted){
            if(this.state.oldCounter !== this.state.counter){
                let tempCounter = this.state.counter;
                this.setState({oldCounter: tempCounter});
                this.props.propsObj.watchOptions(this.state.options, this.props.propsObj.plotSelection[0]); //  SAVE TO DB
            }
        } 
    }

    drawerOptions = () => {
        let options = <React.Fragment key={"drawer-options"}>
                            {getGeneralOptions(this,false,false,false, false,false,false)}
                            {getAxesOptions(this,true,true,true,false)}
                            {getToolsOptions(this)}
                            {getPercentOptions(this)}
                            {getLabelListOptions(this, true)}
                            {getLegendOptions(this, false)}
                            {getGridOptions(this)}
                            {getMarginOptions(this)}
                            {getColorOptions(this,1,true)}
           
        </React.Fragment>;
        return drawerOptions(this, this.props.propsObj.plotSelection, this.state.sidebarPosOpen, this.state.anchorEl, options, this.state.sidebarOpen, this.state.sidebarPos);
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
            content = <BarPlotRecharts 
                        data={this.state.data} 
                        header={this.props.data.header}
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