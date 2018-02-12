import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

export default class TailPlane {
    private _mesh: Mesh = new Mesh();

    constructor(colors: any) {
        const geom = new BoxGeometry(15,20,5,1,1,1);
        const mat = new MeshPhongMaterial({ color: colors.red, flatShading: true });

        const tailPlane = new Mesh(geom, mat);
        tailPlane.position.set(-35, 25, 0);
        tailPlane.castShadow = true;
        tailPlane.receiveShadow = true;

        this.mesh = tailPlane;
    }

    get mesh () {
        return this._mesh;
    }

    set mesh(set: Mesh) {
        this._mesh = set;
    }
}