var roleDistanceHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep) {

        if((creep.memory.working) && creep.carry.energy == 0) {
			creep.memory.working = false;
            creep.say('🔄 harvest');
	    }
	    if(!(creep.memory.working) && creep.carry.energy == creep.carryCapacity) {
			creep.memory.working = true;
	        creep.say('🚧 working');
		}

        if(creep.memory.working) {

            //if creep is in home room, find storages and transfer energy into them
            if(creep.room.name == creep.memory.home){
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return ((structure.structureType == STRUCTURE_SPAWN && structure.energy < structure.energyCapacity) ||
                                    (structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] < structure.storeCapacity));
                        }
                });
                
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            } else {

                //find exit to target room, if in home room
                var exit = creep.room.findExitTo(creep.memory.home);
                creep.moveTo(creep.pos.findClosestByPath(exit));
            }
        } else {

            //if creep is empty and in target Room --> harvest
            if(creep.room.name == creep.memory.targetRoom) {

                var source = creep.pos.findClosestByPath(FIND_SOURCES);

                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {

                //when in home Room, find Exit to Target room.
                var exit = creep.room.findExitTo(creep.memory.targetRoom);
                creep.moveTo(creep.pos.findClosestByPath(exit));
            }
        }
	    
	}
};

module.exports = roleDistanceHarvester;