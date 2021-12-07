import React, { useState } from 'react';
import { StaticMap, MapContext, NavigationControl } from 'react-map-gl';
import DeckGL from 'deck.gl';
import { mapVector, getHeatMapLayer, getColorsInHex, getHexMapLayer, getColumnMapLayer, getBubbleMapLayer, getPathMapLayer, getIconMapLayer } from '../../utils/options/DeckGlLayers';

import { MAP_BEARING, MAP_LAT, MAP_LONG, MAP_PITCH, MAP_ZOOM, MAPBOX_TOKEN } from '../../utils/Conf';

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';
  
const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 10,
  left: 10
};

function selectTooltip({object}, props) {
    switch(props.type){
        case 'hex':
            return getTooltipHex({object});
        case 'column':
            return getTooltipColumn({object}, props);
        case 'bubble':
            return getTooltipColumn({object}, props);
        case "path":
            return getTooltipIcon({object}, props);
        default:
            return null;
    }
}

function getTooltipIcon({object}, props){
    if (!object) { return null; }

    for(let i=0;i<props.data.header.value.length; i++){
        if(object[props.data.header.value[i]] !== undefined){
            return `${object[props.data.header.value[i]]}`;
        }
    }
}

function getTooltipColumn({object}, props) {
    if (!object) { return null; }
    const lat = object.coords[1];
    const lng = object.coords[0];

    for(let i=0; i<props.data.header.value.length; i++){
        if(object[props.data.header.value[i]] !== undefined){
            return `${props.data.header.value[i]}: ${object[props.data.header.value[i]]} \n
            ${object[props.data.header.info[0]]} \n
            latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ''}
            longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ''}`;
        } 
    }
}

function getTooltipHex({object}) {
    if (!object) { return null; }
    const lat = object.position[1];
    const lng = object.position[0];
    const count = object.points.length;
  
    return `\
        ${count}
        latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ''}
        longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ''}
        `;
}

export const LayersMap = (props) => {
    let colors;
    (props.options.colors_lock) ? colors = getColorsInHex(props.colors, props.options.opacity) : colors = getColorsInHex(props.options.colors, props.options.opacity);

    const [hoverIndex, setHoverIndex] = useState(-1);

    const layers = [];
    layers.push(mapVector(props.options.maps, props.options.map));
    if(props.type === 'heat') layers.push(getHeatMapLayer(props.data.data, colors));
    if(props.type === 'hex') layers.push(getHexMapLayer(props.data.data, colors));
    if(props.type === 'column') layers.push(getColumnMapLayer(props.data, colors, hoverIndex, setHoverIndex));
    if(props.type === 'bubble') layers.push(getBubbleMapLayer(props.data, colors, hoverIndex, setHoverIndex)); 
    if(props.type === 'path') layers.push(getPathMapLayer(props.data, colors, hoverIndex, setHoverIndex));
    //if(props.type === 'path') {layers.push(getIconMapLayer(props.data, colors)[1]);layers.push(getIconMapLayer(props.data, colors)[0]) ;}

    const [viewState, setViewState] = useState({
        longitude: MAP_LONG,
        latitude: MAP_LAT,
        zoom: MAP_ZOOM,
        //maxZoom: props.options.maxZoom,
        pitch: MAP_PITCH,
        bearing: MAP_BEARING   
    });


    return (
        <div style={{position: 'relative', width: '100%', height: props.options.height}}>
            <DeckGL layers={layers} getTooltip={({object}) => selectTooltip({object}, props)}
                initialViewState={viewState}
                pickingRadius={10}
                controller={true}
                ContextProvider={MapContext.Provider}
                getCursor={({isDragging, isHovering}) => {if(!isHovering){ setHoverIndex(-1);} return ((isDragging ? 'grabbing' : (isHovering ? 'pointer' : 'grab')))}}
                
            >
                <div style={{position: 'absolute'}}>
                    <NavigationControl style={NAV_CONTROL_STYLE}/>
                </div>
                <StaticMap mapStyle={MAP_STYLE} mapboxApiAccessToken={MAPBOX_TOKEN}/>
            </DeckGL>
        </div>
  );
}

export default LayersMap;