
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Tooltip, Switch, Accordion, AccordionSummary, AccordionDetails, List, Zoom, FormControlLabel, Grid, Slider, Input } from '@material-ui/core';

import { ENTER_DELAY, LEAVE_DELAY } from '../../text/Tooltips';
import { LANGUAGE, LANGUAGE_FILES, SLIDER_SIZE } from '../../Conf';
import { updatePercent, changeInputPercent, changeSlider} from '../OptionsInputs';
import { handlePercentChange } from '../HandleOptions';

export const getPercentOptions = (self) => {
    let auto = !self.state.options.percent;
    return <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} id="acor_cor">
                    <div>
                        {LANGUAGE_FILES[LANGUAGE['current']].LABEL_PERCENT}
                        <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_PERCENT} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>  
                            <Switch size="small" onClick={(event) => event.stopPropagation()} onFocus={(event) => event.stopPropagation()} onChange={(e) => handlePercentChange(self, e)} checked={self.state.options.percent} color="primary" />
                        </Tooltip>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <List key={'percent_key'}>
                        <Tooltip TransitionComponent={Zoom} arrow title={LANGUAGE_FILES[LANGUAGE['current']].TT_DECIMALPERCENT} enterDelay={ENTER_DELAY} leaveDelay={LEAVE_DELAY}>  
                            <FormControlLabel disabled={auto} control={<Grid container spacing={2} alignItems="center">
                                    <Grid item xs>
                                        <Slider disabled={auto} style={{width:SLIDER_SIZE}}
                                            value={self.state.options.decimal_percent}
                                            onChange = {(e,value) => changeSlider(self,e,value,"decimal_percent")}
                                            onChangeCommitted={() => updatePercent(self)}
                                            step={1}
                                            min={0}
                                            max={5}
                                            aria-labelledby="decimal_percent-slider"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Input disabled={auto} style={{width:50}}
                                            value={self.state.options.decimal_percent}
                                            onChange={(e) => changeInputPercent(self,e,"decimal_percent")}
                                            inputProps={{ step:1, min: 0, max: 5, type: 'number', 'aria-labelledby': 'decimal_percent-slider'}}
                                        />
                                    </Grid>
                                </Grid>}
                                label={LANGUAGE_FILES[LANGUAGE['current']].LABEL_PERCENT_DECIMALS}
                                labelPlacement="top"
                            />
                            </Tooltip>
                    </List>
                </AccordionDetails>
            </Accordion>
}