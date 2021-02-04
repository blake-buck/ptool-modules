let state = {
    messageFilter:{
        '500':true,
        '403':true,
        '401':true,
        '400':true,
        '200':true,
        '30':true,
        '40':true,
        '50':true,
    },
    queryCheckbox: {
        time: false,
        name:false,
        hostName:false,
        pid:false,
        message:false,
        version:false,
    },
    queryFilter: {
        time:'',
        name:'',
        hostName:'',
        pid:0,
        message:'',
        version:0,
    },
    // pageCarousel: {},
    logs:[],
    offset:0,
    pages: 1,
    currentPage: 1
}
window.addEventListener('DOMContentLoaded', async () => {
    renderDashboardPart('messageFilter', state['messageFilter']);
    renderDashboardPart('queryCheckbox', state['queryCheckbox']);
    renderDashboardPart('queryFilter', state['queryFilter']);

    const logs = await getLogs();
    renderLogs(logs);

    const totalNumberOfLogs = await getTotalNumberOfLogs();
    state.pages = Math.ceil(totalNumberOfLogs.count / 50);
    renderPageCarousel();
});


document.onchange = (e) => {
    const dataParent = e.target.getAttribute('data-parent');
    const dataKey = e.target.getAttribute('data-key')
    const id = e.target.id;
    if(dataParent && id){
        // DOM interactions
        if(dataParent === 'queryCheckbox'){
            document.querySelector(`div[for=${id}]`).classList.toggle('hidden');
        }

        // state changes
        let endValue = e.target.value;
        if(e.target.type === 'checkbox'){
            endValue = e.target.checked
        }
        if(e.target.type === 'number'){
            endValue = +endValue;
        }

        state[dataParent] = {
            ...state[dataParent],
            [dataKey]: endValue
        }
        renderDashboardPart(dataParent, state[dataParent])
    }
}
document.querySelector('button#applyFilter').addEventListener('click', async () => {
    state.offset = 0;
    state.currentPage = 1;
    state.pages = 1;
    renderLogs(await getLogs());

    const totalNumberOfLogs = await getTotalNumberOfLogs();
    state.pages = Math.ceil(totalNumberOfLogs.count / 50);
    renderPageCarousel();
});
document.querySelector('button#previousPage').addEventListener('click', async () => {
    if(state.currentPage !== 1){
        state.currentPage--;
        state.offset -= 50;
        if(state.offset < 0){
            state.offset = 0;
        }
        renderLogs(await getLogs());
        renderPageCarousel();
    }
    
});
document.querySelector('button#nextPage').addEventListener('click', async () => {
    if(state.currentPage !== state.pages){
        state.currentPage++;
        state.offset += 50;
        renderLogs(await getLogs());
        renderPageCarousel();
    }
});

function renderDashboardPart(dataParent, stateContents){
    const elementsToChange = document.querySelectorAll(`[data-parent=${dataParent}`);
    elementsToChange.forEach((el) => {
        let endValue = stateContents[el.getAttribute('data-key')];
        if(el.type === 'checkbox'){
            el.checked = endValue;
        }
        else{
            el.value = endValue;
        }
    });
}

function resetLogs(gridElement){
    gridElement.innerHTML = `<div>Level</div>
        <div>Message</div>
        <div>Time</div>
        <div>Name</div>
        <div>Host Name</div>
        <div>Pid</div>
        <div>Version</div>`;
}
function renderLogs(logs){
    const grid = document.querySelector('#log-grid')
    resetLogs(grid);
    logs.forEach(({name, hostName, pid, level, message, time, version}) => {
        grid.insertAdjacentHTML('beforeend', `
            <div>${level}</div>
            <div>${message}</div>
            <div>${time}</div>
            <div>${name}</div>
            <div>${hostName}</div>
            <div>${pid}</div>
            <div>${version}</div>`)
    })
}

function renderPageCarousel(){
    document.querySelector('#page-number-carousel #currentPage').innerText = state.currentPage;
    document.querySelector('#page-number-carousel #maxPages').innerText = state.pages;
}

function buildQuery(){
    let query='&level[in]=';
    for(const key in state.messageFilter){
        if(state.messageFilter[key]){
            query+=`${key},`;
        }
    }
    query = query.slice(0, query.length -1);
    for(const key in state.queryCheckbox){
        if(state.queryCheckbox[key]){
            typeof state.queryFilter === 'number' ? 
                query += `&${key}=${state.queryFilter[key]}` 
                : 
                query += `&${key}[like]=${state.queryFilter[key]}`;
        }
    }

    return query;
}

async function getTotalNumberOfLogs(){
    const query = buildQuery();
    const request = await fetch(`http://localhost:9000/log/count?${query.slice(1)}`);
    if(request.status === 200){
        return await request.json();
    }
}

async function getLogs(){
    const query = buildQuery();

    // &message[like]=Swagger
    const request = await fetch(`http://localhost:9000/log?limit=50&offset=${state.offset}${query}`);
    if(request.status === 200){
        return await request.json();
    }
}