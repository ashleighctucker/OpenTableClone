from app.models import db, Cuisine
def seed_cuisines():
    chinese_cuisine = Cuisine(id = 1, type = "Chinese")
    spanish_cuisine = Cuisine(id = 2, type = "Spanish")
    comfort_food_cuisine = Cuisine(id = 3, type = "Comfort Food")
    vegetarian_cuisine = Cuisine(id = 4, type = "Vegetarian")
    steak_cuisine = Cuisine(id = 5, type = "Steak")
    
    db.session.add(chinese_cuisine)
    db.session.add(spanish_cuisine)
    db.session.add(steak_cuisine)
    db.session.add(comfort_food_cuisine)
    db.session.add(vegetarian_cuisine)
    db.session.add(steak_cuisine)

    db.session.commit()
def undo_cuisines():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
