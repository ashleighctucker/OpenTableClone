from app.models import db, Favorite

def seed_favorites():
    fav1 = Favorite( userId=1, restaurantId=2)
    fav2 = Favorite( userId=1, restaurantId=4)
    fav3 = Favorite( userId=1, restaurantId=5)
    fav4 = Favorite( userId=1, restaurantId=8)
    fav5 = Favorite( userId=1, restaurantId=12)

    db.session.add(fav1)
    db.session.add(fav2)
    db.session.add(fav3)
    db.session.add(fav4)
    db.session.add(fav5)
    db.session.commit()

def undo_favorites():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
