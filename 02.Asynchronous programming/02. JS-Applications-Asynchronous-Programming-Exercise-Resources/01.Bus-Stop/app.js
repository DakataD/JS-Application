async function getInfo() {
    let stopNum = document.getElementById('stopId').value;
    let stopName = document.getElementById('stopName');
    let buses =document.getElementById('buses');
    let url = `http://localhost:3030/jsonstore/bus/businfo/${stopNum}`;
    try {
        stopName.textContent = 'Loading...'
        buses.replaceChildren();
        let res = await fetch(url);
        if (res.status != 200) {
            throw new Error('Stop ID not found')
        }
        let data = await res.json();

        stopName.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            let li = document.createElement('li');
            li.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`;
            buses.appendChild(li)
        })

        
    } catch (error) {
        stopName.textContent = 'Error'; 
    }
}
