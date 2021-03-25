function create()
{

    ground = this.add.tileSprite(config['width']*.5, config['height']*.5,0,0, 'ground');
    globalScale = config["height"]/ground.height;
    ground.setScale(config["height"]/ground.height*groundScale);

    scaleGround= config["height"]/ground.height;

    //Left and right wall position
    leftStop = config["width"]*.5 - ground.width*0.35*scaleGround *groundScale;  
    rightStop = config["width"]*.5 + ground.width*0.35*scaleGround*groundScale;

    carDimension = this.add.tileSprite(0,0,0,0,'car1');
    carHeight = carDimension.height;
    carDimension.destroy();

    carAppear = Math.trunc((config['height']+2*carHeight*carScale*globalScale)/(nbCars*carSpeedY*globalScale));

    f1 = this.physics.add.sprite(config['width']*.5, config['height']*1.1,'f1').setScale(f1Scale*globalScale);
    f1.setSize(740,1250);
    f1.setOffset(100,135);

    cars = this.physics.add.group({allowGravity:false,bounceX:1,collideWorldBounds: true,allowRotation:true});
    this.anims.create({
        key: 'fire',
        frames: [
            { key: 'fire1' },{ key: 'fire2' },{ key: 'fire3' },
            { key: 'fire4' },{ key: 'fire5' },{ key: 'fire6' },{ key: 'fire7' }],
        frameRate: 15,
        repeat: -1
    });
    
    fire = this.add.sprite(f1.x, f1.y+f1.height*f1Scale*globalScale*.8, 'fire1').play('fire').setAngle(-180).setScale(2.75*globalScale);
    f1Crash = this.add.sprite(f1.x,f1.y,'f1_crash').setScale(f1Scale*globalScale);

    //Menu End and Start
    scoreGroup = this.physics.add.staticGroup();

    scoreEndSprite   = this.add.tileSprite(config['width']*.5,config["height"]*.26,0,0,'score').setScale(.375*globalScale);
    win = this.add.tileSprite(config['width']/2,config['height']*.6,0,0,'jaigagne').setScale(.375*globalScale);

    hand = this.add.tileSprite(config['width']*.5,config['height']*.6,0,0,'hand').setScale(.375*globalScale);
    slideLeft   = this.add.tileSprite(config['width']/2-ground.width*.25*globalScale,config['height']*.45,0,0,'slide').setScale(.25*globalScale);
    slideRight = this.add.tileSprite(config['width']/2+ground.width*.25*globalScale,config['height']*.45,0,0,'slide').setScale(.25*globalScale);

    this.physics.world.setBounds(leftStop,-3*f1Scale*globalScale*f1.height, rightStop-leftStop,config["height"]*2, true, true);
    
    //Colision, predeath handler
    this.physics.add.collider(f1,cars,function predeath(){ 
        gamePhase='predeath';

        f1.setVelocityX(0);
        f1.setVelocityY(0);

        f1Crash.setX(f1.x);
        f1Crash.setY(f1.y);

        f1Crash.alpha = 1;
        f1.alpha = 0;

        fire.setX(f1.x-f1.width*f1Scale*globalScale*.60);
        fire.setY(f1.y-f1.height*f1Scale*globalScale*.20);
        fire.setAngle(-80);
        f1.setX(config["width"]);
        f1.setY(config["height"]);

        cars.getChildren().forEach( car=> { 
            car.setVelocityX(car.angle===-carLeftAngle ? -carSpeedX*globalScale :  carSpeedX*globalScale);
        });
    });

    win.setInteractive().on('pointerdown',function(){window.location.replace("https://www.betshot.fr");});

    //Home menu first view
    win.alpha = 0;
    fire.setAngle(-180);
    f1.alpha = 1;
    hand.alpha = 1;
    slideLeft.alpha = 1;
    slideRight.alpha = 1;
    scoreEndSprite.alpha = 0;
}
