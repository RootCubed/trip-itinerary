<script>
    import { getTimeStr } from "./utils.js";

    export let townNum;
    export let townVisit;
    export let townVisitTime;
</script>

<div class="top">
    <h3>Stadt #{townNum}: {townVisit}</h3>
    {#if townVisitTime > -1}
    <span>{getTimeStr(townVisitTime)} bis zur Weiterfahrt</span>
    {:else}
    <span>(Übernachtung)</span>
    {/if}
</div>

<style>
    .top {
        background-color: #fff;
        margin-bottom: 20px;
        text-align: center;
    }

    h3 {
        margin-top: 20px;
    }
</style>