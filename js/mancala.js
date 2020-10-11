var canvas = document.querySelector('canvas')
var c = canvas.getContext('2d');
var w = 1350;
var h = 600;
var center = w/2 - 150;
var center2 = 150;
var rad = 50;
var kolom = 3;
var baris = 3;
var e = 0;
var q = 0;
var z = 0;
var index = 0;
var heu = 0;
var mhtn = 0;
var blok = 0;
var turn = true;
// var gambar = new Image();
// gambar.src="hamilton.png";
// var gmbr = new Image();
// gmbr.src="cow.png";
// var musik = new Audio;
// musik.play("cat mario1.mp3");
var p;
var player_name;
alert ('Apakah ingin bermain Mancala?');
tanya = true;
while (tanya){
	player_name = prompt('Input Username kamu');
	tanya = false;
}

function Komentar(){
	this.x = 115;
	this.y = 250;

	this.show = function(){
		c.beginPath();
		c.rect(this.x,this.y,500,100);
		c.fillStyle = "aquamarine";
		c.fill();
		c.font = "20px Comic Sans MS";
		c.fillStyle = "black";
		c.fillText(p,this.x+50,this.y+(100/2)+5);
		c.closePath();
	}

	this.update = function(){
		if (turn) {
			p = 'Player '+player_name+' Sedang Bermain!';
		} else {
			p = 'Player AI Sedang Bermain!';
		}
	}
}

var koments = new Komentar();

var mouse = {
	x: undefined,
	y: undefined
};

window.addEventListener('mousemove', function(event){
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

// function cariHeur(){
// 	for (var i = 8; i < 14; i++) {
		
// 	}
// }

function Lumbung(x,y,index){
	this.x = x;
	this.y = y;
	this.index = index;
	this.bean = 4;
	if(this.index == 1 || this.index == 8){
		this.bean = 0;
	}
	this.margin = 10;
	if(index%7 == 1){
		this.leng = 400;
		this.margin = 190;
	}else{
		this.leng = 100;
	}
	

	this.show = function() {
		if(this.index<8){
			c.beginPath();
			c.beginPath();
			c.moveTo(this.x,this.y);
			c.lineTo(this.x,this.y+this.leng);
			c.arcTo(this.x,this.y+this.leng+(rad/2),this.x+(rad/2),this.y+this.leng+(rad/2),rad/2)
			c.arcTo(this.x+(rad),this.y+this.leng+(rad/2),this.x + rad,this.y+this.leng,rad/2);
			c.lineTo(this.x+rad,this.y);
			c.arcTo(this.x + (rad),this.y-(rad/2),this.x + (rad/2),this.y-(rad/2),rad/2);
			c.arcTo(this.x,this.y-(rad/2),this.x,this.y,rad/2);
			c.fillStyle = "aqua";
			c.fill();
			c.strokeStyle = 'blue';
			c.lineWidth = 5;
			c.stroke();
		}else{
			c.beginPath();
			c.moveTo(this.x,this.y);
			c.lineTo(this.x,this.y+this.leng);
			c.arcTo(this.x,this.y+this.leng+(rad/2),this.x+(rad/2),this.y+this.leng+(rad/2),rad/2)
			c.arcTo(this.x+(rad),this.y+this.leng+(rad/2),this.x + rad,this.y+this.leng,rad/2);
			c.lineTo(this.x+rad,this.y);
			c.arcTo(this.x + (rad),this.y-(rad/2),this.x + (rad/2),this.y-(rad/2),rad/2);
			c.arcTo(this.x,this.y-(rad/2),this.x,this.y,rad/2);
			c.fillStyle = "lightsalmon";
			c.fill();
			c.strokeStyle = 'red';
			c.lineWidth = 5;
			c.stroke();
		}
		c.closePath();
		c.font = "30px Comic Sans MS";
		c.fillStyle = "black";
		c.fillText(this.bean,this.x+(rad/2)-10,this.y+(rad/2)+this.margin);
		c.closePath();
	}

	this.update = function(){
		this.bean += 1;
	}
}

function turnPlayer(){
	if(turn){
		turn = false;
	}else{
		turn = true;
	}
}

function tembakDerr(value){
	var k = 14-value;
	// if(lumbungs[value].bean == 1) {

	if(k<7){
		if(k!=0 && value > 7){
			lumbungs[7].bean += lumbungs[k].bean+1;
			lumbungs[value].bean = 0;
			lumbungs[k].bean = 0;
		}
	} else {
		if(k!=7 && value < 7){
			console.log(k);
			lumbungs[0].bean += lumbungs[k].bean+1;
			lumbungs[value].bean = 0;
			lumbungs[k].bean = 0;
		}
	}
}

// var clones = [];
// var hn;
// function mikirAI(){
// 	for (var i = 8; i <14; i++) {
// 		var geser = clones[i].bean;
// 		for(var j=1; j<=geser; j++){
// 			// if((i-j%14)%14==0){
// 			// 	geser += 1;
// 			// }
// 			if(clones[i-j] = clones[7]) {
// 				hn += 1;
// 			} else {
// 				hn += 0;
// 			}
// 			// if(j=geser%14){
// 			// 	if(clones[14-j].bean!=0){
// 			// 		hn+=clones[14-j].bean+1;
// 			// 	}
// 			// }
// 		}
// 	// mikirs[i-8] = hn;
// 	}
// }

var CompAI;
var fn = [];
var hn;
function thisLumbung(n){
	var u,y;
	for (var i = 0; i < lumbungs.length-7; i++) {
		if(mouse.x>lumbungs[i].x && mouse.x < lumbungs[i].x+rad &&mouse.y>lumbungs[i].y&&mouse.y<lumbungs[i].y+lumbungs[i].leng){
			u=i;
		}
	}

	var geser = lumbungs[u].bean;
	if(u<7&&turn){
		lumbungs[u].bean = 0;	
		for(var i = 1; i<=geser; i++){
			if(u-i!=7){
				lumbungs[u-i].update();
			}
			if(u-i==0){
				u=14+i;
			}
			if(u-i==7){
				geser += 1;
			}
		}
		
	} else if(u<7&&!turn){
		alert('Sabar '+p+', sekarang giliran Komputer Boss');
	}

		if(lumbungs[(u-geser)%14].bean==1 && ((u-geser)%14)!=0 && ((u-geser)%14)<7){ //|| (lumbungs[u-geser].bean==1 && (u-geser!=7)){
			if(lumbungs[14-(u-geser)].bean>0){
				tembakDerr(u-geser);	
			}
		}
	if((u-geser)%14==0){
		return n;
	}else{
		turnPlayer();
		setTimeout(function(){
			Komputer();	
		}, 5000);
	}
}

function Komputer(){
	if(!turn){
		var xyz = 0;
		var gun = 0;
		var pistol = 0;
		var bazooka = false;
		var z = 0;
		var maxTH = 0;
		for (var h = 8; h <= 13; h++){
			y = 0;
			var gn = 0;
			var geser1 = lumbungs[h].bean;
			if(geser1==0){
				y=0;
			}else{
				for(var i = 1; i<=geser1; i++){
					if(h-i == 7) {
						y += 1;
					} 
				}
				gun = h-geser1;
				if(h-geser1 <= 0){
					gun = 14+h-geser1-1;
				}
				if(gun>7){
					if(lumbungs[gun].bean==0){
						if(lumbungs[14-gun].bean!=0){
							bazooka = true;
							y += lumbungs[14-gun].bean+1;
							pistol = gun;
						}
					}
				}
				if(gun==7) {
					gn = 1;
					pistol = 1;
				}
			}
			hn = y;
			fn[z] = hn + gn;
			z = z + 1;
		}

		for (var x = 8; x<=13; x++){
			if(fn[x-8] > maxTH) {
				xyz = x;
				maxTH = fn[x-8];
			}
			CompAI = xyz;
		}

		if(maxTH==0){
			for (var x = 8; x<=13; x++){
				if(lumbungs[x].bean > maxTH) {
					xyz = x;
					maxTH = lumbungs[x].bean;
				}
				CompAI = xyz;
			}
		}
		
		var geser2 = lumbungs[CompAI].bean;
		for(var i = 1; i<=geser2; i++){
			lumbungs[CompAI].bean = 0;
			if(CompAI - i != 0) {
				lumbungs[CompAI - i].update();
			}
			if(CompAI-i==0){
				CompAI=14+i;
				geser2 += 1;
			}
		}

		if(bazooka){
			if(lumbungs[pistol].bean==1 && ((pistol)%14)!=7 && ((pistol)%14)>7){
				if(lumbungs[14-(pistol)].bean>0){
					tembakDerr(pistol);	
					bazooka = false;
				}
			}	
		}
		if(pistol==1){
			setTimeout(function(){
				Komputer();	
			}, 5000);
		}else{
			turnPlayer();	
		}
	}
}

window.addEventListener('click', function(event){
	thisLumbung();
});



var lumbungs = [];
for (var i = 0; i < 14; i++) {
	if(i<7){
		e = i*90 + 25;
		q = 100;
	}else if(i==7){
		e = 655;
		q = 100;
	}else{
		e = 1285 - (i*90);
		q = 400;
	}
	z = i+1;
	lumbungs.push(new Lumbung(e,q,z));
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0,0,1350,600);

	for (var i = 0; i <= lumbungs.length -1; i++) {
		lumbungs[i].show();
		// jumlahs[i].show();
		// lumbungs[i].update();
	}
	koments.show();
	koments.update();
}
animate();