import './global.css';

import App from './App.svelte';

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const playlistId = urlParams.get('id')

const app = new App({
	target: document.body,
	props: {
		playlistId: playlistId
	}
});

export default app;
