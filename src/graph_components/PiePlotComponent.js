//  Graph Components -> Bar Plot
//  Desc (TODO)

//  Local Imports
//  Local Imports -> Graphic
import PiePlotRecharts from "../libraries/recharts/PiePlot";
//  Local Imports -> Utils
import { WAITING_ADAPT } from "../utils/text/TextInfo-pt";
import { drawerOptions } from "../utils/options/OptionsDrawer";
import { getGeneralOptions } from "../utils/options/DrawerSegments/OptionsGeneral";
import { getLabelListOptions } from "../utils/options/DrawerSegments/OptionsLabelList";
import { getLegendOptions } from "../utils/options/DrawerSegments/OptionsLegend";
import { getMarginOptions } from "../utils/options/DrawerSegments/OptionsMargin";
import { getColorOptions } from "../utils/options/DrawerSegments/OptionsColor";
import { getRadiusOptions } from "../utils/options/DrawerSegments/OptionsRadius";
import { getPercentOptions } from "../utils/options/DrawerSegments/OptionsPercent";

import { VALUE_LABELLIST, VALUE_LABELLIST_ANGLE, VALUE_LABELLIST_SIMPLIFY,
        VALUE_LEGEND, VALUE_LEGEND_POS, VALUE_LEGEND_ALIGN, 
        VALUE_COLOR_OBJ, VALUE_HEIGHT, VALUE_OPACITY,
        VALUE_MARGIN_TOP, VALUE_MARGIN_BOTTTOM, VALUE_MARGIN_LEFT, VALUE_MARGIN_RIGHT} from "../utils/Conf";

//  External Imports
import React from "react";
//  External Imports -> Material UI
import LinearProgress from '@material-ui/core/LinearProgress';

export default class PiePlotComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            options: {
                //  General
                height: VALUE_HEIGHT,
                percent: false,
                decimal_percent: 2,
                order: 0,
                //  Radius
                autoRadius: true,
                innerRadius: 0,
                outerRadius: 70,
                spacingRadius: 0,
                //  Legend
                legend: VALUE_LEGEND,
                legend_pos: VALUE_LEGEND_POS,
                legend_align: VALUE_LEGEND_ALIGN,
                legend_direction: 'horizontal', 
                //  Label List
                labelList: VALUE_LABELLIST,
                labelList_angle: VALUE_LABELLIST_ANGLE,
                labelList_simplify: VALUE_LABELLIST_SIMPLIFY,
                //  Color
                colors: [...VALUE_COLOR_OBJ['color']],
                colors_lock: true,
                opacity: VALUE_OPACITY,
                //  Margin
                margin_top: VALUE_MARGIN_TOP,
                margin_bottom: VALUE_MARGIN_BOTTTOM,
                margin_left: VALUE_MARGIN_LEFT,
                margin_right: VALUE_MARGIN_RIGHT
            },

            //  Sidebar
            sidebar: true,
            sidebarOpen: true,
            sidebarPos: this.props.propsObj.plotSelection[3],
            sidebarPosOpen: false,
            anchorEl: null,

            //  Data 
            data: [...this.props.data.data],

            //  Color
            displayColorPicker: Array(this.props.data.data.length).fill(false),

            //  Change Counter
            oldCounter: 0,
            counter: 0,

            needAdapt: false,

            animation: true,
            animationFlag: false,

            colors: VALUE_COLOR_OBJ['color']
        };
    }

    componentDidUpdate(){
        if(this.state.colors !== VALUE_COLOR_OBJ['color']){
            this.setState({colors: VALUE_COLOR_OBJ['color']})
        }
    }

    turnAnimationOff = () => {
        if(this.state.animation && !this.state.animationFlag){
            this.setState({animationFlag: true});
            this.setState({animation: false});
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
                this.props.propsObj.watchOptions(this.state.options, this.props.propsObj.plotSelection[0]); //  SAVE TO DB
            }
        } 
    }

    drawerOptions = () => {
        let options = <React.Fragment key={"drawer-options"}>
                            {getGeneralOptions(this,false,false,true,false,false,false)}
                            {getPercentOptions(this)}
                            {getLabelListOptions(this,false)}
                            {getLegendOptions(this, true)}
                            {getRadiusOptions(this)}
                            {getMarginOptions(this)}
                            {getColorOptions(this,this.props.data.data.length,false)}
           
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
            content = <PiePlotRecharts 
                        data={this.state.data} 
                        header={this.props.data.header}
                        options={this.state.options}
                        animation={[this.state.animation,this.turnAnimationOff]}
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