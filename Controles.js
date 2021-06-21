class Controles extends Phaser.Scene{
    constructor(){
        super("Controles");
    }
create(){
    
        this.add.image(400, 288, 'controlesEcran');

        let retourButton = this.add.image(this.game.renderer.width / 2 - 330 , this.game.renderer.height / 3 - 150 , 'retourButton').setDepth(1);

        retourButton.setInteractive();

        retourButton.on("pointerdown", () => {
            this.scene.start('Parametres', {x : 960, y : 540});
        })
    } // FIN CREATE ----------------------------------------------------------------

} // FIN SCENE