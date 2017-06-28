const initState = {
  terrainDiff: '?',
  terrainType: '?'
};

export default function previewTerrain (state = initState, action) {
  if (action.type === 'CHANGE_TERRAIN_FOR_PREVIEW') {
    return {
      terrainDiff: action.payload.terrainDiff,
      terrainType: action.payload.terrainType
    }
  }
  return state;
}
