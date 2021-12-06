from .db import db
from sqlalchemy.sql import func
import datetime

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
    description = db.Column(db.Text, nullable=False, unique=True)
    cover_photo = db.Column(db.String(255), nullable=False)
    cuisine_type = db.Column(db.Integer, nullable=False)
    createdat = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updatedat = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    owner = db.relationship('User', back_populates="restaurants")
    
    
    @property
    def name(self):
        return self.name

    @name.setter
    def name(self, name):
        self.name = name
    
    @property    
    def location(self):
        return self.location

    @location.setter
    def location(self, location):
        self.location = location
    
    
    @property
    def price_point(self):
        return self.price_point

    @price_point.setter
    def price_point(self, price_point):
        self.price_point = price_point
    
    
    
    @property
    def phone_number(self):
        return self.phone_number

    @phone_number.setter
    def phone_number(self, phone_number):
        self.phone_number = phone_number
        
        
    
    
    @property
    def open_time(self):
        return self.open_time

    @open_time.setter
    def open_time(self, open_time):
        self.open_time = open_time
    
    
    @property
    def close_time(self):
        return self.close_time

    @close_time.setter
    def close_time(self, close_time):
        self.close_time = close_time
    
    
    
    @property
    def contact_email(self):
        return self.close_time

    @contact_email.setter
    def contact_email(self, contact_email):
        self.contact_email = contact_email
        
        
    
    
    @property
    def description(self):
        return self.description

    @description.setter
    def description(self, description):
        self.description = description
    
    
    @property
    def cover_photo(self):
        return self.cover_photo

    @cover_photo.setter
    def cover_photo(self, cover_photo):
        self.cover_photo = cover_photo
        
        
        
    
    
    
    
    @property
    def cuisine_type(self):
        return self.cuisine_type

    @cuisine_type.setter
    def cuisine_type(self, cuisine_type):
        self.cuisine_type = cuisine_type
        
        
    @property
    def createdat(self):
        return self.createdat

    @createdat.setter
    def createdat(self, createdat):
        self.createdat = createdat
    
    
    @property
    def updatedat(self):
        return self.updatedat

    @updatedat.setter
    def updatedat(self, updatedat):
        self.updatedat = updatedat
    

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
            'cuisine_type': self.cuisine_type,
            'createdat': self.createdat,
            'updatedat': self.updatedat,
        }
