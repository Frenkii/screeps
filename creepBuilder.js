





if(harvesters.length < harvesterLimit) {
    var newName = 'Harvester' + Game.time;
    console.log('Spawning new harvester: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
        {memory: {role: 'harvester', working: false, target: null}});

} else if(upgraders.length < upgraderLimit) {
    var newName = 'Upgrader' + Game.time;
    console.log('Spawning new upgrader: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
        {memory: {role: 'upgrader', upgrading: false, working: false, target: null}});

} else if(repairers.length < repairerLimit) {
    var newName = 'Repairer' + Game.time;
    console.log('Spawning new repairer: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
        {memory: {role: 'repairer', working: false, target: null}});

} else if(builders.length < builderLimit) {
    var newName = 'Builder' + Game.time;
    console.log('Spawning new builder: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName, 
        {memory: {role: 'builder', building: false, working: false, target: null}});

} else if(longDistanceHarvesters.length < longDistanceHarvesterLimit) {
    var newName = 'LongDistanceHarvester' + Game.time;
    console.log('Spawning new LDH: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
        {memory: {role: 'longDistanceHarvester', working: false, home: HOME, targetRoom: 'W7N3', target: null}})
} else {
    console.log('All Limits reached');
}