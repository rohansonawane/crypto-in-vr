     /**
     * Spatial Window component for A-Frame.
     */
    AFRAME.registerComponent('spatial-hero-image', {
      schema: {
          color: {type: 'color', default: '#fff'},
          width: {default: 1, min: 0},
          height: {default: 1, min: 0},
          focused: {default: true},
          roundCorners: {default: true},
          src: {type: 'map'}
      },
  
      init: function () {
          var data = this.data;
          var borderRadius = data.roundCorners ? 0.05 : 0.01;
          var geometry = this.geometry = SPATIAL.utils.generatePlaneGeometryIndexed(data.width, data.height, borderRadius, 22);
          var material = this.material = new THREE.MeshBasicMaterial({color: new THREE.Color(data.color)});
          this.el.sceneEl.systems.material.loadTexture(data.src, {src: data.src}, function textureLoaded (texture) {
          material.map = texture;
          texture.colorSpace = THREE.SRGBColorSpace;
          });
          this.plane = new THREE.Mesh(geometry, material);
          this.el.setObject3D('mesh', this.plane);
      }
      });

    //  // Get the laser pointer and the box
    //  const pointer = document.querySelector('#pointer');
    //  const box = document.querySelector('#box');
   
    //  // Get the textbox and set its visibility to false
    //  const textbox = document.querySelector('#textbox');
    //  textbox.setAttribute('visible', false);
   
    //  // Add an event listener to the laser pointer that listens for the `hit` event
    //  pointer.addEventListener('hit', (event) => {
    //    // Check if the object that was hit is the box
    //    if (event.detail.target.id === 'box') {
    //      // If it is, show the textbox
    //      textbox.setAttribute('visible', true);
    //    }
    //  });
  
     // Get references to the controllers and the teleport cursor
  const leftController = document.querySelector('#leftController');
  const rightController = document.querySelector('#rightController');
  const teleportCursor = document.querySelector('#teleportCursor');
  
  // Set up an event listener for when the user grips the controllers
  leftController.addEventListener('gripdown', handleGripDown);
  rightController.addEventListener('gripdown', handleGripDown);
  
  function handleGripDown() {
    // Show the teleport cursor
    teleportCursor.setAttribute('visible', true);
  
    // Set up an event listener for when the user releases the grip on the controllers
    leftController.addEventListener('gripup', handleGripUp);
    rightController.addEventListener('gripup', handleGripUp);
  }
  
  function handleGripUp() {
    // Hide the teleport cursor
    teleportCursor.setAttribute('visible', false);
  
    // Get the intersection point between the teleport cursor and the teleportable area
    const intersectedElement = teleportCursor.components.cursor.intersectedEl;
    if (intersectedElement && intersectedElement.id === 'teleportArea') {
      // Teleport the user to the intersection point
      const intersectionPoint = teleportCursor.components.cursor.intersection;
      const camera = document.querySelector('[camera]');
      camera.setAttribute('position', intersectionPoint);
    }
  
    // Remove the event listeners for grip up
    leftController.removeEventListener('gripup', handleGripUp);
    rightController.removeEventListener('gripup', handleGripUp);
  }