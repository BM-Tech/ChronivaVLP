<script>
    export let snippet = {}
    export let currentSnippet = {}
    export let url = ""
    export let currentUrl = ""
    export let first = false

    function selectVideo(){
        currentSnippet = snippet
        currentUrl = url
    }

    if(first){
        selectVideo()
    }
</script>

<a href="#e" 
   class="list-group-item 
          list-group-item-action 
          {snippet == currentSnippet ? "active" : ""} 
          py-3 
          lh-tight"
   aria-current="true"
   on:click={selectVideo}>
    <div class="d-flex">
        <img src={snippet.thumbnails.medium.url} alt="" style="width: 130px;" class="mb-2 rounded">
        <strong class="mb-1 mx-2">{snippet.title}</strong>
    </div>
    <!-- <div class="col-10 mb-1 small">{description}</div> -->
</a>