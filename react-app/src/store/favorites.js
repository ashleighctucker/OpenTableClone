const GET_FAV = 'favorite/GET_FAV'
const MAKE_FAV = 'favorite/MAKE_FAV'
const DEL_FAV = 'favorite/DEL_FAV'

const getFav = (userId) => ({
    type: GET_FAV,
    payload: userId
})

const makeFav = (content) => ({
    type: MAKE_FAV,
    payload: content
})

const delFav = () => ({
    type: DEL_FAV
})

export const getFavorite = (userId) => async(dispatch) => {
    const response = await fetch(`api/users/${userId}/favorites`)
    if (response.ok) {
        const favorites = await response.json()
        dispatch(getFav(favorites))
        return favorites
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred.'];
      }
}

export const makeFavorite = (content) => async(dispatch) => {
    const {userId, restaurantId} = content
    const response = await fetch(`api/users/${userId}/favorites`, {
        method: 'POST',
        body: JSON.stringify({ userId, restaurantId })
    })


    if (response.ok) {
        const data = await response.json()
        dispatch(makeFav(data))
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
    } else return ['An error occurred. Please try again.']
}

export const deleteFavorite = (id, userId) => async(dispatch) => {
    const response = await fetch(`/api/users/${userId}/favorites/${id}`, {
        method: 'DELETE'
    })
    dispatch(delFav(id))
    return response
}


const favoriteReducer = (state={favorites:null}, action) => {
    let newState
    switch(action.type){
        case GET_FAV:
            newState = Object.assign({}, state)
            const normalFavs = {...action.payload}
            newState = {...normalFavs}
            return newState
        case MAKE_FAV:
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
