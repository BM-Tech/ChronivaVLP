<script>
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap/dist/js/bootstrap.min.js';
	import '@fortawesome/fontawesome-free'
	import ListItem from './ListItem.svelte';
	import { onMount } from 'svelte';
	import Popover from './Popover.svelte';
    import Embed from './Embed.svelte';
	// let isOpen
	// let title
	// let message
	// let whiteboardOpen = false;

	// function openWhiteboard() {
	// 	whiteboardOpen = !whiteboardOpen;
	// }

	function handleClick() {
		openModal(Modal, { title: "Alert", message: "This is an alert" })
	}
	export let playlistId
	let API_KEY = 'AIzaSyCiGBVnqNCTOY6MkQ9789zEN-xccNCiVW0';
	
	let videos = []
	let playlistTitle = ""

	let currentSnippet = {}
	let currentUrl = ""
	let currentVideoIndex = 0

	onMount(async () => {
		let hasNextPage = true
		let pageToken = ""
		while(hasNextPage){
			let query = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&type=video&part=snippet&maxResults=200&playlistId=${playlistId}`
			if(pageToken != ""){
				query += `&pageToken=${pageToken}`
			}

			let res = await fetch(query)
			let json = await res.json()
			
			if(json.nextPageToken == undefined){
				hasNextPage = false
			}
			else{
				pageToken = json.nextPageToken
			}
			let pageVideos = await json.items
			videos = videos.concat(pageVideos)
		}

		let res = await fetch(`https://www.googleapis.com/youtube/v3/playlists?key=${API_KEY}&id=${playlistId}&part=id,snippet&fields=items(id,snippet(title,channelId,channelTitle))`)
		let json = await res.json()
		playlistTitle = json.items[0].snippet.title
	})

	function prevVideo(){
		if(currentVideoIndex > 0){
			currentVideoIndex--
		}
	}

	function nextVideo(){
		if(currentVideoIndex < 45){
			currentVideoIndex++
		}
	}

	let coursesPopupOpen = false
	let whiteboardOpen = false
	let calculatorOpen = false
	let graphOpen = false
</script>

<svelte:head>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-HDVL2KXFQM"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'G-HDVL2KXFQM');
	</script>
</svelte:head>

<main>
	<Popover bind:state={whiteboardOpen} btnid="whiteboardbtn">
		<br>
		<Embed name="Whiteboard" url="https://www.web-whiteboard.io/?id=124540&embedToken=e1GF+tS62ojeH2MC0Qk5SJaH1Q6WRWbM"/>
	</Popover>

	<Popover bind:state={calculatorOpen} btnid="calcbtn">
		<br>
		<Embed name="Calculator" url="https://www.desmos.com/scientific"/>
	</Popover>

	<Popover bind:state={graphOpen} btnid="graphbtn">
		<br>
		<Embed name="Graphing Calculator" url="https://www.desmos.com/calculator"/>
	</Popover>

	<!-- <Whiteboard style="display: {(whiteboardOpen) ? 'block' : 'none'}"></Whiteboard> -->
	<header class="d-flex flex-wrap justify-content-center py-2">
		<div class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
			<img src="images/icon.png" alt="logo" class="mx-3 my-0" width=50 style="filter: brightness(50%);">
			<span class="fs-4">Chroniva <strong>Video Learning</strong></span>
		</div>
		
		<ul class="nav nav-pills mx-3 responsivenav">
			<li class="nav-item">
				<!-- <a class="nav-link" href="#3" id="whiteboardbtn" on:click={()=>{whiteboardOpen = !whiteboardOpen}}>Whiteboard</a> -->
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" href="#e" on:click={()=>{coursesPopupOpen = !coursesPopupOpen}}>
					Courses
				</a>
				<div class="dropdown-menu" style="display: {coursesPopupOpen ? 'block' : 'none'}">
					<a class="dropdown-item" href="?id=PL9i49hRn8Tk8qD2QxNyR_0TvllCrYNG23">Algebra 1</a>
					<a class="dropdown-item" href="?id=PL9i49hRn8Tk__52_QOHR9kPRACamrDI9x">Calculus 1 & 2</a>
					<a class="dropdown-item" href="?id=PL9i49hRn8Tk_GzyIT3lRuxScc_8_zY3ie">Calculus 3</a>
					<a class="dropdown-item" href="?id=PL9i49hRn8Tk9gBajSZZ__IyETOy2dYEu3">Intro to Programming</a>
					<a class="dropdown-item" href="?id=PL9i49hRn8Tk9LPKr_4Hi0mZe9F7Jky2V9">Basics of Python</a>
					<a class="dropdown-item" href="?id=PL9i49hRn8Tk-xng87BBwAdS55rxVHryZQ">Quick Economics</a>
					<a class="dropdown-item" href="?id=PL9i49hRn8Tk9rfqi90SnUowhv5KiI3GAr">Intro to Music Theory</a>
					<a class="dropdown-item" href="?id=PL9i49hRn8Tk-JP81La-k0N9dl1zwy1VWv">Physics</a>
					<a class="dropdown-item" href="?id=PL9i49hRn8Tk-sGLWDBPpTtTQHQGSVnToa">Chemistry</a>
				</div>
			</li>
			<li class="nav-item"><a href="https://chroniva.com/" class="nav-link">Chroniva Home</a></li>
			<li class="nav-item"><a href="https://www.youtube.com/channel/UCBgFYIAmYq2YqO_ghdsHToA" class="nav-link">Youtube</a></li>
		</ul>
	</header>

	<nav class="navbar navbar-light justify-content-between px-2 py-0 border-top border-bottom">
		<div class="d-flex mt-3">
			<strong class="px-2">{playlistTitle}</strong>
			<p class="px-2">{videos.length} Lessons</p>
		</div>
		<form class="form-inline d-flex">
			<button class="btn btn-success mx-1" on:click|preventDefault={prevVideo}>Previous</button>
			<button class="btn btn-success mx-3" on:click|preventDefault={nextVideo}>Next</button>
		  	<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
		  	<button class="btn btn-secondary my-2 mx-2 my-sm-0" type="submit">Search</button>
		</form>
	</nav>
	
	<div class="d-flex">
		<div class="d-flex flex-column align-items-stretch flex-shrink-0" style="border-right:1px solid lightgray">
			<div class="list-group list-group-flush border-bottom" style="overflow-y: auto; height: 90vh; width: 380px;">
				{#each videos as video}
					<ListItem 
						snippet={video.snippet}
						first={video === videos[0]}
						url={video.snippet.resourceId.videoId}
						index={video.snippet.position}
						bind:currentSnippet={currentSnippet}
						bind:currentUrl={currentUrl}
						bind:currentVideoIndex={currentVideoIndex}>
					</ListItem>
				{:else}
					<p>Loading...</p>
				{/each}

				<!-- <div class="d-flex flex-row align-items-center justify-content-center position-absolute w-100">
				</div> -->
			</div>
		</div>

		<div style="width: 100%; height: 80vh; overflow-y:auto" class="px-3 py-3">

			{#if currentSnippet != {}}
				<iframe style="width:100%; height:70%" src="https://www.youtube.com/embed/{currentUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				<h1>{currentSnippet.title}</h1>
				<p>{currentSnippet.description}</p>
			{:else}
				<p>Loading...</p>
			{/if}

			<div class="footer fixed-bottom p-3 m-1 ms-auto rounded" style="width:max-content;">
				<button id="whiteboardbtn" on:click={()=>{whiteboardOpen = !whiteboardOpen}} class="btn btn-float fab btn-primary mx-1"><i class="fa-solid fa-chalkboard"></i></button>
				<button id="calcbtn" on:click={()=>{calculatorOpen = !calculatorOpen}} class="btn btn-float fab btn-primary mx-1"><i class="fa-solid fa-calculator"></i></button>
				<button id="graphbtn" on:click={()=>{graphOpen = !graphOpen}} class="btn btn-float fab btn-primary mx-1"><i class="fa-solid fa-chart-line"></i></button>
				
<!-- 
				<br>
				<small>powered by <a href="#e" class="text-link">BM Tech</a></small> -->

			</div>
		</div>
	</div>

</main>
