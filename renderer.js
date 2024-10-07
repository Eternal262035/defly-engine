function draw(id, x, y, angle, aux) {
    switch (id) {
        case "dot":
            /* ACCEPTABLE AUX ATTRIBUTES
             * size - size of the dot
             * 
            */
            ctx.beginPath();
            ctx.arc(x, y, aux.size, 0, 2 * Math.PI);
            ctx.fillStyle = colors.playerTeamFill;
            ctx.strokeStyle = colors.playerTeamBorder;
            ctx.lineWidth = 5;
            ctx.stroke();
            ctx.fill();
            break;
    }
}