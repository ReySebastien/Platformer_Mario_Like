class Niveau1 extends Phaser.Scene{
    constructor(){
        super("Niveau1");
    }

preload ()
{
    this.load.image('fond', 'assets/fond.png');
    this.load.image('perso_test', 'assets_test/perso_test.png');
    this.load.image('sol', 'assets_test/bon_sol.png');
    this.load.image('ennemi', 'assets_test/ennemi_test.png');
    this.load.spritesheet('dude', 'assets/spritesheet_perso.png', { frameWidth: 30, frameHeight: 45});
    
} // FIN PRELOAD -----------------------------------------------------------------------------------------
    
    
create ()
{
    
    this.test = this;
    //CREATION DE LA MAP -----------------------------------------------------------------------------
    this.add.image(2500, 288, 'fond');
    this.sol = this.physics.add.image(960, 400, 'sol');
    this.sol.setCollideWorldBounds(true);
    this.plateforme = this.physics.add.staticGroup();
    this.plateforme.create(1800, 0, 'sol');
    
    //CREATION PLAYER --------------------------------------------------------------------------------
    //player = this.physics.add.image(960, 300, 'perso_test');
    //player.setCollideWorldBounds(true);
    this.player = this.physics.add.sprite(this.positionX, this.positionY, 'dude');
    this.player.direction = 'down';
    this.player.setCollideWorldBounds(true);
    //CREATION ENNEMI -------------------------------------------------------------------------------
    this.ennemi = this.physics.add.image(1200, 300, 'ennemi');
    this.ennemi.setCollideWorldBounds(true);
    
    //AJOUT VARIABLE TOUCHES CLAVIER ------------------------------------------------------------------
    this.cursors = this.input.keyboard.createCursorKeys();
    
    //AJOUT INTERFACE JOUEUR --------------------------------------------------------------------------
    

    //AJOUT DES COLLIDERS ------------------------------------------------------------------------------
    this.physics.add.collider(this.player, this.sol);
    this.physics.add.collider(this.player, this.ennemi);
    this.physics.add.collider(this.ennemi, this.sol);
    this.physics.add.collider(this.player, this.plateforme);
    
    this.cameras.main.setBounds(0, 0, 5000, 576)
    this.cameras.main.setSize(800, 576);
    this.cameras.main.startFollow(this.player);
    
    this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 3 }),
            frameRate: 10,
        });

    this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 6 }),
            frameRate: 10,
        });

    this.anims.create({
            key: 'reste_right',
            frames: [ {key: 'dude', frame: 4}],
        });

    this.anims.create({
            key: 'reste_left',
            frames: [{key: 'dude', frame: 3}],
        });
    
    this.anims.create({
            key: 'shoot_left',
            frames: [{key: 'dude', frame : 0}],
    })
    
    this.anims.create({
            key: 'shoot_right',
            frames: [{key: 'dude', frame : 7}],
    })
    
    // CREATION DU LASSO ---------------------------------------------------------------------------------
    
    this.hook = this.physics.add.group({});

    // CREATION DE L'APPEL DES FONCTIONS DU LASSO -------------------------------------------------------
    
    this.physics.add.overlap(this.ennemi, this.hook, this.hookHitEnnemies, null, this);
    //this.physics.add.overlap(this.plateforme, this.hook, this.hookHitPlatforms, null, this);
    
    //AJOUT DE LA FONCTION DE TIR SI ON CLIQUE --------------------------------------------------------------

    this.input.on('pointerdown', this.shoot, this);
 
} // FIN CREATE ----------------------------------------------------------------------------------------------
    
    
    
update ()
{
    
    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-300);
        this.player.direction = 'left';
        this.player.anims.play('left', true);
    }
    
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(300);
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
    
    if(this.cursors.up.isDown)
    {
        this.player.setVelocityY(-300);
    }
    
    

    if (this.cursors.down.isDown){
        this.player.setVelocityY(300)
    }

} // FIN UPDATE ------------------------------------------------------------------------------

    shoot (pointer){    
    console.log(pointer.x, pointer.y);
    console.log(this.player.x, this.player.y);
    console.log(this.cameras.main.scrollX, this.cameras.main.scrollY);
    
      var hook = this.hook.get(this.player.x, this.player.y);
      if (hook) {
        hook.setActive(true);
        hook.setVisible(true);
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

          hook.body.setAllowGravity(false);
          hook.body.velocity.y = this.dY*this.dSpeed;
          hook.body.velocity.x = this.dX*this.dSpeed;
        }
} // FIN SHOOT -----------------------------------------------------------------------------------
    
    
hookHitEnnemies(hook, ennemi){
    
    //this.stop();
    this.hookComesBack();

    this.physics.moveToObject(this.ennemi, this.player, 600);

    console.log('velocity', this.ennemi.body.velocity.x);

    //this.destroyHook();
    
    var colliderEnnemi = this.physics.add.overlap(this.ennemi, this.player, function (ennemiOnBlock)
    {
        ennemiOnBlock.body.stop();

        this.physics.world.removeCollider(collider);
    }, null, this);
        
} // FIN HOOKHITENNEMIES -----------------------------------------------------------------------------
    
hookComesBack(hook, player){
    
    this.physics.movetoObject(this.hook, this.player, 600);
    
    var colliderHook = this.physics.add.overlap(this.hook, this.player, function(hookOnBlock){
        hookOnBlock.body.stop();
        
        this.physics.world.removeCollider(collider);
    },null,this);
    
}
hookHitPlatforms(hook, player){
    
    this.physics.moveToObject(this.player, this.plateforme, 600);

    console.log('velocity', this.player.body.velocity.x);

    var colliderPlayer = this.physics.add.overlap(this.player, this.plateforme, function (playerOnBlock)
    {
        playerOnBlock.body.stop();

        this.physics.world.removeCollider(collider);
    }, null, this);
    
} //F FIN HOOKHITPLATFORMS --------------------------------------------------------------------------------
    stop (hook)        
    {
        this.hook.setVelocityX(0);
        this.hook.setVelocityY(0);
    }
    
    destroyHook(hook)
    {
        this.physics.body.destroy();
    }
} //FIN SCENE ----------------------------------------------------------------------------------------------