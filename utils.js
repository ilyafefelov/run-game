export function drawStatus(context, input, player) {
  context.font = "27px Arial";
  context.fillText("Last key: " + input.lastKey, 20, 50);
  context.fillText("Active State: " + player.currentState.state, 20, 90);
}
