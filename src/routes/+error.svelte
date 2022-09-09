<script>
    import { page } from "$app/stores"
</script>

<div class="mt-5" />
<div class="container text-center">
    <h1>
        Error {$page.status}
    </h1>
    {#if $page.status == 404}
    {#if $page.error.message == "City not found"}
        <p>City not found</p>
    {:else}
        <p>Page not found</p>
    {/if}
    {:else}
        <p>{$page.error.message}</p>
    {/if}
    <a href="/" class="btn btn-primary btn-rounded">go back</a>
</div>
<div class="spacer" />
<div class="spacer" />

<style lang="scss">
    h1 {
        font-size: 5rem;
    }
    p {
        font-size: 1.3rem;
        font-weight: 500;
    }
    a {
        color: white;
    }
</style>
