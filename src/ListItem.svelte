<script>
    export let title = "Video Title"
    export let description = "Video Description"
    export let thumbnail = ""
    export let id = ""
    export let currentVideo
    export let currentTitle
    export let currentDescription
    export let first = false

    function selectVideo(){
        currentVideo = id
        currentDescription = description
        currentTitle = title
    }

    if(first){
        selectVideo()
    }
</script>

<a href="#e" 
   class="list-group-item 
          list-group-item-action 
          {currentVideo == id ? "active" : ""} 
          py-3 
          lh-tight"
   aria-current="true"
   on:click={selectVideo}>
    <div class="d-flex">
        <img src={thumbnail} alt="" style="width: 130px;" class="mb-2 rounded">
        <strong class="mb-1 mx-2">{title}</strong>
    </div>
    <div class="col-10 mb-1 small">{description}</div>
</a>