from .db import db
from sqlalchemy.sql import func
import datetime


class Cuisine(db.Model):
    __tablename__ = 'cuisines'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100), nullable=False, unique=True)
    restaurant_cuisines = db.relationship(
        'Restaurant', back_populates='cuisine', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'type': self.type,
            'id': self.id,
        }

    def __repr__(self):
        return self.type
