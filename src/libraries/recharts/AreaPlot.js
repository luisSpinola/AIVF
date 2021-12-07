import { handleGridOptions, handleLegendOptions, handleInterpolation, handleAxes } from "../../utils/options/HandleOptions";
import { DataFormater } from "../../utils/options/HandleOptions";

import { LabelList, AreaChart, Area, Tooltip, ResponsiveContainer, Brush} from "recharts";
const AreaPlot = (props) => {
    const getGraph = () => {
        let tickFormatters; if(props.options.labelList_simplify){ tickFormatters = DataFormater;}
        let grid = handleGridOptions(props.options.grid, props.options.grid_stroke, props.options.grid_vertical, props.options.grid_horizontal, props.options.grid_opacity);
        let legend = handleLegendOptions(props.options.legend, props.options.legend_align, props.options.legend_pos, 'horizontal');
        let interpolation = handleInterpolation(props.options.interpolation);

        let colors; (props.options.colors_lock) ? colors = props.colors : colors = props.options.colors;

        let grouped; (props.options.grouped !== undefined) ? grouped = props.options.grouped : grouped = true;

        let stacked; (props.options.stacked !== undefined) ? stacked = props.options.stacked : stacked = false;

        let axesArray = handleAxes(props.options.invert_axes, props.options.yTick, props.options.simplify, props.options.scale, props.header.id[0], false);
        
        if(grouped){
            return <ResponsiveContainer width="100%" height={props.options.height}>
                <AreaChart layout={axesArray[2]} data={props.data} height={props.options.height} margin={{ top: props.options.margin_top, right: props.options.margin_right, left: props.options.margin_left, bottom: props.options.margin_bottom}}> 
                    {axesArray[0]}
                    {axesArray[1]}
                    {grid}
                    {legend}
                    <Tooltip formatter={(value) => new Intl.NumberFormat('pt').format(value)}/>

                    {stacked && props.header.value.map((_, i) =>
                        <Area key={props.colors[i]} stackId="a" isAnimationActive={true} dataKey={props.header.value[i]} fill={colors[i]} stroke={colors[i]} type={interpolation} fillOpacity={props.options.opacity/100}>
                            {props.options.labelList && <LabelList formatter={tickFormatters} offset={props.options.labelList_offset} angle={props.options.labelList_angle} position={props.options.labelList_position} />}
                        </Area>
                    )}

                    {!stacked && props.header.value.map((_, i) =>
                        <Area key={props.colors[i]} isAnimationActive={true} dataKey={props.header.value[i]} fill={colors[i]} stroke={colors[i]} type={interpolation} fillOpacity={props.options.opacity/100}>
                            {props.options.labelList && <LabelList formatter={tickFormatters} offset={props.options.labelList_offset} angle={props.options.labelList_angle} position={props.options.labelList_position} />}
                        </Area>
                    )}

                    {props.options.brush && <Brush data={props.data} dataKey={props.header.id[0]} height={30} stroke={colors[0]}/>}
                </AreaChart>
            </ResponsiveContainer>
        } else {
            let returnArray = [];
            for(let i=0; i<props.header.value.length; i++){
                returnArray.push(
                    <ResponsiveContainer key={props.header.value[i]} width="100%" height={props.options.height}>
                        <AreaChart layout={axesArray[2]} data={props.data} height={props.options.height} margin={{ top: props.options.margin_top, right: props.options.margin_right, left: props.options.margin_left, bottom: props.options.margin_bottom}}> 
                            {axesArray[0]}
                            {axesArray[1]}
                            {grid}
                            {legend}
                            <Tooltip formatter={(value) => new Intl.NumberFormat('pt').format(value)}/>
                            <Area key={props.colors[i]} isAnimationActive={true} dataKey={props.header.value[i]} fill={colors[i]} stroke={colors[i]} type={interpolation} fillOpacity={props.options.opacity/100}>
                                {props.options.labelList && <LabelList formatter={tickFormatters} offset={props.options.labelList_offset} angle={props.options.labelList_angle} position={props.options.labelList_position} />}
                            </Area>
                            {props.options.brush && <Brush data={props.data} dataKey={props.header.id[0]} height={30} stroke={colors[i]}/>}
                        </AreaChart>
                    </ResponsiveContainer>
                );
            }
            return returnArray;
        }
        
    }

    return (
        <div>
            {getGraph()}
        </div>
    )
}

export default AreaPlot;