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
        
        if((creep.memory.working) && creep.carry.energy == 0) {
			creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!(creep.memory.working) && creep.carry.energy == creep.carryCapacity) {
			creep.memory.working = true;
	        creep.say('🚧 repair');
		}
        
        //when creep has full energy
		if(creep.memory.working) {

            //find storages and containers fist and repair them
            var damagedStorages = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE) && structure.hits < structure.hitsMax;
                }
            });

            if (damagedStorages.length > 0) {

                if(creep.repair(damagedStorages[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(damagedStorages[0], {maxRooms: 1, visualizePathStyle: {stroke: '#ffffff'}});
                }

            } else {

                //when all storages have full hits, repair the roads
                var targets = creep.room.find(FIND_STRUCTURES, {

                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_ROAD) && structure.hits < structure.hitsMax;
                    }
                });

                if(targets.length > 0) {

                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {

                        creep.moveTo(targets[0], {maxRooms: 1, visualizePathStyle: {stroke: '#ffffff'}});

                    }
                }

            }
        } else {

            //if creep is not working --> harvest energy
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {maxRooms: 1, visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }

    }
};

module.exports = roleRepairer;