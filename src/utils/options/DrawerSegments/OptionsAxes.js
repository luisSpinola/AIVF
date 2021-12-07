
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Tooltip, Divider, Accordion, AccordionSummary, AccordionDetails, List, Zoom, FormControlLabel, Grid, Slider, Input, Switch, MenuItem, Select } from '@material-ui/core';

import { handleOrderChange } from '../HandleOptions';
import { ENTER_DELAY, LEAVE_DELAY } from '../../text/Tooltips';
import { LANGUAGE, LANGUAGE_FILES,SLIDER_SIZE, INPUT_SIZE, L_YTIVK_MAX, L_YTIVK_MIN, SWITCH_PADDING, TOP_PADDING, BOT_PADDING } from '../../Conf';
import { changeSlider, changeInput, changeCheckbox, changeSelect } from '../OptionsInputs';

export const getAxesOptions = (self, scale, order, invert, xTick) => {
    let invertPad;
    (invert) ? invertPad = {paddingTop: TOP_PADDING, paddingBottom: BOT_PADDING} : invertPad = {paddingTop: TOP_PADDING}
    return <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="acor_cor">
                    {LANGUAGE_FILES[LANGUAGE['current']].LABEL_AXES}
                </AccordionSummary>
                <AccordionDetails>
                    <List key={'axes_key'}>
                        <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_YTICK} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel style={{paddingBottom: BOT_PADDING}} control={<Grid container spacing={2} alignItems="center">
                                    <Grid item xs>
                                        <Slider style={{width:SLIDER_SIZE}}
                                            value={self.state.options.yTick}
                                            onChange={(e,value) => changeSlider(self,e,value,"yTick")}
                                            step={1}
                                            min={L_YTIVK_MIN}
                                            max={L_YTIVK_MAX}
                                            aria-labelledby="ytick-slider"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Input style={{width:50}}
                                            value={self.state.options.yTick}
                                            margin="dense"
                                            onChange={(e) => changeInput(self,e,"yTick")}
                                            inputProps={{ step:1, min:L_YTIVK_MIN, max: L_YTIVK_MAX, type: 'number', 'aria-labelledby': 'ytick-slider'}}
                                        />
                                    </Grid>
                                </Grid>}
                                label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_YTICK}
                                labelPlacement="top"
                            />
                        </Tooltip>

                        {xTick && <span><Divider/><Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_XTICK} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel style={{paddingTop: TOP_PADDING, paddingBottom: BOT_PADDING}} control={<Grid container spacing={2} alignItems="center">
                                    <Grid item xs>
                                        <Slider style={{width:SLIDER_SIZE}}
                                            value={self.state.options.xTick}
                                            onChange={(e,value) => changeSlider(self,e,value,"xTick")}
                                            step={1}
                                            min={L_YTIVK_MIN}
                                            max={L_YTIVK_MAX}
                                            aria-labelledby="xtick-slider"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Input style={{width:50}}
                                            value={self.state.options.xTick}
                                            margin="dense"
                                            onChange={(e) => changeInput(self,e,"xTick")}
                                            inputProps={{ step:1, min:L_YTIVK_MIN, max: L_YTIVK_MAX, type: 'number', 'aria-labelledby': 'xtick-slider'}}
                                        />
                                    </Grid>
                                </Grid>}
                                label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_XTICK}
                                labelPlacement="top"
                            />
                        </Tooltip></span>}

                        <Divider/>

                        <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_SIMPLIFY} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel style={{paddingLeft: SWITCH_PADDING, paddingTop: TOP_PADDING, paddingBottom: BOT_PADDING}} control={<Switch size="small" onChange={(e) => changeCheckbox(self, e,"simplify")} checked={self.state.options.simplify} color="primary" />}
                                    label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_YSIMPLIFY}
                                    labelPlacement="end"
                                />
                        </Tooltip>

                        {scale && <span><Divider/><Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_SCALE} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel style={{paddingTop: TOP_PADDING, paddingBottom: BOT_PADDING}} control={<Select style={{width:SLIDER_SIZE+INPUT_SIZE+15}} value={self.state.options.scale} onChange={(e) => changeSelect(self, e,"scale")}>
                                            <MenuItem value={0}>Normal</MenuItem>
                                            <MenuItem value={1}>Logarítmica</MenuItem>
                                        </Select>}
                                label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_YSCALE}
                                labelPlacement="top"
                            />
                        </Tooltip></span>}  

                        

                        {order && <span><Divider/><Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_ORDER} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel style={invertPad}
                                control={<Select style={{width:SLIDER_SIZE+INPUT_SIZE+15}} id="order_select" value={self.state.options.order} onChange={(e) => handleOrderChange(self, e)}>
                                            <MenuItem value={0}>Original</MenuItem>
                                            <MenuItem value={1}>Crescente</MenuItem>
                                            <MenuItem value={2}>Decrescente</MenuItem>
                                        </Select>}
                                label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_XORDER}
                                labelPlacement="top"
                            />
                        </Tooltip></span>}  

                        {invert && <span><Divider/><Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_AXES_INVERT} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel style={{paddingLeft: SWITCH_PADDING, paddingTop: TOP_PADDING}} control={<Switch size="small" onChange={(e) => changeCheckbox(self, e,"invert_axes")} checked={self.state.options.invert_axes} color="primary" />}
                                    label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_AXES_INVERT}
                                    labelPlacement="end"
                                /></Tooltip>
                        </span>}

                    </List>
                </AccordionDetails>
            </Accordion>
}