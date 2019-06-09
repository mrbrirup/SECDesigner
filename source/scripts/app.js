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
                    new entry(fileTypes.Class, "CanvasUI.Controls.WindowControl"),
                    new entry(fileTypes.Class, "CanvasUI.Controls.Forms.Form"),
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
            const form1 = new CanvasUI.Controls.Forms.Form({name:"form_1"});            
            form1.size = new Mrbr.Geometry.Size(640,480);
            form1.position = new Mrbr.Geometry.Point(150,300);
            const form2 = new CanvasUI.Controls.Forms.Form({name:"form_2"});            
            form2.size = new Mrbr.Geometry.Size(1640,1480);
            form2.position = new Mrbr.Geometry.Point(1150,1300);
            console.log(form2);
            console.log(form1);
            console.log(form1.bases())
        });
})()