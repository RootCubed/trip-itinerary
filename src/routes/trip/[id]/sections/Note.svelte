<script>
    import { t } from "$lib/i18n.js"

    export let legData = {
        title: "",
        details: ""
    };
    
    export let isEditing = false;
</script>

<div class="component">
{#if !isEditing}
<h3>{legData.title}</h3>
<span>{legData.details}</span>
{:else}
<!-- svelte-ignore a11y-autofocus -->
<input type="text" name="title" bind:value="{legData.title}" placeholder="{$t("title")}" required autofocus />
<textarea name="details" placeholder="{$t("details")}" bind:value={legData.details} required></textarea>
{/if}
</div>

<style>
    .component {
        margin-bottom: 20px;
        text-align: center;
        padding: 10px 20px;
        
        display: grid;
        grid-template-areas: 
            "title"
            "content";

        grid-template-columns: auto;
        grid-template-rows: 40px auto;
        row-gap: 5px;
        align-items: center;
    }

    h3 {
        margin-top: 20px;
    }
</style>
