class Bottle extends MoveableObject {
    offset = {
        top: 15,
        right: 15,
        bottom: 5,
        left: 15
    };
    width = 50;
    height = 60;
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES[Math.floor(Math.random() * 2)]);
        this.x = 200 + Math.random() * 2100;
        this.y = 360;
    }
}