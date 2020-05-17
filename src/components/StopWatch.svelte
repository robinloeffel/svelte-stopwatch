<script>
  import Button from './Button.svelte';

  export let time = '00:00:00';

  const interval = 1000;
  const startTime = '00:00:00';

  let reference = undefined;
  let paused = true;
  let started = false;

  const start = () => {
    const split = time.split(':');
    let h = Number.parseInt(split[0]);
    let m = Number.parseInt(split[1]);
    let s = Number.parseInt(split[2]);

    s = s + 1 === 60 ? 0 : s + 1;
    m = s === 59 ? m + 1 : m;
    h = m === 59 ? h + 1 : h;

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
    clearInterval(reference);
    time = startTime;
    started = false;
  };
</script>

<div class="stopwatch">
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
  .timer {
    display: block;
  }
</style>