import { controls } from "./elements.js";
import * as actions from "./actions.js";
import * as el from "./elements.js"
import state from "./state.js";
import { updateDisplay } from "./timer.js";

export function registerControls() {
  controls.addEventListener('click', (e) => {
    const action = e.target.dataset.action
    if (typeof actions[action] != "function") { //verifica se for undefined
      return;
    }
    actions[action]()
  })
}

export function setMinutes() {
  el.minutes.addEventListener('focus', () => {
    el.minutes.textContent = ""
  })
  el.minutes.onkeypress = (e) => /\d/.test(e.key) //verifica para aceitar somente numeros

  el.minutes.addEventListener('blur', (e) => {
    let time = e.currentTarget.textContent
    console.log(time);
    time = time > 60 ? 60 : time
    state.minutes = time
    state.seconds = 0
    updateDisplay()
    el.minutes.removeAttribute('contenteditable')

  })
}