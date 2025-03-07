class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinStatusBar = new StatusBarCoin();
    bottleStatusBar = new StatusBarBottle();
    endbossStatusBar = new StatusBarEndboss();
    bottlesCollected = 0;
    coinsCollected = 0;
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCoinCollection();
        this.checkBottleCollection();
        this.run();
        this.checkCollisions();
        this.score = 0;
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.setWorld(this);
            }
        });
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCoinCollection();
            this.checkBottleCollection();
            this.checkBottleEnemyCollisions();
            this.removeDeadEnemies();
        }, 200);
    }
    
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                // Nur Schadenslogik, keine Sprunglogik mehr hier
                if (!this.character.isHurt()) {
                    this.character.hit();
                    this.statusBar.setPercentages(this.character.energy);
                }
            }
        });
    }

    checkCoinCollection() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.coinsCollected++;
                this.coinStatusBar.setPercentage(this.coinsCollected);
            }
        });
    }

    checkBottleCollection() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.bottlesCollected < 10) {
                this.level.bottles.splice(index, 1);
                this.bottlesCollected++;
                this.bottleStatusBar.setPercentage(this.bottlesCollected);
            }
        });
    }

    checkThrowObjects() {
        if(this.keyboard.F && this.bottlesCollected > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottlesCollected--;
            this.bottleStatusBar.setPercentage(this.bottlesCollected);
        }
    }

    checkBottleEnemyCollisions() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !enemy.isDead()) {
                    enemy.hit();
                    this.removeBottle(bottleIndex);
                }
            });
        });
    }
    
    removeBottle(index) {
        this.throwableObjects.splice(index, 1);
    }

    removeDeadEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy => {
            if (enemy.shouldBeRemoved) {
                clearTimeout(enemy.removalTimeout);
                return false;
            }
            return true;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.clouds);
            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.statusBar);
            this.addToMap(this.coinStatusBar);
            this.addToMap(this.bottleStatusBar);
            this.addToMap(this.endbossStatusBar);
            this.ctx.translate(this.camera_x, 0);
            this.addToMap(this.character);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.throwableObjects);
            this.ctx.translate(-this.camera_x, 0);
        
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}