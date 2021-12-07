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
export const VALUE_COLOR_OBJ = {'color': ['#7dba00','#5594b4','#f7913e','#796662','#423b67','#fa4d56','#570408','#198038']};
export const VALUE_COLOR_DENS_OBJ = {'color': ['#ffffb2','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026']};
//  Maps
export const MAP_LONG = -8.089343873941827;
export const MAP_LAT = 39.105266434270845;
export const MAP_ZOOM = 6.551941083083048;
export const MAP_PITCH = 20.5;
export const MAP_BEARING = 0;
export const MAPBOX_TOKEN = '';
export const MAP_VECTOR_ARRAY = [
    ['','',''],
    ['https://stamen-tiles-a.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.jpg','https://stamen-tiles-b.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.jpg','https://stamen-tiles-c.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.jpg'],
    ['https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=Y8lta7djzmVvA1VEE9fl','https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=Y8lta7djzmVvA1VEE9fl','https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=Y8lta7djzmVvA1VEE9fl'],
    ['https://a.tile.opentopomap.org/{z}/{x}/{y}.png','https://b.tile.opentopomap.org/{z}/{x}/{y}.png','https://c.tile.opentopomap.org/{z}/{x}/{y}.png'],
    ['https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=Y8lta7djzmVvA1VEE9fl','https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=Y8lta7djzmVvA1VEE9fl','https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=Y8lta7djzmVvA1VEE9fl'],
    ['https://stamen-tiles-a.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg','https://stamen-tiles-b.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg','https://stamen-tiles-c.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg']
];

export const MAP_CUR_ICON = 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png';

//  ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png','https://b.tile.openstreetmap.org/{z}/{x}/{y}.png','https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'], Free Normal

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
export const L_MAP_HEIGHT_MIN = 150;
export const L_MAP_HEIGHT_MAX = 1500;
export const L_YTIVK_MIN = 0;
export const L_YTIVK_MAX = 20;
export const L_MARGIN_MIN = -100;
export const L_MARGIN_MAX = 100;
