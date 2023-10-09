<script>
    import SbbIcon from "./SbbIcon.svelte";
    import { hmToMin } from "$lib/utils.js";
    import { t } from "$lib/i18n";

    export let legData = {
        departure: {
            time: "00:00",
            location: ""
        },
        arrival: {
            time: "00:00",
            location: ""
        },
        vehicle: {
            type: "bus",
            name: "",
            direction: ""
        },
        stations: "",
        notes: ""
    };

    export let isEditing;

    let departure = legData.departure;
    let arrival = legData.arrival;
    let vehicle = legData.vehicle;

    const PT_TYPES = {
        "bus": "Bus",
        "train": "Zug",
        "tram": "Tram"
    };

    const ICON_LOOKUP = {
        "bus": "picto/bus-right",
        "train": "picto/train-right",
        "tram": "picto/tram-right"
    };

    let durationMin, travelIcon;

    $: if (!isEditing) {
        durationMin = hmToMin(arrival.time) - hmToMin(departure.time);
        if (durationMin < 0) durationMin += 24 * 60;
        travelIcon = ICON_LOOKUP[vehicle.type];
    }
</script>

{#if !isEditing}
<div class="component">
    <span class="indicator-start"></span>
    <span class="indicator-end"></span>

    <span style="grid-area: dep-time; text-align: right;">{departure.time}</span>
    <span style="grid-area: dep-loc;">{departure.location}</span>
    <span class="duration">{durationMin}'</span>
    <div style="grid-area: travel-info;">
        <div class="travel-info">
            <SbbIcon name="{travelIcon}" />
            {#if vehicle.name.startsWith("{")}
                <SbbIcon name="icons/{vehicle.name.slice(1, -1)}" />
            {:else}
                <span class="vehicle-name">{vehicle.name}</span>
            {/if}
            <span class="vehicle-dir">{$t("train_direction", vehicle.direction)}</span>
        </div>
    </div>
    <span style="grid-area: arr-time; text-align: right;">{arrival.time}</span>
    <span style="grid-area: arr-loc;">{arrival.location}</span>
</div>
<div class="additional-info">
    {#if legData.stations}
    <div style="grid-area: stations; border-top: 1px solid #eee; margin-top: 5px; padding-top: 5px;">
        <span style="font-weight: bold;">{$t("visited_stations")}</span>
        {#each legData.stations.split(/, */g) as station}
            <span class="station-visit">{station}</span>
        {/each}
    </div>
    {/if}
    {#if legData.notes}
    <div style="grid-area: notes; margin-top: 5px; padding-top: 5px;">
        <p style="font-weight: bold;">{$t("notes")}</p>
        {legData.notes}
    </div>
    {/if}
</div>
{:else}
<div class="component component-editing">
    <div style="grid-area: dep-time;">
        <label for="input-dep-time">{$t("departure_time")}</label><br>
        <!-- svelte-ignore a11y-autofocus -->
        <input id="input-dep-time" type="time" bind:value="{departure.time}" autofocus />
    </div>
    <div style="grid-area: dep-loc;">
        <label for="input-dep-loc">{$t("departure_location")}</label><br>
        <input id="input-dep-loc" type="text" bind:value="{departure.location}" style="width: 100%;" />
    </div>
    <div style="grid-area: travel-info;">
        <div class="travel-info">
            <label for="input-vehicle-type">{$t("means_of_transport")}</label>
            <select id="input-vehicle-type" bind:value="{vehicle.type}">
                {#each Object.keys(PT_TYPES) as type}
                    <option value="{type}">{PT_TYPES[type]}</option>
                {/each}
            </select>
            <label for="input-vehicle-name">{$t("line_name")}</label>
            <input id="input-vehicle-name" type="text" bind:value="{vehicle.name}" />
            <label for="input-vehicle-dir">{$t("train_direction", "")}</label>
            <input id="input-vehicle-dir" type="text" bind:value="{vehicle.direction}" />
        </div>
    </div>
    <div style="grid-area: arr-time;">
        <label for="input-arr-time">{$t("arrival_time")}</label><br>
        <input id="input-arr-time" type="time" bind:value="{arrival.time}" />
    </div>
    <div style="grid-area: arr-loc;">
        <label for="input-arr-loc">{$t("arrival_location")}</label><br>
        <input id="input-arr-loc" type="text" bind:value="{arrival.location}" style="width: 100%;" />
    </div>
    <div style="grid-area: stations;">
        <label for="input-notes">{$t("visited_stations")}</label><br>
        <input type="text" id="input-notes" bind:value="{legData.stations}" style="width: 100%" />
    </div>
    <div style="grid-area: notes;">
        <label for="input-notes">{$t("notes")}</label><br>
        <input type="text" id="input-notes" bind:value="{legData.notes}" style="width: 100%" />
    </div>
</div>
{/if}

<style>
    .component {
        padding: 10px 20px 5px;
        
        display: grid;
        grid-template-areas: 
            "dep-time ind-start dep-loc edit"
            "duration travel-info travel-info edit"
            "arr-time ind-end arr-loc edit";

        grid-template-columns: 40px 30px 1fr auto;
        grid-template-rows: auto 40px auto;
        row-gap: 5px;
        align-items: center;
    }

    .component-editing {
        grid-template-areas: 
            "dep-time dep-loc"
            "travel-info travel-info"
            "arr-time arr-loc"
            "stations stations"
            "notes notes";
        grid-template-columns: auto auto;
        grid-template-rows: auto auto auto auto auto;
    }

    .additional-info {
        padding: 5px 20px 10px;
        display: grid;
        grid-template-areas: 
            "stations stations"
            "notes notes";
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto;
    }

    input {
        padding: 2px;
    }

    .travel-info {
        display: inline-flex;
        background-color: #eee;
        align-items: center;
        gap: 5px;
        padding: 5px;
        border-radius: 5px;
    }
    
    .component-editing .travel-info {
        width: 100%;
    }
    
    .component-editing .travel-info input {
        width: 25%;
    }

    .duration {
        grid-area: duration;
        justify-self: right;
        background-color: #eee;
        color: gray;
        padding: 2px 0 2px 5px;
        border-radius: 5px 0 0 5px;
    }

    .vehicle-name {
        font-weight: bold;
        font-size: 0.9em;
    }

    .vehicle-dir {
        font-size: 0.8em;
    }

    .indicator-start, .indicator-end {
        background-color: black;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        justify-self: center;
    }
    .indicator-start::after, .indicator-end::after {
        content: "";
        display: block;
        width: 2px;
        height: 400%;
        background-color: black;
        position: relative;
        left: calc(50% - 1px);
    }

    .indicator-start {
        grid-area: ind-start;
    }
    .indicator-end {
        grid-area: ind-end;
    }
    .indicator-start::after {
        top: 100%;
    }
    .indicator-end::after {
        transform: translateY(-100%);
    }

    .station-visit {
        display: inline-block;
        margin-right: 5px;
        background-color: #0075bf;
        color: white;
        margin: 5px 2px;
        padding: 5px;
        border-radius: 5px;
        font-size: 13px;
    }
</style>
