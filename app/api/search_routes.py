from flask import Blueprint, jsonify, request


from app.models import db, Restaurant, Cuisine
from .auth_routes import validation_errors_to_error_messages

search_routes = Blueprint('search', __name__)


def searchRestaurants(term):
    nameSearchResults = Restaurant.query.filter(
        Restaurant.name.ilike(f"%{term}%")).all()
    descriptionSearchResults = Restaurant.query.filter(
        Restaurant.description.ilike(f"%{term}%")).all()
    cuisineTypeSearchResult = Cuisine.query.filter(
        Cuisine.type.ilike(f"%{term}%")).first()
    if (cuisineTypeSearchResult):
        restaurantCuisineTypeResults = Restaurant.query.filter(
            Restaurant.cuisine_type == cuisineTypeSearchResult.id)
    searchSet = set(nameSearchResults)
    for i in descriptionSearchResults:
        searchSet.add(i)
    if (cuisineTypeSearchResult):
        for i in restaurantCuisineTypeResults:
            searchSet.add(i)
    return list(searchSet)


@search_routes.route('/<term>/')
def get_search(term):
    searchResults = searchRestaurants(term)
    return {'search': [restaurant.simple_dict() for restaurant in searchResults]}
