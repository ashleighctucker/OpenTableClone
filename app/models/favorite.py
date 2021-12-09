from .db import db

class Favorite(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_fav = db.relationship('User', back_populates='user_favorites')

    restaurantId = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)
    restaurant_fav = db.relationship('Restaurant', back_populates='restaurant_favorites')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'restaurantId': self.restaurantId,
            # 'restaurants': {obj.id: {"name": obj.name} for obj in self.restaurant_fav},
        }
