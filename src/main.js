import './global.css';

import App from './App.svelte';

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
let playlistId = urlParams.get('id')
if (playlistId == null) {
	playlistId = "PL9i49hRn8Tk8qD2QxNyR_0TvllCrYNG23"
}

const app = new App({
	target: document.body,
	props: {
		playlistId: playlistId
	}
});

export default app;
