<script>
  export let name
  export let url
</script>

<iframe src={url} title={name} allowfullscreen="true"></iframe>

<style>
  iframe{
    width: 75vw;
    height: 70vh;
    border: none;
  }
</style>