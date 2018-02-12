import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

export default class Engine {
    private _mesh: Mesh = new Mesh();

    constructor(colors: any) {
        const geom = new BoxGeometry(20,50,50,1,1,1);
        const mat = new MeshPhongMaterial({ color: colors.white, flatShading: true });

        const engine = new Mesh(geom, mat);
        engine.castShadow = true;
        engine.receiveShadow = true;

        this.mesh = engine;
    }

    get mesh () {
        return this._mesh;
    }

    set mesh(set: Mesh) {
        this._mesh = set;
    }
}