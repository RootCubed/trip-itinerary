<script>
    import { isAdmin } from "$lib/admin.js";
    import { t } from "$lib/i18n.js";

    export let tripList;

    let sortBy = "name";
    let sortAscending = true;

    $: sortState = Object.fromEntries(["name", "created"].map(e => {
        let state;
        if (e == sortBy) {
            state = sortAscending ? "sortAsc" : "sortDec";
        } else {
            state = "sortDeac";
        }
        return [e, state];
    }));

    const sortRowEvent = (colName) => () => {
        if (colName == sortBy) {
            sortAscending = !sortAscending;
        } else {
            sortBy = colName;
            sortAscending = true;
        }
        tripList = tripList.sort((a, b) => {
            if (a[colName] < b[colName]) {
                return sortAscending ? -1 : 1;
            } else if (a[colName] > b[colName]) {
                return sortAscending ? 1 : -1;
            } else {
                return 0;
            }
        });
    }

    sortRowEvent("name")();

    function deleteTrip(id) {
        fetch(`trip/${id}`, {
            method: "DELETE"
        }).then(() => {
            tripList = tripList.filter(e => e.id != id);
        });
    }
</script>

<table>
    <thead>
        <tr>
            <th class={sortState.name} on:click={sortRowEvent("name")}>{$t("trip_name")}</th>
            <th class={sortState.created} on:click={sortRowEvent("created")}>{$t("trip_creation_date")}</th>
            {#if $isAdmin}
            <th class="noSort">{$t("trip_visibility")}</th>
            <th class="noSort"></th>
            {/if}
        </tr>
    </thead>
    <tbody>
        {#each tripList as trip}
            <tr>
                <td><a href="trip/{trip.id}">{trip.name}</a></td>
                <td>{trip.created.toLocaleString()}</td>
                {#if $isAdmin}
                    <td>{$t(trip.visibility)}</td>
                    <td><button class="btn-delete" on:click={() => deleteTrip(trip.id)}>Delete</button></td>
                {/if}
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        border-collapse: collapse;
        margin: 25px 0;
        min-width: 400px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }

    button {
        padding: 5px 10px;
        border-radius: 5px;
        border: none;
        background-color: #eee;
        color: black;
        cursor: pointer;
    }

    button:hover {
        background-color: #ddd;
    }

    .btn-delete {
        background-color: #f00;
        color: white;
    }

    .btn-delete:hover {
        background-color: #d00;
    }

    table thead tr {
        text-align: left;
        border-bottom: 1px solid;
    }

    table th, table td {
        padding: 12px 15px;
    }

    table tbody tr {
        border-bottom: 1px solid #dddddd;
    }

    table tbody tr:nth-of-type(even) {
        background-color: #f3f3f3;
    }

    table tbody tr:hover {
        background-color: #dbdbdb;
    }

    th:not(.noSort) {
        cursor: pointer;
    }

    .sortDeac::after {
        content: "\25bc";
        color: lightgray;
    }

    .sortAsc::after {
        content: "\25b2";
        color: gray;
    }

    .sortDec::after {
        content: "\25bc";
        color: gray;
    }

    .new-trip-cont {
        text-align: center;
    }

</style>
