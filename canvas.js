//cartpole 3 hour challenge
const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Cart {
    constructor(){
        this.x = canvas.width/2
        this.cartvel = 0
        this.y = 8*canvas.height/9
        this.size = 300
        this.poleLength = this.size*10/8
        this.polex = this.x
        this.poley = (this.y-this.size*0.2)-this.poleLength
        this.angle = -Math.PI/2 + Math.random()*0.001 - 0.001 // the angle reletive to x axis
        this.acc = 0
        this.vel = 0 // velocity in the direction at pi/2 to the end of the pole
        this.grav = 0.001
        this.damping = 0.99
    }

    update(){
        this.cartvel*=this.damping
        this.x += this.cartvel

        //this.vel = this.gravity/Math.sin(Math.PI/2 + this.angle)
        this.acc = this.grav*Math.sin(Math.PI/2-this.angle)

        this.vel += this.acc
        this.angle += this.vel + 2*this.grav*this.cartvel/Math.cos(Math.PI/2-this.angle) // second term is from car velocity, with this.grav to scale the effect
        this.polex = this.poleLength*Math.cos(this.angle) + this.x
        this.poley = this.poleLength*Math.sin(this.angle) + (this.y-this.size*0.2)

        if(!(-Math.PI <this.angle && this.angle< 0)){
            this.x = canvas.width/2
            this.y = 8*canvas.height/9
            this.polex = this.x
            this.poley = (this.y-this.size*0.2)-this.poleLength
            this.angle = -Math.PI/2 + Math.random()*0.002 - 0.001 // the angle reletive to x axis
            this.vel = 0 // velocity in the direction at pi/2 to the end of the pole
            this.cartvel = 0
        }
    }

    render(){
        c.beginPath();//pole

        c.moveTo(this.x, this.y-this.size*0.2);
        c.strokeStyle = "black";
        c.lineWidth = this.size/20;
        c.lineTo(this.polex, this.poley)
        c.stroke();
        c.closePath();

        c.beginPath(); //axle?
        c.arc(this.x, this.y-this.size*0.2, this.size/20, 0, Math.PI * 2, false)
        c.fillStyle = "gray"
        c.strokeStyle = "gray"
        c.stroke();
        c.fill();
        c.closePath();

        c.beginPath(); //rect
        c.rect(this.x-this.size*0.8, this.y-this.size*0.2, this.size*1.6, this.size*0.2);
        c.fillStyle = "rgb(153, 102, 51)"
        c.fill();
        c.closePath();

        c.beginPath(); //wheel1
        c.arc(this.x-this.size/2, this.y, this.size/10, 0, Math.PI * 2, false)
        c.fillStyle = "black"
        c.strokeStyle = "black"
        c.stroke();
        c.fill();
        c.closePath();

        c.beginPath(); //wheel2
        c.arc(this.x+this.size/2, this.y, this.size/10, 0, Math.PI * 2, false)
        c.fillStyle = "black"
        c.strokeStyle = "black"
        c.stroke();
        c.fill();
        c.closePath();

        const rotation = this.x*(2*Math.PI/canvas.width)
        for(let i=0 + rotation; i<2*Math.PI + rotation; i+= Math.PI/2){ // bolts on wheel

            const cix = this.x-this.size/2
            const r = this.size/13

            c.beginPath(); //wheel1
            c.arc(cix+r*Math.cos(i), this.y-r*Math.sin(i), this.size/50, 0, Math.PI * 2, false)
            c.fillStyle = "rgb(152, 152, 152)"
            c.strokeStyle = "rgb(119,119,119)"
            c.fill();
            c.lineWidth = this.size/100
            c.stroke();
            c.closePath();

        }
        for(let i=0 + rotation; i<2*Math.PI + rotation; i+= Math.PI/2){ // bolts on wheel

            const cix = this.x+this.size/2
            const r = this.size/13

            c.beginPath(); //wheel1
            c.arc(cix+r*Math.cos(i), this.y-r*Math.sin(i), this.size/50, 0, Math.PI * 2, false)
            c.fillStyle = "rgb(152, 152, 152)"
            c.strokeStyle = "rgb(119,119,119)"
            c.fill();
            c.lineWidth = this.size/100
            c.stroke();
            c.closePath();

        }
    }
}

c1 = new Cart()


let animationId // animation

function refresh() {
    animationId = window.requestAnimationFrame(refresh)
    c.fillStyle = "rgb(227, 251, 255)"
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = "green"
    c.fillRect(0, canvas.height-50, canvas.width, 50) // ground
    c1.update()

    const speed = 0.1; //movement
    if (keys.A == true) {
        c1.cartvel -= speed;
        c1.cartacc = -speed
    }
    if (keys.D == true) {
        c1.cartvel += speed;
        c1.cartacc = speed
    }

    c1.render();
}

var keys = {} //the dict here is needed for multiple keypress
window.addEventListener("keydown", (key) => { //on keypress/movement

    if (key.code == "KeyA") {
        keys.A = true;
    }
    if (key.code == "KeyD") {
        keys.D = true;
    }
})

window.addEventListener("keyup", (key) => { //check keyup, false values

    if (key.code == "KeyA") {
        keys.A = false;
    }
    if (key.code == "KeyD") {
        keys.D = false;
    }
})

refresh();
