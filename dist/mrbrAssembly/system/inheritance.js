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
    static get nonInheritable() { return ["constructor", "mrbrAssemblyTypeName", "base", "bases"] }
    /**
     * Set inheritance for target from all sources classes
     * @param {string or string[]} sources source for inheritance string is converted to string[]
     * @param {class} target class that will inherit from sources
     */
    static async applyInheritance(sources, target) {
        if (sources === undefined || sources.length === 0) { return; }
        const
            targetPrototype = target.prototype,
            system = Mrbr.System,
            nonInheritable = system.Inheritance.nonInheritable,
            toObject = system.Assembly.toObject,
            assembly = system.Assembly,
            dotReplaceRegex = new RegExp("\\.", "g"),
            overrides = target.overrides || [];
        sources = Array.isArray(sources) ? sources : [sources];
        const prms = [];
        //const overrides = [];
        for (let sourceCounter = 0, sourcesCount = sources.length; sourceCounter < sourcesCount; sourceCounter++) {
            prms.push(new Promise((resolve, reject) => {
                const strSource = sources[sourceCounter];
                let sourcePrototype = toObject(strSource).prototype;
                ((sourcePrototype === undefined) ? assembly.loadClass(strSource) : Promise.resolve())
                    .then(() => {
                        let sourcePrototype = toObject(strSource).prototype;
                        if (sourcePrototype === undefined) { resolve(); return; }
                        const properties = Object.getOwnPropertyNames(sourcePrototype);
                        for (let propertiesCounter = 0, propertiesCount = properties.length; propertiesCounter < propertiesCount; propertiesCounter++) {
                            const propertyName = properties[propertiesCounter];
                            if (!nonInheritable.includes(propertyName)) {
                                let isDefined = (Object.getOwnPropertyDescriptor(targetPrototype, propertyName) !== undefined);
                                let newPropertyName;
                                if (propertyName === "ctor") {
                                    newPropertyName = `${strSource.replace(dotReplaceRegex, "_")}_${propertyName}`;
                                }
                                else if (!isDefined) {
                                    newPropertyName = propertyName;
                                }
                                else if (isDefined && overrides.length > 0) {
                                    let overridePropertyName = `${strSource}.${propertyName}`;
                                    if (overrides.includes(overridePropertyName)) {
                                        newPropertyName = overridePropertyName.replace(dotReplaceRegex, "_");
                                    }
                                }
                                if (newPropertyName !== undefined) {
                                    Object.defineProperty(
                                        targetPrototype,
                                        newPropertyName,
                                        Object.getOwnPropertyDescriptor(sourcePrototype, propertyName)
                                    );
                                }

                            }
                        };
                        resolve();
                    })
            }));
        }
        await Promise.all(prms);
    }
}