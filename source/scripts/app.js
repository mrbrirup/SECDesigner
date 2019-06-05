(function runApp() {
    Mrbr.System.Assembly
        .onReady({
            assemblyResolvers: [
                { replace: new RegExp("^Mrbr\\."), with: "/mrbrAssembly/" },
                { replace: new RegExp("^CanvasUI\\."), with: "/canvasUI/" },
                { replace: new RegExp("\\.", "g"), with: "/" }
            ]
        })
        .then(function (result) {
            var entry = Mrbr.System.ManifestEntry,
                fileTypes = Mrbr.System.ManifestEntry.FileTypes;
            return Mrbr.System.Assembly.loadManifest(
                [
                    new entry(Mrbr.System.ManifestEntry.FileTypes.Script, "scripts/pixi.js"),
                    new entry(fileTypes.Class, "CanvasUI.Controls.Desktop"),
                    new entry(fileTypes.Class, "CanvasUI.Controls.WindowControl")
                ])
        })
        .then(result => {
            var ctrlWin = CanvasUI.Controls.WindowControl;
            let desktop = new CanvasUI.Controls.Desktop({
                name:"desktop", size:[0,0,ctrlWin.width,ctrlWin.height], 
                pixi:{
                    backgroundColour: 0x0000FF,
                    transparent: false
                }
            })
        });
})()