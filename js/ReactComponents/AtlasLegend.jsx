import React from "react";
import GoogleLegend from "./GoogleImage.jsx"
const Component = React.Component;
const googleContext = "http://drive.google.com/uc?export=view&id=";
const M = window["M"];

class Css extends Component {

    render() {
        var legendItem = this.props.legendItem;
        return (
            <div className={legendItem.legendContent}>
                <div className="legend-item">
                    <div></div>
                </div>
                <div className="legend-label">
                    {legendItem.text}
                </div>
            </div>
        )
    }

}

class GoogleImage extends Component {

    render() {
        var props = this.props;
        var legendItem = props.legendItem;
        return (
            <div>
                <h5>
                    {legendItem.text}
                </h5>
                <GoogleLegend googleId={legendItem.legendContent}/>
            </div>
        )
    }
}

const LegendFactory = {
    "Css": Css,
    "GoogleImage": GoogleImage
};

export default class AtlasLegend extends Component {

    static createLegendItem(legendItem, i) {
        var legendFactory = LegendFactory[legendItem.legendType];
        return legendFactory ? React.createElement(legendFactory, {
            key: i,
            legendItem: legendItem
        }) : null;
    }

    static renderLegendItems(legendItems) {
        return legendItems ? legendItems.map(AtlasLegend.createLegendItem) : null;
    }

    renderLegends(legends) {
        return legends ? legends.map((legend, i)=> {
            return AtlasLegend.renderLegendItems(legend.legendItems, i);
        }) : null;
    }

    render() {
        var props = this.props;
        return (
            <div className={props.className}>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        {M.LEGEND}
                    </div>
                    <div className="panel-body">
                        {this.renderLegends(props.legends)}
                    </div>
                </div>
            </div>
        )
    }

}
