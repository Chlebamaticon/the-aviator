import {BoxGeometry, Mesh, MeshPhongMaterial, Object3D} from "three";

export default class Cloud {
    private _mesh: Object3D = new Object3D();

    constructor (colors: any) {
        const geom = new BoxGeometry(20,20,20);

        const mat = new MeshPhongMaterial({ color: colors.white });

        const nBlocs = 3 + Math.floor(Math.random() * 3);
        for(let i = 0; i < nBlocs; i++) {
            const m = new Mesh(geom, mat);

            m.position.set(
               i * 15,
               Math.random() * 10,
               Math.random() * 10
            );

            m.rotation.set(
               Math.random() * Math.PI * 2,
               Math.random() * Math.PI * 2,
               Math.random() * Math.PI * 2
            );

            const scale = .1 + Math.random() * .9;
            m.scale.set(scale, scale, scale);

            m.castShadow = true;
            m.receiveShadow = true;

            this.mesh.add(m);
        }
    }

    get mesh () {
        return this._mesh;
    }
    set mesh (set: Object3D) {
        this._mesh = set;
    }
}