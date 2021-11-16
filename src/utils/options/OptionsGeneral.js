
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Tooltip, Accordion, Select, MenuItem, Switch, AccordionSummary, AccordionDetails, List, Zoom, FormControlLabel, Grid, Slider, Input, Divider } from '@material-ui/core';

import { ENTER_DELAY, LEAVE_DELAY, TT_HEIGHT, TT_INTERPOLATION, TT_LINESTROKE, TT_DOTS} from '../text/Tooltips';
import { SLIDER_SIZE, L_HEIGHT_MAX, L_HEIGHT_MIN, INPUT_SIZE } from '../Conf';
import { changeSlider, changeInput, changeSelect, changeCheckbox } from './OptionsInputs';

export const getGeneralOptions = (self, interpolation, line) => {
    return <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="acor_cor">
                    Geral
                </AccordionSummary>
                <AccordionDetails>
                    <List key={'general_key'}>
                        <Tooltip TransitionComponent={Zoom} arrow title={TT_HEIGHT} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel control={<Grid container spacing={2}>
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
                                label="Altura"
                                labelPlacement="top"
                            />
                        </Tooltip>

                        
                        {line && <span><Divider/><Tooltip TransitionComponent={Zoom} arrow title={TT_LINESTROKE} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel control={<Grid container spacing={2} alignItems="center">
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
                                label="Tamanho da linha"
                                labelPlacement="top"
                            />
                            </Tooltip> 
                            <Divider/>
                            <Tooltip TransitionComponent={Zoom} arrow title={TT_DOTS} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                                <FormControlLabel style={{paddingLeft: '0.7rem'}} control={<Switch onChange={(e) => changeCheckbox(self, e, "dots")} checked={self.state.options.dots} color="primary" />}
                                    label="Pontos"
                                    labelPlacement="end"
                                />
                            </Tooltip>
                        </span>}

                        {interpolation && <span> <Divider/><Tooltip TransitionComponent={Zoom} arrow title={TT_INTERPOLATION} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel
                                control={<Select style={{width:SLIDER_SIZE+INPUT_SIZE+15}} value={self.state.options.interpolation} onChange={(e) => changeSelect(self,e,"interpolation")}>
                                            <MenuItem value={0}>Linear</MenuItem>
                                            <MenuItem value={1}>Monotone</MenuItem>
                                            <MenuItem value={2}>Step</MenuItem>
                                            <MenuItem value={3}>Natural</MenuItem>
                                            <MenuItem value={4}>Function</MenuItem>
                                            <MenuItem value={5}>Basis</MenuItem>
                                        </Select>}
                                label="Interpolação"
                                labelPlacement="top"
                            />
                        </Tooltip> 
                        </span>}

                        
                    </List>
                </AccordionDetails>
            </Accordion>
}