<script>
    import { createEventDispatcher } from "svelte";
    import { t } from "$lib/i18n.js"

    const dispatcher = createEventDispatcher();

    function makeComponent(type) {
        dispatcher("addLeg", {type});
    }
    
    const componentI18nKeys = {
        "pt": "pt-ride",
        "note": "note"
    };
</script>

<div id="component">
    <span>{$t("add")}</span>
    <div id="component-types">
        {#each Object.keys(componentI18nKeys) as id}
            <button on:click={() => makeComponent(id)}>{$t(componentI18nKeys[id])}</button>
        {/each}
    </div>
</div>

<style>
    #component {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #d5e3f3;
        padding: 10px;
    }

    #component span {
        font-size: 1.2em;
        font-weight: bold;
    }

    #component-types button {
        appearance: none;
        -webkit-appearance: none;
        padding: 10px;
        border-radius: 5px;
        margin: 5px;
        height: min-content;
        border: none;
        color: black;
        cursor: pointer;
    }
</style>
