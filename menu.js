class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    
    preload()
    {
        this.load.image('menu', 'assets/menuV2.png');
        this.load.image('jouerButton', 'assets/jouerButton.png');
        
    } // FIN PRELOAD
        
    // FONCTION DE CREATION D'OBJETS --------------------------------------------------

    create(){
        
        this.add.image(400, 288, 'menu');
        
        let jouerButton = this.add.image(this.game.renderer.width / 2 +0.5 , this.game.renderer.height / 3 - 0.5 , 'jouerButton').setDepth(1);

        jouerButton.setInteractive();

        jouerButton.on("pointerdown", () => {
            this.scene.start('Niveau1', {x : 960, y : 540});
        })
        
    } //FIN CREATE
    
} // FIN SCENE