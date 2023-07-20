export const checkAvailability = async ({url, state='CA',locations=[]}) => {
    if (!url) {
        return Status.ERROR
    }
    console.debug(`Checking availability...`)
    console.debug(`Making call to API endpoint`)
    const myLocations = locations.map(loc => loc.toLowerCase());
    try {
        const data =  await fetch(url+state).then(response => response.json())
        const asc_offices_byLocation = data.filter(asc_office => myLocations.includes(asc_office.address.city.toLowerCase()))
        const targeted_locations = asc_offices_byLocation.filter(asc_office => asc_office.timeSlots.length > 0)
        if (targeted_locations.length > 0) {
            // Send alert
            sendAlert(targeted_locations)
        } else {
            sendGeneralAvalibility(data)
        }
        
        return Status.COMPLETED
    } catch (err) {
        console.error(`Error checking Availablity`, err)
        return Status.ERROR
    }
   
};
const sendAlert = (locations) => {
    // Send email to person
    console.log(`Appointments avalibale in your selected below:`)
    locations.map(loc => console.log(`${loc.address.city} => ${loc.timeSlots[0].date}` ))
}

const sendGeneralAvalibility= (locations) => {
    let allAvailableLocations = locations.filter(asc_office => asc_office.timeSlots.length > 0)
    console.log(`********Not available in your location only available at these locations********`)
    allAvailableLocations.map(loc=> console.log(`${loc.address.city} => ${loc.timeSlots[0].date}`))
}

const Status = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    ERROR: 'ERROR'
}