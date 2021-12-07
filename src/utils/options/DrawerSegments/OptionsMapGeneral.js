
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Tooltip, Accordion, Select, MenuItem, AccordionSummary, AccordionDetails, List, Zoom, FormControlLabel, Grid, Slider, Input, Divider } from '@material-ui/core';

import { ENTER_DELAY, LEAVE_DELAY} from '../../text/Tooltips';
import { SLIDER_SIZE, L_MAP_HEIGHT_MAX, L_MAP_HEIGHT_MIN, INPUT_SIZE, TOP_PADDING, BOT_PADDING } from '../../Conf';
import { changeSlider, changeInput, changeSelect, } from '../OptionsInputs';

import { LANGUAGE, LANGUAGE_FILES } from '../../Conf';

export const getGeneralOptions = (self) => {
    return <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="acor_cor">
                    Geral
                </AccordionSummary>
                <AccordionDetails>
                    <List key={'general_key'}>
                        <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_HEIGHT} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel style={{paddingTop: TOP_PADDING, paddingBottom: BOT_PADDING}} control={<Grid container spacing={2}>
                                <Grid item xs>
                                    <Slider style={{width:SLIDER_SIZE}}
                                        value={self.state.options.height}
                                        onChange={(e,value) => changeSlider(self,e,value,"height")}
                                        step={50}
                                        min={L_MAP_HEIGHT_MIN}
                                        max={L_MAP_HEIGHT_MAX}
                                        aria-labelledby="height-slider"
                                    />
                                </Grid>
                                <Grid item>
                                    <Input style={{width:50}}
                                        value={self.state.options.height}
                                        onChange={(e) => changeInput(self,e,"height")}
                                        inputProps={{ step:50, min:L_MAP_HEIGHT_MIN, max:L_MAP_HEIGHT_MAX, type: 'number', 'aria-labelledby': 'height-slider'}}
                                    />
                                </Grid>
                                </Grid>}
                                label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_HEIGHT}
                                labelPlacement="top"
                            />
                        </Tooltip>

                        <Divider/>
                        <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_MAP} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>
                            <FormControlLabel style={{paddingTop: TOP_PADDING}} value="start"
                                control={<Select style={{width:SLIDER_SIZE+INPUT_SIZE+15}} value={self.state.options.map} onChange={(e) => changeSelect(self, e,"map")}>
                                            <MenuItem value={0}>Sem Mapa</MenuItem>
                                            <MenuItem value={1}>Relevo</MenuItem>
                                            <MenuItem value={2}>Normal</MenuItem>
                                            <MenuItem value={3}>Terreno</MenuItem>
                                            <MenuItem value={4}>Satellite</MenuItem>
                                        </Select>}
                                label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_MAP}
                                labelPlacement="top"
                            />
                        </Tooltip>
                    </List>
                </AccordionDetails>
            </Accordion>
}