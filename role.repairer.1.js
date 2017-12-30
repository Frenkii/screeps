/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repairer');
 * mod.thing == 'a thing'; // true
 */
var roleUpgrader = require('role.upgrader');

var roleRepairer = {
    
     run: function(creep) { 
    	    if(creep.carry.energy == creep.carryCapacity) {

                var damagedPrimary = creep.room.find(FIND_STRUCTURES, {

                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_STORAGE) && structure.hits < structure.hitsMax;
                    }
                });

                if (damagedPrimary != undefined) {
                    creep.say('to Container');
                    if(creep.repair(damagedPrimary[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(damagedPrimary[0], {maxRooms: 1, visualizePathStyle: {stroke: '#ffffff'}});

                    }
                } else {

                        var targets = creep.room.find(FIND_STRUCTURES, {

                            filter: (structure) => {
                                return (structure.structureType == STRUCTURE_ROAD) && structure.hits < structure.hitsMax;
                            }
                        });

                        if(targets.length > 0) {

                        creep.say('repair road');

                            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {

                                creep.moveTo(targets[0], {maxRooms: 1, visualizePathStyle: {stroke: '#ffffff'}});
                            //creep.say('repairing');
                            }
                        }

                    }
                } else  {  

                var source = creep.pos.findClosestByPath(FIND_SOURCES);

                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {maxRooms: 1, visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
};

module.exports = roleRepairer;