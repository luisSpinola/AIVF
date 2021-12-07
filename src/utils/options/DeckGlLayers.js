import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer, PathLayer, ColumnLayer, ScatterplotLayer, IconLayer } from '@deck.gl/layers';
import { HeatmapLayer, HexagonLayer } from '@deck.gl/aggregation-layers';
import {ScenegraphLayer} from '@deck.gl/mesh-layers';
import hexRgb from 'hex-rgb';
import { MAP_CUR_ICON } from '../Conf';

import pointer from './../assets/pointer3d.glb';
import pointer2 from './../assets/pointer3d1.glb';
const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
};

export const mapVector = (vectorArray, mapOption) => {
    return new TileLayer({
        data: [
            vectorArray[mapOption][0],
            vectorArray[mapOption][1],
            vectorArray[mapOption][2]
        ],
        maxRequests: 20,
        pickable: false,
        onViewportLoad: null,
        autoHighlight: false,
        highlightColor: [60, 60, 60, 40],
        minZoom: 0,
        maxZoom: 19,
        tileSize: 512 / devicePixelRatio,

        renderSubLayers: props => {
            const { bbox: {west, south, east, north}} = props.tile;
            return [
                new BitmapLayer(props, {
                    data: null,
                    image: props.data,
                    bounds: [west, south, east, north]
                }),
                false &&
                    new PathLayer({
                    id: `${props.id}-border`,
                    visible: props.visible,
                    data: [[[west, north], [west, south], [east, south], [east, north], [west, north]]],
                    getPath: d => d,
                    getColor: [255, 0, 0],
                    widthMinPixels: 4
                    })
                ];
            }
    })
}


export const getPathMapLayer = (data, colors, hoverIndex, setHoverIndex) => {
    let returnArray = [];
    function getPathColor(valueName,index){
        for(let i=0; i<data.header.value.length; i++){
            if(data.header.value[i] === valueName && hoverIndex === i){
                return [colors[i][0],colors[i][1],colors[i][2],255];
            }
        }
        return colors[index];
    }
    function getPathWidth(valueName,index){
        for(let i=0; i<data.header.value.length; i++){
            if(data.header.value[i] === valueName && hoverIndex === i){
                return 10;
            }
        }
        return 5;
    }
    
    for(let i=0; i<data.header.value.length; i++){
        let tempElem = new PathLayer({
            id: 'path-layer' + i,
            data: data[data.header.value[i]],
            pickable: true,
            onHover: () => { setHoverIndex(i) },
            widthScale: 6,
            widthMinPixels: getPathWidth(data.header.value[i],i),
            getPath: d => d.path,
            getColor: d => getPathColor(data.header.value[i],i),
            getWidth: getPathWidth(data.header.value[i],i),
            updateTriggers: {
                getColor: getPathColor(data.header.value[i],i),
              },
        });
        returnArray.push(tempElem);
    }
    function getColor(d){
        for(let i=0; i<data.header.value.length; i++){
            if(d[data.header.value[i]] !== undefined){
                return [colors[i][0],colors[i][1],colors[i][2],255];
            }
        }
        return[255,255,255,150]; // Error
    }
    function getHoverId(d){
        for(let i=0; i<data.header.value.length; i++){
            if(d.object !== undefined){
                if(d.object[data.header.value[i]] !== undefined){
                    setHoverIndex(i);
                }
            }
        }
    }

    let newtempElem = new ScenegraphLayer({
        id: 'scenegraph-layer' + 4,
        data: data.data,
        pickable: true,
        scenegraph: pointer,
        onHover: d => { getHoverId(d) },
        getPosition: d => d.coords,
        getTranslation: [0,0,4750],
        getOrientation: [0,0,90],
        getColor: d => getColor(d),
        sizeScale: 25,
        _lighting: 'pbr'
    });
    returnArray.push(newtempElem);

    let iconArray = [];
    for(let i=0; i<data.header.value.length;i++){
        let routeIconArray = [];
        for(let j=0; j< data.data.length;j++){
            if(data.data[j][data.header.value[i]] !== undefined){
                routeIconArray.push(data.data[j]);
            }
        }
        iconArray.push(routeIconArray);
    }

    if(hoverIndex !== -1){
        newtempElem = new ScenegraphLayer({
            id: 'scenegraph-layer' + 66,
            data: iconArray[hoverIndex],
            pickable: true,
            scenegraph: pointer2,
            getPosition: d => d.coords,
            getTranslation: [0,0,9500],
            getOrientation: [0,0,90],
            getColor: [colors[hoverIndex][0],colors[hoverIndex][1],colors[hoverIndex][2],255],
            sizeScale: 50,
            _lighting: 'pbr'
        });
        returnArray.push(newtempElem);
    }
    return returnArray;
}   

export const getBubbleMapLayer = (data, colors, hoverIndex, setHoverIndex) => {
    let returnArray = [];

    function getHoverInfo(info) {
        if(info.object !== undefined){
            setHoverIndex(info.object.coords);
        }
    }

    function getColumnColor(d,i) {
        if(hoverIndex !== -1){
            if(d.coords === hoverIndex){
                return [colors[i][0],colors[i][1],colors[i][2],255];
            }
        }
        return colors[i];
    }
    function getBubbleElevation(d,i){
        if(hoverIndex !== -1){
            if(d.coords === hoverIndex){
                return Math.sqrt(d[data.header.value[i]]) * 1.3;
            }
        }
        return Math.sqrt(d[data.header.value[i]]);
    }

    for(let i=0; i<data.header.value.length; i++){
        let tempElem = new ScatterplotLayer({
            id: 'scatter-plot' + i,
            data: data.data,
            onHover: (info) => getHoverInfo(info),
            radiusScale: 20 * 6,
            radiusMinPixels: 0.25,
            getPosition: d => [d.coords[1], d.coords[0]],
            getRadius: d => getBubbleElevation(d,i),
            pickable: true,
            getFillColor: d => getColumnColor(d,i),
            updateTriggers: {
                getFillColor: d => getColumnColor(d,i),
                getRadius: d => getBubbleElevation(d,i),
            },
        });
        returnArray.push(tempElem);
    }
    return returnArray;
}

export const getColumnMapLayer = (data, colors, hoverIndex, setHoverIndex) => {
    let returnArray = [];

    function getHoverInfo(info) {
        if(info.object !== undefined){
            setHoverIndex(info.object.coords);
        }
    }

    function getColumnColor(d,i) {
        if(hoverIndex !== -1){
            if(d.coords === hoverIndex){
                return [colors[i][0],colors[i][1],colors[i][2],255];
            }
        }
        return colors[i];
    }

    function getColumnElevation(d,i){
        if(hoverIndex !== -1){
            if(d.coords === hoverIndex){
                return d[data.header.value[i]] * 1.3;
            }
        }
        return d[data.header.value[i]];
    }

    for(let i=0; i<data.header.value.length; i++){
        let tempElem = new ColumnLayer({
            id: 'column-layer' + i,
            data: data.data,
            diskResolution: 24,
            radius: 5000,
            onHover: (info) => getHoverInfo(info),
            extruded: true,
            pickable: true,
            elevationScale: 20,
            getFillColor: d => getColumnColor(d,i),
            getPosition: d => [d.coords[1],d.coords[0]],
            getElevation: d => getColumnElevation(d,i),
            updateTriggers: {
                getFillColor: d => getColumnColor(d,i),
                getElevation: d => getColumnElevation(d,i),
            },
        });
        returnArray.push(tempElem);
    }
    return returnArray;
}

export const getHeatMapLayer = (data,colors) => {
    return new HeatmapLayer({
        id: 'heatmapLayer',
        data: data,
        getPosition: d => [d.coordinates[1], d.coordinates[0]],
        getWeight: d => 1,
        intensity: 5,//props.options.intensity,
        radiusPixels: 20, //props.options.radius,
        threshold: 0.03, //props.options.threshold,
        aggregation: 'SUM',
        pickable: true,
        extruded: true,
        colorRange: colors
    });
}

export const getHexMapLayer = (data,colors) => {
    return new HexagonLayer({
        id: 'hexLayer',
        data: data,
        getPosition: d => [d.coordinates[1], d.coordinates[0]],
        radius: 2000, //props.options.hex_radius,
        coverage: 1, //props.options.coverage,
        upperPercentile: 90, //props.options.percentile,
        elevationScale: 1000, //props.options.elevation_scale,
        pickable: true,
        extruded: true, 
        colorRange: colors
    });
}

export const getColorsInHex = (colorsArray, opacity) => {
    let returnArray = [];
    for(let i=0; i<colorsArray.length; i++){
        let newColorElem = hexRgb(colorsArray[i], {format: 'array'});
        newColorElem[3] = 255 * (opacity/100);
        returnArray.push(newColorElem);
    }
    return returnArray;
}