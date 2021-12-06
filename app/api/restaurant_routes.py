from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Restaurant, restaurant

restaurant_routes = Blueprint('restaurants', __name__)


@restaurant_routes.route('/')
def get_restaurants():
    restaurants = Restaurant.query.all() # to-do eager load reservations and reviews
    