'use strict';

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, render: render, update: update });


// Global variables
var spaceShip,
    bullets,
    enemy,
    enemys,
    weapon,
    fire,
    fireButton,
    keyPressed = [],
    keyDown = [];
    


const w = window.innerWidth,
      h = window.innerHeight,
      cx = w / 2,
      cy = h / 2;


function preload() {
    game.load.image('ship', "ship.png" );
    game.load.image('bullet', "bullet.png");
    game.load.image('enemyShip', 'enemy.png');
}


function create() {
     
    createShip();
    createEnemy();
    createListeners();    
    keyboardInput();
    guns();
    // for(var i = 1; i <= 10; i++){
        
    //     var c = enemy.create(game.world.randomX,       
    //     Math.random()*500,'enemies',game.rnd.integerInRange(1,31));
    //     c.name = "enem" + i;   
        
    //     }
}
    
    
    function createShip(){
        spaceShip = game.add.sprite(300,cy - 100, 'ship');
        game.stage.backgroundColor = 'black';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.enable(spaceShip, Phaser.Physics.ARCADE);
        game.physics.arcade.enable(spaceShip);
        spaceShip.scale.setTo(1.0,1.0);
        // spaceShip.body.gravity.x = -20;
        spaceShip.body.collideWorldBounds = true;
    }
    
    function createEnemy(){
        enemy = game.add.sprite(w - 300,cy - 100, 'enemyShip');
        game.physics.enable(enemy, Phaser.Physics.ARCADE);
        game.physics.arcade.enable(enemy);
        enemy.body.collideWorldBounds = true;
    }
    
    function guns(){
        weapon = game.add.weapon(20, 'bullet')
        weapon.bulletSpeed = 450;
        weapon.fireRate = 200; 
        weapon.trackSprite(spaceShip, 175, 95, true);
        // weapon.bulletSpeedVariance = 200; 
        fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);  
    }
    
    
    function createListeners(){
        document.addEventListener('keydown', function (e) {
            keyPressed[e.keyCode] = true;
        }, false);
        document.addEventListener('keyup', function (e) {
            keyPressed[e.keyCode] = false;
        }, false);
        document.addEventListener('keydown', function (e) {
            keyDown[e.keyCode] = true;
        }, false);
        document.addEventListener('keyup', function (e) {
            keyDown[e.keyCode] = false;
        }, false);
    }
    
function keyboardInput(){
    up();
    down();
    right();
    left();
}

function render() {

  game.debug.spriteInfo(spaceShip, 32,32);

}

function update(){
     if(fireButton.isDown) {
        weapon.fire();
     }
 
}
function killEnemy(){
  
}

    // KEYBOARD INPUT
    function up(){
        if (keyPressed["38"]) {
            spaceShip.y -= 5 / 2 ;
        }
        setTimeout(up, 5); 
    }
    function down(){
        if (keyPressed["40"]){
            spaceShip.y += 5 / 2;
        }
         setTimeout(down,5)
    }
    function left() {
        if (keyDown["39"]) {
            spaceShip.x += 4 / 2;
        }
        setTimeout(left, 5);
    }
    function right() {
        if (keyDown["37"]) {
            spaceShip.x -= 4 / 2 ;
        }
        setTimeout(right, 5);
    }
