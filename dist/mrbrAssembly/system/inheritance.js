/**
 * Inheritance functions for Classes
 */
class {
    /**
     * Currently not used, static classes
     */
    constructor() { }
    /**
     * Non-inhertiable properties not to assign to parent class
     * Constructors cannot be inherited and are created as className_ctor
     * e.g. Mrbr.Utils.Parser.Tokeniser's constructor is created as Mrbr_Utils_Parser_Tokeniser_ctor
     */
    static get nonInheritable() { return ["constructor", "mrbrAssemblyTypeName"] }
    /**
     * Set inheritance for target from all sources classes
     * @param {string or string[]} sources source for inheritance string is converted to string[]
     * @param {class} target class that will inherit from sources
     */
    static applyInheritance(sources, target) {        
        if (sources === undefined || sources.length === 0) { return; }
        const
            targetPrototype = target.prototype,
            system = Mrbr.System,
            nonInheritable = system.Inheritance.nonInheritable,
            toObject = system.Assembly.toObject,
            assembly = system.Assembly,
            dotReplaceRegex = new RegExp("\\.", "g");
        (Array.isArray(sources) ? sources : [sources])
            .forEach(async strSource => {
                let sourcePrototype = toObject(strSource).prototype;
                if (sourcePrototype === undefined) {
                    await assembly.loadClass(strSource);
                    sourcePrototype = toObject(strSource).prototype;
                }
                if (sourcePrototype === undefined) { return; }
                let properties = Object.getOwnPropertyNames(sourcePrototype);
                for (let propertiesCounter = 0, propertiesCount = properties.length, propertyName; propertiesCounter < propertiesCount; propertiesCounter++) {
                    propertyName = properties[propertiesCounter];
                    if (!nonInheritable.includes(propertyName)) {
                        Object.defineProperty(
                            targetPrototype,
                            (propertyName !== "ctor" && Object.getOwnPropertyDescriptor(targetPrototype, propertyName) === undefined) ? propertyName : `${strSource.replace(dotReplaceRegex, "_")}_${propertyName}`,
                            Object.getOwnPropertyDescriptor(sourcePrototype, propertyName)
                        );
                    }
                };
            });
    }
}