const initState = {
  diceResult: 0,
  searchResult: 0,
  diceRolled: false
};

export default function animalsSearch (state = initState, action) {
  if (action.type === 'ROLL_DICE') {
    return {
      diceResult: action.payload.diceRes,
      searchResult: action.payload.searchRes,
      diceRolled: true
    }
  } else if (action.type === 'RESET_DICE_RESULT') {
    return initState;
  }
  return state;
}
