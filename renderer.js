function draw(id, x, y, angle, aux) {
    x = x*zoom;
    y = y*zoom;
    switch (id) {
        case "you":

            dbAngleToMouse = angleTo(0,0,mouseX, mouseY);
            ctx.strokeStyle = colors.towerHealthBarGreenFill;
            ctx.lineWidth = 5*zoom;
            ctx.beginPath();
            //ctx.moveTo(0,0);
            ctx.arc(0, 0, 16*aux.size*zoom, Math.PI*0.5, Math.PI*0.5+(2 * Math.PI)*(dotPlaceCooldown_ref-dotPlaceCooldown)/dotPlaceCooldown_ref);
            //ctx.lineTo(0,0);
            ctx.stroke();
            circleAt(0,0,12*aux.size*zoom);
            ctx.beginPath();
            ctx.strokeStyle = colors.black;
            ctx.moveTo(0, 0);
            ctx.lineTo(20* Math.cos(dbAngleToMouse)*zoom, 20* Math.sin(dbAngleToMouse)*zoom);
            ctx.stroke();
            break;
        case "bkgGrid":
            aux.tileSize = aux.tileSize * zoom;
            ctx.beginPath();
            ctx.lineWidth = 1*zoom;
            ctx.strokeStyle = colors.bkgGridlines;
            /* for (let i=1; i<=mapSize[0]; i++) { //WORKS, BUT KINDA INEFFICIENT
                ctx.moveTo(aux.tileSize*(-0.5*mapSize[0] + i)+x, aux.tileSize*0.5*mapSize[1]+y);
                ctx.lineTo(aux.tileSize*(-0.5*mapSize[0] + i)+x, -aux.tileSize*0.5*mapSize[1]+y);
            }
            for (let j=1; j<=mapSize[1]; j++) {
                ctx.moveTo(aux.tileSize*0.5*mapSize[1]+x, aux.tileSize*(-0.5*mapSize[1] + j)+y);
                ctx.lineTo(-aux.tileSize*0.5*mapSize[1]+x, aux.tileSize*(-0.5*mapSize[1] + j)+y);
            }
            ctx.stroke(); */

            for (let i=0; i<=0.5*(c.width/aux.tileSize)+1; i++) {
                ctx.moveTo(((i)*aux.tileSize)+x%aux.tileSize, 0.5*c.height);
                ctx.lineTo(((i)*aux.tileSize)+x%aux.tileSize, -0.5*c.height);
                ctx.moveTo(((-i)*aux.tileSize)+x%aux.tileSize, 0.5*c.height);
                ctx.lineTo(((-i)*aux.tileSize)+x%aux.tileSize, -0.5*c.height);
            }
            for (let i=0; i<=0.5*(c.height/aux.tileSize)+1; i++) {
                ctx.moveTo(0.5*c.height, ((i)*aux.tileSize)+y%aux.tileSize);
                ctx.lineTo(-0.5*c.height, ((i)*aux.tileSize)+y%aux.tileSize);
                ctx.moveTo(0.5*c.height, ((-i)*aux.tileSize)+y%aux.tileSize);
                ctx.lineTo(-0.5*c.height, ((-i)*aux.tileSize)+y%aux.tileSize);
            }
            ctx.stroke();

            //ctx.drawImage('lib/defly grid generic.svg', x-aux.tileSize*8, y-aux.tileSize*8);
            break;

        case "dot":
            /* ACCEPTABLE AUX ATTRIBUTES
             * size - size of the dot
             * 
            */
           aux.size = aux.size * zoom;
            ctx.beginPath();
            ctx.arc(x, y, aux.size, 0, 2 * Math.PI);
            ctx.fillStyle = colors.playerTeamFill;
            ctx.strokeStyle = colors.playerTeamBorder;
            ctx.lineWidth = 5*zoom;
            ctx.stroke();
            ctx.fill();
            break;
    }
}