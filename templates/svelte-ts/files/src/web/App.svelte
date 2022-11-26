<script lang="ts">
	let count = 0;

	const handleClick = () => {
		count += 1;
	}

  $: {
    window.myAPI.updateTitle(count);
  }
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
