import PogObject from 'PogData';

class DDM {
    #gui; #displaydata; #displays = {}; #selected = undefined; #selectedoffset = [0, 0]; #guiopen = false; #displaybackgrounds = {};
    constructor(moduleName, path = undefined) {
        this.#gui = new Gui()
        if (!moduleName) console.warn('[DDM]: No modulename provided. Saving data in "modules -> data" folder')
        this.#displaydata = new PogObject(moduleName ?? "data", {}, `${path ?? "displaydata"}.json`);

        this.#gui.registerOpened(() => {
            this.#guiopen = true;
            Object.values(this.#displays).forEach(d => this.#displaybackgrounds[d.name] = d.BackgroundColor);
            Object.values(this.#displays).forEach(d => d.setBackgroundColor(-2113929216));
        });
        this.#gui.registerClosed(() => {
            this.#selected = undefined;
            this.#selectedoffset = [0, 0];
            Object.values(this.#displays).forEach(d => d.setBackgroundColor(this.#displaybackgrounds[d.name]));
            this.#displaybackgrounds = {};
            this.#guiopen = false;
        });
        this.#gui.registerDraw(() => {
            Object.values(this.#displays).forEach(d => d.draw(this, this.#selected));
        });
        this.#gui.registerClicked((x, y, btn) => {
            if (this.#selected) this.#selected.setBackgroundColor(-2113929216);
            this.#selected = Object.values(this.#displays).find(display =>
                x >= display.X - 1 - display._getXAdjust()
                && x < display.X + display.Width - display._getXAdjust()
                && y >= display.Y
                && y < display.Y + display.Height);
            if (!this.#selected) return;
            this.#selected.setBackgroundColor(-2105376126);
            if (btn == 0.0) {
                this.#selectedoffset[0] = this.#selected.X - x;
                this.#selectedoffset[1] = this.#selected.Y - y;
            }
            else if (btn == 1.0) {
                this.#selected.setAlign(DDM.Alignmentsorder[(DDM.Alignmentsorder.indexOf(this.#selected.Align) + 1) % 3]);
            }
            else if (btn == 2.0) {
                this.#selected.setBackground(!this.#selected.Background);
            }
        });
        this.#gui.registerKeyTyped((char, kc) => {
            if (!this.#selected) return;
            if (kc == 203) {
                this.#selected.setX(this.#selected.X - 1);
            }
            else if (kc == 200) {
                this.#selected.setY(this.#selected.Y - 1);
            }
            else if (kc == 205) {
                this.#selected.setX(this.#selected.X + 1);
            }
            else if (kc == 208) {
                this.#selected.setY(this.#selected.Y + 1);
            }
            else if (String(char) === "+") {
                this.#selected.setScale(this.#selected.Scale + 0.1);
            }
            else if (String(char) === "-") {
                this.#selected.setScale(this.#selected.Scale - 0.1);
            }
        });
        this.#gui.registerMouseDragged((x, y, btn) => {
            if (!this.#selected || !btn == 0) return;
            this.#selected.setPos(this.#selectedoffset[0] + x, this.#selectedoffset[1] + y);
        });
        this.#gui.registerScrolled((_, __, scdir) => {
            if (!this.#selected) return;
            this.#selected.setScale(this.#selected.Scale + (scdir > 0 ? 0.1 : -0.1));
        });
        register("worldUnload", () => {
            Object.values(this.#displays).forEach(d => {
                this.#displaydata[d.name] = {
                    x: d.X,
                    y: d.Y,
                    scale: d.Scale,
                    background: d.Background,
                    align: d.Align,
                }
            });
            this.#displaydata.save();
        })
    }

    addDisplay(name, x = Number((Renderer.screen.getWidth() / 3).toFixed()), y = Number((Renderer.screen.getHeight() / 4).toFixed()), scale = 1, background = false, align = "LEFT") {
        if (this.#displays[name]) return console.warn(`[DDM]: Display with #name "${name}" already exists`);
        if (!this.#displaydata[name]) {
            this.#displaydata[name] = { x, y, scale, background, align }
        }
        const data = this.#displaydata[name];
        this.#displays[name] = new this.DogshitDisplay(name, data.x, data.y, data.scale, data.background, data.align, this);
        return this.#displays[name];
    }
    getDisplay(name) {
        return this.#displays[name];
    }
    removeDisplay(name) {
        if (!this.#displays[name]) return;
        this.#displays[name].removeClickAction(-1);
        delete this.#displays[name];
    }
    open() { this.#gui.open(); }
    close() { this.#gui.close(); }
    reset() {
        Object.values(this.#displays).forEach(d => {
            d.setX(Number((Renderer.screen.getWidth() / 3).toFixed()));
            d.setY(Number((Renderer.screen.getHeight() / 4).toFixed()));
            d.setScale(1);
            d.setBackground(false);
            d.setAlign("LEFT");
        });
    }
    get isguiopen() { return this.#guiopen }
    static get Alignments() {
        return {
            "LEFT": DisplayHandler.Align.LEFT,
            "CENTER": DisplayHandler.Align.CENTER,
            "RIGHT": DisplayHandler.Align.RIGHT,
        }
    }
    static get Alignmentsorder() { return ["LEFT", "CENTER", "RIGHT"] }


    DogshitDisplay = class {
        #x; #y; #scale; #background; #align; #displayLines; #width = 0; #height = 0; #backgroundColor = -2113929216; #textcolor = -1; #gui; #lastClickTimestamp = 0; #clickAction;
        constructor(name, x, y, scale, background, align, gui) {
            this.name = name;
            this.#x = x;
            this.#y = y;
            this.#scale = scale;
            this.#background = background ? DisplayHandler.Background.FULL : DisplayHandler.Background.NONE;
            this.#align = align.toUpperCase();
            this.#gui = gui;
            this.#displayLines = [];
        }

        setPos(x, y) {
            this.#x = x;
            this.#y = y;
            return this;
        }
        get X() { return this.#x; }
        setX(x) {
            this.#x = x;
            return this;
        }
        get Y() { return this.#y; }
        setY(y) {
            this.#y = y;
            return this;
        }
        get Width() { return this.#width; }
        get Height() { return this.#height; }
        get Scale() { return this.#scale; }
        setScale(scale) {
            if (scale < 0.5) scale = 0.5;
            if (scale > 10) scale = 10;
            this.#width = Number((this.#width / this.#scale * scale).toFixed(2));
            this.#height = Number((this.#height / this.#scale * scale).toFixed(2));;
            this.#scale = Number((scale).toFixed(2));
            this.#displayLines.forEach(dl => dl.setScale(this.#scale));
            return this;
        }
        get Background() { return this.#background === DisplayHandler.Background.FULL; }
        setBackground(background) {
            this.#background = background ? DisplayHandler.Background.FULL : DisplayHandler.Background.NONE;
            return this;
        }
        get BackgroundColor() { return this.#backgroundColor; }
        setBackgroundColor(backgroundColor) {
            this.#backgroundColor = backgroundColor;
            return this;
        }
        get Align() { return this.#align; }
        setAlign(align) {
            this.#align = align.toUpperCase();
            this.#x = this.#x + (this._getXAdjust(true) == 0 ? (- this.#width) : (this.#width / 2))
            return this;
        }
        addLine(text = "") {
            this.#displayLines.push(new DisplayLine(text).setScale(this.#scale));
            this._calculateBounds();
            if (this.#clickAction)
                this.setClickAction(this.#clickAction, this.#displayLines.length - 1);
            return this;
        }
        addLines(texts) {
            if (!texts) return;
            texts.forEach(text => this.addLine(text));
            return this;
        }
        setLine(index, text = "") {
            if (index < 0 || index >= this.#displayLines.length) return;
            this.#displayLines[index].setText(text).setScale(this.#scale);
            this._calculateBounds()
            return this;
        }
        removeLine(index) {
            if (index < 0 || index >= this.#displayLines.length) return;
            this.#displayLines.splice(index, 1)[0].unregisterClicked();
            this._calculateBounds()
            return this;
        }
        getLine(index) {
            if (index < 0 || index >= this.#displayLines.length) return undefined;
            return this.#displayLines[index].getText();
        }
        getLines() {
            return this.#displayLines.map(dl => dl.getText());
        }
        getIndex(text) {
            return this.#displayLines.findIndex(dl => dl.getText() === text);
        }
        setClickAction(action, index = -1) {
            if (index < 0) {
                for (let i = 0; i < this.#displayLines.length; i++)
                    this.setClickAction(action, i);
                this.#clickAction = action;
            } else if (index >= 0 && index < this.#displayLines.length) {
                this.#displayLines[index].unregisterClicked().registerClicked((x, y, btn, state) => {
                    if (!this.#gui.isguiopen && state) {
                        const now = Date.now();
                        if (now - this.#lastClickTimestamp < 100) return;
                        this.#lastClickTimestamp = now;
                        setTimeout(() => { action(x, y, btn) }, 0);
                    }
                });
            }
            return this;
        }
        removeClickAction(index = -1) {
            if (index < 0) {
                this.#displayLines.forEach(dl => dl.unregisterClicked());
                this.#clickAction = undefined;
            } else if (index >= 0 && index < this.#displayLines.length)
                this.#displayLines[index].unregisterClicked();
            return this;
        }

        _calculateBounds() {
            this.#height = this.#displayLines.length * 10 * this.#scale;
            this.#width = this.#displayLines.reduce((max, dl) => Math.max(max, dl.getTextWidth()), 0);
        }
        _getXAdjust(setalign) {
            return (DDM.Alignmentsorder.indexOf(this.#align) / 2) * (setalign ? 1 : this.#width);
        }

        draw(gui, selected) {
            if (!this.#displayLines.length) return;
            const guirender = (gui === this.#gui);
            const guiopen = this.#gui.isguiopen;
            if (guiopen && guirender && this === selected) {
                const tempLine = new DisplayLine(`x: ${this.#x} y: ${this.#y} scale: ${Number(this.#scale).toFixed(1)}\nalign: ${this.#align.toLowerCase()} background: ${this.Background ? "on" : "off"}`);
                tempLine.draw(this.#x - this._getXAdjust(), this.#y - 20, tempLine.getTextWidth(), DisplayHandler.Background.NONE, 0, -1, DisplayHandler.Align.LEFT);
            }
            let height = 0;
            const background = (guiopen && guirender) ? DisplayHandler.Background.FULL : this.#background;
            if (guiopen && !guirender || this.#width === 0 || this.#height === 0) return;
            this.#displayLines.forEach(dl => {
                dl.draw(this.#x, this.#y + height, this.#width, background, this.#backgroundColor, this.#textcolor, DDM.Alignments[this.#align]);
                height += 10 * this.#scale;
            });
        }
    }
}

export default DDM;
