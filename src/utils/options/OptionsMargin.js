
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Tooltip, Divider, Accordion, AccordionSummary, AccordionDetails, List, Zoom, FormControlLabel, Grid, Slider, Input } from '@material-ui/core';

import { ENTER_DELAY, LEAVE_DELAY, TT_MARGIN_TOP, TT_MARGIN_BOTTOM, TT_MARGIN_LEFT, TT_MARGIN_RIGHT } from '../text/Tooltips';
import { SLIDER_SIZE, L_MARGIN_MIN, L_MARGIN_MAX } from '../Conf';
import { changeSlider, changeInput } from './OptionsInputs';

export const getMarginOptions = (self) => {
    return <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="acor_cor">
                    Margem
                </AccordionSummary>
                <AccordionDetails>
                    <List key={'margin_key'}>
                        <Tooltip TransitionComponent={Zoom} arrow title={TT_MARGIN_TOP} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                                <FormControlLabel control={<Grid container spacing={2} alignItems="center">
                                        <Grid item xs>
                                            <Slider style={{width:SLIDER_SIZE}}
                                                value={self.state.options.margin_top}
                                                onChange={(e,value) => changeSlider(self,e,value,"margin_top")}
                                                step={5}
                                                min={L_MARGIN_MIN}
                                                max={L_MARGIN_MAX}
                                                aria-labelledby="margin_top-slider"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Input style={{width:50}}
                                                value={self.state.options.margin_top}
                                                onChange={(e) => changeInput(self,e,"margin_top")}
                                                inputProps={{ step:5, min:L_MARGIN_MIN, max:L_MARGIN_MAX, type: 'number', 'aria-labelledby': 'margin_top-slider'}}
                                            />
                                        </Grid>
                                    </Grid>}
                                    label="Topo"
                                    labelPlacement="top"
                                />
                        </Tooltip>

                        <Divider/>

                        <Tooltip TransitionComponent={Zoom} arrow title={TT_MARGIN_BOTTOM} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                                <FormControlLabel control={<Grid container spacing={2} alignItems="center">
                                        <Grid item xs>
                                            <Slider style={{width:SLIDER_SIZE}}
                                                value={self.state.options.margin_bottom}
                                                onChange={(e,value) => changeSlider(self,e,value,"margin_bottom")}
                                                step={5}
                                                min={L_MARGIN_MIN}
                                                max={L_MARGIN_MAX}
                                                aria-labelledby="margin_bottom-slider"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Input style={{width:50}}
                                                value={self.state.options.margin_bottom}
                                                onChange={(e) => changeInput(self,e,"margin_bottom")}
                                                inputProps={{ step:5, min:L_MARGIN_MIN, max:L_MARGIN_MAX, type: 'number', 'aria-labelledby': 'margin_bottom-slider'}}
                                            />
                                        </Grid>
                                    </Grid>}
                                    label="Fundo"
                                    labelPlacement="top"
                                />
                        </Tooltip>

                        <Divider/>

                        <Tooltip TransitionComponent={Zoom} arrow title={TT_MARGIN_RIGHT} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                                <FormControlLabel control={<Grid container spacing={2} alignItems="center">
                                        <Grid item xs>
                                            <Slider style={{width:SLIDER_SIZE}}
                                                value={self.state.options.margin_right}
                                                onChange={(e,value) => changeSlider(self,e,value,"margin_right")}
                                                step={5}
                                                min={L_MARGIN_MIN}
                                                max={L_MARGIN_MAX}
                                                aria-labelledby="margin_right-slider"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Input style={{width:50}}
                                                value={self.state.options.margin_right}
                                                onChange={(e) => changeInput(self,e,"margin_right")}
                                                inputProps={{ step:5, min:L_MARGIN_MIN, max:L_MARGIN_MAX, type: 'number', 'aria-labelledby': 'margin_right-slider'}}
                                            />
                                        </Grid>
                                    </Grid>}
                                    label="Direita"
                                    labelPlacement="top"
                                />
                        </Tooltip>

                        <Divider/>

                        <Tooltip TransitionComponent={Zoom} arrow title={TT_MARGIN_LEFT} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                                <FormControlLabel control={<Grid container spacing={2} alignItems="center">
                                        <Grid item xs>
                                            <Slider style={{width:SLIDER_SIZE}}
                                                value={self.state.options.margin_left}
                                                onChange={(e,value) => changeSlider(self,e,value,"margin_left")}
                                                step={5}
                                                min={L_MARGIN_MIN}
                                                max={L_MARGIN_MAX}
                                                aria-labelledby="margin_left-slider"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Input style={{width:50}}
                                                value={self.state.options.margin_left}
                                                onChange={(e) => changeInput(self,e,"margin_left")}
                                                inputProps={{ step:5, min:L_MARGIN_MIN, max:L_MARGIN_MAX, type: 'number', 'aria-labelledby': 'margin_left-slider'}}
                                            />
                                        </Grid>
                                    </Grid>}
                                    label="Esquerda"
                                    labelPlacement="top"
                                />
                        </Tooltip>
                    </List>
                </AccordionDetails>
            </Accordion>
}