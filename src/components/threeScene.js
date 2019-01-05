import React, { Component } from 'react';
import * as THREE from 'three';
class ThreeScene extends Component{
  componentDidMount(){
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    //ADD SCENE
    this.scene = new THREE.Scene()
    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera( 33, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z = 1000;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    // LINES
    var hilbertPoints = hilbert3D(new THREE.Vector3( 0, 0, 0 ), 200.0, 1, 0, 1, 2, 3, 4, 5, 6, 7 );
    var geometry1 = new THREE.BufferGeometry();
				var geometry2 = new THREE.BufferGeometry();
				var geometry3 = new THREE.BufferGeometry();
				var subdivisions = 6;
				var vertices = [];
				var colors1 = [];
				var colors2 = [];
				var colors3 = [];
				var point = new THREE.Vector3();
				var color = new THREE.Color();
				var spline = new THREE.CatmullRomCurve3( hilbertPoints );
				for ( var i = 0; i < hilbertPoints.length * subdivisions; i ++ ) {
					var t = i / ( hilbertPoints.length * subdivisions );
					spline.getPoint( t, point );
					vertices.push( point.x, point.y, point.z );
					color.setHSL( 0.6, 1.0, Math.max( 0, - point.x / 200 ) + 0.5 );
					colors1.push( color.r, color.g, color.b );
					color.setHSL( 0.9, 1.0, Math.max( 0, - point.y / 200 ) + 0.5 );
					colors2.push( color.r, color.g, color.b );
					color.setHSL( i / ( hilbertPoints.length * subdivisions ), 1.0, 0.5 );
					colors3.push( color.r, color.g, color.b );
				}
				geometry1.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
				geometry2.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
				geometry3.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
				geometry1.addAttribute( 'color', new THREE.Float32BufferAttribute( colors1, 3 ) );
				geometry2.addAttribute( 'color', new THREE.Float32BufferAttribute( colors2, 3 ) );
				geometry3.addAttribute( 'color', new THREE.Float32BufferAttribute( colors3, 3 ) );
				//
				var geometry4 = new THREE.BufferGeometry();
				var geometry5 = new THREE.BufferGeometry();
				var geometry6 = new THREE.BufferGeometry();
				vertices = [];
				colors1 = [];
				colors2 = [];
				colors3 = [];
				for ( var i = 0; i < hilbertPoints.length; i ++ ) {
					var point = hilbertPoints[ i ];
					vertices.push( point.x, point.y, point.z );
					color.setHSL( 0.6, 1.0, Math.max( 0, ( 200 - hilbertPoints[ i ].x ) / 400 ) * 0.5 + 0.5 );
					colors1.push( color.r, color.g, color.b );
					color.setHSL( 0.3, 1.0, Math.max( 0, ( 200 + hilbertPoints[ i ].x ) / 400 ) * 0.5 );
					colors2.push( color.r, color.g, color.b );
					color.setHSL( i / hilbertPoints.length, 1.0, 0.5 );
					colors3.push( color.r, color.g, color.b );
				}
				geometry4.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
				geometry5.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
				geometry6.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
				geometry4.addAttribute( 'color', new THREE.Float32BufferAttribute( colors1, 3 ) );
				geometry5.addAttribute( 'color', new THREE.Float32BufferAttribute( colors2, 3 ) );
        geometry6.addAttribute( 'color', new THREE.Float32BufferAttribute( colors3, 3 ) );
        var	material = new THREE.LineBasicMaterial( { color: 0xffffff, vertexColors: THREE.VertexColors } );
        var line, p, scale = 0.3, d = 225;
				var parameters = [
					[ material, scale * 1.5, [ - d, - d / 2, 0 ], geometry1 ],
					[ material, scale * 1.5, [ 0, - d / 2, 0 ], geometry2 ],
					[ material, scale * 1.5, [ d, - d / 2, 0 ], geometry3 ],
					[ material, scale * 1.5, [ - d, d / 2, 0 ], geometry4 ],
					[ material, scale * 1.5, [ 0, d / 2, 0 ], geometry5 ],
					[ material, scale * 1.5, [ d, d / 2, 0 ], geometry6 ],
				];
				for ( var i = 0; i < parameters.length; i ++ ) {
					p = parameters[ i ];
					line = new THREE.Line( p[ 3 ], p[ 0 ] );
					line.scale.x = line.scale.y = line.scale.z = p[ 1 ];
					line.position.x = p[ 2 ][ 0 ];
					line.position.y = p[ 2 ][ 1 ];
					line.position.z = p[ 2 ][ 2 ];
					this.scene.add( line );
				}
    //ADD CUBE
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: '#433F81'     })
    this.cube = new THREE.Mesh(geometry, material)
    // this.scene.add(this.cube)
this.start()
  }
componentWillUnmount(){
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }
start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }
stop = () => {
    cancelAnimationFrame(this.frameId)
  }
animate = () => {
   this.cube.rotation.x += 0.01
   this.cube.rotation.y += 0.01
   this.renderScene()
   this.frameId = window.requestAnimationFrame(this.animate)
 }
renderScene = () => {
  this.renderer.render(this.scene, this.camera)
}
render(){
    return(
      <div
        style={{ width: '180%', height: '200%' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}

function hilbert3D( center, size, iterations, v0, v1, v2, v3, v4, v5, v6, v7 ) {

	// Default Vars
	var center = center !== undefined ? center : new THREE.Vector3( 0, 0, 0 ),
		size = size !== undefined ? size : 10,
		half = size / 2,
		iterations = iterations !== undefined ? iterations : 1,
		v0 = v0 !== undefined ? v0 : 0,
		v1 = v1 !== undefined ? v1 : 1,
		v2 = v2 !== undefined ? v2 : 2,
		v3 = v3 !== undefined ? v3 : 3,
		v4 = v4 !== undefined ? v4 : 4,
		v5 = v5 !== undefined ? v5 : 5,
		v6 = v6 !== undefined ? v6 : 6,
		v7 = v7 !== undefined ? v7 : 7
	;

	var vec_s = [
		new THREE.Vector3( center.x - half, center.y + half, center.z - half ),
		new THREE.Vector3( center.x - half, center.y + half, center.z + half ),
		new THREE.Vector3( center.x - half, center.y - half, center.z + half ),
		new THREE.Vector3( center.x - half, center.y - half, center.z - half ),
		new THREE.Vector3( center.x + half, center.y - half, center.z - half ),
		new THREE.Vector3( center.x + half, center.y - half, center.z + half ),
		new THREE.Vector3( center.x + half, center.y + half, center.z + half ),
		new THREE.Vector3( center.x + half, center.y + half, center.z - half )
	];

	var vec = [
		vec_s[ v0 ],
		vec_s[ v1 ],
		vec_s[ v2 ],
		vec_s[ v3 ],
		vec_s[ v4 ],
		vec_s[ v5 ],
		vec_s[ v6 ],
		vec_s[ v7 ]
	];

	// Recurse iterations
	if ( -- iterations >= 0 ) {

		var tmp = [];

		Array.prototype.push.apply( tmp, hilbert3D( vec[ 0 ], half, iterations, v0, v3, v4, v7, v6, v5, v2, v1 ) );
		Array.prototype.push.apply( tmp, hilbert3D( vec[ 1 ], half, iterations, v0, v7, v6, v1, v2, v5, v4, v3 ) );
		Array.prototype.push.apply( tmp, hilbert3D( vec[ 2 ], half, iterations, v0, v7, v6, v1, v2, v5, v4, v3 ) );
		Array.prototype.push.apply( tmp, hilbert3D( vec[ 3 ], half, iterations, v2, v3, v0, v1, v6, v7, v4, v5 ) );
		Array.prototype.push.apply( tmp, hilbert3D( vec[ 4 ], half, iterations, v2, v3, v0, v1, v6, v7, v4, v5 ) );
		Array.prototype.push.apply( tmp, hilbert3D( vec[ 5 ], half, iterations, v4, v3, v2, v5, v6, v1, v0, v7 ) );
		Array.prototype.push.apply( tmp, hilbert3D( vec[ 6 ], half, iterations, v4, v3, v2, v5, v6, v1, v0, v7 ) );
		Array.prototype.push.apply( tmp, hilbert3D( vec[ 7 ], half, iterations, v6, v5, v2, v1, v0, v3, v4, v7 ) );

		// Return recursive call
		return tmp;

	}

	// Return complete Hilbert Curve.
	return vec;
}

export default ThreeScene