var roleHarvester = {
    
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

            var towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
        });
        if(towers.length > 0) {
            if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(towers[0], {maxRooms: 1, visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {maxRooms: 1, visualizePathStyle: {stroke: '#ffffff'}});
                }
            }   

        }

           
        } else {

            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {maxRooms: 1, visualizePathStyle: {stroke: '#ffaa00'}});
            }
            
        
            }          
        }
        
	
};

module.exports = roleHarvester;