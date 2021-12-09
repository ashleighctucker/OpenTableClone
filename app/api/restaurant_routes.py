import re
from flask import Blueprint, jsonify, request
from flask_login import login_required


from app.models import db, Restaurant, Reservation
from app.forms import NewRestaurant, RestaurantOwnerReservationForm, CustomerReservationForm

from .auth_routes import validation_errors_to_error_messages

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


@restaurant_routes.route('/<int:id>/', methods=["PUT"])
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


@restaurant_routes.route('/<int:id>', methods=["DELETE"])
def delete_restaurant(id):
    restaurantToDelete = Restaurant.query.get(int(id))
    db.session.delete(restaurantToDelete)
    db.session.commit()
    return {'message': f"Deleted restuarant {id}"}


## Customer reservation routes below ##
@restaurant_routes.route('/<int:id>/reservations/<int:reservation_id>/', methods=['PUT'])
def customer_create_and_edit_reservation(reservation_id, id):
    reservation_form = CustomerReservationForm()
    reservation_to_edit = db.session.query(Reservation).filter(
        Reservation.id == reservation_id).first()
    reservation_form['csrf_token'].data = request.cookies['csrf_token']
    if reservation_form.validate_on_submit():
        reservation_to_edit.booked = True
        reservation_to_edit.party_size = reservation_form.data['party_size']
        reservation_to_edit.user_id = reservation_form.data['user_id']
        reservation_to_edit.notes = reservation_form.data['notes']
    db.session.commit()
    return reservation_to_edit.to_dict()


@restaurant_routes.route('/<int:id>/reservations/<int:reservation_id>', methods=['DELETE'])
def customer_delete_reservation(reservation_id, id):
    reservation = db.session.query(Reservation).filter(
        Reservation.id == reservation_id).first()
    reservation.booked = False
    reservation.user_id = None
    reservation.notes = None
    reservation.party_size = None

    db.session.commit()
    return reservation.to_dict()


## Restaurant owner reservation routes below ##
@restaurant_routes.route('/<int:id>/reservations/', methods=['POST'])
def restaurant_owner_post_reservation(id):
    #return {"message": "YAHHHHH"}

    reservation_form = RestaurantOwnerReservationForm()
    reservation_form['csrf_token'].data = request.cookies['csrf_token']
    print(reservation_form.data['date'])
    print(reservation_form.data['time_slot'])
    print(reservation_form.data['available_size'])
    if reservation_form.validate_on_submit():
        new_reservation = Reservation(restaurant_id=id,
                                      time_slot=reservation_form.data['time_slot'],
                                      date=reservation_form.data['date'],
                                      available_size=reservation_form.data['available_size'])
        db.session.add(new_reservation)
        db.session.commit()
        return new_reservation.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(reservation_form.errors)}, 400


# Restaurant Owner delete and edit reservation time slot blueprint and routes below
reservation_restaurant_owner_routes = Blueprint('reservations', __name__)


@reservation_restaurant_owner_routes.route('/<int:reservation_id>/', methods=['PUT'])
def restaurant_owner_edit_reservation(reservation_id):
    reservation_form = RestaurantOwnerReservationForm()
    reservation_to_edit = db.session.query(Reservation).filter(
        Reservation.id == reservation_id).first()
    reservation_form['csrf_token'].data = request.cookies['csrf_token']

    if reservation_form.validate_on_submit():
        reservation_to_edit.time_slot = reservation_form.data['time_slot']
        reservation_to_edit.date = reservation_form.data['date']
        reservation_to_edit.available_size = reservation_form.data['available_size']
        db.session.commit()
        return reservation_to_edit.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(reservation_form.errors)}, 400


@reservation_restaurant_owner_routes.route('/<int:reservation_id>/', methods=['DELETE'])
def restaurant_owner_delete_reservation(reservation_id):
    reservation_to_delete = Reservation.query.get(int(reservation_id))
    db.session.delete(reservation_to_delete)
    db.session.commit()
    return {'message': f"Deleted restuarant {reservation_id}"}
