import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

export default class Cockpit {
    private _mesh: Mesh = new Mesh();

    constructor(colors: any) {
        const geom = new BoxGeometry(60,50,50,1,1,1);
        const mat = new MeshPhongMaterial({ color: colors.red, flatShading: true });

        const cockpit = new Mesh(geom, mat);
        cockpit.castShadow = true;
        cockpit.receiveShadow = true;

        this.mesh = cockpit;
    }

    get mesh () {
        return this._mesh;
    }

    set mesh(set: Mesh) {
        this._mesh = set;
    }
}