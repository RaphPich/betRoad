// Check touch input
var IS_TOUCH    = false;
var touch={"x":null,"y":null};

window.addEventListener('touchstart', function(e)
{
		IS_TOUCH = true;
        touch["x"]=e.touches[0].screenX - (window.innerWidth - config['width'])/2;
        touch["y"]=e.touches[0].screenY;
});
window.addEventListener('touchmove', function(e)
{
    touch["x"]=e.changedTouches[0].screenX- (window.innerWidth - config['width'])/2;
    touch["y"]=e.changedTouches[0].screenY;
});

window.addEventListener('pointerdown', event => {
    if(gamePhase=='start' && f1.y<=config['height']*f1Y){
        hideStart()
        gamePhase = 'play';
        cpt=0;
    }
});

window.addEventListener('resize', () => {
    canvas.style.height = window.innerHeight + 'px';
    canvas.style.width =  (canvas.width/canvas.height*window.innerHeight) + 'px';
});

onmousemove = function(e){
        var pos = e;
        touch['x'] = pos.x- (window.innerWidth - config['width'])/2;
        touch['y'] = pos.y;
}