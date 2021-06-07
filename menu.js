class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    
    preload()
    {
        this.load.image('menu', 'assets/menu.png');
        
    } // FIN PRELOAD
        
    // FONCTION DE CREATION D'OBJETS --------------------------------------------------

    create(){
        
        this.add.image(640, 360, 'menu');
        
        this.input.once('pointerdown', function (event) {

            this.scene.start('Niveau1', {x : 960, y : 540});

        }, this);
        
    } //FIN CREATE
    
} // FIN SCENE