
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Tooltip, Divider, Switch, Accordion, AccordionSummary, AccordionDetails, List, Zoom, FormControlLabel, Grid, Slider, Input } from '@material-ui/core';

import { ENTER_DELAY, LEAVE_DELAY } from '../../text/Tooltips';
import { LANGUAGE, LANGUAGE_FILES, SLIDER_SIZE, SWITCH_PADDING, TOP_PADDING, BOT_PADDING} from '../../Conf';
import { changeSlider, changeInput, changeCheckbox } from '../OptionsInputs';

export const getRadiusOptions = (self) => {
    let auto = self.state.options.autoRadius;
    
    return <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="acor_cor">
                    {LANGUAGE_FILES[LANGUAGE['current']].OPTIONS_RADIUS_NAME}
                </AccordionSummary>
                <AccordionDetails>
                    <List key={'radius_key'}>
                    <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_RADIUS_AUTO} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>  
                        <FormControlLabel 
                            style={{paddingLeft: SWITCH_PADDING, paddingBottom:BOT_PADDING}} 
                            control={<Switch size="small" 
                                        onChange={(e) => changeCheckbox(self, e, "autoRadius")} 
                                        checked={self.state.options.autoRadius} color="primary" />} 
                                        label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_RADIUS_AUTO} labelPlacement="end"/>
                    </Tooltip>

                    <Divider/>

                    <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_RADIUS_INNER} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>  
                        <FormControlLabel style={{paddingTop:TOP_PADDING, paddingBottom:BOT_PADDING}} disabled={auto} control={<Grid container spacing={2}>
                            <Grid item xs>
                                <Slider disabled={auto} style={{width:SLIDER_SIZE}}
                                    value={self.state.options.innerRadius}
                                    onChange={(e,value) => changeSlider(self,e,value,"innerRadius")}
                                    step={10}
                                    min={0}
                                    max={100}
                                    aria-labelledby="innerradius-slider"
                                />
                            </Grid>
                            <Grid item>
                                <Input disabled={auto} style={{width:50}}
                                    value={self.state.options.innerRadius}
                                    onChange={(e) => changeInput(self,e,"innerRadius")}
                                    inputProps={{ step:10, min: 0, max: 100, type: 'number', 'aria-labelledby': 'innerradius-slider'}}
                                />
                            </Grid>
                            </Grid>}
                            label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_RADIUS_INNER}
                            labelPlacement="top"
                        />
                    </Tooltip>

                    <Divider/>
                                        
                    <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_RADIUS_OUTER} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>  
                        <FormControlLabel style={{paddingTop:TOP_PADDING, paddingBottom:BOT_PADDING}} disabled={auto} control={<Grid container spacing={2}>
                            <Grid item xs>
                                <Slider disabled={auto} style={{width:SLIDER_SIZE}}
                                    value={self.state.options.outerRadius}
                                    onChange={(e,value) => changeSlider(self,e,value,"outerRadius")}
                                    step={10}
                                    min={0}
                                    max={200}
                                    aria-labelledby="outerradius-slider"
                                />
                            </Grid>
                            <Grid item>
                                <Input disabled={auto} style={{width:50}}
                                    value={self.state.options.outerRadius}
                                    onChange={(e) => changeInput(self,e,"outerRadius")}
                                    inputProps={{ step:10, min: 0, max: 200, type: 'number', 'aria-labelledby': 'outerradius-slider'}}
                                />
                            </Grid>
                            </Grid>}
                            label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_RADIUS_OUTER}
                            labelPlacement="top"
                        />
                    </Tooltip>

                    <Divider/>

                    <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_RADIUS_SPACING} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>  
                        <FormControlLabel style={{paddingTop:TOP_PADDING}} disabled={auto} control={<Grid container spacing={2}>
                            <Grid item xs>
                                <Slider disabled={auto} style={{width:SLIDER_SIZE}}
                                    value={self.state.options.spacingRadius}
                                    onChange={(e,value) => changeSlider(self,e,value,"spacingRadius")}
                                    step={1}
                                    min={0}
                                    max={40}
                                    aria-labelledby="spacingRadius-slider"
                                />
                            </Grid>
                            <Grid item>
                                <Input disabled={auto} style={{width:50}}
                                    value={self.state.options.spacingRadius}
                                    onChange={(e) => changeInput(self,e,"spacingRadius")}
                                    inputProps={{ step:1, min: 0, max: 40, type: 'number', 'aria-labelledby': 'spacingRadius-slider'}}
                                />
                            </Grid>
                            </Grid>}
                            label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_RADIUS_SPACING}
                            labelPlacement="top"
                        />
                    </Tooltip>
                    </List>
                </AccordionDetails>
            </Accordion>
}