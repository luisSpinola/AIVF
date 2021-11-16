import { handleGridOptions, handleLegendOptions, handleYAxisOptions, handleInterpolation } from "../../utils/options/HandleOptions";
import { DataFormater } from "../../utils/options/HandleOptions";

import { LabelList, AreaChart, Area, XAxis, Tooltip, ResponsiveContainer} from "recharts";
const AreaPlot = (props) => {
    const getGraph = () => {
        let tickFormatters; if(props.options.labelList_simplify){ tickFormatters = DataFormater;}
        let grid = handleGridOptions(props.options.grid, props.options.grid_stroke, props.options.grid_vertical, props.options.grid_horizontal, props.options.grid_opacity);
        let legend = handleLegendOptions(props.options.legend, props.options.legend_align, props.options.legend_pos);
        let yAxis = handleYAxisOptions(props.options.yTick, props.options.simplify, props.options.scale);
        let interpolation = handleInterpolation(props.options.interpolation);

        return <ResponsiveContainer width="100%" height={props.options.height}>
            <AreaChart data={props.data} height={props.options.height} margin={{ top: props.options.margin_top, right: props.options.margin_right, left: props.options.margin_left, bottom: props.options.margin_bottom}}> 
                <XAxis dataKey={props.header.id[0]} />
                {grid}
                {legend}
                {yAxis}
                <Tooltip formatter={(value) => new Intl.NumberFormat('pt').format(value)}/>
                <Area isAnimationActive={true} dataKey={props.header.value[0]} fill={props.options.colors[0]} stroke={props.options.colors[0]} type={interpolation} fillOpacity={props.options.opacity/100}>
                    {props.options.labelList && <LabelList formatter={tickFormatters} offset={props.options.labelList_offset} angle={props.options.labelList_angle} position={props.options.labelList_position} />}
                </Area>
            </AreaChart>
        </ResponsiveContainer>
    }

    return (
        <div>
            {getGraph()}
        </div>
    )
}

export default AreaPlot;