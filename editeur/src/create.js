function create()
{

    canvas = game.canvas;

    ground = this.add.tileSprite(config['width']*.5, config['height']*.5,0,0, 'ground');
    globalScale = config["height"]/ground.height;
    ground.setScale(config["height"]/ground.height*groundScale);

    logo = this.add.tileSprite(config['width']*.5, config['height']*.25,0,0,'logo');
    logo.setScale(globalScale/2);

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
    
    fire = this.add.sprite(f1.x, f1.y+f1.height*f1Scale*globalScale*.8, 'fire1').play('fire').setAngle(-180).setScale(1.375*globalScale);
    f1Crash = this.add.sprite(f1.x,f1.y,'f1_crash').setScale(f1Scale*globalScale);

    //Menu End and Start
    scoreGroup = this.physics.add.staticGroup();

    topScoreSprite     = this.add.tileSprite(config['width']*.5,config['height']*.3,0,0,'top').setScale(.1875*globalScale);
    scoreEndSprite   = this.add.tileSprite(config['width']*.5,config['height']*.15,0,0,'score').setScale(.1875*globalScale);
    home    = this.add.tileSprite(config['width']*.5,config['height']*.65,0,0,'home').setScale(.125*globalScale);
    start   = this.add.tileSprite(config['width']/2-ground.width*.25*globalScale,config['height']*.5,0,0,'start').setScale(.1875*globalScale);
    betshot = this.add.tileSprite(config['width']/2+ground.width*.25*globalScale,config['height']*.5,0,0,'betshot').setScale(.1875*globalScale);
    retry = this.add.tileSprite(config['width']/2-ground.width*.25*globalScale,config['height']*.5,0,0,'retry').setScale(.1875*globalScale);

    hand = this.add.tileSprite(config['width']*.5,config['height']*.6,0,0,'hand').setScale(.1875*globalScale);
    slideLeft   = this.add.tileSprite(config['width']/2-ground.width*.25*globalScale,config['height']*.45,0,0,'slide').setScale(.125*globalScale);
    slideRight = this.add.tileSprite(config['width']/2+ground.width*.25*globalScale,config['height']*.45,0,0,'slide').setScale(.125*globalScale);

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

    //Show start menu when touch start button
    start.setInteractive().on('pointerdown',function(){
        f1.setX(config["width"]*.5);
        logo.alpha = 0;
        hideEnd();
        showStart();
        gamePhase = 'start';
        scoreGroup.clear(true);
        cpt=0;
        ground.clearTint();
        f1Crash.clearTint();
        fire.alpha = 1;
        fire.clearTint();
        groundSpeed = 25;
        carSpeedX = 250;
        carSpeedY = 5;
    });

    retry.setInteractive().on('pointerdown',function(){
        f1.setX(config["width"]*.5)
        hideEnd();
        showStart();
        gamePhase = 'start';
        scoreGroup.clear(true);
        cpt=0;
        ground.clearTint();
        f1Crash.clearTint();
        fire.alpha = 1;
        fire.clearTint();
        groundSpeed = 25;
        carSpeedX = 250;
        carSpeedY = 5;
    });

    betshot.setInteractive().on('pointerdown',function(){
        window.location.replace("https://www.betshot.fr");
        sleep(1000);//Prevent to continue  
    });

    //Case user click on home button
    home.setInteractive().on('pointerdown',function(){
        hideStart();
        hideEnd();
        fire.alpha = 0;
        scoreGroup.clear(true);
        logo.alpha = 1
        gamePhase="death";
        start.alpha = 1;
        betshot.alpha = 1;
        ground.setTint(tintTop,tintTop,tintBottom,tintBottom);
    });

    hideEnd();

    //Home menu first view
    hideStart();
    gamePhase="death";
    start.alpha = 1;
    betshot.alpha = 1;
    ground.setTint(tintTop,tintTop,tintBottom,tintBottom);
}

function hideStart(){
    hand.alpha = 0;
    slideLeft.alpha = 0;
    slideRight.alpha = 0;
}
function showStart(){
    fire.setAngle(-180);
    f1.alpha = 1;
    hand.alpha = 1;
    slideLeft.alpha = 1;
    slideRight.alpha = 1;
}
function hideEnd(){
    scoreEndSprite.alpha = 0;
    f1Crash.alpha = 0;
    home.alpha = 0;
    retry.alpha = 0;
    start.alpha = 0;
    betshot.alpha = 0;
    topScoreSprite.alpha = 0;
}
function showEnd(){
    f1.alpha = 0;
    scoreEndSprite.alpha = 1;
    home.alpha = 1;
    retry.alpha = 1;
    betshot.alpha = 1;
    topScoreSprite.alpha = 1;
    f1Crash.alpha = 1;
}
