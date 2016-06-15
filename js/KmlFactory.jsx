export default class KmlFactory {

    constructor(kmls, staticKmls, clickHandlers) {

        var layersByName = {};
        var layers = kmls.map(function (kml, i) {
            var kmlLayer = new google.maps.KmlLayer({
                driveFileId: kml.id
            });
            var click = kml.click;
            click && click.map((c)=> {
                kmlLayer.addListener("click", (e)=> {
                    var handler = clickHandlers[c.clickType];
                    handler && handler(c, e);
                })
            });

            return layersByName[kml.name] = {
                layer: kmlLayer,
                kml: kml
            };
        });

        var staticLayers = staticKmls.map((kml)=> {
            return layersByName[kml];
        });

        this.getKmlsByName = (names)=> {
            return [].concat(staticLayers, names ? names.map(function (name) {
                return layersByName[name];
            }) : []);
        };

        var hideLayer = (layerInfo)=> {
            layerInfo.layer.setMap(null);
        };

        this.hideLayers = (layerNames)=> {
            layerNames && layerNames.map((layerName)=> {
                hideLayer(layersByName[layerName]);
            })
        };

        this.hideAllLayers = ()=> {
            layers.map(hideLayer);
        };

        this.getStaticLayers = ()=> {
            return staticLayers;
        }

    }


}