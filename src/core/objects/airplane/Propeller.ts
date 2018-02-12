import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

import Blade from "./Blade";

export default class Propeller {
    private _mesh: Mesh = new Mesh();

    constructor(colors: any) {
        const geom = new BoxGeometry(20,10,10,1,1,1);
        const mat = new MeshPhongMaterial({ color: colors.brown, flatShading: true });

        const propeller = new Mesh(geom, mat);
        propeller.castShadow = true;
        propeller.receiveShadow = true;

        const blade = new Blade(colors);
        propeller.add(blade.mesh);
        propeller.position.set(40,0,0);

        this.mesh = propeller;
    }

    get mesh () {
        return this._mesh;
    }

    set mesh(set: Mesh) {
        this._mesh = set;
    }
}