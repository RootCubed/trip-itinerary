<script>
    import SbbIcon from "./SbbIcon.svelte";

    export let depTime;
    export let depLoc;
    export let travelType;
    export let vehicleName;
    export let dir;
    export let arrTime;
    export let arrLoc;
    export let durationMin;

    const ICON_LOOKUP = {
        "B": "picto/bus-right",
        "Z": "picto/train-right",
        "T": "picto/tram-right"
    };
    let travelIcon = ICON_LOOKUP[travelType];
</script>

<div class="top">
    <span class="indicator-start"></span>
    <span class="indicator-end"></span>

    <span style="grid-area: dep-time; text-align: right;">{depTime}</span>
    <span style="grid-area: dep-loc;">{depLoc}</span>
    <span class="duration">{durationMin}'</span>
    <div style="grid-area: travel-info;">
        <div class="travel-info">
            <SbbIcon name="{travelIcon}" />
            {#if vehicleName.startsWith("{")}
                <SbbIcon name="icons/{vehicleName.slice(1, -1)}" />
            {:else}
                <span class="vehicle-name">{vehicleName}</span>
            {/if}
            <span class="vehicle-dir">Richtung {dir}</span>
        </div>
    </div>
    <span style="grid-area: arr-time; text-align: right;">{arrTime}</span>
    <span style="grid-area: arr-loc;">{arrLoc}</span>
</div>

<style>
    .top {
        display: grid;
        grid-template-areas: 
            "dep-time ind-start dep-loc"
            "duration travel-info travel-info"
            "arr-time ind-end arr-loc";

        grid-template-columns: 40px 30px 1fr;
        grid-template-rows: auto 40px auto;
        row-gap: 5px;
        align-items: center;

        margin-top: 10px;
        padding: 10px 20px;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
    }

    .travel-info {
        display: inline-flex;
        background-color: #eee;
        align-items: center;
        gap: 5px;
        padding: 5px;
        border-radius: 5px;
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

</style>
