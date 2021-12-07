import { handleGridOptions, handleLegendOptions, DataFormater } from "../../utils/options/HandleOptions";

import { Cell, ScatterChart, LabelList, YAxis, XAxis, Scatter, Tooltip, ResponsiveContainer} from "recharts";
export const ScatterPlot = (props) => {
    const getGraph = () => {
        let tickFormatters;
        (props.options.simplify) ? tickFormatters = DataFormater : tickFormatters = undefined;
        let tickFormattersAxis; if(props.options.labelList_simplify){ tickFormattersAxis = DataFormater;}
        let grid = handleGridOptions(props.options.grid, props.options.grid_stroke, props.options.grid_vertical, props.options.grid_horizontal, props.options.grid_opacity);
        let legend = handleLegendOptions(props.options.legend, props.options.legend_align, props.options.legend_pos, 'horizontal');
        let colors; (props.options.colors_lock) ? colors = props.colors : colors = props.options.colors;

        let dataContainer = [];
        for(let i=0; i<props.data.length; i++){
            let elemArray = [];
            elemArray.push(props.data[i]);
            dataContainer.push(elemArray);
        }

        let customLabelListArray = [];
        for(let i=0; i<props.data.length; i++){
            let customLabelList
            if(props.options.labelList_simplify){
                let x = DataFormater(props.data[i][props.header.value[0]]);
                let y = DataFormater(props.data[i][props.header.value[1]]);
                customLabelList = x + "," + y;
            } else {
                customLabelList = props.data[i][props.header.value[0]] + "," + props.data[i][props.header.value[1]];
                
            }
            customLabelListArray.push(customLabelList);
        }

        return <ResponsiveContainer width="100%" height={props.options.height}>
            <ScatterChart width="100%" height={props.options.height} margin={{ top: props.options.margin_top, right: props.options.margin_right, left: props.options.margin_left, bottom: props.options.margin_bottom}}>    
                <Tooltip formatter={(value) => new Intl.NumberFormat('pt').format(value)}/> 
                {grid}
                {legend}
                <XAxis tickCount={props.options.xTick} tickFormatter={tickFormatters} type="number" dataKey={props.header.value[0]}/>
                <YAxis tickCount={props.options.yTick} tickFormatter={tickFormatters} type="number" dataKey={props.header.value[1]}/>
                {props.data.map((_,index) => 
                    <Scatter isAnimationActive={true} key={index} fill={colors[index]} name={props.data[index][props.header.id[0]]} data={dataContainer[index]}>
                        {props.options.labelList && <LabelList formatter={tickFormattersAxis} offset={props.options.labelList_offset} angle={props.options.labelList_angle} position={props.options.labelList_position}>
                                                        {customLabelListArray[index]} 
                                                    </LabelList>}
                        <Cell isAnimationActive={true} key={`cell-${index}`} fill={colors[index]} />
                    </Scatter>)
                }
                
            </ScatterChart>
        </ResponsiveContainer>
    }

    return (
        <div>
            {getGraph()}
        </div>
    )
}

export default ScatterPlot;