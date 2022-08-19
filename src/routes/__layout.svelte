<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import "../app.scss";

    $: path = $page.url.pathname.substring($page.url.pathname.lastIndexOf("/"));
    let query = "";
    let api_key = "808605ecfeb37d6547902fa8c8cfa8b7";
    let popup;
    
    onMount(() => {
        // initialize input fields
        document.querySelectorAll(".form-outline").forEach((formOutline) => {
            new mdb.Input(formOutline).init();
        });
        
        document.onclick = (e) => {
            // check if the clicked target is a ul or a li
            let classlist = e.target.classList;
            if ((classlist.contains("popup") || classlist.contains("popup-btn")) == false){
                popup.style.display = "none";
            }
            else if (query === ""){
                popup.style.display = "none"
            }
            else {
                popup.style.display = "block";
            }
        };
    });

    async function getLocations() {
        let res = await fetch(
            `https://pro.openweathermap.org/geo/1.0/direct?q=${query}&appid=${api_key}&limit=8`
        );
        let data = await res.json();

        if (res.ok) {
            return data;
        } else {
            throw new Error(data);
        }
    }

    let promise;

    function handleClick() {
        popup.classList.remove("hide");
        if (query !== "")
        promise = getLocations();
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

            <form class="d-flex" role="search" on:submit|preventDefault={handleClick}>
                <div class="search-container">
                    <div class="form-outline form-white me-2">
                        <input
                            class="form-control"
                            id="search-input"
                            type="search"
                            aria-label="Search"
                            required="true"
                            bind:value={query}
                        />
                        <label class="form-label" for="search-input">City name</label>
                    </div>
                    <ul class="list-group search-dropdown-menu popup" bind:this={popup}>
                    {#if promise != undefined}
                        {#await promise}
                            <!-- <p>...waiting</p> -->
                        {:then data}
                                {#each data as location}
                                    <li class="list-group-item popup-item">
                                        <a
                                            href={`/city/${query}?lat=${location.lat}&lon=${location.lon}`}
                                            class="link-light popup-item"
                                            >{location.name}, {location.country}</a
                                        >
                                    </li>
                                {/each}
                                {:catch error}
                                <p style="color: red">{error.message}</p>
                                {/await}
                                {/if}
                            </ul>
                            </div>

                <button type="submit" class="btn btn-outline-light popup-btn" on:click={handleClick}>
                    Search</button>

            </form>
        </div>
    </div>
</nav>

<slot />

<style lang="scss">
    .link-light {
        color: #f9f9f9 !important;
        &:hover {
            color: #bbbbbb !important;
        }
    }
    .navbar {
        background-color: rgba(29, 29, 29, 0.452);
        backdrop-filter: blur(6px);
    }
    .search-container {
        position: relative;
    }
    .search-dropdown-menu {
        display: block;
        position: absolute;
        left: 0;
        width: 100%;
        top: 2.3rem;
    }
    .hide {
        display: none !important;
    }
</style>
