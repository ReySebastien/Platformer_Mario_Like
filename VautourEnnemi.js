class SbireEnnemi extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, image){
        super(scene, x, y, image);
        
        
        scene.add.existing(this);
        scene.ennemi.add(this);

    }
    
    
    ia(player){ 
    
    
    
    } 
}