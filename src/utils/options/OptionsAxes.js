
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Tooltip, Divider, Accordion, AccordionSummary, AccordionDetails, List, Zoom, FormControlLabel, Grid, Slider, Input, Switch, MenuItem, Select } from '@material-ui/core';

import { handleOrderChange } from './HandleOptions';
import { ENTER_DELAY, LEAVE_DELAY, TT_YTIVK, TT_SIMPLIFY, TT_SCALE, TT_ORDER } from '../text/Tooltips';
import { SLIDER_SIZE, INPUT_SIZE, L_YTIVK_MAX, L_YTIVK_MIN } from '../Conf';
import { changeSlider, changeInput, changeCheckbox, changeSelect } from './OptionsInputs';

export const getAxesOptions = (self, scale, order) => {
    return <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="acor_cor">
                    Eixos
                </AccordionSummary>
                <AccordionDetails>
                    <List key={'axes_key'}>
                        <Tooltip TransitionComponent={Zoom} arrow title={TT_YTIVK} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel control={<Grid container spacing={2} alignItems="center">
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
                                label="Número de valores (y)"
                                labelPlacement="top"
                            />
                        </Tooltip>

                        <Divider/>

                        <Tooltip TransitionComponent={Zoom} arrow title={TT_SIMPLIFY} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel control={<Switch onChange={(e) => changeCheckbox(self, e,"simplify")} checked={self.state.options.simplify} color="primary" />}
                                    label="Simplicar Valores (y)"
                                    labelPlacement="end"
                                />
                        </Tooltip>

                        <Divider/>

                        {scale && <Tooltip TransitionComponent={Zoom} arrow title={TT_SCALE} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel control={<Select style={{width:SLIDER_SIZE+INPUT_SIZE+15}} value={self.state.options.scale} onChange={(e) => changeSelect(self, e,"scale")}>
                                            <MenuItem value={0}>Normal</MenuItem>
                                            <MenuItem value={1}>Logarítmica</MenuItem>
                                        </Select>}
                                label="Escala (y)"
                                labelPlacement="top"
                            />
                        </Tooltip>}  

                        <Divider/>

                        {order && <Tooltip TransitionComponent={Zoom} arrow title={TT_ORDER} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel
                                control={<Select style={{width:SLIDER_SIZE+INPUT_SIZE+15}} id="order_select" value={self.state.options.order} onChange={(e) => handleOrderChange(self, e)}>
                                            <MenuItem value={0}>Original</MenuItem>
                                            <MenuItem value={1}>Crescente</MenuItem>
                                            <MenuItem value={2}>Decrescente</MenuItem>
                                        </Select>}
                                label="Ordem (x)"
                                labelPlacement="top"
                            />
                        </Tooltip>}  

                    </List>
                </AccordionDetails>
            </Accordion>
}