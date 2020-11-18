let Message = require('./message.js');
let Command = require('./command.js');

class Rover {
  constructor(position) {
    this.position = Number(position);
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  receiveMessage(messageInput) {
    let messageName = messageInput.name;
    let commandsArray = messageInput.commands;
    let resultsArray = [];
    let trueResponse = {completed: true};
    let falseResponse = {completed: false};
    let roverStatus = {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position
            };

    for (let i = 0; i < commandsArray.length; i++) {

      if(commandsArray[i].commandType === 'MOVE') {

        if(this.mode === 'LOW_POWER') {
          resultsArray.push(falseResponse);
          this.mode = commandsArray[i].value;
          
        } else if (this.mode === 'NORMAL') {
          this.position = commandsArray[i].value;
          resultsArray.push(trueResponse);
        }

      } else if (commandsArray[i].commandType === 'STATUS_CHECK') {
        resultsArray.push(trueResponse);
        resultsArray.push(roverStatus);
                 
      } else if (commandsArray[i].commandType === 'MODE_CHANGE') {
        resultsArray.push(trueResponse);
        this.mode = commandsArray[i].value;
        roverStatus = {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position
            };
        resultsArray.push(roverStatus);

      }
    }
    return {
      message: messageName,
      results: resultsArray
    }


  }
}



module.exports = Rover;
