import Matter from "matter-js";

// Matter.js module aliases
const Engine = Matter.Engine,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    Constraint = Matter.Constraint,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events;

export default class {
    constructor() {

        this.engine = Engine.create();

        this.keys = {
            down: false,
            up: false,
            left: false,
            right: false,
            space: false
        };

        this.engine.world.gravity.x = 0;
        this.engine.world.gravity.y = 0;
        this.player = Bodies.circle(100, 150, Common.random(10, 27), {
            friction: 0.001,
            restitution: 0.2,
            density: 5,
            label: "player"
        });
        this.ball = Bodies.circle(100, 100, Common.random(5, 17), {
            friction: 0.001,
            restitution: 0.4,
            density: 2,
            label: "ball"
        });
    }

    addBoundaries() {
        const offset = 5;

        World.add(this.engine.world, [
            Bodies.rectangle(400, -offset, 800 + 2 * offset, 50, {isStatic: true}),
            Bodies.rectangle(400, 600 + offset, 800 + 2 * offset, 50, {isStatic: true}),
            Bodies.rectangle(800 + offset, 300, 50, 600 + 2 * offset, {isStatic: true}),
            Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, {isStatic: true})
        ]);
    }

    addBodies() {
        World.add(this.engine.world, [
            this.ball,
            this.player
        ]);
    }

    addListeners() {
        window.addEventListener("keydown", (event) => {
            switch (event.keyCode) {
                case 38:
                    this.keys.up = true;
                    break;
                case 40:
                    this.keys.down = true;
                    break;
                case 37:
                    this.keys.left = true;
                    break;
                case 39:
                    this.keys.right = true;
                    break;
                case 32:
                    this.keys.space = true;
                    break
            }
        });

        window.addEventListener("keyup", (event) => {
            switch (event.keyCode) {
                case 38:
                    this.keys.up = false;
                    break;
                case 40:
                    this.keys.down = false;
                    break;
                case 37:
                    this.keys.left = false;
                    break;
                case 39:
                    this.keys.right = false;
                    break;
                case 32:
                    this.keys.space = false;
                    break
            }
        });
        Events.on(this.engine, "collisionStart", (e) => {
            var i, pair, a, b,
                length = e.pairs.length;
            for (i = 0; i < length; i++) {
                pair = e.pairs[i];
                a = pair.bodyA;
                b = pair.bodyB;

                if (a.label === "player" && b.label === "ball" || a.label === "ball" && b.label === "player") {
                    var ball = a.label === "ball" ? a : b;
                    var player = a.label === "player" ? a : b;
                    if (player.isShooting) {
                        ball.wasHitted = true;
                    }
                }
                else {
                    continue
                }
            }
        });
        Events.on(this.engine, "collisionEnd", (e) => {
            var i, pair, a, b,
                length = e.pairs.length;
            for (i = 0; i < length; i++) {
                pair = e.pairs[i];
                a = pair.bodyA;
                b = pair.bodyB;

                if (a.label === "player" && b.label === "ball" || a.label === "ball" && b.label === "player") {
                    var ball = a.label === "ball" ? a : b;
                    if (ball.wasHitted) {
                        Body.setVelocity(ball, {
                            x: ball.velocity.x * 3,
                            y: ball.velocity.y * 3
                        });
                        ball.wasHitted = false;
                    }
                }
                else {
                    continue
                }
            }
        });

        Events.on(this.engine, "collisionActive", (e) => {
            var i, pair, a, b,
                length = e.pairs.length;
            for (i = 0; i < length; i++) {
                pair = e.pairs[i];
                a = pair.bodyA;
                b = pair.bodyB;

                if (a.label === "player" && b.label === "ball" || a.label === "ball" && b.label === "player") {
                    var ball = a.label === "ball" ? a : b;
                    var player = a.label === "player" ? a : b;
                    console.log("collision active", ball.force);
                    if (player.isShooting) {
                        Body.applyForce(this.ball, this.ball.position, {
                            x: 100,
                            y: 100
                        });
                    }
                }
                else {
                    continue
                }
            }
        });
    }

    updatePlayer() {
        if (this.keys.up) {
            Body.applyForce(this.player, this.player.position, {x: 0, y: -1});
        }
        if (this.keys.down) {
            Body.applyForce(this.player, this.player.position, {x: 0, y: 1});
        }
        if (this.keys.left) {
            Body.applyForce(this.player, this.player.position, {x: -1, y: 0});
        }
        if (this.keys.right) {
            Body.applyForce(this.player, this.player.position, {x: 1, y: 0});
        }
        this.player.isShooting = this.keys.space;
    }

    addScene() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width = 800;
        this.canvas.height = 600;

        document.body.appendChild(this.canvas);
    }

    render() {
        const bodies = Composite.allBodies(this.engine.world);

        window.requestAnimationFrame(this.render.bind(this));

        this.context.fillStyle = '#fff';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.beginPath();

        for (let i = 0; i < bodies.length; i += 1) {
            let vertices = bodies[i].vertices;

            this.context.moveTo(vertices[0].x, vertices[0].y);

            for (var j = 1; j < vertices.length; j += 1) {
                this.context.lineTo(vertices[j].x, vertices[j].y);
            }

            this.context.lineTo(vertices[0].x, vertices[0].y);
        }

        this.context.lineWidth = 2;
        this.context.strokeStyle = '#999';
        this.context.stroke();
    }

    run() {
        window.requestAnimationFrame(this.run.bind(this));
        Engine.update(this.engine, 1000 / 60);
        this.updatePlayer();
    }

    initialize() {
        this.addBoundaries();
        this.addBodies();
        this.addScene();
        this.render();
        this.run();
        this.addListeners();
    }
}