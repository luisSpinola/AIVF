//  Graph Components -> Bar Plot
//  Desc (TODO)

//  Local Imports
//  Local Imports -> Graphic
import AreaPlotRecharts from "../libraries/recharts/AreaPlot";
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
import { getToolsOptions } from "../utils/options/DrawerSegments/OptionsTools";

import { VALUE_GRID, VALUE_GRID_HORIZONTAL, VALUE_GRID_VERTICAL, VALUE_GRID_STROKE, VALUE_GRID_OPACITY,
        VALUE_LABELLIST, VALUE_LABELLIST_POSITION, VALUE_LABELLIST_OFFSET,VALUE_LABELLIST_ANGLE, VALUE_LABELLIST_SIMPLIFY,
        VALUE_LEGEND, VALUE_LEGEND_POS, VALUE_LEGEND_ALIGN, 
        VALUE_COLOR_OBJ, VALUE_SIMPLIFY, VALUE_HEIGHT, VALUE_OPACITY, VALUE_YTICK,
        VALUE_MARGIN_TOP, VALUE_MARGIN_BOTTTOM, VALUE_MARGIN_LEFT, VALUE_MARGIN_RIGHT} from "../utils/Conf";

//  External Imports
import React from "react";
//  External Imports -> Material UI
import LinearProgress from '@material-ui/core/LinearProgress';

export default class MultiAreaPlotComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            options: {
                invert_axes: false,
                //  General
                height: VALUE_HEIGHT,
                interpolation: 0,
                // Multi
                grouped: true,
                stacked: false,
                //  General -> Y axis
                yTick: VALUE_YTICK,
                simplify: VALUE_SIMPLIFY,
                scale: 0,
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
                margin_right: VALUE_MARGIN_RIGHT+15,
                //  Extra
                brush: false
            },

            //  Sidebar
            sidebar: true,
            sidebarOpen: true,
            sidebarPos: this.props.plotSelection[3],
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
                            {getGeneralOptions(this,true,false,false,true,true)}
                            {getAxesOptions(this,true,false,true)}
                            {getToolsOptions(this)}
                            {getLabelListOptions(this, true)}
                            {getLegendOptions(this,false)}
                            {getGridOptions(this)}
                            {getMarginOptions(this)}
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
            content = <AreaPlotRecharts 
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