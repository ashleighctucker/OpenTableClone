from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    firstName = db.Column(db.String(100), nullable=False)
    lastName = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    restaurants = db.relationship('Restaurant', back_populates='owner')
    user_reservations = db.relationship('Reservation', back_populates="restaurant_customers")
    user_favorites = db.relationship('Favorite', back_populates='user_fav')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'reservations' : [{"time_slot":obj.time_slot, "user_id":obj.user_id, "party_size":obj.party_size, "available_size":obj.available_size, "notes":obj.notes, "booked":obj.booked, "restaurant_id": obj.restaurant_id, "reservation_id": obj.id} for obj in self.user_reservations]
        }
#'reservations': [{"restaurant.id":obj.restaurant_id, "time_slot":obj.time_slot, "date":obj.date, "party_size":obj.party_size, "available_size":obj.available_size, "booked":obj.booked, "notes":obj.notes} for obj in self.user_reservations]
