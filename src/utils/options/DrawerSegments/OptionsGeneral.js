
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Tooltip, Accordion, Select, MenuItem, Switch, AccordionSummary, AccordionDetails, List, Zoom, FormControlLabel, Grid, Slider, Input, Divider } from '@material-ui/core';

import { ENTER_DELAY, LEAVE_DELAY} from '../../text/Tooltips';
import { SLIDER_SIZE, L_HEIGHT_MAX, L_HEIGHT_MIN, INPUT_SIZE, SWITCH_PADDING, TOP_PADDING, BOT_PADDING } from '../../Conf';
import { changeSlider, changeInput, changeSelect, changeCheckbox } from '../OptionsInputs';
import { handleOrderChange } from '../HandleOptions';

import { LANGUAGE, LANGUAGE_FILES } from '../../Conf';

export const getGeneralOptions = (self, interpolation, line, order, grouped, stacked, spacing) => {
    let hightPad;
    (interpolation || order) ? hightPad = {paddingBottom:BOT_PADDING} : hightPad = {};

    let groupedPad;
    (grouped || stacked) ? groupedPad = {paddingBottom:BOT_PADDING, paddingTop:TOP_PADDING} : groupedPad = {paddingTop:TOP_PADDING}

    let autoStacked;
    if(self.state.options.grouped !== undefined) autoStacked = !self.state.options.grouped;

    return <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="acor_cor">
                    Geral
                </AccordionSummary>
                <AccordionDetails>
                    <List key={'general_key'}>
                        <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_HEIGHT} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel style={hightPad} control={<Grid container spacing={2}>
                                <Grid item xs>
                                    <Slider style={{width:SLIDER_SIZE}}
                                        value={self.state.options.height}
                                        onChange={(e,value) => changeSlider(self,e,value,"height")}
                                        step={50}
                                        min={L_HEIGHT_MIN}
                                        max={L_HEIGHT_MAX}
                                        aria-labelledby="height-slider"
                                    />
                                </Grid>
                                <Grid item>
                                    <Input style={{width:50}}
                                        value={self.state.options.height}
                                        onChange={(e) => changeInput(self,e,"height")}
                                        inputProps={{ step:50, min:L_HEIGHT_MIN, max:L_HEIGHT_MAX, type: 'number', 'aria-labelledby': 'height-slider'}}
                                    />
                                </Grid>
                                </Grid>}
                                label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_HEIGHT}
                                labelPlacement="top"
                            />
                        </Tooltip>

                        
                        {line && <span><Divider/><Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_LINESTROKE} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel style={{paddingBottom: BOT_PADDING, paddingTop: TOP_PADDING}} control={<Grid container spacing={2} alignItems="center">
                                    <Grid item xs>
                                        <Slider style={{width:SLIDER_SIZE}}
                                            value={self.state.options.lineStroke}
                                            onChange={(e,value) => changeSlider(self,e,value,"lineStroke")}
                                            step={1}
                                            min={0}
                                            max={10}
                                            aria-labelledby="lineStroke-slider"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Input style={{width:50}}
                                            value={self.state.options.lineStroke}
                                            onChange={(e) => changeInput(self,e,"lineStroke")}
                                            inputProps={{ step:1, min:0, max: 10, type: 'number', 'aria-labelledby': 'lineStroke-slider'}}
                                        />
                                    </Grid>
                                </Grid>}
                                label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_LINE_STROKE}
                                labelPlacement="top"
                            />
                            </Tooltip> 
                            <Divider/>
                            <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_DOTS} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                                <FormControlLabel style={{paddingLeft: SWITCH_PADDING, paddingBottom: BOT_PADDING, paddingTop: TOP_PADDING}} control={<Switch size="small" onChange={(e) => changeCheckbox(self, e, "dots")} checked={self.state.options.dots} color="primary" />}
                                    label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_LINE_DOTS}
                                    labelPlacement="end"
                                />
                            </Tooltip>
                        </span>}

                        {interpolation && <span> <Divider/><Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_INTERPOLATION} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel style={groupedPad}
                                control={<Select style={{width:SLIDER_SIZE+INPUT_SIZE+15}} value={self.state.options.interpolation} onChange={(e) => changeSelect(self,e,"interpolation")}>
                                            <MenuItem value={0}>Linear</MenuItem>
                                            <MenuItem value={1}>Monotone</MenuItem>
                                            <MenuItem value={2}>Step</MenuItem>
                                            <MenuItem value={3}>Natural</MenuItem>
                                            <MenuItem value={4}>Function</MenuItem>
                                            <MenuItem value={5}>Basis</MenuItem>
                                        </Select>}
                                label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_LINE_INTERPOLATION}
                                labelPlacement="top"
                            />
                        </Tooltip> 
                        </span>}

                        {order && <span> <Divider/> <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_ORDER} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel style={{ paddingTop: TOP_PADDING}}
                                control={<Select style={{width:SLIDER_SIZE+INPUT_SIZE+15}} id="order_select" value={self.state.options.order} onChange={(e) => handleOrderChange(self, e)}>
                                            <MenuItem value={0}>Original</MenuItem>
                                            <MenuItem value={1}>Crescente</MenuItem>
                                            <MenuItem value={2}>Decrescente</MenuItem>
                                        </Select>}
                                label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_PIE_ORDER}
                                labelPlacement="top"
                            />
                        </Tooltip>
                        </span>}

                        {grouped && <span> <Divider/>
                            <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_GROUPED} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                                <FormControlLabel style={{paddingLeft: SWITCH_PADDING, paddingBottom: BOT_PADDING, paddingTop: TOP_PADDING}} control={<Switch size="small" onChange={(e) => changeCheckbox(self, e, "grouped")} checked={self.state.options.grouped} color="primary" />}
                                    label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_GROUPED}
                                    labelPlacement="end"
                                />
                            </Tooltip>
                        </span>}

                        {stacked && <span> <Divider/>
                            <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_STACKED} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                                <FormControlLabel disabled={autoStacked} style={{paddingLeft: SWITCH_PADDING, paddingTop: TOP_PADDING}} control={<Switch disabled={autoStacked} size="small" onChange={(e) => changeCheckbox(self, e, "stacked")} checked={self.state.options.stacked} color="primary" />}
                                    label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_STACKED}
                                    labelPlacement="end"
                                />
                            </Tooltip>
                        </span>}

                        {spacing && <span> <Divider/>
                            <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_SIDE_SPACING} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel style={{paddingTop: TOP_PADDING}} control={<Grid container spacing={2}>
                                <Grid item xs>
                                    <Slider style={{width:SLIDER_SIZE}}
                                        value={self.state.options.spacing}
                                        onChange={(e,value) => changeSlider(self,e,value,"spacing")}
                                        step={1}
                                        min={0}
                                        max={30}
                                        aria-labelledby="spacing-slider"
                                    />
                                </Grid>
                                <Grid item>
                                    <Input style={{width:50}}
                                        value={self.state.options.spacing}
                                        onChange={(e) => changeInput(self,e,"spacing")}
                                        inputProps={{ step:1, min:0, max:30, type: 'number', 'aria-labelledby': 'spacing-slider'}}
                                    />
                                </Grid>
                                </Grid>}
                                label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_SIDE_SPACING}
                                labelPlacement="top"
                            />
                        </Tooltip>
                        </span>}
                        
                    </List>
                </AccordionDetails>
            </Accordion>
}