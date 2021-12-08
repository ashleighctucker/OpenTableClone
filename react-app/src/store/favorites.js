const MAKE_FAV = 'favorite/MAKE_FAV'
const DEL_FAV = 'favorite/DEL_FAV'

const makeFav = (content) => ({
    type: MAKE_FAV,
    payload: content
})

const delFav = () => ({
    type: DEL_FAV
})

export const makeFavorite = (content) => async(dispatch) => {
    const {userId, restaurantId} = content
    console.log('before')
    const response = await fetch(`api/users/${userId}/favorites`, {
        method: 'POST',
        body: JSON.stringify({ userId, restaurantId })
    })

    console.log('after')

    if (response.ok) {
        const data = await response.json()
        dispatch(makeFav(data))
        return null
    } else return ['An error occurred. Please try again.']
}

export const deleteFavorite = (id, userId) => async(dispatch) => {
    const response = await fetch(`/api/users/${userId}/favorites/${id}`, {
        method: 'DELETE'
    })
    dispatch(delFav(id))
    return response
}


const favoriteReducer = (state={favorite:null}, action) => {
    let newState
    switch(action.type){
        case MAKE_FAV:
            console.log('helloooooo')
            newState = Object.assign({}, state)
            newState[action.payload.id] = action.payload
            return newState
        case DEL_FAV:
            newState = Object.assign({}, state)
            delete newState[action.payload]
            return newState
        default:
            return state
    }
}

export default favoriteReducer
