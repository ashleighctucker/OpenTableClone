from .db import db
import datetime


class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text)
    restaurantId = db.Column(db.Integer, db.ForeignKey(
        "restaurants.id"), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    createdat = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updatedat = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    owner = db.relationship('User', back_populates="reviewer")
    restaurant = db.relationship(
        'Restaurant', back_populates="restaurant_review")

    @property
    def username(self):
        return self.owner.username

    def to_dict(self):
        return {
            "rating": self.rating,
            "comment": self.comment,
            "restaurantId": self.restaurantId,
            "userId": self.userId,
            "id": self.id,
            "username": self.username
        }
