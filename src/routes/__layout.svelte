<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import '../app.scss';

	$: path = $page.url.pathname.substring($page.url.pathname.lastIndexOf('/'));
	let location;
	function onSubmit() {
        // uncapiatlize the first letter of the location
		goto(`/${location.toString().toLowerCase()}`);
	}
</script>
<nav class="navbar navbar-expand-lg bg-light fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">Weather app</a>
		<button
        class="navbar-toggler"
        type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<a class="nav-link {path === '/' ? 'active' : ''}" aria-current="page" href="/">Home</a>
				</li>
				<li class="nav-item">
					<a class="nav-link {path === '/about' ? 'active' : ''}" href="/about">About</a>
				</li>
			</ul>
			<form class="d-flex" role="search" on:submit|preventDefault={onSubmit}>
				<input
					class="form-control me-2"
					type="search"
					placeholder="City name"
					aria-label="Search"
					bind:value={location}
                    />
                    <btn class="btn btn-outline-primary" on:click={onSubmit} type="submit">Search</btn>
			</form>
		</div>
	</div>
</nav>

<slot />
