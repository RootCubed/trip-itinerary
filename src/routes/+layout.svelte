<script>
    import { isAdmin } from "$lib/admin.js";
    import { locale } from "$lib/i18n.js";
    import { base } from "$app/paths.js";

    export let data;

    let langs = ["en", "de"];

    $: $isAdmin = data.isAdmin;
</script>

<svelte:head>
    <link rel="icon" href={`${base}/favicon.ico`} />
</svelte:head>

<div class="floating-header">
    {#if $isAdmin}
    <span style="padding: 5px;">admin mode</span>
    {/if}

    {#each langs as lang}
        {#if lang != $locale}
        <button class="lang-btn" on:click={() => $locale = lang} class:active={$locale == lang}>
            {lang}
        </button>
        {/if}
    {/each}
</div>

<slot />

<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
    }

    :global(body) {
        background-color: #fff;
    }

    .floating-header {
        position: absolute;
        top: 0;
        right: 0;
        border-left: 1px solid #eee;
        border-bottom: 1px solid #eee;
        padding: 10px;
    }

    .lang-btn {
        background: none;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: #4848ce;
        text-decoration: underline;
        font-size: inherit;
    }

    .lang-btn.active {
        text-decoration: none;
        color: black;
        cursor: default;
    }

    @media print {
        .floating-header {
            display: none;
        }
    }
</style>