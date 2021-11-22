export const SLIDER_SIZE = 150;
export const INPUT_SIZE = 50;

export const SAVE_TIMER = 5; //  Time cycle in seconds to check if options were changed -> push to db.

export const SWITCH_PADDING = '1.3rem';
export const TOP_PADDING = '1rem';
export const BOT_PADDING = '1rem';

// Language
export let LANGUAGE = {'current': 'pt'};
export const LANGUAGE_FILES = {
    'pt': require('./text/TextInfo-pt'),
    'en': require('./text/TextInfo-en'),
}
//  Default values for Options -> COLOR
export const VALUE_COLOR = ['#7dba00','#5594b4','#f7913e','#796662','#423b67','#fa4d56','#570408','#198038'];
export const VALUE_COLOR_OBJ = {
    'color': ['#7dba00','#5594b4','#f7913e','#796662','#423b67','#fa4d56','#570408','#198038']};


//  Default values for Options
export const VALUE_SIMPLIFY = false;
export const VALUE_YTICK = 4;
//  Default values for Options -> GRID
export const VALUE_GRID = true;
export const VALUE_GRID_HORIZONTAL = true;
export const VALUE_GRID_VERTICAL = true;
export const VALUE_GRID_STROKE = false;
export const VALUE_GRID_OPACITY = 50;
//  Default values for Options -> LABEL_LIST
export const VALUE_LABELLIST = false;
export const VALUE_LABELLIST_POSITION = 'top';
export const VALUE_LABELLIST_OFFSET = -20;
export const VALUE_LABELLIST_ANGLE = 0;
export const VALUE_LABELLIST_SIMPLIFY = false;
//  Default values for Options -> LEGEND
export const VALUE_LEGEND = true;
export const VALUE_LEGEND_POS = 'bottom';
export const VALUE_LEGEND_ALIGN = 'center';

export const VALUE_OPACITY = 80;
//  Default values for Options -> HEIGHT
export const VALUE_HEIGHT = 300;
//  Default values for Options -> MARGIN
export const VALUE_MARGIN_TOP = 10;
export const VALUE_MARGIN_BOTTTOM = 0;
export const VALUE_MARGIN_LEFT = 0;
export const VALUE_MARGIN_RIGHT = 20;

//Default Limiters
export const L_LABELLIST_OFFSET_MIN = -50;
export const L_LABELLIST_OFFSET_MAX = 50;
export const L_HEIGHT_MIN = 150;
export const L_HEIGHT_MAX = 600;
export const L_YTIVK_MIN = 0;
export const L_YTIVK_MAX = 20;
export const L_MARGIN_MIN = -100;
export const L_MARGIN_MAX = 100;
