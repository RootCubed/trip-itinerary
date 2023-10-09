<script>
    import TripSelection from "./TripSelection.svelte";
    import { isAdmin } from "$lib/admin.js"
    import { base } from "$app/paths";
    import { t } from "$lib/i18n.js";

    export let data;
</script>

<svelte:head>
    <title>Trip Viewer</title>
</svelte:head>
<div id="app">
    {#if $isAdmin}
        <h1>{$t("create_new_trip")}</h1>
        <form action="{base}/trip/new" method="get">
            <input type="text" name="name" placeholder="Trip Name" required />
            <button type="submit">{$t("create")}</button>
        </form>
    {/if}
    <h1>{$t("trip_list")}</h1>
    <TripSelection tripList={data.tripList} />
    {#if !$isAdmin}
    <span>{$t("non_admin_note")}</span>
    {/if}
</div>

<style>
    #app {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }

    h1 {
        margin-top: 20px;
    }

    form {
        padding: 10px;
    }

    input, button {
        padding: 5px 10px;
        border-radius: 5px;
        border: none;
        background-color: #eee;
        color: black;
    }
</style>
