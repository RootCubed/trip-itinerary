<script>
    import { base } from "$app/paths";
</script>

<svelte:head>
    <title>Admin login</title>
</svelte:head>

<div id="app">
    <h1>Log in as admin</h1>
    <form action="{base}/admin/auth" method="post">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required />
        <button type="submit">Log in</button>
    </form>
</div>

<style>
    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    #app {
        min-height: 100vh;
        background-color: #f5f5f5;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    h1 {
        margin-bottom: 20px;
    }

    input, button {
        padding: 10px;
    }
</style>
