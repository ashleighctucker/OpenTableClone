from .db import db
import datetime


class Reservation(db.Model):
    __tablename__ = 'reservations'
    id = db.Column(db.Integer, primary_key=True)
    
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"), nullable=False)
    restaurant_reservations = db.relationship('Restaurant', back_populates="reservation")
    
    time_slot = db.Column(db.String(20), nullable=False)
    party_size = db.Column(db.Integer)
    available_size = db.Column(db.Integer, nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    restaurant_customers = db.relationship('User', back_populates="user_reservations")
    
    booked =db.Column(db.Boolean, default= False)
    notes = db.Column(db.Text)
    
    date = db.Column(db.Date, nullable=False)
    createdat=db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updatedat=db.Column(db.DateTime, default=datetime.datetime.utcnow)
    

    def to_dict(self):
        return {
            'id': self.id,
            'restaurant_id': self.restaurant_id,
            'time_slot': self.time_slot,
            'date': self.date,
            'user_id': self.user_id,
            'booked': self.booked,
            'notes': self.notes,
            'createdat': self.createdat,
            'updatedat': self.updatedat}
