<script>
    import TripRoute from "./TripRoute.svelte";
    import CityInfo from "./CityInfo.svelte";
    import { getTimeStr } from "./utils.js";

    export let dayData;
    export let dayNum;

    let travelTime = dayData.reduce((acc, trip) => {
        if (trip.townVisit) return acc;
        return acc + trip.durationMin;
    }, 0);

    let cantons = dayData
        .filter((trip) => trip.townVisit)
        .map((trip) => trip.townVisit.match(/\(([^)]+)\)/)[1]);
</script>

<div class="top">
    <div class="day-header">
        <h2>Tag {dayNum}: {cantons.join(", ")}</h2>
        <span class="travel-time">{getTimeStr(travelTime)} Reisezeit</span>
    </div>
    <div class="day-content">
        {#each dayData as trip}
            {#if trip.townVisit}
                <CityInfo {...trip} />
            {:else}
                <TripRoute {...trip} />
            {/if}
        {/each}
    </div>
</div>

<style>
    .top {
        background-color: #fff;
        margin-bottom: 20px;

        width: 100%;
        max-width: 1000px;

        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .day-header {
        position: sticky;
        top: 0;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        padding: 20px;
        z-index: 2;
    }
</style>
