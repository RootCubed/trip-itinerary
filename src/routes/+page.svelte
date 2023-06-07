<script>
    import TripView from "./TripView.svelte";
</script>

<svelte:head>
    <title>ÖV-Kantonsreise</title>
</svelte:head>
<div id="app">
    <h1>Kantonsreise ÖV-Variante</h1>
    <TripView />
</div>

<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    #app {
        padding: 20px;
        background-color: #f5f5f5;
    }

    h1 {
        margin-bottom: 20px;
    }
</style>
