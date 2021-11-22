import { handleLegendOptions } from "../../utils/options/HandleOptions";
import { DataFormater } from "../../utils/options/HandleOptions";
import { PieChart, Pie, Cell, LabelList, Tooltip, ResponsiveContainer} from "recharts";

const PiePlot = (props) => {

    const getGraph = () => {
        let legend = handleLegendOptions(props.options.legend, props.options.legend_align, props.options.legend_pos, props.options.legend_direction);
        let chartComponent = getChartComponent(props.options.autoRadius);

        return <ResponsiveContainer width="100%" height={props.options.height}>
            <PieChart margin={{ top: props.options.margin_top, right: props.options.margin_right, left: props.options.margin_left, bottom: props.options.margin_bottom}}>
                <Tooltip formatter={(value) => new Intl.NumberFormat('pt').format(value)}/>      
                {chartComponent}
                {legend}
                </PieChart>
        </ResponsiveContainer>
    }

    const getChartComponent = (auto) => {
        let tickFormatters; if(props.options.labelList_simplify){ tickFormatters = DataFormater;}
        let colors;
        (props.options.colors_lock) ? colors = props.colors : colors = props.options.colors;
        
        if(auto){
            return <Pie onAnimationEnd={props.animation[1]} startAngle={0} endAngle={360} paddingAngle={props.options.spacingRadius} isAnimationActive={props.animation[0]} data={props.data} dataKey={props.header.value[0]} nameKey={props.header.id[0]} >
                    {props.data.map((entry, index) => <Cell key={props.colors[index]} fill={colors[index % colors.length]}/>)}
                    {props.options.labelList && <LabelList dataKey={props.header.value[0]} formatter={tickFormatters} offset={props.options.labelList_offset} angle={props.options.labelList_angle} position={props.options.labelList_position} />}
                </Pie>;
        }
        return <Pie onChange={props.animation[1]} paddingAngle={props.options.spacingRadius} innerRadius={props.options.innerRadius} outerRadius={props.options.outerRadius} isAnimationActive={props.animation[0]} data={props.data} dataKey={props.header.value[0]} nameKey={props.header.id[0]} >
                {props.data.map((entry, index) => <Cell key={props.colors[index]} fill={colors[index % colors.length]}/>)}
                {props.options.labelList && <LabelList dataKey={props.header.value[0]} formatter={tickFormatters} offset={props.options.labelList_offset} angle={props.options.labelList_angle} position={props.options.labelList_position} />}
            </Pie>;
    }

    return (
        <div>
            {getGraph()}
        </div>
    )
}

export default PiePlot;
