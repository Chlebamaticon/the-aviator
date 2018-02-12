import { BoxGeometry, Mesh, MeshPhongMaterial } from "three";

export default class Blade {
    private _mesh: Mesh = new Mesh();

    constructor(colors: any) {
        const geom = new BoxGeometry(1,100,20,1,1,1);
        const mat = new MeshPhongMaterial({ color: colors.brownDark, flatShading: true });

        const blade = new Mesh(geom, mat);
        blade.position.set(8,0,0);
        blade.castShadow = true;
        blade.receiveShadow = true;

        this.mesh = blade;
    }

    get mesh () {
        return this._mesh;
    }

    set mesh(set: Mesh) {
        this._mesh = set;
    }
}