class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    
    preload()
    {
        this.load.image('menu', 'assets/menuV2.png');
        
    } // FIN PRELOAD
        
    // FONCTION DE CREATION D'OBJETS --------------------------------------------------

    create(){
        
        this.add.image(400, 288, 'menu');
        
        this.input.once('pointerdown', function (event) {

            this.scene.start('Niveau1', {x : 960, y : 540});

        }, this);
        
    } //FIN CREATE
    
} // FIN SCENE