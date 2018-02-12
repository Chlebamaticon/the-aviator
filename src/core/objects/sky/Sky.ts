import {BoxGeometry, Mesh, MeshPhongMaterial, Object3D} from "three";
import Cloud from "@core/objects/sky/Cloud";

export default class Sky {
    private _mesh: Object3D = new Object3D();

    constructor (clouds: number, colors: any) {
        const stepAngle = Math.PI * 2 / clouds;

        console.log("CONSTRUCTOR OF THE SKY");

        const nClouds = clouds;
        for(let i = 0; i < nClouds; i++) {
            const cloud = new Cloud(colors);

            const angle = stepAngle * i;
            const height = 750 + Math.random() * 200;

            cloud.mesh.position.y = Math.sin(angle) * height;
            cloud.mesh.position.x = Math.cos(angle) * height;
            cloud.mesh.position.z =  -400 - Math.random() * 400;

            cloud.mesh.rotation.z = angle + Math.PI / 2;

            const scale = 1 + Math.random() * 2;
            cloud.mesh.scale.set(scale, scale, scale);

            this.mesh.add(cloud.mesh);
        };

        this.mesh.position.y = -600;
        console.log(this.mesh);
    }

    get mesh () {
        return this._mesh;
    }
    set mesh (set: Object3D) {
        this._mesh = set;
    }
}