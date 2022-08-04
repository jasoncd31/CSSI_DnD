// import * as CANNON from "https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.js";
// import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r99/three.js";
import * as THREE from "https://cdn.skypack.dev/three";
import * as CANNON from "https://cdn.skypack.dev/cannon-es";
// import * as THREE from "../node_modules/three/build/three.module.js";
// import { Scene } from "../node_modules/three/build/three.module.js";
// import * as CANNON from "../node_modules/cannon/build/cannon.js";
// import * as CANNON from "https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import {
    DiceD4,
    DiceD6,
    DiceD8,
    DiceD10,
    DiceD12,
    DiceD20,
    DiceManager,
} from "./dice.js";

// standard global variables
var container,
    scene,
    camera,
    renderer,
    controls,
    stats,
    world,
    dice = [];

init();

// FUNCTIONS
function init() {
    // SCENE
    scene = new THREE.Scene();
    // CAMERA

    // var SCREEN_WIDTH = window.innerWidth * 0.7,
    //     SCREEN_HEIGHT = window.innerHeight * 0.7;

    var SCREEN_WIDTH = window.innerHeight * 1.1,
        SCREEN_HEIGHT = window.innerHeight * 0.75;

    var VIEW_ANGLE = 45,
        ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
        NEAR = 0.01,
        FAR = 20000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0, 40, 0);
    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // window.addEventListener("resize", function () {
    //     SCREEN_WIDTH = window.innerWidth * 0.25;
    //     SCREEN_HEIGHT = window.innerHeight * 0.25;
    //     renderer.setSize(width, height);
    // });

    container = document.getElementById("ThreeJS");
    container.appendChild(renderer.domElement);
    // EVENTS
    // CONTROLS
    controls = new OrbitControls(camera, renderer.domElement);
    // controls.enabled = false;
    // STATS
    //stats = new Stats();
    //stats.domElement.style.position = 'absolute';
    //stats.domElement.style.bottom = '0px';
    //stats.domElement.style.zIndex = 100;
    //container.appendChild( stats.domElement );

    let ambient = new THREE.AmbientLight("#ffffff", 0.3);
    scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight("#ffffff", 0.5);
    directionalLight.position.x = -1000;
    directionalLight.position.y = 1000;
    directionalLight.position.z = 1000;
    scene.add(directionalLight);

    let light = new THREE.DirectionalLight(0xefdfd5, 1.3);
    light.position.y = 100;
    light.position.x = 100;
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.camera.near = 50;
    light.shadow.camera.far = 110;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add(light);

    // FLOOR
    var floorMaterial = new THREE.MeshPhongMaterial({
        color: "#FFFFFF",
        side: THREE.DoubleSide,
    });

    var wallMaterial = new THREE.MeshPhongMaterial({
        color: "#0000FF",
        side: THREE.DoubleSide,
    });
    floorMaterial.opacity = 0.0;
    // floorMaterial.transparent = true;
    var floorGeometry = new THREE.PlaneGeometry(30, 30, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    var wall1 = new THREE.Mesh(floorGeometry, floorMaterial);
    var wall2 = new THREE.Mesh(floorGeometry, floorMaterial);
    var wall3 = new THREE.Mesh(floorGeometry, floorMaterial);
    var wall4 = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    // floor.rotation.x = Math.PI / 2;
    wall1.position.z += 15;
    wall2.position.z += -15;
    wall3.rotation.y = Math.PI / 2;
    wall3.position.x += 15;
    wall4.rotation.y = Math.PI / 2;
    wall4.position.x += -15;
    wall1.position.y += -10;
    wall2.position.y += -10;
    wall3.position.y += -10;
    wall4.position.y += -10;
    // scene.add(floor);
    // scene.add(wall1);
    // scene.add(wall2);
    // scene.add(wall3);
    // scene.add(wall4);

    // SKYBOX/FOG
    var skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
    var skyBoxMaterial = new THREE.MeshPhongMaterial({
        color: 0x9999ff,
        side: THREE.BackSide,
    });
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    // scene.add(skyBox);
    scene.fog = new THREE.FogExp2(0x9999ff, 0.00025);

    ////////////
    // CUSTOM //
    ////////////
    world = new CANNON.World();

    world.gravity.set(0, -9.82 * 20, 0);
    // world.gravity.set(0, -0.1, 0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 16;

    DiceManager.setWorld(world);

    //Floor
    let floorBody = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Plane(),
        material: DiceManager.floorBodyMaterial,
    });
    floorBody.quaternion.setFromAxisAngle(
        new CANNON.Vec3(1, 0, 0),
        -Math.PI / 2
    );
    // floorBody.position.set(0, -10, 0);
    world.addBody(floorBody);
    floor.position.copy(floorBody.position);
    floor.quaternion.copy(floorBody.quaternion);
    let barrier1 = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Plane(),
        material: DiceManager.floorBodyMaterial,
    });
    barrier1.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI);
    barrier1.position.set(0, -10, 15);
    world.addBody(barrier1);

    let barrier2 = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Plane(),
        material: DiceManager.floorBodyMaterial,
    });
    barrier2.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI);
    barrier2.position.set(0, -10, -15);
    // world.add(barrier2);

    let barrier3 = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Plane(),
        material: DiceManager.floorBodyMaterial,
    });
    barrier3.quaternion.setFromAxisAngle(
        new CANNON.Vec3(0, 1, 0),
        -Math.PI / 2
    );
    barrier3.position.set(15, -10, 0);
    world.addBody(barrier3);

    let barrier4 = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Plane(),
        material: DiceManager.floorBodyMaterial,
    });
    barrier4.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
    barrier4.position.set(-15, -10, 0);
    world.addBody(barrier4);

    var wallMesh1 = new THREE.Mesh(floorGeometry, wallMaterial);
    wallMesh1.position.copy(barrier1.position);
    wallMesh1.quaternion.copy(barrier1.quaternion);
    // scene.add(wallMesh1);

    // var wallMesh2 = new THREE.Mesh(floorGeometry, wallMaterial);
    // wallMesh2.position.copy(barrier2.position);
    // wallMesh2.quaternion.copy(barrier2.quaternion);
    // scene.add(wallMesh2);

    var wallMesh3 = new THREE.Mesh(floorGeometry, wallMaterial);
    wallMesh3.position.copy(barrier3.position);
    wallMesh3.quaternion.copy(barrier3.quaternion);
    // scene.add(wallMesh3);

    var wallMesh4 = new THREE.Mesh(floorGeometry, wallMaterial);
    wallMesh4.position.copy(barrier4.position);
    wallMesh4.quaternion.copy(barrier4.quaternion);
    // scene.add(wallMesh4);

    // var colors = ["#2783E1", "#ffff00", "#00ff00", "#0000ff", "#ff00ff"];
    var color = "#202020";
    // for (var i = 0; i < 1; i++) {
    //   var die = new DiceD20({ size: 1.5, backColor: colors[i] });
    //   scene.add(die.getObject());
    //   dice.push(die);
    // }
    function makeDice(four, six, eight, ten, twelve, twenty) {
        for (let i = 0; i < four; i++) {
            var die = new DiceD4({ size: 1.5, backColor: color });
            // die.getObject().position.y += 10;
            scene.add(die.getObject());
            // world.addBody(die);
            dice.push(die);
        }
        for (let i = 0; i < six; i++) {
            die = new DiceD6({ size: 1.5, backColor: color });
            // die.getObject().position.y += 10;
            scene.add(die.getObject());
            dice.push(die);
        }
        for (let i = 0; i < eight; i++) {
            die = new DiceD8({ size: 1.5, backColor: color });
            scene.add(die.getObject());
            // world.addBody(die);
            die.getObject().position.set(10, 10, 10);
            dice.push(die);
        }
        for (let i = 0; i < ten; i++) {
            die = new DiceD10({ size: 1.5, backColor: color });
            // die.getObject().position.y += 10;
            scene.add(die.getObject());
            dice.push(die);
        }
        for (let i = 0; i < twelve; i++) {
            die = new DiceD12({ size: 1.5, backColor: color });
            // die.getObject().position.y += 10;
            scene.add(die.getObject());
            dice.push(die);
        }
        for (let i = 0; i < twenty; i++) {
            die = new DiceD20({ size: 1.5, backColor: color });
            // die.getObject().position.y += 10;
            scene.add(die.getObject());
            dice.push(die);
        }
        // for (var i = 0; i < dice.length; i++) {
        //   dice[i].getObject().position.set(0, -10, 0);
        // }
        console.log(dice);
    }
    // makeDice();

    function randomDiceThrow() {
        let diceValues = [];
        for (var i = 0; i < dice.length; i++) {
            let yRand = Math.random() * 20;
            dice[i].resetBody(); // As the die is going to be reused between throws, it is necessary to reset the body
            dice[i].getObject().position.x = -15 - (i % 3) * 1.5;
            dice[i].getObject().position.y = 10 + Math.floor(i / 3) * 1.5;
            dice[i].getObject().position.z = -+(i % 3) * 1.5;
            dice[i].getObject().quaternion.x =
                ((Math.random() * 90 - 45) * Math.PI) / 180;
            dice[i].getObject().quaternion.z =
                ((Math.random() * 90 - 45) * Math.PI) / 180;
            dice[i].updateBodyFromMesh();
            let rand = Math.random() * 5;
            dice[i]
                .getObject()
                .body.velocity.set(25 + rand, 40 + yRand, 15 + rand);
            dice[i]
                .getObject()
                .body.angularVelocity.set(
                    20 * Math.random() - 10,
                    20 * Math.random() - 10,
                    20 * Math.random() - 10
                );
            var sides = dice[i].values;
            let randomDiceValue = Math.floor(Math.random() * sides + 1);
            diceValues.push({ dice: dice[i], value: randomDiceValue });
        }
        DiceManager.prepareValues(diceValues);
        // setTimeout(function () {
        //   for (var i = 0; i < dice.length; i++) {
        //     console.log(dice[i].getUpsideValue());
        //     diceValues.push(dice[i].getUpsideValue());
        //   }
        // }, 1000);

        console.log(diceValues);
    }

    // Need to slow it down here!
    // setInterval(randomDiceThrow, 5000);
    // randomDiceThrow();
    // const handleMouseDown = (event) => {
    //   randomDiceThrow();
    // };
    requestAnimationFrame(animate);
    document
        .querySelector("#ThreeJS")
        .addEventListener("click", randomDiceThrow);

    let diceInputs = {
        four: 0,
        six: 0,
        eight: 0,
        ten: 0,
        twelve: 0,
        twenty: 0,
    };
    document.querySelector("#d4").addEventListener("click", function () {
        diceInputs["four"] = diceInputs["four"] + 1;
        document.querySelector("#Counterd4").innerHTML = diceInputs["four"];
    });
    document.querySelector("#d6").addEventListener("click", function () {
        diceInputs["six"] = diceInputs["six"] + 1;
        document.querySelector("#Counterd6").innerHTML = diceInputs["six"];
    });
    document.querySelector("#d8").addEventListener("click", function () {
        diceInputs["eight"] = diceInputs["eight"] + 1;
        document.querySelector("#Counterd8").innerHTML = diceInputs["eight"];
    });
    document.querySelector("#d10").addEventListener("click", function () {
        diceInputs["ten"] = diceInputs["ten"] + 1;
        document.querySelector("#Counterd10").innerHTML = diceInputs["ten"];
    });
    document.querySelector("#d12").addEventListener("click", function () {
        diceInputs["twelve"] = diceInputs["twelve"] + 1;
        document.querySelector("#Counterd12").innerHTML = diceInputs["twelve"];
    });
    document.querySelector("#d20").addEventListener("click", function () {
        diceInputs["twenty"] = diceInputs["twenty"] + 1;
        document.querySelector("#Counterd20").innerHTML = diceInputs["twenty"];
    });
    document.querySelector("#submit").addEventListener("click", submitted);
    document.querySelector("#clear").addEventListener("click", cleared);
    function cleared() {
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
        scene.add(camera);
        scene.add(ambient);
        scene.add(directionalLight);
        scene.add(light);
        dice = [];
    }
    function submitted() {
        console.log(diceInputs);
        makeDice(
            diceInputs["four"],
            diceInputs["six"],
            diceInputs["eight"],
            diceInputs["ten"],
            diceInputs["twelve"],
            diceInputs["twenty"]
        );
        diceInputs = {
            four: 0,
            six: 0,
            eight: 0,
            ten: 0,
            twelve: 0,
            twenty: 0,
        };
        document.querySelector("#Counterd4").innerHTML = diceInputs["four"];
        document.querySelector("#Counterd6").innerHTML = diceInputs["six"];
        document.querySelector("#Counterd8").innerHTML = diceInputs["eight"];
        document.querySelector("#Counterd10").innerHTML = diceInputs["ten"];
        document.querySelector("#Counterd12").innerHTML = diceInputs["twelve"];
        document.querySelector("#Counterd20").innerHTML = diceInputs["twenty"];
        console.log(diceInputs);
    }
}
// console.log(valuess)

function animate() {
    updatePhysics();
    render();
    update();

    requestAnimationFrame(animate);
}

function updatePhysics() {
    world.step(1.0 / 60.0);

    for (var i in dice) {
        dice[i].updateMeshFromBody();
    }
}

function update() {
    controls.update();
    //stats.update();
}

function render() {
    renderer.render(scene, camera);
}
