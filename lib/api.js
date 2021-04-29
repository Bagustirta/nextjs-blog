export const API_URL = process.env.NEXT_PUBLIC_COCKPIT_URL
export const API_TOKEN = process.env.NEXT_PUBLIC_COCKPIT_TOKEN
export const IMAGE_PATH = API_URL + "/storage/uploads"

async function fetchUrl(url, method = "get", params = {}) {
    if (method == 'get') {
        const res = await fetch(`${API_URL + url + "?token=" + API_TOKEN}`)
        const json = await res.json()

        if (json.errors) {
            console.error(json.errors)
            throw new Error('Failed to fetch API')
        }

        return json
    }
    else if (method == 'post') {
        const res = await fetch(`${API_URL + url + "?token=" + API_TOKEN}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        })
        const json = await res.json()

        if (json.errors) {
            console.error(json.errors)
            throw new Error('Failed to fetch API')
        }

        return json
    }
}

export async function getSingletonData(singletonName) {
    const data = await fetchUrl(`${"/api/singletons/get/" + singletonName}`)

    return data
}

export async function getCollectionData(collectionName, method, params) {
    const data = await fetchUrl(`${"/api/collections/get/" + collectionName}`, method, params)

    return data
}

export async function getListUsers(method, params) {
    const data = await fetchUrl(`${"/api/cockpit/listUsers"}`, method, params)

    return data
}

export async function getImageData(method, params) {
    const res = await fetch(`${API_URL + "/api/cockpit/image?token=" + API_TOKEN}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    })
    const text = await res.text()

    return text
}