// include fs-extra package
var fs = require("fs-extra");
var fs1 = require("fs")
var source = 'mrbrAssembly'
var destination = 'dist\\mrbrAssembly'
let filterFunc = (src, dest) => {
    return isdir = fs.statSync(src).isDirectory() || src.endsWith(".js")
}
fs.copySync(source, destination, { filter: filterFunc }, function (err) {
    if (err) {
        console.log('An error occured while copying the folder.')
        return console.error(err)
    }
    console.log('Copy completed!')
});