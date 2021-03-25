function preload()
{
    this.load.spritesheet('cars', 'res/cars.png', { frameWidth: 100, frameHeight: 100 });
    for(let k=0;k<10;k++)
        this.load.image(`${k}`,`res/digits/${k}.png`);
   	for(let k=0;k<5;k++)
   		this.load.image(`car${k}`,`res/cars/${k}.png`);
    for(let k=1;k<8;k++)
        this.load.image(`fire${k}`,`res/fire_column_medium/fire_column_medium_${k}.png`);
    this.load.image('f1','res/F1.png');
    this.load.image('ground','res/ground.png');
    this.load.image('hand','res/menuStart/hand.png');
    this.load.image('slide','res/menuStart/slide.png');
    
    this.load.image('home','res/menuEnd/home.png');
    this.load.image('start','res/menuEnd/start.png');
    this.load.image('top','res/menuEnd/top.png');
    this.load.image('score','res/menuEnd/score.png');
    this.load.image('betshot','res/menuEnd/betshot.png');
    this.load.image('f1_crash','res/f1_crash.png');
    this.load.image('logo','res/menuStart/logo_betroad.png');
    this.load.image('jaigagne','res/menuEnd/jaigagne.png');
}