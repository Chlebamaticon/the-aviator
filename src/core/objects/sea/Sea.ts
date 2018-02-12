import {CylinderGeometry, Matrix4, Mesh, MeshPhongMaterial, Vector3} from "three";

export default class Sea {
    private _mesh: Mesh;

    constructor (position: Vector3, colors: any) {
        const geom = new CylinderGeometry(600, 600, 800, 40, 10);
        geom.applyMatrix(new Matrix4().makeRotationX(-Math.PI/2));

        const mat = new MeshPhongMaterial({
            color: colors.blue,
            transparent: true,
            opacity: .6,
            flatShading: true
        });

        this.mesh = new Mesh(geom, mat);
        this.mesh.receiveShadow = true;
        this.mesh.position.y = -600;
    }

    get mesh () {
        return this._mesh;
    }
    set mesh (set: Mesh) {
        this._mesh = set;
    }
}