<script>
  import Button from './Button.svelte';

  const interval = 999;
  const startTime = '00:00:00';

  export let time = startTime;

  let reference = undefined;
  let paused = true;
  let started = false;

  const start = () => {
    const split = time.split(':');
    let h = Number.parseInt(split[0]);
    let m = Number.parseInt(split[1]);
    let s = Number.parseInt(split[2]);

    s = s + 1;

    if (s === 60) {
      m = m + 1;
      s = 0;
    }

    if (m === 60) {
      h = h + 1;
      m = 0;
    }

    s = s.toString().padStart(2, '0');
    m = m.toString().padStart(2, '0');
    h = h.toString().padStart(2, '0');

    time = `${h}:${m}:${s}`;
  };
  
  const handleStart = () => {
    if (!started) {
      reference = setInterval(start, interval);
      started = true;
    }
  };

  const handlePause = () => {
    if (started) {
      if (paused) {
        clearInterval(reference);
      } else {
        reference = setInterval(start, interval);
      }

      paused = !paused;
    }
  };

  const handleStop = () => {
    if (started) {
      clearInterval(reference);
      time = startTime;
      started = false;
    }
  };
</script>

<div class="stopwatch" class:running={started}>
  <span class="timer">
    {time}
  </span>
  <Button
    type="start"
    label="Start"
    on:startTimer={handleStart}
  ></Button>
  <Button
    type="pause"
    label="Pause/Resume"
    on:pauseTimer={handlePause}
  ></Button>
  <Button
    type="stop"
    label="Stop"
    on:stopTimer={handleStop}
  ></Button>
</div>

<style>
  .stopwatch {
    text-align: center;
    padding: 30px;
    margin: 30px;
    background-color: azure;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, .05);
    box-shadow: 0 5px 15px rgba(0, 0, 0, .1);
  }

  .timer {
    display: block;
    font-variant-numeric: tabular-nums;
    margin-bottom: 15px;
  }

  .running {
    background-color: aqua;
  }
</style>