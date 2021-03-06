var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleDistanceHarvester = require('role.distanceHarvester');

var HOME = 'W8N3';

var harvesterLimit = 4;
var builderLimit = 2;
var upgraderLimit = 3;
var repairerLimit = 3;
var distanceHarvesterLimit = 6;

module.exports.loop = function () {

    var tower = Game.getObjectById('500fd2342c196d3');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });

        /**
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        **/
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }


    /** Count all creeps based on role **/
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length + '/' + harvesterLimit);
    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builder: ' + builders.length + '/' + builderLimit);
    
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgrader: ' + upgraders.length + '/' + upgraderLimit);

    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log('Repairer: ' + repairers.length + '/' + repairerLimit);
    
    var distanceHarvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'distanceHarvester');
    console.log('Distance Harvesters: ' + distanceHarvesters.length + 'distanceHarvesterLimit');
   
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

    } else if(distanceHarvesters.length < distanceHarvesterLimit) {
        var newName = 'DistanceHarvester' + Game.time;
        console.log('Spawning new DH: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'distanceHarvester', working: false, home: HOME, targetRoom: 'W7N3', target: null}})
    } else {
        console.log('All Limits reached');
    }
    
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'distanceHarvester') {
            roleDistanceHarvester.run(creep);
        }
    } 
}