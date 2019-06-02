(function runApp() {
    Mrbr.System.Assembly
        .onReady({
            assemblyResolvers: [
                { replace: new RegExp("^Mrbr\\."), with: "/mrbrAssembly/" },
                { replace: new RegExp("\\.", "g"), with: "/" }
            ]
        })
        .then(function (result) {
            var entry = Mrbr.System.ManifestEntry,
                fileTypes = Mrbr.System.ManifestEntry.FileTypes;
            return Mrbr.System.Assembly.loadManifest(
                [
                    new Mrbr.System.ManifestEntry(Mrbr.System.ManifestEntry.FileTypes.Script, "scripts/pixi.js"),
                    new entry(fileTypes.Class, "Mrbr.Controls.Desktop")
                ])
        })
        .then(result => {
            let desktop = new Mrbr.Controls.Desktop({name:"desktop_5", size:[1,2,4,8]})
            console.log(desktop)
        });
})()