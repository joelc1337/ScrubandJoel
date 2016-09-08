'use strict';

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render, update: update });


// Global variables
var spaceShip,
    bullets,
    bullet,
    enemy,
    enemys,
    weapon,
    fire,
    bulletTime = 0,
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
    shoot();
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
    
    function shoot(){
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        
        for( var i = 0; i < 20;i++){
        var b = bullets.create(0,0, 'bullet');
        b.name = 'bullet' + i;
        b.exists = false;
        b.visible = false;
        b.checkWorldBounds = true;
        b.events.onOutOfBounds.add(resetBullet, this);
        }
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
    //  if(fireButton.isDown) {
    //     weapon.fire();
    //  }
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        fireBullet();
    }
 





}

function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(spaceShip.x + 150, spaceShip.y + 80);
            bullet.body.velocity.x = 300;
            bulletTime = game.time.now + 150;
        }
    }

}
function resetBullet (bullet){
    bullets.kill
}
function collideHandler(bullets, enemy){
    bullets.kill();
    enemy.kill();
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
