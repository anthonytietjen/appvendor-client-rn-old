/* @flow */
let doubleTapTimer:Number = null;

export default function PreventDoubleTap() {
	return new Promise((resolve, reject) => {
		if(doubleTapTimer == null){
			doubleTapTimer = setTimeout(()=>{doubleTapTimer = null}, 1000);
			resolve();	
		} else {
			//
		}
	});
}