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
    
    // CREATION PLAYER --------------------------------------------------------------------------------
    this.player = this.physics.add.sprite(150, 500, 'dude');
    this.player.direction = 'right';
    this.player.setCollideWorldBounds(true);
    lasso = true;
    vie = 3;
    
    //CREATION ENNEMIS ----------------------------------------------------------------------------------
    this.boss = this.physics.add.group();
    this.ennemi = this.physics.add.group();
    this.boss1 = new Boss(this, 800, 300, 'boss');
    // AJOUT VARIABLE TOUCHES CLAVIER ------------------------------------------------------------------
    this.cursors = this.input.keyboard.addKeys({
            's': Phaser.Input.Keyboard.KeyCodes.S, 
            'q': Phaser.Input.Keyboard.KeyCodes.Q,
            'd': Phaser.Input.Keyboard.KeyCodes.D,
            'z': Phaser.Input.Keyboard.KeyCodes.Z,
        });
    this.boutonFeu = this.input.keyboard.addKey('space');
    
    // AJOUT INTERFACE JOUEUR --------------------------------------------------------------------------
    this.hp = this.add.image(600,50, "barre_de_vie_3hp").setScrollFactor(0);
    this.inventaire = this.add.image(730, 250, 'inventaire').setScrollFactor(0);
    this.interface_lasso = this.add.image(730, 180, "lasso_vide").setScrollFactor(0);
    this.revolver = this.add.image(730, 250, "revolver").setScrollFactor(0);
    this.interface_Gold_Coin = this.add.image(710, 340, "gold_coin_inventaire").setScrollFactor(0);
    this.sceneText = this.add.text(690, 270, balles, { fontSize: '28px', fill: '#fff' }).setScrollFactor(0);
    this.sceneText2 = this.add.text(720, 270, '/30', { fontSize: '28px', fill: '#fff' }).setScrollFactor(0);
    this.sceneText3 = this.add.text(750, 327, argent, { fontSize: '28px', fill: '#fff' }).setScrollFactor(0);
    
    // AJOUT BARRE DE VIE BOSS --------------------------------------------------------------------------------
    
    this.hp_boss = this.add.image(50, 230, 'boss_10hp').setScrollFactor(0);

    // AJOUT DES DIFFERENTS GROUPES -------------------------------------------------------------------------------
    this.groupeBullets = this.physics.add.group();
    this.projectiles = this.physics.add.group();
    this.key = this.physics.add.group();
    this.goldCoin = this.physics.add.group();
    
    //AJOUT DES COLLIDERS ------------------------------------------------------------------------------
    this.physics.add.collider(this.player, this.sol);
    this.physics.add.collider(this.player, this.plateformes);

    this.physics.add.collider(this.ennemi, this.sol);
    this.physics.add.collider(this.ennemi, this.plateformes);
    this.physics.add.collider(this.ennemi, this.objets);
    this.physics.add.collider(this.boss, this.sol);
    this.physics.add.collider(this.boss, this.plateformes);
    this.physics.add.collider(this.boss, this.objets);
    this.physics.add.collider(this.boss, this.murs);
    //this.physics.add.collider(this.goldCoin, this.sol);
    //this.physics.add.collider(this.goldCoin, this.plateformes);
    //this.physics.add.collider(this.goldCoin, this.objets);
    
    this.physics.add.overlap(this.player, this.ennemi, this.hitEnnemi, null, this);
    this.physics.add.overlap(this.projectiles, this.player, this.hitEnnemi, null, this);
    this.physics.add.overlap(this.player, this.cactus, this.hitEnnemi, null, this);
    this.physics.add.overlap(this.groupeBullets, this.ennemi, this.hit, null, this);
    this.physics.add.overlap(this.player, this.bordure, this.hitBordure, null, this);
    this.physics.add.overlap(this.groupeBullets, this.boss, this.hitBoss, null, this);
    this.physics.add.overlap(this.player, this.goldCoin, this.getGoldCoin, null, this);
    
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

    for(var i = 0; i < this.boss.getChildren().length; i++){
            let bosses = this.boss.getChildren()[0];
            if(bosses.ia(this.player)){
                if(bosses.direction == 'right') {
                    
                this.projectiles.create(bosses.x, bosses.y, 'balle').setVelocityX(300).body.setAllowGravity(false);
                }
                
                else if(bosses.direction == 'left'){
                this.projectiles.create(bosses.x, bosses.y, 'balle').setVelocityX(-300).body.setAllowGravity(false);

                }
            }
        }
    if(vie_boss == 9){
        this.hp_boss.setTexture("boss_9hp");
    }
    
    else if(vie_boss == 8){
        this.hp_boss.setTexture("boss_8hp");
    }
    
    else if(vie_boss == 7){
        this.hp_boss.setTexture("boss_7hp");
    }

    else if(vie_boss == 6){
        this.hp_boss.setTexture("boss_6hp");
    }
    
    else if(vie_boss == 5){
        this.hp_boss.setTexture("boss_5hp");
    }

    else if(vie_boss == 4){
        this.hp_boss.setTexture("boss_4hp");
    }
    
    else if(vie_boss == 3){
        this.hp_boss.setTexture("boss_3hp");
    }
    
    else if(vie_boss == 2){
        this.hp_boss.setTexture("boss_2hp");
    }
    
    else if(vie_boss == 1){
        this.hp_boss.setTexture("boss_1hp");
    }
    
    else if(vie_boss == 0){
        this.hp_boss.setTexture("boss_0hp");
        this.add.image(400, 228, "victoire");
        this.physics.pause();
    }
    
    if(lasso == true){
        this.interface_lasso.setTexture('lasso');
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
    else{
        this.goldCoin1 = this.goldCoin.create(ennemi.x, ennemi.y, 'gold_coin').body.setAllowGravity(false);;
    }

} // FIN HIT ------------------------------------------------------------------------------------------------------
    
hitBoss (bullet, boss) {
        bullet.destroy();
        vie_boss -= 1;
    if(vie_boss == 0){
        boss.destroy();
    }
} // FIN HITBOSS -------------------------------------------------------------------------------------------------
    
getGoldCoin(){
    this.goldCoin1.destroy();
    argent += 1;
    this.sceneText3.setText(argent);
} // FIN GETGOLDCOIN ---------------------------------------------------------------------------------------------------
    
stop (hook){
        hook.setVelocityX(0);
        hook.setVelocityY(0);
} // FIN STOP ----------------------------------------------------------------------------------------------------
    
death(){
    vie = 0;
    this.physics.pause();
    this.player.setTint('0xff0000');
} // FIN DEATH ----------------------------------------------------------------------------------------------------
    
} //FIN SCENE 