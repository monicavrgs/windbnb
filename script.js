document.addEventListener('load', loadStays())

async function getStays(){
    try{
        let url = 'http://localhost:3000/stays'
        let response = await fetch(url)
        return await response.json()
    } catch (error) {
        console.log(error)
    }
}

async function loadStays(){
    let stays = await getStays()
    renderStays(stays)
}

async function renderStays(stays){
    let staysContainer = document.getElementById('stays-container')
    staysContainer.innerHTML = ""

    stays.forEach(stay =>{
        let stayCard = `
            <div class='stay-card'>
                <img src="${stay.photo}" alt="">
                <div class='stay-footer'>
                        <div class='stay-info'>
                        ${stay.superHost == true ? "<p class='superhost'>SuperHost</p>" : ''}
                            ${stay.beds == null ? "<p class='stay-type'>" + stay.type + '</p>' : "<p class='stay-type'>" + stay.type +  '<span> . ' + stay.beds + ' beds' + '</span></p>'}
                            <p class='stay-rating'><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"/></g></svg> ${stay.rating}</p>
                        </div>
                    <p class='stay-title'>${stay.title}</p>
                </div>
            </div>
        `

        staysContainer.innerHTML += stayCard
    })
}

async function searchStays(event){
    event.preventDefault()

    let location = document.getElementById('location-select').value
    let guestsInput = document.getElementById('guests-number').value
    let guests = Number(guestsInput)
    let stays = await getStays()

    if(guestsInput == "" || guestsInput == 0){
        alert("Please select the number of guests.")
    }else{
        let filteredStays = stays.filter(stay => stay.city == location && stay.maxGuests >= guests)
        if(filteredStays.length > 0){
            renderStays(filteredStays)
        }else{
            let staysContainer = document.getElementById('stays-container')
            staysContainer.innerHTML = "<p class='no-stays'>No stays to show :(</p>"
        }
    }
}

function refreshPage(){
    window.location.reload()
    document.getElementById("search-form").reset()
} 
