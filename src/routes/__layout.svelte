<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import "../app.scss";

    $: path = $page.url.pathname.substring($page.url.pathname.lastIndexOf("/"));
    let location = "";
    let api_key = "808605ecfeb37d6547902fa8c8cfa8b7";

    
    onMount(() => {
        // initialize input fields
        document.querySelectorAll(".form-outline").forEach((formOutline) => {
            new mdb.Input(formOutline).init();
        });
    });

    function getLocations(){
        let res = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=london&appid=${api_key}&limit=8`);
    }

</script>

<nav class="navbar navbar-expand-md navbar-dark fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">The Forecaster</a>
        <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <i class="bi bi-list" />
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto">
                <li class="nav-item">
                    <a class="nav-link {path === '/' ? 'active' : ''}" aria-current="page" href="/"
                        >Home</a
                    >
                </li>
                <li class="nav-item">
                    <a class="nav-link {path === '/about' ? 'active' : ''}" href="/about">About</a>
                </li>
            </ul>
            <form class="d-flex" role="search" on:submit|preventDefault={goto("/city/" + location)}>
                <div class="form-outline form-white me-2">
                    <input class="form-control"
                    id="search-input"
                    type="search"
                    aria-label="Search" 
                    required="true"
                    bind:value={location}
                    />
                    <label class="form-label" for="search-input">City name</label>
                </div>
                <a type="submit" href=/city/{location} sveltekit:prefetch class="btn btn-outline-light">Search</a>
            </form>
        </div>
    </div>
</nav>

<slot />

<style lang="scss">
    .navbar {
        background-color: rgba(29, 29, 29, 0.452);
        backdrop-filter: blur(6px);
    }
</style>
