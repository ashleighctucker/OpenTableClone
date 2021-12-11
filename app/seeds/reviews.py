from app.models import db, User, Restaurant, Review
from sqlalchemy.sql.expression import func
from random import randrange
from faker import Faker
fake = Faker()


def seed_reviews():

    for review in range(0, 200):
        user_id = db.session.query(
            User.id).order_by(func.random()).first()[0]
        restaurant_obj = db.session.query(Restaurant).filter(
            Restaurant.user_id != user_id).order_by(func.random()).first()
        restaurant_id = restaurant_obj.id
        rating = randrange(1, 5)
        comment = fake.paragraph(nb_sentences=3)
        seed_review = Review(rating=rating, comment=comment,
                             userId=user_id, restaurantId=restaurant_id)
        db.session.add(seed_review)
    db.session.commit()


def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
