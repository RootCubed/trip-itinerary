<script>
    import TripView from "./TripView.svelte";

	export let data;
</script>

<svelte:head>
    <title>{data.tripName}</title>
</svelte:head>
<div id="app">
    <h1>Trip Viewer</h1>
    <TripView tripData={data.tripData} />
</div>

<style>
    #app {
        min-height: 100vh;
        padding: 20px;
    }

    @media print {
        #app {
            padding: 0;
            background-color: #fff;
        }
    }

    h1 {
        margin-bottom: 20px;
    }
</style>
