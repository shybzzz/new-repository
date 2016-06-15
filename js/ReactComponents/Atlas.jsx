import React from "react";
import Modal from "react-modal"
import KmlFactory from "./../KmlFactory.jsx";
import AtlasHeader from "./AtlasHeader.jsx";
import AtlasNavigator from "./AtlasNavigator.jsx";
import AtlasMap from "./AtlasMap.jsx";
import AtlasLegend from "./AtlasLegend.jsx"
import AtlasDialog from "./AtlasDialog.jsx"
import BioindicatorDialog from "./BioindicatorDialog.jsx"
import AtlasButtonsPane from "./AtlasButtonsPane.jsx"
import GoogleImageDialog from "./GoogleImageDialog.jsx"
import Tdr from "./Tdr.jsx"

const map = "cemAtlas";

export default class Atlas extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: {
                modalIsOpened: false,
                title: "",
                children: null
            }
        };

        var layerClickHandlers = {
            "BioindicatorDialog": ((c, e)=> {
                var name = e.featureData.name;
                this.openModal(name, <BioindicatorDialog name={name} googleId={Atlas.getBioindicatorGoogleId(name)}/>);
            }).bind(this),

            "SurfaceWater": ((c, e)=> {
                var name = e.featureData.name;
                this.openModal(name, <GoogleImageDialog googleId={Atlas.getSurfaceWaterGoogleId(name)}/>)
            }).bind(this),

            "Tdr": ((c, e)=> {
                var name = e.featureData.name;
                this.openModal(name, <Tdr name={name}/>)
            })
        };
        this.kmlFactory = new KmlFactory(props.kmls, props.staticKmls, layerClickHandlers);

        var onMapCreated = (gMap)=> {
            this.gMap = gMap;
            this.showKmlLayers(this.kmlFactory.getStaticLayers());
        };
        this.atlasMap = (
            <AtlasMap className="col-sm-9" mapOptions={generalSettings.mapOptions}
                      onMapCreated={onMapCreated.bind(this)}/>
        );

        this.closeModal = (()=> {
            this.setState({
                modal: {
                    modalIsOpened: false,
                    title: "",
                    children: null
                }
            });
        }).bind(this);

        this.openModal = ((title, children)=> {
            this.setState({
                modal: {
                    modalIsOpened: true,
                    title: title,
                    children: children
                }
            });
        }).bind(this);

        var buttonClickHandlers = {
            "HelpDialog": ((title, text)=> {
                this.openModal(title, <div>{text}</div>)
            }).bind(this)
        };

        function getButtonsPaneButtons(click) {
            return click.map((c)=> {
                return {
                    title: c.title,
                    h: ()=> {
                        var buttonClickHandler = buttonClickHandlers[c.clickType];
                        buttonClickHandler && buttonClickHandler(c.title, c.text);
                    }
                }
            });
        }

        this.refreshButtonsPane = (click)=> {
            this.buttonsPane = click ? <AtlasButtonsPane buttons={getButtonsPaneButtons(click)}/> : null;
        }

    }

    static getBioindicatorGoogleId(name) {
        return OUTER_RESOURCES.BIOINDICATOR_IMAGES[name];
    }

    static getSurfaceWaterGoogleId(name) {
        return OUTER_RESOURCES.SURFACE_WATER[name];
    }

    refreshKmls(menuItem) {
        if (!menuItem) return;
        var kmlFactory = this.kmlFactory;
        kmlFactory.hideAllLayers();
        this.refreshButtonsPane(menuItem.click);
        var kmlLayers = kmlFactory.getKmlsByName(menuItem.layers);
        this.showKmlLayers(kmlLayers, menuItem.forceHideLayers);
    }

    showLayer(layerInfo) {
        var gMap = this.gMap;
        setTimeout(()=> {
            layerInfo.layer.setMap(gMap);
        }, layerInfo.kml.delay || 0);
    }

    static isNotIn(forceHideLayers, name) {
        return !(forceHideLayers && forceHideLayers.indexOf(name) > -1);
    }

    showKmlLayers(kmlLayers, forceHideLayers) {
        var legends = [];
        var atlas = this;
        kmlLayers.map((layerInfo)=> {
            var kml = layerInfo.kml;
            if (Atlas.isNotIn(forceHideLayers, kml.name)) {
                atlas.showLayer(layerInfo);

                var legend = kml.legend;
                legend && legends.push(legend);

            }
        });

        atlas.atlasLegend = <AtlasLegend className="col-sm-3" legends={legends}/>;
        this.forceUpdate();
    }

    render() {
        var generalSettings = this.props.generalSetting;
        var close = this.closeModal;
        var modal = this.state.modal;
        return (
            <section>
                <AtlasHeader home="http://sirel.com.ua/"
                             logo="http://sirel.com.ua/wp-content/uploads/2015/04/sirel-logo.png"
                             title={generalSettings.title}/>
                <AtlasNavigator navigation={this.props.navigation} map={"#"+map}
                                showKmls={this.refreshKmls.bind(this)}/>
                <div className="row" id={map}>
                    {this.buttonsPane}
                </div>
                <div className="row">
                    {this.atlasLegend}
                    {this.atlasMap}
                </div>
                <Modal isOpen={modal.modalIsOpened}
                       onRequestClose={close}>
                    <AtlasDialog title={modal.title} children={modal.children} close={close}/>
                </Modal>

            </section>
        )
    }
}