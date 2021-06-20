class Boss extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, image){
        super(scene, x, y, image);
        
        this.attack = false;
        this.cooldown = 0;
        this.projectile = false;
        this.direction = 'left';
        this.timer = 0;
        this.toucher = false;
        
        this.anims.play('boss_marche', true);
        scene.add.existing(this);
        scene.boss.add(this);

    }
    
    
    ia(player){ 
                
        if(player.body.x < this.body.x){
            this.flipX = false;
            this.direction = 'left';
        }

        else if(player.body.x > this.body.x){
            this.flipX = true;
            this.direction = 'right';
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


        if(this.cooldown == 0){
            this.attack = true;
            this.cooldown = 60;
        }
        
        return this.attack;

    }
} // FIN CLASSE