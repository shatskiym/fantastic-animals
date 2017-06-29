const initState = {
  terrainDiff: '?',
  terrainType: '?',
  terrainNumber: 0
};

export default function previewTerrain (state = initState, action) {
  if (action.type === 'CHANGE_TERRAIN_FOR_PREVIEW') {
    return {
      terrainDiff: action.payload.terrainDiff,
      terrainType: action.payload.terrainType,
      terrainNumber: action.payload.terrainNumber
    }
  }
  return state;
}
