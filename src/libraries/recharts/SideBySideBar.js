import { handleGridOptions, handleLegendOptions, handleAxes } from "../../utils/options/HandleOptions";
import { DataFormater } from "../../utils/options/HandleOptions";

import {Grid} from '@material-ui/core';
import { LabelList, BarChart, YAxis, Bar, Tooltip, ResponsiveContainer, Brush} from "recharts";
export const SideBySideBar = (props) => {
    const formatter = () => ``;
    const getGraph = () => {
        let tickFormatters; if(props.options.labelList_simplify){ tickFormatters = DataFormater;}
        let grid = handleGridOptions(props.options.grid, props.options.grid_stroke, props.options.grid_vertical, props.options.grid_horizontal, props.options.grid_opacity);
        let legend = handleLegendOptions(props.options.legend, props.options.legend_align, props.options.legend_pos, 'horizontal');
        let colors; (props.options.colors_lock) ? colors = props.colors : colors = props.options.colors;

        let axesArray = handleAxes(true, props.options.yTick, props.options.simplify, props.options.scale, props.header.id[0],false);
        let axesArrayReverse = handleAxes(true, props.options.yTick, props.options.simplify, props.options.scale, props.header.id[0],true);

        

        return <Grid container spacing={0}>
            <Grid item xs={6}>
                <ResponsiveContainer width="115%" height={props.options.height}>
                    <BarChart layout={axesArray[2]} data={props.data} height={props.options.height} margin={{ top: props.options.margin_top, right: props.options.spacing*3, left: props.options.margin_left, bottom: props.options.margin_bottom}}> 
                        {axesArrayReverse[0]}
                        {axesArrayReverse[1]}
                        {grid}
                        {legend}
                        <Tooltip formatter={(value) => new Intl.NumberFormat('pt').format(value)}/>
                        <Bar key={props.colors[0]} isAnimationActive={true} dataKey={props.header.value[0]} fill={colors[0]} fillOpacity={props.options.opacity/100}>
                            {props.options.labelList && <LabelList formatter={tickFormatters} offset={props.options.labelList_offset} angle={props.options.labelList_angle} position={props.options.labelList_position} />}
                        </Bar>
                        {props.options.brush && <Brush data={props.data} dataKey={props.header.id[0]} height={30} stroke={colors[0]}/>}
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
            <Grid item xs={6}>
                <ResponsiveContainer width="100%" height={props.options.height}>
                    <BarChart layout={axesArray[2]} data={props.data} height={props.options.height} margin={{ top: props.options.margin_top, right: props.options.margin_right, left: -props.options.spacing, bottom: props.options.margin_bottom}}> 
                        <YAxis orientation='left' tickFormatter={formatter} type="category"/>
                        {axesArray[1]}
                        {grid}
                        {legend}
                        <Tooltip formatter={(value) => new Intl.NumberFormat('pt').format(value)}/>
                        <Bar key={props.colors[1]} isAnimationActive={true} dataKey={props.header.value[1]} fill={colors[1]} fillOpacity={props.options.opacity/100}>
                            {props.options.labelList && <LabelList formatter={tickFormatters} offset={props.options.labelList_offset} angle={props.options.labelList_angle} position={props.options.labelList_position} />}
                        </Bar>
                        {props.options.brush && <Brush data={props.data} dataKey={props.header.id[0]} height={30} stroke={colors[1]}/>}
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
        </Grid>
    }

    return (
        <div>
            {getGraph()}
        </div>
    )
}

export default SideBySideBar;