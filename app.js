/* global window,document */
import React, {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';
import DeckGLOverlay from './deckgl-overlay.js';

import {csv as requestCsv} from 'd3-request';

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line
// const MAPBOX_TOKEN = "your_token";

// Source data CSV
//const DATA_URL = 'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv';  // eslint-disable-line
var maxDemDatos = "600d";
var DATA_URL = "./Datos"+maxDemDatos+"/hora_8_1.csv";

const list_max = [[0,0,0,0,0,777.25649682271899,
 3451.2345529510071,
 9355.9510130397412,
 9770.3945932753195,
 6985.6960715134855,
 6326.2606448607212,
 7983.1974793664185,
 10254.3898351565,
 12668.468318986308,
 11376.853397873201,
 9818.3402214663438,
 12046.794210621123,
 16123.868824766492,
 27125.065631918496,
 15341.665298807142,
 9929.1439010612521,
 6974.8635437489284,
 11999.827716808741,
 731.9034573074174,0],[0,0,0,0,0,
 9.1955491679483927,
 249.82885957550289,
 566.31696400406338,
 1004.8271715652667,
 903.67704190491474,
 794.4146410760236,
 1203.7039877043119,
 1241.479681752312,
 1736.3548911389544,
 1803.3190296363614,
 1557.6263109983663,
 1913.7954060163174,
 2167.9914958888921,
 2231.9909931533675,
 1955.0809089455972,
 2652.1989850210889,
 2335.2216948848604,
 1588.4009565589945,
 61.805297661911794,0]];

var div = document.createElement('div');
div.setAttribute("id", "div-react");
div.setAttribute("style", "width:100%;height:100%;float:left;position:fixed;");

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        ...DeckGLOverlay.defaultViewport,
        width: 500,
        height: 500
      },
      data: null,
      value_hora: 8,
      value_tipoDia: 1,
      value_radius: 100,
      elevation: 100
    };

    this.handleChange_hora = this.handleChange_hora.bind(this);
    this.handleChange_radius = this.handleChange_radius.bind(this);
    this.handleChange_tipoDia = this.handleChange_tipoDia.bind(this);

    requestCsv(DATA_URL, (error, response) => {
      if (!error) {
        const data = response.map(d => ([Number(d.lng), Number(d.lat)]));
        this.setState({data});

      }
    });
  }

  changeDataset(hora, tipoDia){
    if (hora > 4 && hora < 24){
      var text = "./Datos"+maxDemDatos+"/hora_"+hora+"_"+tipoDia+".csv";
      requestCsv(text, (error, response) => {
        if (!error) {
          var data2 = response.map(d => ([Number(d.lng), Number(d.lat)]));
          this.setState({data: data2});
        }
      });
      var max = 27125;
      var maxElevation = 200;
      var newElevation = Math.round(list_max[tipoDia-1][hora]*maxElevation/max);
      this.setState({elevation: newElevation});
    }
    else{
      this.setState({data: null});
    }
  }

  handleChange_hora(event) {
    var hora = event.target.value;
    this.setState({value_hora: hora});
    this.changeDataset(hora,this.state.value_tipoDia);
  }

  handleChange_tipoDia(event) {
    var tipoDia = event.target.value;
    this.setState({value_tipoDia: tipoDia});
    this.changeDataset(this.state.value_hora,tipoDia);
  }

  handleChange_radius(event) {
    var v = event.target.value;
    this.setState({value_radius: v});
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize.bind(this));
    this._resize();
  }

  _resize() {
    this._onViewportChange({
      //width: window.innerWidth,
      //height: window.innerHeight
      width: div.offsetWidth,
      height: window.innerHeight
    });
  }

  _onViewportChange(viewport) {
    this.setState({
      viewport: {...this.state.viewport, ...viewport}
    });
  }

  //<input type="range" min="0" max="24" value={this.state.value} onChange={this.handleChange}/>

  render() {
    const {viewport, data, value_radius, elevation} = this.state;

    return (
      <div>
        <input id="slider_uber_hora" type="range" min="0" max="24" value={this.state.value_hora} onChange={this.handleChange_hora}/>
        <input id="slider_uber_tipoDia" type="range" min="1" max="2" value={this.state.value_tipoDia} onChange={this.handleChange_tipoDia}/>
        <input id="slider_uber_radio" type="range" min="10" max="150" value={this.state.value_radius} onChange={this.handleChange_radius}/>
        <MapGL
          {...viewport}
          mapStyle="mapbox://styles/vaopaso/cja3im92h1pcn2so2ha8pqqvf"
          onViewportChange={this._onViewportChange.bind(this)}
          mapboxApiAccessToken={MAPBOX_TOKEN}>
          <DeckGLOverlay
            viewport={viewport}
            data={data || []}
            radius={value_radius}
            elevationScale={elevation}
          />
        </MapGL>
      </div>
    );
  }
}

//var container = document.body.childNodes[0];

render(<Root />, document.body.appendChild(div));
//render(<Root />, container.appendChild(div);
