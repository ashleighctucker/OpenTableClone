import re
from flask import Blueprint, jsonify, request
from flask_login import login_required


from app.models import db, Restaurant, Reservation
from app.forms import NewRestaurant, ReservationForm, EditRestaurant
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy import inspect


restaurant_routes = Blueprint('restaurants', __name__)


@restaurant_routes.route('/')
def get_restaurants():

    restaurants = Restaurant.query.all()
    return {'restaurants': [restaurant.to_dict() for restaurant in restaurants]}


@restaurant_routes.route('/', methods=["POST"])
def post_restaurant():
    form = NewRestaurant()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newRestaurant = Restaurant(user_id=form.data['user_id'], name=form.data['name'], location=form.data['location'], price_point=form.data['price_point'], phone_number=form.data['phone_number'], open_time=form.data["open_time"],
                                   close_time=form.data["close_time"], contact_email=form.data["contact_email"], description=form.data['description'], cover_photo=form.data['cover_photo'], cuisine_type=form.data['cuisine_type'])
        db.session.add(newRestaurant)
        db.session.commit()
        return newRestaurant.to_dict()
    else:

        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@restaurant_routes.route('/<int:id>', methods=["PUT"])
def edit_restaurant(id):
    form = EditRestaurant()
    restaurantToEdit = Restaurant.query.get(int(id))
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        restaurantToEdit.name = form.data['name']
        restaurantToEdit.location = form.data['location']
        restaurantToEdit.price_point = form.data['price_point']
        restaurantToEdit.phone_number = form.data['phone_number']
        restaurantToEdit.open_time = form.data["open_time"]
        restaurantToEdit.close_time = form.data["close_time"]
        restaurantToEdit.contact_email = form.data["contact_email"]
        restaurantToEdit.description = form.data['description']
        restaurantToEdit.cover_photo = form.data['cover_photo']
        restaurantToEdit.cuisine_type = form.data['cuisine_type']
        db.session.commit()
        return restaurantToEdit.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@restaurant_routes.route('/<int:id>/reservations', methods=['POST'])
def post_reservation(id):
    reservation_form = ReservationForm()
    reservation_form['csrf_token'].data = request.cookies['csrf_token']
    if reservation_form.validate_on_submit():
        new_reservation = Reservation(restaurant_id=reservation_form.data['restaurant_id'],
                                      time_slot=reservation_form.data['time_slot'],
                                      date=reservation_form.data['date'],
                                      party_size=reservation_form.data['party_size'],
                                      available_size=reservation_form.data[
            'available_size'], user_id=reservation_form.data['user_id'],
            notes=reservation_form.data['notes'])
        db.session.add(new_reservation)
        db.session.commit()
        return new_reservation.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(reservation_form.errors)}, 500
