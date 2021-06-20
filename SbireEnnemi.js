class SbireEnnemi extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, image){
        super(scene, x, y, image);
        
        
        this.attack = false;
        this.cooldown = 0;
        this.projectile = false;
        this.direction = 'left';
        this.timer = 0;
        this.toucher = false;
        
        this.anims.play('sbire_marche', true);
        scene.add.existing(this);
        scene.ennemi.add(this);


    }
    
    
    ia(player){
        
        
        if(this.body.velocity.x > 0){
            this.flipX = true;
        }

        else if(this.body.velocity.x < 0){
            this.flipX = false;
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

        if(!this.toucher){
            if (this.direction == "left"){
                this.timer++;
                this.body.setVelocityX(-100);
                if (this.timer >= 240){
                    this.direction = "right";
                }
            }

            else{
                this.timer--;
                this.body.setVelocityX(100);
                if (this.timer <= 0){
                    this.direction = "left";
                }
            }
        }
        
        return this.attack;
    }
} // FIN CLASSE