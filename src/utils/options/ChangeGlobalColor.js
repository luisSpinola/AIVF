import { VALUE_COLOR, VALUE_COLOR_OBJ } from '../Conf';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import React from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


export default class GlobalPicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            colors: VALUE_COLOR_OBJ['color'],
            displayColorPicker: Array(VALUE_COLOR_OBJ['color'].length).fill(false)
        };
    }
    getPicker = () => {
        let styles = this.colorStyles(this.state.colors,this.state.colors.length);
        let colorsDisplay = this.colorsDisplayFunc(styles);
        return colorsDisplay;
    }

    colorStyles = (colors, size) => {
        let styles = [];
        for(let i=0;i<size; i++){
            styles.push(reactCSS({
                'default': {
                  color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `${colors[i]}`,
                  },
                  swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                  },
                  popover: {
                    position: 'absolute',
                    zIndex: '2',
                  },
                  cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                  },
                },
            }))
        }
        return styles;
    }
    addColor = () => {
        let colorArray = VALUE_COLOR_OBJ['color'];
        colorArray.push("#000000");
        VALUE_COLOR_OBJ['color'] = colorArray;
        this.forceUpdate();
    }

    colorsDisplayFunc = (styles) => {
        let colors = [];
        for(let i=0; i<styles.length; i++){
            colors.push(<span key={i}>
                <div style={ styles[i].swatch } onClick={() => this.handleColorClick(i)}>
                    <div style={ styles[i].color } />
                </div>
                { 
                    this.state.displayColorPicker[i] ? <div  style={styles[i].popover }>
                    <div style={ styles[i].cover } onClick={() => this.handleClose(i) }/>
                        <SketchPicker  presetColors={VALUE_COLOR} disableAlpha={true} color={ this.state.colors[i] } onChange={(color) => this.handleChange(color, i) } />
                    </div> : null 
                }
            </span>)
        }
        colors.push(<span key={'add_key'}>
            <div style={{   padding: '5px',background: '#fff',borderRadius: '1px',boxShadow: '0 0 0 1px rgba(0,0,0,.1)', display: 'inline-block'}}>
                <div style={{display: 'flex', alignItems:'center', justifyContent: 'center',  width: '36px', height: '14px', borderRadius: '2px'}}>
                    <div style={{position:"absolute"}}>
                        <IconButton onClick={this.addColor} size="small">
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </div>
                </div>
                
            </div>
            
        </span>)
        return <div style={{maxWidth: '15rem'}}>{colors}</div>;
    }

    handleColorClick = (i) => {
        let tempDisplay = this.state.displayColorPicker;
        tempDisplay[i] = true;
        this.setState({ displayColorPicker: tempDisplay})
    }
    handleClose = (i) => {
        let tempDisplay = this.state.displayColorPicker;
        tempDisplay[i] = false;
        this.setState({ displayColorPicker: tempDisplay })
    }
    handleChange = (color, i) => {
        let newColors = this.props.colors;
        newColors[i] = color.hex;
        this.setState({ colors: newColors});
        this.props.setColors(newColors);
    }
    

    render(){
        return(
            <div>
                {this.getPicker()}
            </div>
        )
    }
}





