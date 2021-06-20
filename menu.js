class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    
    preload()
    {
        this.load.image('menu', 'assets/menuv2.png');
        this.load.image('jouerButton', 'assets/jouerButton.png');
        this.load.image('perso_test', 'assets_test/perso_test.png');
        this.load.image('sol', 'assets_test/bon_sol.png');
        this.load.image('ennemi', 'assets/ennemi_sbire_test.png');
        this.load.image('vautour', 'assets/vautour.png');
        this.load.image('barre_de_vie_3hp', 'assets/barre_de_vie_3hp.png');
        this.load.image('barre_de_vie_2hp', 'assets/barre_de_vie_2hp.png');
        this.load.image('barre_de_vie_1hp', 'assets/barre_de_vie_1hp.png');
        this.load.image('barre_de_vie_0hp', 'assets/barre_de_vie_0hp.png');
        this.load.image('game_over', 'assets/game_over.png');
        this.load.image('balle', 'assets/balle.png');
        this.load.image('gold_coin', 'assets/gold_coin.png');
        this.load.image('gold_coin_inventaire', 'assets/gold_coin_inventaire.png');
        this.load.image('key', 'assets/key.png');
        this.load.image('lasso', 'assets/lasso.png');
        this.load.image('corde', 'assets/corde.png');
        this.load.image('lasso_corde', 'assets/lasso_corde.png');
        this.load.image('cactus', 'assets/cactusv2.png');
        this.load.image('lasso_vide', 'assets/lasso_vide.png');
        this.load.image('bordure', 'assets/bordure.png');
        this.load.image('inventaire', 'assets/inventaire.png');
        this.load.image('revolver', 'assets/revolver.png');
        this.load.image('caisse_balles', 'assets/caisse_balles.png');
        this.load.spritesheet('dude', 'assets/spritesheet_perso.png', { frameWidth: 30, frameHeight: 45});
        this.load.spritesheet('sbire', 'assets/spritesheet_sbire.png', {frameWidth: 30, frameHeight: 45});
        this.load.spritesheet('boss', 'assets/spritesheet_boss.png', {frameWidth: 30, frameHeight: 45});
        this.load.tilemapTiledJSON('map_jeu', 'test_map.json');
        this.load.image('map', 'assets/tileset.png');
        this.load.tilemapTiledJSON('map_mine', 'map_mine.json');
        this.load.image('tileset_mine', 'assets/tileset_mine.png');

    } // FIN PRELOAD
        
    // FONCTION DE CREATION D'OBJETS --------------------------------------------------

    create(){
        
        this.add.image(400, 288, 'menu');
        
        let jouerButton = this.add.image(this.game.renderer.width / 2 +0.5 , this.game.renderer.height / 3 - 0.5 , 'jouerButton').setDepth(1);

        jouerButton.setInteractive();

        jouerButton.on("pointerdown", () => {
            this.scene.start('Niveau1', {x : 960, y : 540});
        })
        
    // AJOUT ANIMATION DU JOUEUR -----------------------------------------------------------------------
    
    this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 3 }),
            frameRate: 8,
        });

    this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 6 }),
            frameRate: 8,
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
    
    
    // AJOUT ANIMATION SBIRES ----------------------------------------------------------------------------------
    
    this.anims.create({
      key: "sbire_marche",
      frames: this.anims.generateFrameNumbers("sbire", { start: 1, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
        
    // AJOUT ANIMATION BOSS --------------------------------------------------------------------------------------
        
    this.anims.create({
      key: "boss_marche",
      frames: this.anims.generateFrameNumbers("boss", { start: 1, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
        
    } //FIN CREATE
    
} // FIN SCENE