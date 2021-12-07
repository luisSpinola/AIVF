import { CartesianGrid, Legend, YAxis, XAxis} from "recharts";

export const handleYAxisOptions = (yTick, simplify, scale) => {
    let tickFormatters;
    (simplify) ? tickFormatters = DataFormater : tickFormatters = undefined;

    if(scale === 1){ //  Logarithmic Scale
        return <YAxis tickCount={yTick} 
                    tickFormatter={tickFormatters}
                    scale="log" 
                    domain={['auto', 'auto']}
                    />
    } else {
        // interval={0}
        return <YAxis tickCount={yTick} tickFormatter={tickFormatters}/>;
    }
}

export const handleAxes = (inverted, yTick, simplify, scale, dataKey, reversed) => {
    let tickFormatters;
    (simplify) ? tickFormatters = DataFormater : tickFormatters = undefined;

    let reverse;
    (reversed) ? reverse = true : reverse = false;
    let orientation;
    (reversed) ? orientation = 'right' : orientation = 'left';

    let returnArray = [];
    if(!inverted){
        if(scale === 1){ //  Logarithmic Scale
            returnArray.push(<YAxis tickCount={yTick} 
                        tickFormatter={tickFormatters}
                        scale="log" 
                        domain={['auto', 'auto']}
                        />);
        } else {
            // interval={0}
            returnArray.push(<YAxis tickCount={yTick} tickFormatter={tickFormatters}/>);
        }
        returnArray.push(<XAxis dataKey={dataKey}/>);
        returnArray.push('horizontal');
    } else {
        returnArray.push(<YAxis orientation={orientation} dataKey={dataKey} type="category"/>);
        if(scale === 1){ //  Logarithmic Scale
            returnArray.push(<XAxis type="number" tickCount={yTick} 
                        tickFormatter={tickFormatters}
                        scale="log" 
                        domain={['auto', 'auto']} reversed={reverse}
                        />);
        } else {
            // interval={0}
            returnArray.push(<XAxis reversed={reverse} type="number" tickCount={yTick} tickFormatter={tickFormatters}/>);
        }
        returnArray.push('vertical');
    }

    return returnArray;
}

export const handleGridOptions = (grid, grid_stroke, grid_vertical, grid_horizontal, grid_opacity) => {
    if(grid){
        if(grid_stroke){
            return <CartesianGrid strokeDasharray="4 4" vertical={grid_vertical} horizontal={grid_horizontal} opacity={grid_opacity/100} />
        } else {
            return <CartesianGrid vertical={grid_vertical} horizontal={grid_horizontal} opacity={grid_opacity/100} />
        }
        
    } 
    
}

export const handleLegendOptions = (legend, legend_align, legend_pos, legend_direction) => {
    let legendOn = null;
    if(legend){
        legendOn = <Legend align={legend_align} verticalAlign={legend_pos} layout={legend_direction}/>
    }
    return legendOn;
}

export const handleOrderChange = (self, event) => {
    let tempOpt = self.state.options;
    tempOpt.order = event.target.value;

    let tempOldCounter = self.state.counter;
    let tempCounter = self.state.counter + 1;
    self.setState({
        options: tempOpt,
        oldCounter: tempOldCounter,
        counter: tempCounter
    });

    let ordedArray = [...self.state.data];
    if(event.target.value === 0){
            ordedArray = self.props.data.data;
            self.setState({ data: ordedArray});
    }
    else if(event.target.value === 2){
        ordedArray = ordedArray.sort((a,b) => {
            return b[self.props.data.header.value] - a[self.props.data.header.value]
        })
        self.setState({ data: ordedArray});
    }
    else if(event.target.value === 1){
        ordedArray = ordedArray.sort((a,b) => {
            return a[self.props.data.header.value] - b[self.props.data.header.value]
        })
        self.setState({ data: ordedArray});
    }
}

export const handlePercentChange = (self, e) => {
        let tempOpt = self.state.options;
        tempOpt['percent'] = e.target.checked;

        let tempOldCounter = self.state.counter;
        let tempCounter = self.state.counter + 1;

        self.setState({
            options: tempOpt,
            oldCounter: tempOldCounter,
            counter: tempCounter
        });

        let total = 0;

        // dataKey={props.header.value[0]} nameKey={props.header.id[0]}
        for(let i=0; i<self.props.data.data.length; i++){
            
            let tempObj = {};
            tempObj[self.props.data.header.id[0]] = self.props.data.data[i][self.props.data.header.id[0]];
            tempObj[self.props.data.header.value[0]] = self.props.data.data[i][self.props.data.header.value[0]];
            total += self.props.data.data[i][self.props.data.header.value[0]];
        }

        let tempDataPercent = [];
        for(let i=0; i<self.props.data.data.length; i++){
            let cenas = (self.props.data.data[i][self.props.data.header.value[0]] * 100)/total;
            let tempObj = {};
            tempObj[self.props.data.header.id[0]] = self.props.data.data[i][self.props.data.header.id[0]];
            tempObj[self.props.data.header.value[0]] = Number((cenas).toFixed(self.state.options.decimal_percent));
            
            tempDataPercent.push(tempObj);
        }

        if(self.state.options.percent){
            self.setState({data:tempDataPercent});
        } else {
            self.setState({data:self.props.data.data});
        }
}

export const handleInterpolation = (interpolation) => {
    switch(interpolation){
        case 0:
            return "linear"; 
        case 1:
            return "monotone";
        case 2:
            return "step";
        case 3:
            return "Function";
        case 4:
            return "Natural";
        case 5:
            return "basis";
        default:
            return "linear";  
    }
}

export const DataFormater = (number) => {
    if(number >= 1000000000){
        return (number/1000000000).toString() + 'b';
    } else if(number >= 1000000){
        return (number/1000000).toString() + 'm';
    } else if(number >= 1000){
        return (number/1000).toString() + 'k';
    } else{
        return number.toString();
    }
}