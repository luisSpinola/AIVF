import { handleGridOptions, handleLegendOptions, handleAxes } from "../../utils/options/HandleOptions";
import { DataFormater } from "../../utils/options/HandleOptions";

import { LabelList, BarChart, Bar, Tooltip, ResponsiveContainer, Brush} from "recharts";
export const BarPlot = (props) => {
    const getGraph = () => {
        let tickFormatters; if(props.options.labelList_simplify){ tickFormatters = DataFormater;}
        let grid = handleGridOptions(props.options.grid, props.options.grid_stroke, props.options.grid_vertical, props.options.grid_horizontal, props.options.grid_opacity);
        let legend = handleLegendOptions(props.options.legend, props.options.legend_align, props.options.legend_pos, 'horizontal');
        

        let colors; (props.options.colors_lock) ? colors = props.colors : colors = props.options.colors;

        let grouped; (props.options.grouped !== undefined) ? grouped = props.options.grouped : grouped = true;

        let stacked; (props.options.stacked !== undefined) ? stacked = props.options.stacked : stacked = false;

        let axesArray = handleAxes(props.options.invert_axes, props.options.yTick, props.options.simplify, props.options.scale, props.header.id[0], false);
    
        if(grouped) {
            return <ResponsiveContainer width="100%" height={props.options.height}>
                <BarChart layout={axesArray[2]} data={props.data} height={props.options.height} margin={{ top: props.options.margin_top, right: props.options.margin_right, left: props.options.margin_left, bottom: props.options.margin_bottom}}> 
                    {axesArray[0]}
                    {axesArray[1]}
                    {grid}
                    {legend}
                    <Tooltip formatter={(value) => new Intl.NumberFormat('pt').format(value)}/>
                    
                    {stacked && props.header.value.map((_, i) =>
                        <Bar key={props.colors[i]} stackId="a" isAnimationActive={true} dataKey={props.header.value[i]} fill={colors[i]} fillOpacity={props.options.opacity/100}>
                            {props.options.labelList && <LabelList formatter={tickFormatters} offset={props.options.labelList_offset} angle={props.options.labelList_angle} position={props.options.labelList_position} />}
                        </Bar>
                    )}

                    {!stacked && props.header.value.map((_, i) =>
                        <Bar key={props.colors[i]} isAnimationActive={true} dataKey={props.header.value[i]} fill={colors[i]} fillOpacity={props.options.opacity/100}>
                            {props.options.labelList && <LabelList formatter={tickFormatters} offset={props.options.labelList_offset} angle={props.options.labelList_angle} position={props.options.labelList_position} />}
                        </Bar>
                    )}

                    {props.options.brush && <Brush data={props.data} dataKey={props.header.id[0]} height={30} stroke={colors[0]}/>}
                </BarChart>
            </ResponsiveContainer>
        } else{
            let returnArray = [];
            for(let i=0; i<props.header.value.length; i++){
                returnArray.push(
                    <ResponsiveContainer key={props.header.value[i]} width="100%" height={props.options.height}>
                        <BarChart layout={axesArray[2]} data={props.data} height={props.options.height} margin={{ top: props.options.margin_top, right: props.options.margin_right, left: props.options.margin_left, bottom: props.options.margin_bottom}}> 
                            {axesArray[0]}
                            {axesArray[1]}
                            {grid}
                            {legend}
                            <Tooltip formatter={(value) => new Intl.NumberFormat('pt').format(value)}/>
                            <Bar key={props.colors[i]} isAnimationActive={true} dataKey={props.header.value[i]} fill={colors[i]} fillOpacity={props.options.opacity/100}>
                                {props.options.labelList && <LabelList formatter={tickFormatters} offset={props.options.labelList_offset} angle={props.options.labelList_angle} position={props.options.labelList_position} />}
                            </Bar>
                            {props.options.brush && <Brush data={props.data} dataKey={props.header.id[0]} height={30} stroke={colors[i]}/>}
                        </BarChart>
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

export default BarPlot;