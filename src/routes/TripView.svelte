<script>
    import { onMount } from "svelte";
    import { base } from "$app/paths";
    import { Trip } from "./trip.js";
    import TripDay from "./TripDay.svelte";

    let tripData;

    onMount(async () => {
        const response = await fetch(base + "/trip");
        tripData = new Trip(await response.text());
    });
</script>

<div>
    {#if tripData}
    {#each tripData.dayData as trip, i}
        <TripDay dayData={trip} dayNum={i + 1} />
    {/each}
    {/if}
</div>

<style>
    div {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
