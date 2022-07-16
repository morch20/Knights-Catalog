
const getFilters = (filterNames, filters) =>{

    let and = []
    filters.forEach((filter, index) => {
        const or = filter?.split("-").map(value => {
                obj = {}
                obj[filterNames[index]] = value;
                return obj
            })

        if(or !== undefined){
            and.push(
                {
                    $or: or
                }
            )
        } 
        
    })

    if(and.length > 0){

        return {
            $and: and 
            }
    }

    return {}
}

module.exports = {getFilters}
