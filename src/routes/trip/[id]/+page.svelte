<script>
    import TripView from "./TripView.svelte";
    import { base } from "$app/paths";
    import { t } from "$lib/i18n.js"

	export let data;
</script>

<svelte:head>
    <title>{data.tripName}</title>
</svelte:head>
<div id="app">
    <a id="back-btn" href="{base}/">{$t("back")}</a>
    <TripView tripData={data.tripData} />
</div>

<style>
    #app {
        min-height: 100vh;
        padding: 20px;
    }

    #back-btn {
        display: inline-block;
        margin-bottom: 20px;
        color: #2e4ae7;
        text-decoration: none;
    }

    @media print {
        #app {
            padding: 0;
            background-color: #fff;
        }

        #back-btn {
            display: none;
        }
    }
</style>
