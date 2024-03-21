import state from "./state.js"
import * as el from "./elements.js"
import { reset } from "./actions.js"
import { kitchenTimer } from "./sounds.js"

export function countDown() {
  clearTimeout(state.countDownId)

  if (!state.isRunning) { // momento de parada
    return
  }

  let minutes = Number(el.minutes.textContent)
  let seconds = Number(el.seconds.textContent)
  seconds-- //decrementando

  if (seconds < 0) {
    seconds = 59
    minutes--
  }

  if (minutes < 0) {
    reset()
    kitchenTimer.play() // emitindo som
    return
  }

  updateDisplay(minutes, seconds)
  // recursao -> chama a propria funcao, porem tem que ter parada
  state.countDownId = setTimeout(() => countDown(), 1000) //excecuta uma função em determinado tempo
}

export function updateDisplay(minutes, seconds) {
  minutes = minutes ?? state.minutes   //nullish coalesing operator
  seconds = seconds ?? state.seconds

  el.minutes.textContent = String(minutes).padStart(2, "0")
  el.seconds.textContent = String(seconds).padStart(2, "0")
}