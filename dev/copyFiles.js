var fs = require("fs-extra");
var source = 'mrbrAssembly'
var destination = 'dist\\mrbrAssembly'

let filterFunc = (src, dest) => {
    return isdir = fs.statSync(src).isDirectory() || src.endsWith(".js") || src.endsWith(".json") 
}
fs.copySync(source, destination, { filter: filterFunc }, function (err) {
    if (err) {
        console.log('An error occured while copying the folder.')
        return console.error(err)
    }
    console.log('Copy completed!')
});


var source = 'source'
var destination = 'dist'
fs.copySync(source, destination, {}, function (err) {
    if (err) {
        console.log('An error occured while copying the folder.')
        return console.error(err)
    }
    console.log('Copy completed!')
});
