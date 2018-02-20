import {
    Fog,
    Scene,
    Light,
    Vector3,
    WebGLRenderer,
    HemisphereLight,
    DirectionalLight,
    PerspectiveCamera
} from "three";

import { Sea } from "@core/objects/sea";
import { Sky }from "@core/objects/sky";
import { Airplane } from "@core/objects/airplane";

const DEFAULT_FRAMERATE = 1000/60;
const framerate = 1000/60;

const COLORS = {
    red:0xf25346,
    white:0xd8d0d1,
    brown:0x59332e,
    pink:0xF5986E,
    brownDark:0x23190f,
    blue:0x68c3c0
};

export default class Core {
    protected scene: Scene;
    protected camera: PerspectiveCamera;
    protected renderer: WebGLRenderer;
    private _container: HTMLElement;

    private _height: number  = 0;
    private _width: number   = 0;
    private aspectRatio: number = (this.width / this.height);
    private fov: number = 60;
    private nearPlane: number   = 1;
    private farPlane: number    = 1e5;
    private lights: Map<string, Light> = new Map();
    private objects: Map<string, any> = new Map();
    private _listeners: any[] = [];

    constructor (container: HTMLElement) {
        this.container = container;

        this.$init();
    }

    private $init (): void {
        this.createScene();

        this.createLights();

        this.createPlane();
        this.createSea();
        this.createSky();

        this.objects.forEach(item => {
            if(Array.isArray(item))
                item.forEach(_item => this.scene.add(_item.mesh || _item));
            else
                this.scene.add(item.mesh || item);
        });

        this.loop();
    }

    private createScene (): void {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(this.fov, this.aspectRatio, this.nearPlane, this.farPlane);
        this.renderer = new WebGLRenderer({
            alpha: true,
            antialias: true
        });

        this.scene.fog = new Fog(0xf7d9aa, 100, 950);
        this.camera.position.set(0,100,200);
        this.renderer.shadowMap.enabled = true;

        this.adjustSize();

        this.container
            .appendChild(this.renderer.domElement);

        const eventListener = {
            fn: (event: any) => {
                this.height = event.target.innerHeight;
                this.width = event.target.innerWidth;

                console.log("change")
            },
            event: 'resize',
            target: window
        };

        eventListener.target
            .addEventListener(eventListener.event, eventListener.fn);

        this.listeners.push(
            eventListener
        );
    }

    private createLights (): void {
        const lights = this.lights;

        lights.set("hemisphere", new HemisphereLight(0xaaaaaa, 0x000000, .9));
        const shadowLight = new DirectionalLight(0xffffff, .9);

        shadowLight.position.set(150, 350, 350);
        shadowLight.castShadow = true;

        shadowLight.shadow.camera.left = -400;
        shadowLight.shadow.camera.right = 400;
        shadowLight.shadow.camera.top = 400;
        shadowLight.shadow.camera.bottom = -400;
        shadowLight.shadow.camera.near = 1;
        shadowLight.shadow.camera.far = 1000;

        shadowLight.shadow.mapSize.width = 2048;
        shadowLight.shadow.mapSize.height = 2048;

        lights.set("shadow", shadowLight);

        this.lights.forEach(item => {
           this.scene.add(item);
        });
    }

    private createPlane (): void {
        const plane = new Airplane(COLORS);

        plane.mesh.scale.set(.25,.25,.25);
        plane.mesh.position.y = 100;

        this.objects.set('plane', plane);
    }

    private createSky (): void {
        const sky = new Sky(20, COLORS);

        this.objects.set('sky', sky.mesh);
    }

    private createSea (): void {
        const sea = new Sea(new Vector3(0,-600, 0), COLORS);

        this.objects.set('sea', sea.mesh);
    }

    private loop (): void {
        const sea = this.objects.get('sea');
        const sky = this.objects.get('sky');
        const airplane = this.objects.get('plane');

        let then = Date.now();
        let now = null;
        let delta;

        const frame = () => {
            this.renderer.render(this.scene, this.camera);

            airplane!.partials.propeller.mesh.rotation.x += .3 * (framerate / DEFAULT_FRAMERATE) ;
            sky!.rotation.z += .005 * (framerate / DEFAULT_FRAMERATE);
            sea!.rotation.z += .01 * (framerate / DEFAULT_FRAMERATE);
        };

        const framer = () => {
            requestAnimationFrame(framer);

            now = +(new Date());
            delta = now - then;

            if ( delta > framerate ) {
                then = now - ( delta % framerate );

                frame();
            }
        };

        framer();
    }

    private adjustSize () {
        this.aspectRatio = this.width / this.height;
        if(this.renderer)
            this.renderer.setSize(this.width, this.height);
        if(this.camera) {
            this.camera.aspect= this.aspectRatio;
            this.camera.updateProjectionMatrix();
        }
    }

    get listeners () {
        return this._listeners;
    }
    get container () {
        return this._container;
    }
    set container (set) {
        this._container = set;
        this._height = this._container.clientHeight || this._container.offsetHeight;
        this._width = this._container.clientWidth || this._container.offsetWidth;

        this.adjustSize();
    }
    get height () {
        return this._height;
    }
    set height (set) {
        this._height = set;
        this.adjustSize();
    }
    get width () {
        return this._width;
    }
    set width (set) {
        this._width = set;
        this.adjustSize();
    }
}
