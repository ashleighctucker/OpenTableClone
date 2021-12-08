from flask import Blueprint, jsonify, request
from flask_login import login_required
import datetime

from app.models import db, Restaurant, Reservation
from app.forms import NewRestaurant, ReservationForm
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


 
@restaurant_routes.route('/<int:id>/reservations/', methods=['POST'])
def post_reservation(id):
    reservation_form= ReservationForm()
    reservation_form['csrf_token'].data = request.cookies['csrf_token']
    if reservation_form.validate_on_submit():
        new_reservation = Reservation (restaurant_id=reservation_form.data['restaurant_id'],
                                       booked= False,
                                       time_slot=reservation_form.data['time_slot'],
                                       date=reservation_form.data['date'],
                                       party_size=reservation_form.data['party_size'],
                                       available_size=reservation_form.data['available_size'], user_id=reservation_form.data['user_id'], 
                                       notes=reservation_form.data['notes'])
        db.session.add(new_reservation)
        db.session.commit()
        return new_reservation.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(reservation_form.errors)}, 500


@restaurant_routes.route('/<int:id>/reservations/<int:reservation_id>', methods=['PUT'])    
def customer_create_reservation(reservation_id, id):
    reservation_form= ReservationForm()
    reservation_to_edit = db.session.query(Reservation).filter(Reservation.id == reservation_id).first()
    reservation_form['csrf_token'].data = request.cookies['csrf_token']
    if reservation_form.validate_on_submit():
        reservation_to_edit.booked = True
        reservation_to_edit.party_size = reservation_form.data['party_size']
        reservation_to_edit.user_id = reservation_form.data['user_id']
        reservation_to_edit.notes = reservation_form.data['notes']
    db.session.commit()
    return reservation_to_edit.to_dict()


    
@restaurant_routes.route('/<int:id>/reservations/<int:reservation_id>', methods=['DELETE'])
def delete_reservation(reservation_id, id):
        reservation = db.session.query(Reservation).filter(Reservation.id == reservation_id).first()
        reservation.booked = False
        reservation.user_id = None
        reservation.notes = None
        reservation.party_size = None
        
        db.session.commit()
        return reservation.to_dict()
        
        

        
