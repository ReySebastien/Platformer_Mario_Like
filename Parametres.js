class Parametres extends Phaser.Scene{
    constructor(){
        super("Parametres");
    }

create(){
    this.add.image(400, 288, 'menu_option');
    
    let controlesButton = this.add.image(this.game.renderer.width / 2 +1 , this.game.renderer.height / 3 - -41.5 , 'controlesButton').setDepth(1);

        controlesButton.setInteractive();

        controlesButton.on("pointerdown", () => {
            this.scene.start('Controles', {x : 960, y : 540});
        })
        
        let bossButton = this.add.image(this.game.renderer.width / 2 +0 , this.game.renderer.height / 3 - -126.5 , 'directBossButton').setDepth(1);

        bossButton.setInteractive();

        bossButton.on("pointerdown", () => {
            this.scene.start('Mine', {x : 960, y : 540});
        })
    
        let retourButton = this.add.image(this.game.renderer.width / 2 - 330 , this.game.renderer.height / 3 - 150 , 'retourButton').setDepth(1);

        retourButton.setInteractive();

        retourButton.on("pointerdown", () => {
            this.scene.start('Menu', {x : 960, y : 540});
        })
} // FIN CREATE ----------------------------------------------------------------------------------------------------------------------------------------   
    
} // FIN SCENE