import { Object3D } from "three";

import { default as Cockpit } from "./Cockpit";
import { default as Engine } from "./Engine";
import { default as TailPlane } from "./TailPlane";
import { default as SideWing } from "./SideWing";
import { default as Propeller } from "./Propeller";

export class Airplane {
    private _mesh: Object3D = new Object3D();
    public partials: any = {};

    constructor(colors: any) {
        this.partials = {
            'cockpit': new Cockpit(colors),
            'engine': new Engine(colors),
            'tail': new TailPlane(colors),
            'wing': new SideWing(colors),
            'propeller': new Propeller(colors)
        };

        Object.values(this.partials).forEach(object => {
            this.mesh.add(object.mesh);
        });
    }

    get mesh () {
        return this._mesh;
    }
}