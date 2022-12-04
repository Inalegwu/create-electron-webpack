<script>
  let count = 0;

  const handleClick = () => {
    count += 1;
  };
</script>

<div class="container">
  <h1>{count}</h1>
  <button on:click={handleClick}>Count</button>
</div>

<style>
  .container {
    text-align: center;
    font-family: sans-serif;
  }
</style>
