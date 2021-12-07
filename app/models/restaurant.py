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

    def to_dict(self):
        type = str(self.cuisine)
        return {
            'name': self.name,
            'location': self.location,
            'price_point': self.price_point,
            'phone_number': self.phone_number,
            'open_time': self.open_time,
            'close_time': self.close_time,
            'contact_email': self.contact_email,
            'description': self.description,

            'cover_photo': self.cover_photo,
            'cuisine_type': type
        }
