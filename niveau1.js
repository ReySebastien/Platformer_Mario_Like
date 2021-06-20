class Niveau1 extends Phaser.Scene{
    constructor(){
        super("Niveau1");
    }
    
create ()
{
    
    //CREATION DE LA MAP -----------------------------------------------------------------------------
    this.map = this.make.tilemap({ key: 'map_jeu' });
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.tileset = this.map.addTilesetImage('Tileset_Gold_mine', 'map');
    this.fond = this.map.createStaticLayer('Fond', this.tileset, 0, 0).setScrollFactor(0.1);
    this.mortel = this.map.createStaticLayer('Mortel', this.tileset, 0, 0);
    this.paralax3 = this.map.createDynamicLayer('Paralax3', this.tileset, 0, 0).setScrollFactor(0.1);
    this.paralax2 = this.map.createDynamicLayer('Paralax2', this.tileset, 0, 0).setScrollFactor(0.3);
    this.paralax1 = this.map.createDynamicLayer('Paralax1', this.tileset, 0, 0).setScrollFactor(0.5);
    this.objets = this.map.createDynamicLayer('Objets', this.tileset, 0, 0);
    const platformsObjects = this.map.getObjectLayer('ObjetsA').objects;
    this.sol = this.map.createDynamicLayer('Sol', this.tileset, 0, 0);
    
    this.platforms = this.physics.add.staticGroup({
        allowGravity: false,
        immovable: true,
    });

    platformsObjects.forEach(platformsObject => {const platform = this.platforms.create(platformsObject.x+16, platformsObject.y-16, platformsObject.type).setAlpha(0)});
    
    this.bordure = this.physics.add.image(4890, 400, 'bordure');
    this.bordure.body.setAllowGravity(false);
    
    //CREATION PLAYER --------------------------------------------------------------------------------
    //this.player = this.physics.add.sprite(20, 500, 'dude');
    this.player = this.physics.add.sprite(4600, 100, 'dude');

    this.player.direction = 'right';
    this.player.setCollideWorldBounds(true);
    //CREATION ENNEMI -------------------------------------------------------------------------------
    this.ennemi = this.physics.add.group();
    this.ennemi1 = new SbireEnnemi(this, 400, 300, 'ennemi');
    new SbireEnnemi(this, 800,300, 'ennemi');
    this.vautour1 = new VautourEnnemi(this, 4000, 100, 'vautour').body.setAllowGravity(false);
    this.vautour2 = new VautourEnnemi(this, 4200, 100, 'vautour').body.setAllowGravity(false);
    this.cactus = this.physics.add.group();
    this.cactus1 = this.cactus.create(1200, 300, 'cactus');
    this.cactus2 = this.cactus.create(1500, 300, 'cactus');
    this.cactus3 = this.cactus.create(3000, 300, 'cactus');
    this.cactus4 = this.cactus.create(3400, 300, 'cactus');

    //this.ennemi.setCollideWorldBounds(true);
    
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
    this.inventaire = this.add.image(730, 250, 'inventaire').setScrollFactor(0);
    this.interface_lasso = this.add.image(730, 180, "lasso_vide").setScrollFactor(0);
    this.revolver = this.add.image(730, 250, "revolver").setScrollFactor(0);
    this.sceneText = this.add.text(690, 270, balles, { fontSize: '28px', fill: '#fff' }).setScrollFactor(0);
    this.sceneText2 = this.add.text(720, 270, '/30', { fontSize: '28px', fill: '#fff' }).setScrollFactor(0);

    // AJOUT DES BALLES -------------------------------------------------------------------------------
    this.groupeBullets = this.physics.add.group();
    this.projectiles = this.physics.add.group();
    this.key = this.physics.add.group();
    this.goldCoin = this.physics.add.group();
    this.caisse_munition = this.physics.add.image(4800, 100, 'caisse_balles');
    
    // CREATION DU LASSO ---------------------------------------------------------------------------------
    //this.hook = this.physics.add.group({});
    
    //AJOUT DES COLLIDERS ------------------------------------------------------------------------------
    this.physics.add.collider(this.player, this.sol);
    this.physics.add.collider(this.ennemi, this.sol);
    this.physics.add.collider(this.player, this.plateforme);
    this.physics.add.collider(this.ennemi, this.plateforme);
    this.physics.add.collider(this.goldCoin, this.sol);
    this.physics.add.collider(this.goldCoin, this.plateforme);
    this.physics.add.collider(this.goldCoin, this.plateforme);
    this.physics.add.collider(this.ennemi, this.objets);
    this.physics.add.collider(this.goldCoin, this.objets);
    this.physics.add.collider(this.key, this.objets);
    this.physics.add.collider(this.key, this.sol);
    this.physics.add.collider(this.cactus, this.sol);
    this.physics.add.collider(this.caisse_munition, this.sol);
    
    this.physics.add.overlap(this.player, this.ennemi, this.hitEnnemi, null, this);
    this.physics.add.overlap(this.projectiles, this.player, this.hitEnnemi, null, this);
    this.physics.add.overlap(this.player, this.cactus, this.hitEnnemi, null, this);
    this.physics.add.overlap(this.groupeBullets, this.ennemi, this.hit, null, this);
    this.physics.add.overlap(this.player, this.bordure, this.hitBordure, null, this);
    this.physics.add.overlap(this.player, this.key, this.getCle, null, this);
    this.physics.add.overlap(this.player, this.caisse_munition, this.getMunitions, null, this);
    
    this.physics.add.collider(this.player, this.objets);
    this.objets.setCollisionByProperty({collides:true});
    
    this.physics.add.collider(this.player, this.sol);
    this.sol.setCollisionByProperty({collides:true});
    
    this.physics.add.collider(this.player, this.mortel,this.death,null,this);
    this.mortel.setCollisionByProperty({mortal:true});
    
    // AJOUT CAMERA -----------------------------------------------------------------------------------
    
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
    this.cameras.main.setSize(config.width, config.height);
    this.cameras.main.startFollow(this.player);
    
    //this.ennemi2.anims.play('sbire_marche');
    
 

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
    
    if(this.cursors.z.isDown && saut == 1)
    {
        this.player.setVelocityY(-400);
        saut--; 
    }
    
    

    if (this.cursors.s.isDown){
        this.player.setVelocityY(400)
    }
    
    if(this.player.body.blocked.down){
        saut = 1;
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
            balles -= 1;
            this.sceneText.setText(balles);
            if(balles <= 0){
                balles = 0;
                this.sceneText.setText(balles);
            }
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

    for(var i = 0; i < this.ennemi.getChildren().length; i++){
            let ennemis = this.ennemi.getChildren()[0];
            if(ennemis.ia(this.player)){
                if(ennemis.direction == 'right') {
                    
                this.projectiles.create(ennemis.x, ennemis.y, 'balle').setVelocityX(300).body.setAllowGravity(false);
                }
                
                else{
                this.projectiles.create(ennemis.x, ennemis.y, 'balle').setVelocityX(-300).body.setAllowGravity(false);

                }
            }
        }
    

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
    
    
hookHitEnnemies(hook, ennemi){
    
    console.log(hook)
    ennemi.toucher = true;

    this.physics.moveToObject(ennemi, this.player, 600);
    console.log(this.player) 

    var colliderEnnemi = this.physics.add.overlap(ennemi, this.player, function (ennemiOnBlock)
    {
        ennemiOnBlock.body.stop();
        ennemi.destroy();
        this.rope.destroy();
        this.hook.destroy();
        nombreLasso = 1
    }, null, this);
    
    
} // FIN HOOKHITENNEMIES -----------------------------------------------------------------------------
    
hookHitPlatforms(platforms, hook){
    
    this.hook.hookedSomething = true;
    console.log('velocity', this.player.body.velocity.x);
    
} // FIN HOOKHITPLATFORMS --------------------------------------------------------------------------------
    
playerTouchHook(){
    this.hook.hookedSomething = false
    this.hook.destroy();
    this.rope.destroy();
    nombreLasso = 1;
} // FIN PLAYERTOUCHHOOK ----------------------------------------------------------------------------------

hitEnnemi(player, ennemi){
     
    if (!invulnerabilite){
        vie -= 1;
        invulnerabilite = true;
        
        if(vie > 0){
            this.clignotement = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){this.player.visible = !this.player.visible;}, callbackScope: this});
        }
        
        this.tempsInvulnerabilite = this.time.addEvent({ delay : 2000, callback: function(){invulnerabilite = false}, callbackScope: this});
    }
     
     if(vie == 0){
        this.player.setTint(0xff0000);
        this.physics.pause();
        this.gameOver = true;
    }
    
 } // FIN HITENNEMI --------------------------------------------------------------------------------------------

tirer(player){
    
    if(pistolet == true && balles > 0){
	    var coefDirX;
        var coefDirY;
        if (this.player.direction == 'left') { coefDirX = -1; } else if(this.player.direction == 'right') { coefDirX = 1 } else {coefDirX = 0}
        if (this.player.direction == 'up') {coefDirY = -1;} else if(this.player.direction == 'down') {coefDirY = 1} else {coefDirY =0}
        // on crée la balle a coté du joueur
        var bullet = this.groupeBullets.create(this.player.x + (25 * coefDirX), this.player.y - 4 , 'balle');
        // parametres physiques de la balle.
        bullet.setCollideWorldBounds(false);
        bullet.body.allowGravity =false;
        bullet.setVelocity(1000 * coefDirX, 1000 * coefDirY); // vitesse en x et en y
    }
} // FIN TIRER --------------------------------------------------------------------------------------------------- 

hit (bullet, ennemi) {
        bullet.destroy();
        ennemi.destroy();
    if(!this.key1){
        this.key1 =this.key.create(this.ennemi1.x, this.ennemi1.y, 'key');
    }

} // FIN HIT ------------------------------------------------------------------------------------------------------

stop (hook)        
    {
        hook.setVelocityX(0);
        hook.setVelocityY(0);
    }
    
death(){
    vie = 0;
    this.physics.pause();
    this.player.setTint('0xff0000');
}
    
getCle(key){
    
    this.key1.destroy();
    this.objets.replaceByIndex(4060, 4062);
    this.objets.replaceByIndex(4059, 4061);
    this.objets.replaceByIndex(4215, 4217);
    this.objets.replaceByIndex(4216, 4218);
    this.lasso1 = this.physics.add.image(550, 500, 'lasso');
    this.physics.add.collider(this.lasso1, this.objets);
    this.physics.add.collider(this.lasso1, this.sol);
    this.physics.add.overlap(this.player, this.lasso1, this.getLasso, null, this);


}
    
getLasso(lasso1){
    this.lasso1.destroy();
    lasso = true;
}
    
hitBordure(){
        
    this.scene.start("Mine")
    vie = 3;
}
getMunitions(){
    this.caisse_munition.destroy();
    balles = 30;
    this.sceneText.setText(balles);

}
} //FIN SCENE ----------------------------------------------------------------------------------------------