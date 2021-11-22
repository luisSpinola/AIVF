import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

import { changeCheckbox, changeSlider, changeInput, changeSelect } from '../OptionsInputs';

import { LANGUAGE, LANGUAGE_FILES, SLIDER_SIZE, INPUT_SIZE, SWITCH_PADDING, TOP_PADDING, BOT_PADDING, L_LABELLIST_OFFSET_MAX, L_LABELLIST_OFFSET_MIN } from '../../Conf';

import { ENTER_DELAY, LEAVE_DELAY } from '../../text/Tooltips';

export const getLabelListOptions = (self, pos_offset) => {
    let auto = !self.state.options.labelList;
    let noOffsetPad;
    (pos_offset) ? noOffsetPad = {paddingTop:TOP_PADDING,paddingBottom:BOT_PADDING} : noOffsetPad = {paddingBottom:BOT_PADDING};
    return <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="acor_cor">
                                    <div>
                                        {LANGUAGE_FILES[LANGUAGE['current']].LABEL_LABELLIST}
                                        <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_LABELLIST} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>  
                                            <Switch size="small" onClick={(event) => event.stopPropagation()} onFocus={(event) => event.stopPropagation()} onChange={(e) => changeCheckbox(self, e, "labelList")} checked={self.state.options.labelList} color="primary" />
                                        </Tooltip>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List>

                                        {pos_offset && <span>
                                        <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_LABELLIST_POS} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>  
                                            <FormControlLabel disabled={auto} style={{paddingBottom:BOT_PADDING}} control={<Select disabled={auto} style={{width:SLIDER_SIZE+INPUT_SIZE+15}} value={self.state.options.labelList_position} onChange={(e) => changeSelect(self, e,"labelList_position")}>
                                                            <MenuItem value={"top"}>Topo</MenuItem>
                                                            <MenuItem value={"bottom"}>Fundo</MenuItem>
                                                            <MenuItem value={"center"}>Centro</MenuItem>
                                                        </Select>}
                                                label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_LABELLIST_POS}
                                                labelPlacement="top"
                                            />
                                        </Tooltip>
                                        
                                        <Divider/>

                                        <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_LABELLIST_OFFSET} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                                            <FormControlLabel disabled={auto} style={{paddingTop:TOP_PADDING,paddingBottom:BOT_PADDING}} control={<Grid container spacing={2} alignItems="center">
                                                    <Grid item xs>
                                                        <Slider disabled={auto} style={{width:SLIDER_SIZE}}
                                                            value={self.state.options.labelList_offset}
                                                            onChange={(e,value) => changeSlider(self,e,value,"labelList_offset")}
                                                            step={1}
                                                            min={L_LABELLIST_OFFSET_MIN}
                                                            max={L_LABELLIST_OFFSET_MAX}
                                                            aria-labelledby="labelList_offset-slider"
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Input disabled={auto} style={{width:50}}
                                                            value={self.state.options.labelList_offset}
                                                            onChange={(e) => changeInput(self,e,"labelList_offset")}
                                                            inputProps={{ step:1, min:L_LABELLIST_OFFSET_MIN, max: L_LABELLIST_OFFSET_MAX, type: 'number', 'aria-labelledby': 'labelList_offset-slider'}}
                                                        />
                                                    </Grid>
                                                </Grid>}
                                                label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_LABELLIST_OFFSET}
                                                labelPlacement="top"
                                            />
                                        </Tooltip>
                                        
                                        <Divider/>
                                        </span>}

                                        

                                        <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_LABELLIST_ANGLE} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                                            <FormControlLabel disabled={auto} style={noOffsetPad} control={<Grid container spacing={2} alignItems="center">
                                                    <Grid item xs>
                                                        <Slider disabled={auto} style={{width:SLIDER_SIZE}}
                                                            value={self.state.options.labelList_angle}
                                                            onChange={(e,value) => changeSlider(self,e,value,"labelList_angle")}
                                                            step={1}
                                                            min={-90}
                                                            max={90}
                                                            aria-labelledby="labelList_angle-slider"
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <Input disabled={auto} style={{width:50}}
                                                            value={self.state.options.labelList_angle}
                                                            onChange={(e) => changeInput(self,e,"labelList_angle")}
                                                            inputProps={{ step:1, min:-90, max: 90, type: 'number', 'aria-labelledby': 'labelList_angle-slider'}}
                                                        />
                                                    </Grid>
                                                </Grid>}
                                                label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_LABELLIST_ANG}
                                                labelPlacement="top"
                                            />
                                        </Tooltip>
                                        
                                        <Divider key={'valores_divider_31'}/>

                                        <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_LABELLIST_SIMPLIFY} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                                            <FormControlLabel disabled={auto} style={{paddingLeft: SWITCH_PADDING, paddingTop:TOP_PADDING,paddingBottom:BOT_PADDING}} control={<Switch disabled={auto} size="small" onChange={(e) => changeCheckbox(self, e, "labelList_simplify")} checked={self.state.options.labelList_simplify} color="primary" />}
                                                    label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_LABELLIST_SIMPLIFY}
                                                    labelPlacement="end"
                                            />
                                        </Tooltip>
                                    </List>
                                </AccordionDetails>
                            </Accordion>
}