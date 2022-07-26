<script>
    export let snippet = {}
    export let currentSnippet = {}
    export let currentVideoIndex = 0
    export let index = 0
    export let url = ""
    export let currentUrl = ""
    export let first = false

    function selectVideo(){
        currentSnippet = snippet
        currentUrl = url
        currentVideoIndex = index
    }

    if(first){
        selectVideo()
    }

    $: {
        if (currentVideoIndex == index){
            selectVideo()
        }
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
</a>