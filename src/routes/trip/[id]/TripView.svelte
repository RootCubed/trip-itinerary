<script>
    import TripSectionPT from "./sections/TripSectionPT.svelte";
    import Note from "./sections/Note.svelte";
    import TripLegWrapper from "./TripLegWrapper.svelte";
    import AddTripLegButton from "./AddTripLegButton.svelte";
    import { isAdmin } from "$lib/admin.js"
    import { base } from "$app/paths";

    export let tripData = {
        title: "",
        description: "",
        legs: []
    };
    
    let legID = 0;
    for (const leg of tripData.legs) {
        leg.isEditing = false;
        leg.id = legID++;
    }
    
    const COMPONENT_TYPES = {
        "pt": TripSectionPT,
        "note": Note
    };

    function saveChanges() {
        fetch("", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tripData)
        }).catch(() => {
            window.location = `${base}/admin`;
        });
    } 
    
    const addLeg = (type) => {
        tripData.legs = [...tripData.legs, {
            type: type.detail.type,
            isEditing: true,
            id: legID++
        }];
    };
    
    const removeLeg = (i) => {
        tripData.legs = tripData.legs.filter((_, j) => j != i);
        saveChanges();
    };
</script>

<div class="top">
    <div class="top2">
        <div class="day-header">
            <h2>{tripData.title}</h2>
            <span class="travel-desc">{tripData.description}</span>
        </div>
        <div class="day-content">
            {#each tripData.legs as leg, idx (leg.id)}
                <TripLegWrapper
                    canEdit={$isAdmin}
                    bind:isEditing={leg.isEditing}
                    on:deleteLeg={() => removeLeg(idx)}
                    on:editDone={saveChanges}>
                    <svelte:component this={COMPONENT_TYPES[leg.type]} bind:legData={leg.data} isEditing={leg.isEditing} />
                </TripLegWrapper>
            {/each}
            {#if $isAdmin}
                <AddTripLegButton on:addLeg={addLeg} />
            {/if}
        </div>
    </div>
</div>

<style>
    .top {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .top2 {
        background-color: #fff;
        margin-bottom: 20px;

        width: 100%;
        max-width: 1000px;

        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    @media print {
        .top2 {
            box-shadow: none;
        }
    }

    .day-header {
        position: sticky;
        top: 0;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        padding: 20px;
        z-index: 2;
        display: grid;
        grid-template:
            "title edit" 1fr
            "desc desc" auto
            / auto auto;
    }

    .travel-desc {
        grid-area: desc;
        color: #555;
    }
</style>
