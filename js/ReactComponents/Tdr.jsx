import React from "react"
import GoogleImageDialog from "./GoogleImageDialog.jsx"

const TestAreaTypes = {
    "red": <GoogleImageDialog googleId={OUTER_RESOURCES.TEST_AREA_TYPES["red"]} className="col-sm-6"/>,
    "star": <GoogleImageDialog googleId={OUTER_RESOURCES.TEST_AREA_TYPES["star"]} className="col-sm-6"/>
};

export default class Tdr extends React.Component {

    static createTestAreaType(testArea) {
        return TestAreaTypes[testArea.taType] || null;
    }

    render() {
        var testArea = OUTER_RESOURCES.TEST_AREA[this.props.name];
        return testArea ? (
            <div className="row">
                <GoogleImageDialog googleId={testArea.photo} className="col-sm-6"/>
                {Tdr.createTestAreaType(testArea)}
            </div>
        ) : null;
    }

}