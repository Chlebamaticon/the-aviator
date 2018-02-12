import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

export default class SideWing {
    private _mesh: Mesh = new Mesh();

    constructor(colors: any) {
        const geom = new BoxGeometry(40,8,150,1,1,1);
        const mat = new MeshPhongMaterial({ color: colors.red, flatShading: true });

        const sideWing = new Mesh(geom, mat);
        sideWing.castShadow = true;
        sideWing.receiveShadow = true;

        this.mesh = sideWing;
    }

    get mesh () {
        return this._mesh;
    }

    set mesh(set: Mesh) {
        this._mesh = set;
    }
}