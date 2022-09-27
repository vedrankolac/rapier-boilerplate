class NoiseWall {
	constructor( width = 2048, height = 2048 ) {

		const colorCanvas = document.createElement('canvas');
		colorCanvas.width = width;
		colorCanvas.height = height;
    const colorCanvasContext = colorCanvas.getContext( '2d' );
    colorCanvasContext.fillStyle = 'rgb(255,255,255)';
		colorCanvasContext.fillRect( 0, 0, width, height );

    const roughnessCanvas = document.createElement('canvas');
		roughnessCanvas.width = width;
		roughnessCanvas.height = height;
		const roughnessCanvasContext = roughnessCanvas.getContext( '2d' );
    roughnessCanvasContext.fillStyle = 'rgb(255,255,255)';
		roughnessCanvasContext.fillRect( 0, 0, width, height );

    const metalnessCanvas = document.createElement('canvas');
		metalnessCanvas.width = width;
		metalnessCanvas.height = height;
		const metalnessCanvasContext = metalnessCanvas.getContext( '2d' );
    metalnessCanvasContext.fillStyle = 'rgb(0,0,0)';
		metalnessCanvasContext.fillRect( 0, 0, width, height );

		for ( let i = 0; i < 400; i ++ ) {
			const x = Math.random() * width;
			const y = Math.random() * height;
			const r = Math.random() * 6 + 1;
      
      const cRGB = Math.random() * 200 + 55;
      // colorCanvasContext.fillStyle = 'rgb(`100`, 100, 100)';
      colorCanvasContext.fillStyle = `rgb(${cRGB}, ${cRGB}, ${cRGB})`;
			colorCanvasContext.beginPath();
			colorCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
			colorCanvasContext.fill();

      const rRGB = Math.random() * 30;
			// roughnessCanvasContext.fillStyle = 'rgb(30,30,30)';
      roughnessCanvasContext.fillStyle = `rgb(${rRGB}, ${rRGB}, ${rRGB})`;
			roughnessCanvasContext.beginPath();
			roughnessCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
			roughnessCanvasContext.fill();

      const mRGB = Math.random() * 100 + 20;
      // metalnessCanvasContext.fillStyle = 'rgb(120,120,120)';
      metalnessCanvasContext.fillStyle = `rgb(${mRGB}, ${mRGB}, ${mRGB})`;
			metalnessCanvasContext.beginPath();
			metalnessCanvasContext.arc( x, y, r, 0, Math.PI * 2 );
			metalnessCanvasContext.fill();
		}

		return {
      colorMap: colorCanvas,
      roughnessMap: roughnessCanvas,
      metalnessMap: metalnessCanvas
    };
	}
}

export { NoiseWall };