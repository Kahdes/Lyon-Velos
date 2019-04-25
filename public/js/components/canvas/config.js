const config = {
	canvas: {
		canvas: $('.canvas')[0],
    	erase:  $('.canvas-clear')[0],
	},
	data: {
		ctx:    '',
        lastX:  '',
        lastY:  '',
        mousePressed: false,
        stroke: {style: 'black', width: '10', join: 'round'},
	}
};

export default config;