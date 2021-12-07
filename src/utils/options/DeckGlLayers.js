import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer, PathLayer, ColumnLayer, ScatterplotLayer, IconLayer } from '@deck.gl/layers';
import { HeatmapLayer, HexagonLayer } from '@deck.gl/aggregation-layers';
import {ScenegraphLayer} from '@deck.gl/mesh-layers';
import hexRgb from 'hex-rgb';
import { MAP_CUR_ICON } from '../Conf';

import pointer from './../pointer2.glb';

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
        pickable: true,
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

export const getIconMapLayer = (data1, colors) => {
    for(let i=0; i<data1.header.value.length; i++){

    }
    /*let newtempElem = new IconLayer({
        id: 'icon-layer' + 0,
        data: data1.data,
        iconAtlas: MAP_CUR_ICON,
        iconMapping: ICON_MAPPING,
        getIcon: d => 'marker',
        extruded: true,
        pickable: true,
        sizeScale: 1,
        billboard: false,
        getSize: d => 30,
        getColor: d => colors[0],
        getPosition: d => [d[data1.header.coords[0]][0],d[data1.header.coords[0]][1],0],
        updateTriggers: {
            getColor: [colors],
            getSize: d => 30
          },
    });
    let newtempElem = new BitmapLayer({
        id: 'bitmap-layer',
        bounds: [-122.5190, 37.7045, -122.355, 37.829],
        image: markerIcon,
        tintColor: colors[0]
      });*/
    let newtempElem = new ScenegraphLayer({
        id: 'scenegraph-layer',
        data: data1.data,
        pickable: true,
        scenegraph: pointer,
        getPosition: d => [d.coords[0],d.coords[1]],
        getTranslation: [0,0,9500],
        getOrientation: d => [0, 0, 90],
        getColor: colors[0],
        _animations: {
          '*': {speed: 5}
        },
        sizeScale: 50,
        _lighting: 'pbr'
      });
    
    return newtempElem;
}

export const getPathMapLayer = (data, colors) => {
    let returnArray = [];
    for(let i=0; i<data.header.value.length; i++){
        let tempElem = new PathLayer({
            id: 'path-layer' + i,
            data: data[data.header.value[i]],
            pickable: true,
            widthScale: 5,
            widthMinPixels: 3,
            getPath: d => d.path,
            getColor: colors[i],
            getWidth: 5
        });
        returnArray.push(tempElem);
    }
    return returnArray;
}   

export const getBubbleMapLayer = (data, colors) => {
    let returnArray = [];
    for(let i=0; i<data.header.value.length; i++){
        let tempElem = new ScatterplotLayer({
            id: 'scatter-plot' + i,
            data: data.data,
            radiusScale: 20 * 6,
            radiusMinPixels: 0.25,
            getPosition: d => [d.coords[1], d.coords[0]],
            getRadius: d => Math.sqrt(d[data.header.value[i]]),
            pickable: true,
            getFillColor: d => colors[i],
            updateTriggers: {
                getFillColor: [colors]
              },
        });
        returnArray.push(tempElem);
    }
    return returnArray;
}

export const getColumnMapLayer = (data, colors) => {
    let returnArray = [];
    for(let i=0; i<data.header.value.length; i++){
        let tempElem = new ColumnLayer({
            id: 'column-layer' + i,
            data: data.data,
            diskResolution: 12,
            radius: 5000,
            extruded: true,
            pickable: true,
            elevationScale: 20,
            getFillColor: d => colors[i],
            getPosition: d => [d.coords[1],d.coords[0]],
            getLineColor: colors[i],
            getElevation: d => d[data.header.value[i]],
            updateTriggers: {
                getFillColor: [colors]
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