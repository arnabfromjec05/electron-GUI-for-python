var path = require('path');
const ipc = require('electron').ipcRenderer;

var sys = require('sys');
var exec = require('child_process').exec;
var child;

function jsonForSettingsUse(evt) {
    
  if(evt.srcElement.id == "json"){

    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
    myConsole.log('\x1b[34m%s\x1b[0m','THIS IS HOW TO READ A FILE IN JS');
    myConsole.log('\x1b[34m%s\x1b[0m','RIGHT NOW I AM IN jsExample.js');

    ipc.send('openJsonFile');

  }

}

function launchPython(evt) {

  
  if (evt.srcElement.id == "htmlButtonPress") {

    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
    myConsole.log('\x1b[34m%s\x1b[0m','PRINT BEFORE PYTHON EXEC FROM NODE.JS');

    // EXECUTION OF PYTHON

    child = exec("python -i pythonExample.py ", function (error, stdout, stderr) {
      // sys.print('stdout: ' + stdout); 
      // sys.print('stderr: ' + stderr); 
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });

    //this is a listener for peers output
    child.stdout.on('data', function(data) {
      var nodeConsole = require('console');
      var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
      myConsole.log('\x1b[36m%s\x1b[0m', 'PIPED FROM PYTHON PROGRAM: ' + data.toString()); 

      document.getElementById("output").innerHTML=data.toString();

    });


  }else if(evt.srcElement.id == "interact"){

    var nodeConsole = require('console');
    var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
    myConsole.log('\x1b[34m%s\x1b[0m','INTERACTION IN JS');

    x=document.getElementById("input").value;

    child.stdin.write(x+"\n");
    //this is a listener for peers output
    if(x=="hello")
      myConsole.log('\x1b[36m%s\x1b[0m','PIPED FROM PYTHON PROGRAM: ' + data.toString()); 
    else if(x=="exit")
      {
        myConsole.log('\x1b[36m%s\x1b[0m','PIPED FROM PYTHON PROGRAM: ' + data.toString()); 
        child.stdin.end();
      
        var nodeConsole = require('console');
        var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
        myConsole.log('python terminated from js too');
      }
  }
  // else{

  //   var nodeConsole = require('console');
  //   var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
  //   myConsole.log('\x1b[34m%s\x1b[0m','EXIT IN JS');

  //   child.stdin.write("exit\n");
  //   //this is a listener for peers output
  //   myConsole.log('\x1b[36m%s\x1b[0m','PIPED FROM PYTHON PROGRAM: ' + data.toString()); 

  //   child.stdin.end();
    
  //   var nodeConsole = require('console');
  //   var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
  //   myConsole.log('python terminated from js too');
  // }

}

document.addEventListener('DOMContentLoaded', function() {

  document.getElementById("htmlButtonPress").addEventListener("click", launchPython);
  document.getElementById("interact").addEventListener("click", launchPython);
  document.getElementById("exit").addEventListener("click", launchPython);

  document.getElementById("json").addEventListener("click", jsonForSettingsUse);

})

