const quotesBtn = document.querySelector('.quotesBtn')
const quotesResult = document.querySelector('.quotesResult')
const usersResult = document.querySelector('.usersResult')


function debounce(callBack, delay) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callBack(...args)
        }, delay)
    }
}


window.addEventListener('mousemove', debounce((e) => {
    const { clientX, clientY } = e
    console.log(e.clientX, e.clientY)
}, 300))

quotesBtn.addEventListener('click', async () => {
    quotesResult.textContent = 'Loading...'
    const resp = await fetch('https://dummyjson.com/quotes')
    const data = await resp.json()
    quotesResult.textContent = JSON.stringify(data, null, 2) 
    console.log(data)
})

async function logUsersPagination(page = 1) {
    const limit = 30
    const skip = (page - 1) * 30
    const res = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
    const data = await res.json()
    usersResult.textContent = JSON.stringify(data, null, 2)
    console.log(data)
}

logUsersPagination(2)


const form = document.querySelector('form')
const input = form.querySelector('input[name="name"]') 
const carResult = document.querySelector('.carResult')

input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '')
})


form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = input.value.trim()
    if (!id) {
        alert('Please enter a valid ID')
        return;
    }

    try {
        const resp = await fetch(`https://myfakeapi.com/api/cars/${id}`)

        if (resp.ok) {
            const data = await resp.json()
            console.log('Car data:', data)
            alert('Car found on given ID') 
            carResult.textContent = JSON.stringify(data, null, 2)
            input.value = ''
        } else {
            alert('Car could not be found. Please enter a correct ID.')
        }
    } catch (err) {
        console.error(err)
        alert('Network or API error occurred.')
    }
})