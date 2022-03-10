function solve() {
    let label = document.querySelector('#info span');
    let depairBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let stop = {
        next: 'depot'
    }

    async function depart() {

        depairBtn.disabled = true;

        let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        let res = await fetch(url);
        stop = await res.json();



        label.textContent = `Next stop ${stop.name}`;

       
        arriveBtn.disabled = false;
    }

    function arrive() {
        label.textContent = `Arriving at ${stop.name}`;
        depairBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();