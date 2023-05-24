const calculateTetrahedronPositions = () => {
  const positions = [];
  const layers = [
    { vertexPoints: 1, edgePoints: 0, facePoints: 0 },
    { vertexPoints: 4, edgePoints: 6, facePoints: 10 },
    { vertexPoints: 4, edgePoints: 12, facePoints: 24 },
    { vertexPoints: 4, edgePoints: 18, facePoints: 42 },
  ];

  const tetrahedronVertices = [
    new THREE.Vector3(1, 1, 1),
    new THREE.Vector3(1, -1, -1),
    new THREE.Vector3(-1, 1, -1),
    new THREE.Vector3(-1, -1, 1),
  ];

  const radius = 8;
  const edgeLength = 2 * radius / Math.sqrt(2);

  for (let layer = 0; layer < layers.length; layer++) {
    const { vertexPoints, edgePoints, facePoints } = layers[layer];
    const scaleFactor = layer * edgeLength / 2;

    for (let i = 0; i < vertexPoints; i++) {
      const vertexPosition = tetrahedronVertices[i].clone().multiplyScalar(scaleFactor);
      positions.push(vertexPosition);
    }

    for (let i = 0; i < edgePoints; i++) {
      const edgeIndex = Math.floor(i / (edgePoints / 6));
      const startPoint = tetrahedronVertices[edgeIndex % 4];
      const endPoint = tetrahedronVertices[(edgeIndex + 1) % 4];
      const t = (i % (edgePoints / 6) + 1) / ((edgePoints / 6) + 1);
      const edgePosition = new THREE.Vector3().lerpVectors(startPoint, endPoint, t).multiplyScalar(scaleFactor);
      positions.push(edgePosition);
    }

    for (let i = 0; i < facePoints; i++) {
      const faceIndex = Math.floor(i / (facePoints / 4));
      const v1 = tetrahedronVertices[faceIndex];
      const v2 = tetrahedronVertices[(faceIndex + 1) % 4];
      const v3 = tetrahedronVertices[(faceIndex + 2) % 4];
      const divisions = Math.sqrt(facePoints / 4);
      const step = i % (facePoints / 4);
      const u = (step % divisions) / divisions;
      const v = Math.floor(step / divisions) / divisions;
      const facePosition = new THREE.Vector3().addScaledVector(v1, 1 - u - v).addScaledVector(v2, u).addScaledVector(v3, v).multiplyScalar(scaleFactor);
      positions.push(facePosition);
    }
  }

  return positions;
};

export default calculateTetrahedronPositions;
