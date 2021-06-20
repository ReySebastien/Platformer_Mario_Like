class VautourEnnemi extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, image){
        super(scene, x, y, image);
        
        
        scene.add.existing(this);
        scene.boss.add(this);

    }
    
    
    ia(player){ 
                
        if(player.body.x < this.body.x){
            this.flipX = false;
        }

        else if(player.body.x > this.body.x){
            this.flipX = true;
        }

        if(player.body.x < this.body.x && Math.abs(player.body.x-this.body.x) < 300){
            this.body.setAccelerationX(-600);
        }

        else if(player.body.x > this.body.x && Math.abs(player.body.x-this.body.x) < 300){
            this.body.setAccelerationX(600);
        }
        
        if(player.body.y < this.body.y && Math.abs(player.body.y-this.body.y)){
            this.body.setAccelerationY(-600);
        }
        
        else if(player.body.y > this.body.y && Math.abs(player.body.y-this.body.y)){
            this.body.setAccelerationY(600);
        }
        
        if(this.body.velocity.x > 500){
            this.body.velocity.x = 500;
        }

        else if(this.body.velocity.x < -500){
            this.body.velocity.x = -500;
        }
        
        if(this.body.velocity.y > 500){
            this.body.velocity.y = 500;
        }
        
        else if(this.body.velocity.y < -500){
            this.body.velocity.y = -500;
        }
    
    }
}