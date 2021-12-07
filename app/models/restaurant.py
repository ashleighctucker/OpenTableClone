from .db import db
from sqlalchemy.sql import func
import datetime
import copy


class Restaurant(db.Model):
    __tablename__ = 'restaurants'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), nullable=False)
    location = db.Column(db.Text, nullable=False)
    price_point = db.Column(db.Integer, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False, unique=True)
    open_time = db.Column(db.String(20), nullable=False)
    close_time = db.Column(db.String(20), nullable=False)
    contact_email = db.Column(db.String(100))
    description = db.Column(db.Text, nullable=False)
    cover_photo = db.Column(db.String(255), nullable=False)

    createdat = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updatedat = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    owner = db.relationship('User', back_populates="restaurants")

    cuisine_type = db.Column(
        db.Integer, db.ForeignKey("cuisines.id"), nullable=False)
    cuisine = db.relationship('Cuisine', back_populates="restaurant_cuisines")

    reservation = db.relationship(
        'Reservation', back_populates="restaurant_reservations")
    restaurant_favorites = db.relationship(
        'Favorite', back_populates="restaurant_fav")

    restaurant_review = db.relationship("Review", back_populates="restaurant")

    def to_dict(self):
        type = str(self.cuisine)
        first_and_last_name = str(self.owner.firstName) + \
            str(" ") + str(self.owner.lastName)
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'price_point': self.price_point,
            'phone_number': self.phone_number,
            'open_time': self.open_time,
            'close_time': self.close_time,
            'contact_email': self.contact_email,
            'description': self.description,
            'reservations': [{"time_slot": obj.time_slot, "user_id": obj.user_id, "party_size": obj.party_size, "available_size": obj.available_size, "notes": obj.notes, "booked": obj.booked} for obj in self.reservation],
            'cover_photo': self.cover_photo,
            'cuisine_type': type
        }
