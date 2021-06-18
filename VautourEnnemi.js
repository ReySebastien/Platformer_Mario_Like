class SbireEnnemi extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, image){
        super(scene, x, y, image);
        
        
        scene.add.existing(this);
        scene.ennemi.add(this);

    }
    
    
    ia(player){ 
    
        if(player.body.x < this.body.x){
            this.flipX = false;
        }

        else if(player.body.x > this.body.x){
            this.flipX = true;
        }

        if(player.body.x < this.body.x && Math.abs(player.body.x-this.body.x) < 300){
            this.body.setAccelerationX(-150);
        }

        else if(player.body.x > this.body.x && Math.abs(player.body.x-this.body.x) < 300){
            this.body.setAccelerationX(150);
        }

        if(this.body.velocity.x > 100){
            this.body.velocity.x = 100;
        }

        else if(this.body.velocity.x < -100){
            this.body.velocity.x = -100;
        }
    
    }
}