var roleLongDistanceHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == creep.carryCapacity) {
            if(creep.room.name == creep.memory.home){
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity;
                        }
                });
                if(targets != undefined) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.say('go to home room');
                creep.moveTo(creep.pos.findClosestByPath(exit));
            }
        } else {
            if(creep.room.name == creep.memory.targetRoom) {

                var source = creep.pos.findClosestByPath(FIND_SOURCES);

                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                var exit = creep.room.findExitTo(creep.memory.targetRoom);
                creep.moveTo(creep.pos.findClosestByPath(exit));
            }
        }
	    
	}
};

module.exports = roleLongDistanceHarvester;