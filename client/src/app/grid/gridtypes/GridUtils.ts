export class GridUtils {
    public static getValue(obj : any, path : string, def : any = undefined){
        const stringToPath = (path : any) => {
            // If the path isn't a string, return it
            if (typeof path !== 'string') return path;
    
            // Create new array
            const output : any = [];
    
            // Split to an array with dot notation
            path.split('.').forEach((item) => {
    
                // Split to an array with bracket notation
                item.split(/\[([^}]+)\]/g).forEach((key) => {
                    if (key.length > 0) {
                        output.push(key);
                    }
                });
            });
    
            return output;
        };

        // Get the path as an array
        path = stringToPath(path);

        // Cache the current object
        let current = obj;

        // For each item in the path, dig into the object
        for (let i = 0; i < path.length; i++) {
            // If the item isn't found, return the default (or null)
            if (!current[path[i]]) return def;

            // Otherwise, update the current  value
            current = current[path[i]];
        }

        return current;
    }
}