class Mine extends Phaser.Scene{
    constructor(){
        super("Mine");
    }
    
create(){
    
    this.map = this.make.tilemap({ key: 'map_mine' });
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.tileset = this.map.addTilesetImage('tileset_mine', 'tileset_mine');
    this.fond = this.map.createStaticLayer('Fond', this.tileset, 0, 0);
    this.murs = this.map.createDynamicLayer('Murs', this.tileset, 0, 0)
    this.plateformes = this.map.createDynamicLayer('Platforms', this.tileset, 0, 0);
    const platformsObjects = this.map.getObjectLayer('Objets').objects;
    this.sol = this.map.createDynamicLayer('Sol', this.tileset, 0, 0);
    
    
    this.platforms = this.physics.add.staticGroup({
        allowGravity: false,
        immovable: true,
    });

    platformsObjects.forEach(platformsObject => {const platform = this.platforms.create(platformsObject.x+16, platformsObject.y-16, platformsObject.type).setAlpha(0)});
    
    //CREATION PLAYER --------------------------------------------------------------------------------
    this.player = this.physics.add.sprite(this.positionX, this.positionY, 'dude');
    this.player.direction = 'down';
    this.player.setCollideWorldBounds(true);
    lasso = true;
    
    //AJOUT VARIABLE TOUCHES CLAVIER ------------------------------------------------------------------
    this.cursors = this.input.keyboard.addKeys({
            's': Phaser.Input.Keyboard.KeyCodes.S, 
            'q': Phaser.Input.Keyboard.KeyCodes.Q,
            'd': Phaser.Input.Keyboard.KeyCodes.D,
            'z': Phaser.Input.Keyboard.KeyCodes.Z,
        });
    this.boutonFeu = this.input.keyboard.addKey('space');
    
    //AJOUT INTERFACE JOUEUR --------------------------------------------------------------------------
    this.hp = this.add.image(600,50, "barre_de_vie_3hp").setScrollFactor(0);
    
    // AJOUT DES BALLES -------------------------------------------------------------------------------
    this.groupeBullets = this.physics.add.group();
    this.projectiles = this.physics.add.group();
    this.key = this.physics.add.group();
    this.goldCoin = this.physics.add.group();
    
    //AJOUT DES COLLIDERS ------------------------------------------------------------------------------
    this.physics.add.collider(this.player, this.sol);
    this.physics.add.collider(this.player, this.plateformes);

    /*this.physics.add.collider(this.ennemi, this.sol);
    this.physics.add.collider(this.ennemi, this.plateformes);
    this.physics.add.collider(this.goldCoin, this.sol);
    this.physics.add.collider(this.goldCoin, this.plateformes);
    this.physics.add.collider(this.ennemi, this.objets);
    this.physics.add.collider(this.goldCoin, this.objets);*/
    
    this.physics.add.overlap(this.player, this.ennemi, this.hitEnnemi, null, this);
    this.physics.add.overlap(this.projectiles, this.player, this.hitEnnemi, null, this);
    this.physics.add.overlap(this.player, this.cactus, this.hitEnnemi, null, this);
    this.physics.add.overlap(this.groupeBullets, this.ennemi, this.hit, null, this);
    this.physics.add.overlap(this.player, this.bordure, this.hitBordure, null, this);

    
    this.physics.add.collider(this.player, this.plateformes);
    this.plateformes.setCollisionByProperty({collides:true});
    
    this.physics.add.collider(this.player, this.sol);
    this.sol.setCollisionByProperty({collides:true});

    this.physics.add.collider(this.player, this.murs);
    this.murs.setCollisionByProperty({collides:true});
    
    // AJOUT CAMERA -----------------------------------------------------------------------------------
    
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    this.cameras.main.setSize(config.width, config.height);
    this.cameras.main.startFollow(this.player);
    
    //AJOUT DE LA FONCTION DE TIR SI ON CLIQUE --------------------------------------------------------------

    this.input.on('pointerdown', this.shoot, this);
 
} // FIN CREATE ----------------------------------------------------------------------------------------------

update ()
{
    
    if (this.cursors.q.isDown)
    {
        this.player.setVelocityX(-200);
        this.player.direction = 'left';
        this.player.anims.play('left', true);
    }
    
    else if (this.cursors.d.isDown)
    {
        this.player.setVelocityX(200);
        this.player.direction = 'right';
        this.player.anims.play('right', true);
    }
    
    else
    {
        this.player.setVelocityX(0);
        if (this.player.direction == 'left'){
            this.player.anims.play('shoot_left');
        }
        else if(this.player.direction == 'right'){
            this.player.anims.play('shoot_right');
        }
    }
    
    if(this.cursors.z.isDown && this.player.body.blocked.down)
    {
        this.player.setVelocityY(-400);
    }
    
    

    if (this.cursors.s.isDown){
        this.player.setVelocityY(200)
    }
    
    if (vie == 3){
       this.hp.setTexture("barre_de_vie_3hp");
        
    }
    else if (vie == 2){
        this.hp.setTexture("barre_de_vie_2hp" );
        
    }
    
    else if (vie == 1){
        this.hp.setTexture("barre_de_vie_1hp");
    }
    
    else if (vie == 0){
        this.hp.setTexture("barre_de_vie_0hp");
        this.add.image(400, 336, 'game_over').setScrollFactor(0);
    }
    
    if (Phaser.Input.Keyboard.JustDown(this.boutonFeu)) {
            this.tirer(this.player);
        }
    
    if(this.hook !== undefined){
             this.rope.setPosition((this.hook.x+this.player.x)/2, (this.hook.y+this.player.y)/2);
            if(this.hook.y < this.player.y){
               this.rope.rotation = -Math.acos((this.hook.x-this.player.x)/(Math.sqrt(((this.hook.x-this.player.x)**2)+((this.hook.y-this.player.y)**2))));
            }
            else if(this.hook.y > this.player.y){
                this.rope.rotation = Math.acos((this.hook.x-this.player.x)/(Math.sqrt(((this.hook.x-this.player.x)**2)+((this.hook.y-this.player.y)**2))));
            }
        this.rope.scaleX = Phaser.Math.Distance.BetweenPoints(this.player, this.hook)/100;
        
        if (this.hook.hookedSomething == true){
            this.physics.moveToObject(this.player, this.hook, 600);
            this.stop(this.hook);

        }
    }

    /*for(var i = 0; i < this.ennemi.getChildren().length; i++){
            let ennemis = this.ennemi.getChildren()[0];
            if(ennemis.ia(this.player)){
                if(ennemis.direction == 'right') {
                    
                this.projectiles.create(ennemis.x, ennemis.y, 'balle').setVelocityX(300).body.setAllowGravity(false);
                }
                
                else{
                this.projectiles.create(ennemis.x, ennemis.y, 'balle').setVelocityX(-300).body.setAllowGravity(false);

                }
            }
        }*/
    

} // FIN UPDATE ------------------------------------------------------------------------------
    
    shoot (pointer){    
    console.log(pointer.x, pointer.y);
    console.log(this.player.x, this.player.y);
    console.log(this.cameras.main.scrollX, this.cameras.main.scrollY);
    
        if(lasso == true && nombreLasso == 1){
        nombreLasso -= 1
        this.hook = this.physics.add.image(this.player.x, this.player.y, 'lasso_corde');
        this.hook.hookedSomething = false;
        this.rope = this.add.image(0, 0, 'corde');
        this.physics.add.collider(this.platforms, this.hook, this.hookHitPlatforms, null, this);
        this.physics.add.collider(this.hook, this.ennemi, this.hookHitEnnemies, null, this);
        this.physics.add.collider(this.player, this.hook, this.playerTouchHook, null, this);
        this.time.addEvent({
            delay: 1000,
            callback: ()=>{
                if(this.hook.hookedSomething == false){
                this.rope.destroy();
                this.hook.destroy();
                nombreLasso = 1}
            }
        });

      if (true) {
        this.hook.setActive(true);
        this.hook.setVisible(true);
          //Calcul de coordonnées du vecteur entre les deux projectiles
          this.dY = (pointer.y - this.player.y);
          
          pointer.x += this.cameras.main.scrollX
          
          if(pointer.x > this.player.x){
          this.dX = (pointer.x - this.player.x);
          }
          
          else if(pointer.x < this.player.x){
              this.dX = (pointer.x - this.player.x);
          }

          //Distance à ajouter pour atteindre la constante vitesse.
          this.dSpeed = (1300/(Math.abs(this.dY)+Math.abs(this.dX))); 

          this.hook.body.setAllowGravity(false);
          this.hook.body.velocity.y = this.dY*this.dSpeed;
          this.hook.body.velocity.x = this.dX*this.dSpeed;

      }
        }
} // FIN SHOOT -----------------------------------------------------------------------------------
    
} // FIN SCENE