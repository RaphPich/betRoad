function update()
{
    cpt+=1;
    switch(gamePhase){

        case 'start':
            ground.tilePositionY-=groundSpeed*globalScale;
            if(f1.y>config['height']*f1Y)
                f1.setY(config['height']*.8+Math.pow((cpt/5-20),2));
            hand.x = config['width']*.5+Math.sin(cpt/10)*50;
            fire.setX(f1.x);
            fire.setY(f1.y+f1.height*f1Scale*globalScale*.7);
            break;

        case 'play':
            
            //Increasing speed
            if(croisiere){
                carSpeedX+=1/40;
                carSpeedY+=1/500;
                if(score<200)
                    groundSpeed+=1/100;
            }
            ground.tilePositionY-=groundSpeed*globalScale;

            if(touch["x"]<rightStop-f1.width*f1Scale*globalScale*.5*.25 && touch["x"]>leftStop+f1.width*f1Scale*globalScale*.5*.25)
                f1.setX(touch['x']);

            fire.setX(f1.x);
            fire.setY(f1.y+f1.height*f1Scale*globalScale*.7);

            score = Math.round(cpt/5);
            scoreGroup.clear(true);

            //Car appear handler, creation and checking if there is a need for a new car
            if((cpt%carAppear==0 && cars.getLength()<nbCars && !croisiere)||(cars.getLength()<(nbCars) && croisiere)){

                let direction = getRandomInt(3)>1 ? 1:-1;
                car = cars.create(leftStop+5+getRandomInt(ground.width*.6*scaleGround*groundScale),0,`car${getRandomInt(5)}`);
                car.name = 'car'+cars.getLength();
                car.scaleX = carScaleX*globalScale;
                car.scaleY = carScale*globalScale;
                car.setVelocityX(carSpeedX*direction*globalScale);

                car.setSize(650, 1100);
                car.setOffset(350, 100);
                car.setAngle(direction===1  ?-carRightAngle :-carLeftAngle);
            }
            if(cars.getLength()==nbCars)
                    croisiere = true

            //Score print
            for(let k=0;k<score.toString().length;k++)
                scoreGroup.create(config["width"]*.5+(k-score.toString().length*.5+.5)*widthEmpty*(1/3),config['height']*.1,score.toString().charAt(k)).setScale(scoreScale*globalScale*2/3);
            
            //Car wall collision and destroy not in view
            cars.getChildren().forEach( car=> { 
                if(car.x+car.width*carScaleX*globalScale*.5>rightStop+20)
                    car.setAngle(-carLeftAngle);
                else if(car.x-car.width*carScaleX*globalScale*.5<leftStop-20)
                    car.setAngle(-carRightAngle);
                if(car.y>config["height"]+2*car.height*carScale*globalScale){
                    cars.remove(car);
                    car.destroy();
                }
                car.setY(car.y+carSpeedY*globalScale);
            });

            break;
        
        //Clear all cars 
        case 'predeath':

            //Waiting for all cars to left
            if(cars.getLength()!=0){
                Phaser.Actions.IncY(cars.getChildren(),-carSpeedY*2*globalScale);

            }else{
                //End of predeath, starting death menu
                gamePhase='death';

                win.alpha = 1;
                f1.alpha = 0;
                scoreEndSprite.alpha = 1;
                f1Crash.alpha = 1;
                               
                ground.setTint(tintTop,tintTop,tintBottom,tintBottom);
                f1Crash.setTint(tintTop,tintTop,tintBottom,tintBottom);
                fire.setTint(tintTop,tintTop,tintBottom,tintBottom);
                f1.x = config["width"]*.5;

                scoreGroup.clear(true);
                for(let k=0;k<score.toString().length;k++)
                    scoreGroup.create(config["width"]*.5+(k-score.toString().length*.5+.5)*widthEmpty*(2/3),config['height']*.36,score.toString().charAt(k)).setScale(scoreScale*globalScale);
            }

            cars.getChildren().forEach( car=> { 
                if(car.x+car.width*carScaleX*globalScale*.5>rightStop+20)
                    car.setAngle(-carLeftAngle);
                if(car.x-car.width*carScaleX*globalScale*.5<leftStop-20)
                    car.setAngle(-carRightAngle);
                if(car.y>config["height"]+2*car.height*carScale*globalScale || car.y<0 ){
                    cars.remove(car);
                    car.destroy();
                }
            });
            cpt = 0;
            break;

        case 'death':
            break;
        default:
            gamePhase = 'start';
            break;
    }
}
