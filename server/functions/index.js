
const getFilters = (filters, regex) => {

    let and = []

    for (const key in filters) {

        const or = filters[key].map(value => {
            obj = {};

            if(regex) obj[key.toLowerCase()] = new RegExp(value, "i");
            else obj[key.toLowerCase()] = value.toLowerCase();

            return obj;
        });

        if(or !== undefined){
            and.push(
                {
                    $or: or
                }
            )
        } 
    }

    if(and.length > 0){
        return {
            $and: and 
        }
    }

    return {}
}

module.exports = {getFilters}
