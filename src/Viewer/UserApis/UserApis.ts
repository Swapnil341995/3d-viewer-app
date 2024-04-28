import { ThreeViewer } from "../ThreeViewer";
import * as THREE from 'three';

export class UserApis {
    static userApis: UserApis | undefined;
    private viewer: ThreeViewer | undefined = undefined;
    private identityMatrix: number[] = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    private constructor() {
        this.viewer = ThreeViewer.getInstance();
    }
    public static getInstance(){
        if(!UserApis.userApis){
            UserApis.userApis = new UserApis();
        }
        // @ts-expect-error adding a property in global window object
        window['userApis'] = UserApis.userApis;
        return UserApis.userApis;
    }
    positionToHome() {
        const bbox = new THREE.Box3().setFromObject(this.viewer!.sceneObject!);
        this.viewer!.controls!.target = this.getBoundingBoxCenter();
        //generate matrix4 from the identity array
        const mat = new THREE.Matrix4().fromArray(this.identityMatrix);
        const inverse = new THREE.Matrix4();
        //get inverse of the matrix
        inverse.copy(mat).invert();
        const quaternion = new THREE.Quaternion();
        const position = new THREE.Vector3();
        const scale = new THREE.Vector3();
        //get pos, quat and scale from the matrix
        inverse.decompose(position, quaternion, scale);
        //set camera position to home
        this.viewer!.camera!.position.set(
            position.x,
            position.y + bbox.max.y * 1,
            bbox.max.z + bbox.max.z * 10
        );
    }
    getBoundingBoxCenter(): THREE.Vector3 {
        const bbox = new THREE.Box3().setFromObject(this.viewer!.sceneObject!);
        const bboxMaxCenter = new THREE.Vector3(
            (bbox.max.x + bbox.min.x) / 2,
            (bbox.max.y + bbox.min.y) / 2,
            (bbox.max.z + bbox.min.z) / 2
        );
        return bboxMaxCenter;
    }
}