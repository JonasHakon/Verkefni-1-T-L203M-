// Silgreinum canvasin okkar
var canvas;
// Skilgreinum contextið okkar
var gl;

// Teljum fjölda stiga
var stig = 0;

// Setjum hámarksfjölda punkta
var maxNumPoints = 600;  
// Teljum núverandi fjölda punkta
var index = 0;
// Skilgreinum þríhyrningin okkar
var þrihyrningur
// Skilgreinum breytur þríhyrningsins
þrihyrningur = {
  x:0.0,
  y:0.0,
  stefna:0,
  y_hradi:0.0,
  haed:0.08,
  breydd:0.05
}

// Skilgreinum gullið
var gull;

// Skilgreinum breytur gullsins
gull = {
  x:Math.random() * 2 - 1,
  y:Math.random() - 1,
  staerd:0.03
}

// Skilgreinum odda
var oddar;

// Skilgreinum bretur Oddana
oddar = {
  x:[-0.5, 0.5]
}

window.onload = function init() {

    // Náum í canvas
    canvas = document.getElementById( "gl-canvas" );
    
    // Tengjum contextið við canvasinn
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    // skilgreinum viewprotið okkar 
    gl.viewport( 0, 0, canvas.width, canvas.height ); 
    // Skilgreinum clear gildi fyrir bufferana okkar
    gl.clearColor( 0.0, 0.0, .0, 1.0 );

   // Skilrgeinum program breytuna okkar
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    // Tengjum program breytuna okkar
    gl.useProgram( program );
    
    // Skilgreinum og tengjum bufferinn okkar
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8*maxNumPoints, gl.STATIC_DRAW);

    // Náum í vPosition til þess að nota í HTML skránni 
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    render();

    

}


// Skilgreinum takka
keyDown = function(e){
  var key = e.which;
  switch(key) {
      case 39:
        if (þrihyrningur.stefna == 0 && þrihyrningur.y == -1.0) {þrihyrningur.stefna = 1};
        break;
      case 37:
        if (þrihyrningur.stefna == 0 && þrihyrningur.y == -1.0) {þrihyrningur.stefna = -1};
        break;
      case 38:
        if (þrihyrningur.y == -1.0) {
          þrihyrningur.y_hradi = 7;
        }
        break;

  }
}
keyUp = function(e){
  var key = e.which;
  switch(key) {
      case 39:
        if (þrihyrningur.y == -1.0){
          þrihyrningur.stefna = 0;
        }
       
      case 37:
        if (þrihyrningur.y == -1.0){
          þrihyrningur.stefna = 0;
        }
  }
}


// Bætum tökkunum inn sem event listiners
window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);



// Skilgreinum render fallið
function render() {
  // Smá psudo physics
  þrihyrningur.x += 0.01*þrihyrningur.stefna;
  þrihyrningur.y += þrihyrningur.y_hradi*0.01;
  if (þrihyrningur.y <= -1) {
    þrihyrningur.y_hradi = 0;
    þrihyrningur.y = -1;
  }
  þrihyrningur.y_hradi -= 0.2;
  if (þrihyrningur.x < -1) {þrihyrningur.x = 1}
  if (þrihyrningur.x > 1) {þrihyrningur.x = -1}

  // Nemur snertingu á milli þríhyrnings og gulls
  if (þrihyrningur.x < gull.x + 0.5*þrihyrningur.breydd + gull.staerd && þrihyrningur.x > gull.x - 0.5*þrihyrningur.breydd  - gull.staerd  &&
    þrihyrningur.y < gull.y + 0.5*þrihyrningur.haed  + gull.staerd  && þrihyrningur.y > gull.y - 0.5*þrihyrningur.haed - gull.staerd ) {
    stig++;
    gull.x = Math.random() * 2 - 1;
    gull.y = Math.random() - 1;
  }

// Nemur snertingu á milli Þríhyrningsins og gullsins
if ((þrihyrningur.x < - 0.455 && þrihyrningur.x >  -0.545) || (þrihyrningur.x >  0.455 && þrihyrningur.x <  0.545 )) {
  if(þrihyrningur.y < -0.97) {
    alert("Leik lokið, þú tapar");
    stig = 0;
    þrihyrningur.x = 0;
    þrihyrningur.y = 0;
    þrihyrningur.y_hradi = 0;
    þrihyrningur.stefna = 0;
  }
}







  // Teljari fyrir fjölda punkta
  index = 0;

  gl.clear( gl.COLOR_BUFFER_BIT );

  // Stig
  for (let i = 1; i <= stig; i++) {
    var s1 = vec2(0.9 - 0.04*i, 0.9);
    var s2 = vec2(0.88 - 0.04*i, 0.9);
    var s3 = vec2(0.9 - 0.04*i, 0.7);
    var s4 = vec2(0.88 - 0.04*i, 0.9);
    var s5 = vec2(0.9 - 0.04*i, 0.7);
    var s6 = vec2(0.88 - 0.04*i, 0.7);

    gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(s1));
    gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(s2));
    gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(s3));
    gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(s4));
    gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(s5));
    gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(s6));
  }

  // Oddar (Hindrun)
    for (let i = 0; i < 3; i++) {
      var x = oddar.x[i];
      var o1 = vec2(x - 0.045, -1.0);
      var o2 = vec2(x - 0.015, -1.0);
      var o3 = vec2(x - 0.03, -0.97);
      var o4 = vec2(x - 0.015, -1.0);
      var o5 = vec2(x + 0.015, -1.0);
      var o6 = vec2(x + 0.00, -0.97);
      var o7 = vec2(x + 0.015, -1.0);
      var o8 = vec2(x + 0.045, -1.0);
      var o9 = vec2(x + 0.03, -0.97);
      
      gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(o1));
      gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(o2));
      gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(o3));
      gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(o4));
      gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(o5));
      gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(o6));
      gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(o7));
      gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(o8));
      gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(o9));


    }
    

    
  

  // Leikmaður
  var t1 = vec2(þrihyrningur.x, þrihyrningur.y + þrihyrningur.haed);
  var t2 = vec2(þrihyrningur.x - 0.5 * þrihyrningur.breydd,þrihyrningur.y);
  var t3 = vec2(þrihyrningur.x + 0.5 * þrihyrningur.breydd, þrihyrningur.y);

  gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(t1));
  gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(t2));
  gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(t3));


  // Gull
  var g1 = vec2(gull.x - gull.staerd * 0.5, gull.y);
  var g2 = vec2(gull.x, gull.y + gull.staerd );
  var g3 = vec2(gull.x, gull.y - gull.staerd );
  var g4 = vec2(gull.x + gull.staerd * 0.5, gull.y);

  gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(g1));
  gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(g2));
  gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(g3));
  gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(g2));
  gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(g3));
  gl.bufferSubData(gl.ARRAY_BUFFER, 8*index++, flatten(g4));


  // Teiknum alla þríhyrninga
  gl.drawArrays( gl.TRIANGLES, 0, index )

  // Gáum hvort leik sé lokið
  if (stig >= 10) {
    alert("Leik lokið, þú sigrar :)");
    stig = 0;
    þrihyrningur.x = 0;
    þrihyrningur.y = 0;
    þrihyrningur.y_hradi = 0;
    þrihyrningur.stefna = 0;
    
  }
    // loopum þetta fall
    window.requestAnimFrame(render);

}



