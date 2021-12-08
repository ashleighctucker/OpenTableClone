from flask import Blueprint, jsonify, request
from flask_login import login_required

from app.models import db, Restaurant, Reservation
from app.forms import NewRestaurant
from .auth_routes import validation_errors_to_error_messages



restaurant_routes = Blueprint('restaurants', __name__)

@restaurant_routes.route('/')
def get_restaurants():
<<<<<<< Updated upstream
    
=======
>>>>>>> Stashed changes
    restaurants = Restaurant.query.all()
    return {'restaurants': [restaurant.to_dict() for restaurant in restaurants]}


@restaurant_routes.route('/', methods=["POST"])
@login_required
def post_restaurant():
    form = NewRestaurant()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newRestaurant = Restaurant(user_id=1, name=form.data['name'], location=form.data['location'], price_point=form.data['price_point'], phone_number=form.data['phone_number'], open_time=form.data["open_time"],
                                   close_time=form.data["close_time"], contact_email=form.data["contact_email"], description=form.data['description'], cover_photo=form.data['cover_photo'], cuisine_type=form.data['cuisine_type'])
        db.session.add(newRestaurant)
        db.session.commit()
        return newRestaurant.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 500
