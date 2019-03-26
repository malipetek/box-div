class BoxDiv extends HTMLElement {
    /**
                                     * @param  { width, height, depth, color } options
                                     * @returns instance BoxDiv
                                     */
    constructor(options) {
        super();

        options = options || {};

        const template = document.createElement("template");

        template.innerHTML = `<div></div>`;

        if (this.createShadowRoot) {
            this.createShadowRoot();
        } else if (this.attachShadow) {
            this.attachShadow({ mode: "open" });
        }

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this._width = options.width || 150;
        this._height = options.height || 150;
        this._depth = options.depth || 150;
        this._color = options.color || "#ccc";
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this.shadowRoot.
            getRootNode().
            styleSheets[0].cssRules[0].style.setProperty(
                "--box-width",
                value + "px");

        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this.shadowRoot.
            getRootNode().
            styleSheets[0].cssRules[0].style.setProperty(
                "--box-width",
                value + "px");

        this._height = value;
    }

    get depth() {
        return this._depth;
    }

    set depth(value) {
        this.shadowRoot.
            getRootNode().
            styleSheets[0].cssRules[0].style.setProperty(
                "--box-depth",
                value + "px");

        this._depth = value;
    }

    handleAttributes(attribute, oldVal, newVal) { }

    connectedCallback() {
        var topElement = Object.keys(this.children).find(key => {
            return this.children[key].getAttribute("slot") == "top";
        });

        var bottomElement = Object.keys(this.children).find(key => {
            return this.children[key].getAttribute("slot") == "bottom";
        });
        var side1 = Object.keys(this.children).find(key => {
            return this.children[key].getAttribute("slot") == "side1";
        });
        var side2 = Object.keys(this.children).find(key => {
            return this.children[key].getAttribute("slot") == "side2";
        });
        var side3 = Object.keys(this.children).find(key => {
            return this.children[key].getAttribute("slot") == "side3";
        });
        var side4 = Object.keys(this.children).find(key => {
            return this.children[key].getAttribute("slot") == "side4";
        });

        topElement = topElement ? this.children[topElement] : undefined;
        bottomElement = bottomElement ? this.children[bottomElement] : undefined;
        side1 = side1 ? this.children[side1] : undefined;
        side2 = side2 ? this.children[side2] : undefined;
        side3 = side3 ? this.children[side3] : undefined;
        side4 = side4 ? this.children[side4] : undefined;

        topElement && topElement.remove ? topElement.remove() : undefined;
        bottomElement && bottomElement.remove ? bottomElement.remove() : undefined;
        side1 && side1.remove ? side1.remove() : undefined;
        side2 && side2.remove ? side2.remove() : undefined;
        side3 && side3.remove ? side3.remove() : undefined;
        side4 && side4.remove ? side4.remove() : undefined;

        this._width = this.getAttribute("width") || this._width;
        this._height = this.getAttribute("height") || this._height;
        this._depth = this.getAttribute("depth") || this._depth;
        this._color = this.getAttribute("color") || this._color;

        this._style = this.getAttribute("style") || this._style;

        topElement = topElement && topElement.outerHTML ? topElement.outerHTML : "";
        bottomElement =
            bottomElement && bottomElement.outerHTML ? bottomElement.outerHTML : "";
        side1 = side1 && side1.outerHTML ? side1.outerHTML : "";
        side2 = side2 && side2.outerHTML ? side2.outerHTML : "";
        side3 = side3 && side3.outerHTML ? side3.outerHTML : "";
        side4 = side4 && side4.outerHTML ? side4.outerHTML : "";

        this.shadowRoot.innerHTML = /*html*/`
      <style> 
      :host{
        --box-width: ${this._width}px;
        --box-height: ${this._height}px;
        --box-depth: ${this._depth}px;
        --box-color: ${this._color};
      }
      .box{
        position: absolute;
        top: 0;
        left: 0;
        color: #fff;
        font-size: 100px;
        transform-style: preserve-3d;
      }
      .box-top{
        width: var(--box-width);
        height: var(--box-height);
        background-color: var(--box-color);
      }
      .box-top, .box-side, .box-bottom{
        box-shadow: 0px 0px 0px 1px #999;
      }
      .box-shadow{
        box-shadow: 0px 0px 60px 0px rgba(0,0,0,.2), 0px 0px 20px 0px rgba(0,0,0,.2);
      }
      .box-side.s1, .box-side.s3{
        position: absolute;
        top: 0;
        left: 0;
        width: var(--box-width);
        height: var(--box-depth);
        background-color: var(--box-color);
      }
      .box-side.s2, .box-side.s4{
        position: absolute;
        top: 0;
        left: 0;
        width: var(--box-height);
        height: var(--box-depth);
        background-color: #888;
      }
      .box-side.s1{
        background-color: var(--box-color);
      }
      .box-side.s2{
          background-color: var(--box-color);
      }
      .box-side.s3{
          background-color: var(--box-color);
      }
      .box-side.s4{
          background-color: var(--box-color);
      }
      .box-bottom{
          background-color: var(--box-color);
            position: absolute;
            top: 0;
            left: 0;
            width: var(--box-width);
            height: var(--box-height);
      }
      .box-shadow{
            opacity: 1;
            background-color: rgba(0,0,0,.2);
            position: absolute;
            top: 0;
            left: 0;
            width: var(--box-width);
            height: var(--box-height);
      }
      ${this._style}
      </style>
      <div id="box" class="box">
          <div class="box-top">
            ${topElement}
          </div>
          <div class="box-side s1">
            ${side1}
          </div>
          <div class="box-side s2">
            ${side2}
          </div>
          <div class="box-side s3">
            ${side3}
          </div>
          <div class="box-side s4">
            ${side4}
          </div>
          <div class="box-bottom">
            ${bottomElement}
          </div>
          <div class="box-shadow"> </div>
        </div>`;

        this.positionSides();
    }

    positionSides() {
        var side1 = this.shadowRoot.querySelector(".box-side.s1");
        var side2 = this.shadowRoot.querySelector(".box-side.s2");
        var side3 = this.shadowRoot.querySelector(".box-side.s3");
        var side4 = this.shadowRoot.querySelector(".box-side.s4");
        var bottom = this.shadowRoot.querySelector(".box-bottom");

        // side1
        side1.style.transform = `
    translateX(0px) 
    translateY(${-1 * this._depth / 2}px) 
    translateZ(${-1 * this._depth / 2}px) 
    rotateX(90deg) rotateY(0deg) rotateZ(180deg)`;
        side2.style.transform = `
    translateX(${this._width - this._height / 2}px)
    translateY(${this._height / 2 - this._depth / 2}px)
    translateZ(-${this._depth / 2}px)
    rotateX(0deg) rotateY(90deg) rotateZ(270deg)`;
        side3.style.transform = `
    translateX(0px)
    translateY(${this._height - this._depth / 2}px)
    translateZ(-${this._depth / 2}px) 
    rotateX(90deg) rotateY(180deg) rotateZ(180deg)`;
        side4.style.transform = `
    translateX(-${this._height / 2}px)
    translateY(${this._height / 2 - this._depth / 2}px)
    translateZ(-${this._depth / 2}px) 
    rotateX(0deg) rotateY(-90deg) rotateZ(90deg)`;
        bottom.style.transform = `
    translateX(0px)
    translateY(0px)
    translateZ(-${this._depth}px) 
    rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }

    disconnectedCallback() {
        console.log("box-disconnected");
    }

    get transformData() {
        return this._transformData;
    }

    set transformData(value) {
        this.transform(value);
    }
    /**
       * @param { x: Number || String, y: Number || String, z: Number || String, rx: Number || String, ry: Number || String, rz: Number || String, hover: Number }
       * @returns null
       */
    transform() {
        if (!this.shadowRoot) return 0;
        var box = this.shadowRoot.getElementById("box");
        var shadow = this.shadowRoot.querySelector(".box-shadow");
        if (!box) return 0;
        if (!this._transformData) {
            this._transformData = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, hover: 0 };
        }

        var data = {};

        data.arguments = arguments[0];
        data.existing = this._transformData;

        data.arguments.x =
            data.arguments.x != undefined ? data.arguments.x : data.existing.x;
        data.arguments.y =
            data.arguments.y != undefined ? data.arguments.y : data.existing.y;
        data.arguments.z =
            data.arguments.z != undefined ? data.arguments.z : data.existing.z;
        data.arguments.rx =
            data.arguments.rx != undefined ? data.arguments.rx : data.existing.rx;
        data.arguments.ry =
            data.arguments.ry != undefined ? data.arguments.ry : data.existing.ry;
        data.arguments.rz =
            data.arguments.rz != undefined ? data.arguments.rz : data.existing.rz;
        data.arguments.hover =
            data.arguments.hover != undefined ?
                data.arguments.hover :
                data.existing.hover;

        Object.keys(data.arguments).forEach(k => {
            var d = data.arguments[k];
            if (d.match && d.match(/[+-]/gi)) {
                data.arguments[k] = data.existing[k] + parseFloat(d);
                /*if((k == 'rx'|| k == 'ry' || k == 'rz') && (data.arguments[k] > 360 || data.arguments[k] < 0)){
                                                                          if(data.arguments[k] > 360){
                                                                            data.arguments[k] = 0;
                                                                          }
                                                                          if(data.arguments[k] < 0){
                                                                            data.arguments[k] = 360;
                                                                          } 
                                                                        }*/
            }
        });

        var x = data.arguments.x;
        var y = data.arguments.y;
        var z = data.arguments.z;
        var rx = data.arguments.rx;
        var ry = data.arguments.ry;
        var rz = data.arguments.rz;
        var hover = data.arguments.hover;

        this._transformData = { x, y, z, rx, ry, rz, hover };
        shadow.style.transform = `
    translateX(0px)
    translateY(0px)
    translateZ(${-this._depth - hover}px) 
    rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(${(hover + 500) / 500})`;
        box.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
        //console.log({x, y, z, rx, ry, rz, deg});
    }
}


if (!window.customElements.get("box-div")) {
    window.customElements.define("box-div", BoxDiv);
}