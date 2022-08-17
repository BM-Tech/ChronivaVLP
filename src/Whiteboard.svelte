<script context="module">
    const modalList = []
</script>
<script>
    import { booleanStore } from './booleanStore'
    const store = booleanStore(false)
    const { isOpen, open, close } = store
    function keydown(e) {
        e.stopPropagation()
        if (e.key === "Escape") {
            close()
        }
    }
    function transitionend(e) {
        const node = e.target
        node.focus()
    }
    function modalAction(node) {
        const returnFn = []
        if (document.body.style.overflow !== 'hidden') {
            const original = document.body.style.overflow 
            document.body.style.overflow = 'hidden'
            returnFn.push(() => {
                document.body.style.overflow = original
            })
        }
        node.addEventListener('keydown', keydown)
        node.addEventListener('transitionend', transitionend)
        node.focus()
        modalList.push(node)
        returnFn.push(() => {
            node.removeEventListener('keydown', keydown)
            node.removeEventListener('transitionend', transitionend)
            modalList.pop()
            modalList[modalList.length - 1]?.focus()
        })
        return {
            destroy: () => returnFn.forEach((fn) => fn()),
        }
    }
</script>
<style>
    div.modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 1;
    }

    div.modal:not(:focus-within) {
      transition: opacity 0.1ms;
      opacity: 0.99;
    }

    div.backdrop {
      background-color: rgba(0, 0, 0, 0.4);
      position: absolute;
      width: 100%;
      height: 100%;
    }

    div.content-wrapper {
      z-index: 10;
      max-width: 70vw;
      border-radius: 0.3rem;
      background-color: white;
      overflow: hidden;
      padding: 1rem;
    }

    div.content {
      max-height: 50vh;
      overflow: auto;
    }

    h1 {
      opacity: 0.5;
    }
    
</style>
<slot name="trigger" {open}>
    <button on:click={open}>Open</button>
</slot>
{#if $isOpen}
    <div class="modal" use:modalAction tabindex="0">
      <div class="backdrop" on:click={close} />
      <div class="content-wrapper">
        <slot name="header" {store}>
          <div>
            <h1>Whiteboard</h1>
          </div>
        </slot>
        <div class="content">
          <slot name="content" {store} />
        </div>
        <slot name="footer" {store}>
          <div>
            <h1>Whiteboard</h1>
            <button on:click={close}>Close Whiteboard</button>
          </div>
        </slot>
      </div>
    </div>
{/if}