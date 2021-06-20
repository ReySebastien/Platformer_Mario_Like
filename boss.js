class Boss extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, image){
        super(scene, x, y, image);
        
        this.attack = false;
        this.cooldown = 0;
        this.projectile = false;
        this.direction = 'left';
        this.timer = 0;
        this.toucher = false;
        
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
        if(this.cooldown > 0){
            this.cooldown--;
        }

        if(this.attack){
            this.attack = false;
        }


        if(Math.abs(player.body.x-this.body.x) <= 250 && this.cooldown == 0){
            this.attack = true;
            this.cooldown = 180;

        }
        return this.attack;

    }
} // FIN CLASSE