import config from './config.js';

class Canvas {
    constructor(props) {
        this.canvas = props.canvas;
        this.data   = props.data;     
        this.initialize     = this.initialize.bind(this);
        this.draw           = this.draw.bind(this);
        this.erase          = this.erase.bind(this);
    }

    /**
     * * initialize() : defines canvas'context & draw/erase event handlers
     */
    initialize() {
        const current = this;
        const {canvas, erase} = this.canvas;
        this.data.ctx = canvas.getContext("2d");

        ['mousedown', 'touchstart'].forEach(event => {
            canvas.addEventListener(event, (function(e) {
                const device = (event === 'touchstart') ? e.changedTouches[0] : e;
                current.data.mousePressed = true;
                current.draw(device.pageX - $(this).offset().left,
                    device.pageY - $(this).offset().top, false
                );
            })), false;
        });

        ['mousemove', 'touchmove'].forEach(event => {
            canvas.addEventListener(event, (function(e) {
                const device = (event === 'touchmove') ? e.changedTouches[0] : e;
                current.data.mousePressed ?
                    current.draw(device.pageX - $(this).offset().left,
                        device.pageY - $(this).offset().top, true) :
                    null;
            })), false;
        });

        ['mouseup', 'mouseleave', 'touchend'].forEach(event => {
            canvas.addEventListener(event, (() => current.data.mousePressed = false)), false
        });

        erase.addEventListener('click', this.erase);
    }

    /**
     * * draw() : defines stroke path & style
     * @param {*} x 
     * @param {*} y 
     * @param {*} isDown 
     */
    draw(x, y, isDown) {
        let {ctx, stroke} = this.data;
        if (isDown) {
            ctx.beginPath();
            ctx.strokeStyle = stroke.style;
            ctx.lineWidth   = stroke.width;
            ctx.lineJoin    = stroke.join;
            ctx.moveTo(this.data.lastX, this.data.lastY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
        }
        this.data.lastX = x;
        this.data.lastY = y;
    }

    /**
     * * erase() : clears current canvas
     */
    erase() {
        const {ctx} = this.data;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}

const canvas = new Canvas(config);

export default canvas;