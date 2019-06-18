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
                    new entry(Mrbr.System.ManifestEntry.FileTypes.ScriptElement, "scripts/pixi.js"),
                    new entry(fileTypes.Class, "CanvasUI.Controls.Desktop"),
                    new entry(fileTypes.Class, "CanvasUI.Controls.WindowControl"),
                    new entry(fileTypes.Class, "CanvasUI.Controls.Forms.Form"),
                ])
        })
        .then(result => {
            const ctrlWin = CanvasUI.Controls.WindowControl,
                desktop = new CanvasUI.Controls.Desktop({
                    //name: "desktop", size: [0, 0, ctrlWin.width, ctrlWin.height],
                    name: "desktop",
                    x: 0, y: 0, width: ctrlWin.width, height: ctrlWin.height,
                    pixi: {
                        backgroundColour: 0x000000,
                        transparent: false
                    }
                })

            const app = desktop.app;
            const container = new PIXI.Container();

            app.stage.addChild(container);

            // Create a new texture
            const texture = PIXI.Texture.from('assets/images/bunny.png');

            // Create a 5x5 grid of bunnies
            for (let i = 0; i < 25; i++) {
                const bunny = new PIXI.Sprite(texture);
                bunny.anchor.set(0.5);
                bunny.x = (i % 5) * 40;
                bunny.y = Math.floor(i / 5) * 40;
                container.addChild(bunny);
            }

            // Move container to the center
            container.x = app.screen.width / 2;
            container.y = app.screen.height / 2;

            // Center bunny sprite in local container coordinates
            container.pivot.x = container.width / 2;
            container.pivot.y = container.height / 2;

            // Listen for animate update
            app.ticker.add((delta) => {
                // rotate the container!
                // use delta to create frame-independent transform
                container.rotation -= 0.01 * delta;
            });
            const form1 = new CanvasUI.Controls.Forms.Form({ name: "form_1" });
            Mrbr.System.Assembly.loadInterfaces("Mrbr.IO.ILogger").then(function () {
                //console.log(Mrbr.IO.ILogger)
            })
            // Mrbr.System.Assembly.loadConfigFile("\\mrbrAssembly\\IO\\ILogger.json")
            // .then(result=> console.log(Mrbr.System.Assembly.loader["\\mrbrAssembly\\IO\\ILogger.json"].config));
        })

    // form1.size = new Mrbr.Geometry.Size(640,480);
    // form1.position = new Mrbr.Geometry.Point(150,300);
    // const form2 = new CanvasUI.Controls.Forms.Form({name:"form_2"});            
    // form2.size = new Mrbr.Geometry.Size(1640,1480);
    // form2.position = new Mrbr.Geometry.Point(1150,1300);
    // console.log(form2);
    // console.log(form1);
    // console.log(form1.bases())

    //});
    // class ITest1 {
    //     constructor(Ilogger = Mrbr.Inject.Test2) { }
    //     get prop1() { }
    //     set prop1(Ilogger = Mrbr.Inject.Test1) { }
    // }
    // class Test1 {
    //     get implements() { return ["ITest1"] }
    //     constructor(Ilogger) {
    //         this._prop1 = "t1";
    //         console.log(this.prop1)
    //     }
    //     get prop1() { return this._prop1; }
    //     set prop1(value) { this._prop1 = value; }
    // }
    // console.log(Object.getOwnPropertyDescriptor(ITest1.prototype, "prop1").set)
    // console.log(ITest1.prototype)
    // console.log(Object.getOwnPropertyDescriptor(ITest1.prototype, "constructor"))
    // var t1 = new Test1();
})()