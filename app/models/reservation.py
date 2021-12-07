from .db import db
import datetime


class Reservation(db.Model):
    __tablename__ = 'restaurants'
    id = db.Column(db.Integer, primary_key=True)
    
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"), nullable=False)
    restaurant_reservations = db.relationship('Restaurant', back_populates="reservation")
    
    
    
    time_slot = db.Column(db.String(20), nullable=False)
    party_size = db.Column(db.Integer)
    available_size = db.Column(db.Integer, nullable=False)
    
    users_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    restaurant_customers = db.relationship('User', back_populates="user_reservations")
    
    phone_number = db.Column(db.String(20), nullable=False, unique=True)
    open_time = db.Column(db.String(20), nullable=False)
    close_time = db.Column(db.String(20), nullable=False)
    contact_email = db.Column(db.String(100))
    description = db.Column(db.Text, nullable=False, unique=True)
    cover_photo = db.Column(db.String(255), nullable=False)
    cuisine_type = db.Column(db.Integer, nullable=False)
    createdat = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updatedat = db.Column(db.DateTime, default=datetime.datetime.utcnow)
   

    def to_dict(self):
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
            'cuisine_type': self.cuisine_type}
