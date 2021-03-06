class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    
    preload()
    {
        this.load.image('menu', 'assets/menuv2.png');
        this.load.image('menu_option', 'assets/menuv3.png');
        this.load.image('jouerButton', 'assets/jouerButton.png');
        this.load.image('optionButton', 'assets/optionButton.png');
        this.load.image('controlesButton', 'assets/controles.png');
        this.load.image('directBossButton', 'assets/aller_direct_au_boss.png');
        this.load.image('retourButton', 'assets/retour.png');
        this.load.image('controlesEcran', 'assets/controles_ecran.png');
        this.load.image('perso_test', 'assets_test/perso_test.png');
        this.load.image('sol', 'assets_test/bon_sol.png');
        this.load.image('ennemi', 'assets/ennemi_sbire_test.png');
        this.load.image('barre_de_vie_3hp', 'assets/barre_de_vie_3hp.png');
        this.load.image('barre_de_vie_2hp', 'assets/barre_de_vie_2hp.png');
        this.load.image('barre_de_vie_1hp', 'assets/barre_de_vie_1hp.png');
        this.load.image('barre_de_vie_0hp', 'assets/barre_de_vie_0hp.png');
        this.load.image('game_over', 'assets/game_over.png');
        this.load.image('victoire', 'assets/victoire.png');
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
        this.load.image('boss_10hp', 'assets/boss_10hp.png');
        this.load.image('boss_9hp', 'assets/boss_9hp.png');
        this.load.image('boss_8hp', 'assets/boss_8hp.png');
        this.load.image('boss_7hp', 'assets/boss_7hp.png');
        this.load.image('boss_6hp', 'assets/boss_6hp.png');
        this.load.image('boss_5hp', 'assets/boss_5hp.png');
        this.load.image('boss_4hp', 'assets/boss_4hp.png');
        this.load.image('boss_3hp', 'assets/boss_3hp.png');
        this.load.image('boss_2hp', 'assets/boss_2hp.png');
        this.load.image('boss_1hp', 'assets/boss_1hp.png');
        this.load.image('boss_0hp', 'assets/boss_0hp.png');
        this.load.image('caisse_balles', 'assets/caisse_balles.png');
        this.load.image('caisse_vie', 'assets/caisse_vie.png');
        this.load.spritesheet('dude', 'assets/spritesheet_perso.png', { frameWidth: 30, frameHeight: 45});
        this.load.spritesheet('sbire', 'assets/spritesheet_sbire.png', {frameWidth: 30, frameHeight: 45});
        this.load.spritesheet('boss', 'assets/spritesheet_boss.png', {frameWidth: 30, frameHeight: 45});
        this.load.spritesheet('vautour', 'assets/spritesheet_vautour.png', {frameWidth: 43 , frameHeight: 30});
        this.load.spritesheet('sang', 'assets/sang.png', {frameWidth: 56, frameHeight: 45});
        this.load.tilemapTiledJSON('map_jeu', 'test_map.json');
        this.load.image('map', 'assets/tileset.png');
        this.load.tilemapTiledJSON('map_mine', 'map_mine.json');
        this.load.image('tileset_mine', 'assets/tileset_mine.png');
        
        this.load.audio('musique_jeu', 'soundDesign/Kikou.ogg');
        this.load.audio('cri', 'soundDesign/cri.ogg');
        this.load.audio('oiseau_meurt', 'soundDesign/oiseau_meurt.ogg');
        this.load.audio('plouf', 'soundDesign/plouf.ogg');
        this.load.audio('cri_perso', 'soundDesign/cri_perso.ogg');
        this.load.audio('corde_son', 'soundDesign/corde.ogg');
        this.load.audio('grotte', 'soundDesign/grotte.ogg');
        this.load.audio('grotte_musique', 'soundDesign/grotte_musique.ogg');


    } // FIN PRELOAD
        
    // FONCTION DE CREATION D'OBJETS --------------------------------------------------

    create(){
        
        this.add.image(400, 288, 'menu');
        
        let jouerButton = this.add.image(this.game.renderer.width / 2 +0.5 , this.game.renderer.height / 3 - 0.5 , 'jouerButton').setDepth(1);

        jouerButton.setInteractive();

        jouerButton.on("pointerdown", () => {
            this.scene.start('Niveau1', {x : 960, y : 540});
        })
        
        let optionButton = this.add.image(this.game.renderer.width / 2 +1 , this.game.renderer.height / 3 - -95.5 , 'optionButton').setDepth(1);

        optionButton.setInteractive();

        optionButton.on("pointerdown", () => {
            this.scene.start('Parametres', {x : 960, y : 540});
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
        
    // AJOUT ANIMATION VAUTOUR --------------------------------------------------------------------------------------
        
    this.anims.create({
      key: "vautour_vole",
      frames: this.anims.generateFrameNumbers("vautour", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
        
    this.anims.create({
        key: "sang",
        frames: this.anims.generateFrameNumbers("sang", { start: 0, end: 3}),
        frameRate: 10,
    });
        
    } //FIN CREATE
    
} // FIN SCENE