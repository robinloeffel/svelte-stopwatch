<script>
  import { createEventDispatcher } from 'svelte';

  const dispatcher = createEventDispatcher();

  export let label = 'I\'m button';
  export let type = 'pause';

  const startTimer = () => {
    dispatcher('startTimer');
  };

  const stopTimer = () => {
    dispatcher('stopTimer');
  };

  const pauseTimer = () => {
    dispatcher('pauseTimer');
  };

  const handler = () => {
    if (type === 'start') {
      startTimer();
    }

    if (type === 'stop') {
      stopTimer();
    }

    if (type === 'pause') {
      pauseTimer();
    }
  };
</script>

<button
  class="{type}"
  on:click="{handler}"
>
  {label}
</button>

<style>
  button {
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 5px;
    padding: 10px 15px;
    background-color: goldenrod;
    color: white;
    cursor: pointer;
  }

  .start {
    background-color: darkseagreen;
  }

  .stop {
    background-color: darksalmon;
  }

  .pause {
    background-color: cornflowerblue;
  }
</style>