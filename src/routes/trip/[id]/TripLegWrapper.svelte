<script>
    import { t } from "$lib/i18n";
    import { createEventDispatcher } from "svelte";
    import { slide } from "svelte/transition";

    export let isEditing = false;
    export let canEdit = false;
    
    const dispatcher = createEventDispatcher();
    
    $: if (!isEditing) {
        dispatcher("editDone");
    }
</script>

<div class="component" transition:slide>
    {#if isEditing}
    <form class="edit-form" on:submit|preventDefault={() => isEditing = false}>
        <slot />
        <div id="edit-buttons">
            <button type="submit" on:click={() => isEditing = !isEditing}>{$t("save")}</button>
        </div>
    </form>
    {:else}
    <div>
        <slot />
    </div>
    {#if canEdit}
    <div id="edit-buttons">
        <button style="background-color: #eaea10" on:click={() => isEditing = !isEditing}>E</button>
        <button style="background-color: #f66" on:click={() => dispatcher("deleteLeg")}>D</button>
    </div>
    {/if}
    {/if}
</div>

<style>
    .component {
        margin-top: 10px;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto;
        align-items: center;
        page-break-inside: avoid;

        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    }

    .edit-form {
        background-color: #f0e2a5;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto;
    }

    #edit-buttons {
        height: 100%;
        padding: 10px;
        display: flex;
        flex-direction: row;
        gap: 5px;
        align-items: center;
    }

    #edit-buttons button {
        padding: 10px;
        border-radius: 5px;
        height: min-content;
        border: none;
        color: black;
        cursor: pointer;
    }

</style>
