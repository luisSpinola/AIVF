
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Divider, Tooltip, Zoom, Accordion, AccordionSummary, AccordionDetails, List, FormControlLabel, Grid, Slider, Input, Switch } from '@material-ui/core';

import { LANGUAGE, LANGUAGE_FILES, SLIDER_SIZE, VALUE_COLOR_OBJ } from '../../Conf';
import { changeSlider, changeInput, changeCheckbox } from '../OptionsInputs';
import { SWITCH_PADDING, BOT_PADDING, TOP_PADDING } from '../../Conf';
import { ENTER_DELAY, LEAVE_DELAY } from '../../text/Tooltips';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

export const getColorOptions = (self,size,opacity) => {
    let styles = colorStyles(self.state.options.colors,size);
    let colorsDisplay = colorsDisplayFunc(self, styles);

    return <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="acor_cor">
                {LANGUAGE_FILES[LANGUAGE['current']].LABEL_COLOR}
                </AccordionSummary>
                <AccordionDetails>
                    <List key={'colors_key'}>
                        <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_COLOR_LOCK} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel style={{paddingLeft: SWITCH_PADDING, paddingBottom: BOT_PADDING}}  control={<Switch size="small" onChange={(e) => changeCheckbox(self, e, "colors_lock")} checked={self.state.options.colors_lock} color="primary" />}
                                    label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_COLOR_LOCK}
                                    labelPlacement="end"
                            />
                        </Tooltip>

                        <Divider/>

                        <div style={{paddingLeft: '0.5rem', paddingTop: TOP_PADDING, paddingBottom: BOT_PADDING}}>
                            {colorsDisplay}
                        </div>
                        
                        {opacity && <span><Divider/><FormControlLabel style={{paddingTop: TOP_PADDING}} control={<Grid container spacing={2}>
                                <Grid item xs>
                                    <Slider style={{width:SLIDER_SIZE}}
                                        value={self.state.options.opacity}
                                        onChange={(e,value) => changeSlider(self,e,value,"opacity")}
                                        step={5}
                                        min={0}
                                        max={100}
                                        aria-labelledby="opacity-slider"
                                    />
                                </Grid>
                                <Grid item>
                                    <Input style={{width:50}}
                                        value={self.state.options.opacity}
                                        onChange={(e) => changeInput(self,e,"opacity")}
                                        inputProps={{ step:5, min:0, max:100, type: 'number', 'aria-labelledby': 'opacity-slider'}}
                                    />
                                </Grid>
                                </Grid>}
                                label="Opacidade"
                                labelPlacement="top"
                            /></span>}
                    </List>
                </AccordionDetails>
            </Accordion>
}

export const colorStyles = (colors, size) => {
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

export const colorsDisplayFunc = (self,styles) => {
    let colors = [];
    for(let i=0; i<styles.length; i++){
        colors.push(<span key={i}>
            <div style={ styles[i].swatch } onClick={() => handleColorClick(self, i)}>
                <div style={ styles[i].color } />
            </div>
            { 
                self.state.displayColorPicker[i] ? <div  style={styles[i].popover }>
                <div style={ styles[i].cover } onClick={() => handleClose(self, i) }/>
                    <SketchPicker presetColors={VALUE_COLOR_OBJ['color']} disableAlpha={true} color={ self.state.options.colors[i] } onChange={(color) => handleChange(self, color, i) } />
                </div> : null 
            }
        </span>)
    }
    return <div style={{maxWidth: '15rem'}}>{colors}</div>;
}

export const handleColorClick = (self, i) => {
    let tempDisplay = self.state.displayColorPicker;
    tempDisplay[i] = !self.state.displayColorPicker[i];
    self.setState({ displayColorPicker: tempDisplay})
}
export const handleClose = (self, i) => {
    let tempDisplay = self.state.displayColorPicker;
    tempDisplay[i] = false;
    self.setState({ displayColorPicker: tempDisplay })
}
export const handleChange = (self, color, i) => {
    let tempOptions = self.state.options;
    let newColors = self.state.options.colors;
    newColors[i] = color.hex;
    tempOptions.colors = newColors;

    let tempOldCounter = self.state.counter;
    let tempCounter = self.state.counter + 1;

    self.setState({ options: tempOptions,
                    oldCounter: tempOldCounter,
                    counter: tempCounter});
}
