<script>
    import { scale } from 'svelte/transition'
    export let state = false
    export let btnid = ""
    function toggleState(){
        state = !state
    }

    window.addEventListener('click', function(e){   
        // try{
        //     if (!document.getElementById('content').contains(e.target) && e.target.id != btnid) {
        //         state = false
        //     }
        // } catch(e){
        //     // state = true
        // }
    });
</script>

<div style="display: {(state) ? 'block' : 'none'}">
    <main transition:scale>
        <div class="content" id="content">
            <a class="right" href="#/" role="button" on:click|preventDefault={toggleState}>Close</a>
            <slot></slot>
        </div>
    </main>
</div>

<style>
    main {
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    .content {
        background-color: #ffffff;
        margin: 15% auto;
        padding: 20px;
        padding-top: 10px;
        width: 80%;
        max-width: fit-content;
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
        border-radius: 5px;
    }

    .right {
        float: right;
    }
</style>