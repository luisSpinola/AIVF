import { handleGridOptions, handleLegendOptions, handleYAxisOptions } from "../../utils/options/HandleOptions";
import { DataFormater } from "../../utils/options/HandleOptions";

import { LabelList, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer} from "recharts";
const BarPlot = (props) => {
    const getGraph = () => {
        let tickFormatters; if(props.options.labelList_simplify){ tickFormatters = DataFormater;}
        let grid = handleGridOptions(props.options.grid, props.options.grid_stroke, props.options.grid_vertical, props.options.grid_horizontal, props.options.grid_opacity);
        let legend = handleLegendOptions(props.options.legend, props.options.legend_align, props.options.legend_pos);
        let yAxis = handleYAxisOptions(props.options.yTick, props.options.simplify, props.options.scale);

        return <ResponsiveContainer width="100%" height={props.options.height}>
            <BarChart data={props.data} height={props.options.height} margin={{ top: props.options.margin_top, right: props.options.margin_right, left: props.options.margin_left, bottom: props.options.margin_bottom}}> 
                <XAxis dataKey={props.header.id[0]} />
                {grid}
                {legend}
                {yAxis}
                <Tooltip formatter={(value) => new Intl.NumberFormat('pt').format(value)}/>
                <Bar isAnimationActive={true} dataKey={props.header.value[0]} fill={props.options.colors[0]} fillOpacity={props.options.opacity/100}>
                    {props.options.labelList && <LabelList formatter={tickFormatters} offset={props.options.labelList_offset} angle={props.options.labelList_angle} position={props.options.labelList_position} />}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    }

    return (
        <div>
            {getGraph()}
        </div>
    )
}

export default BarPlot;