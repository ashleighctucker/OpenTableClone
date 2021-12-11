from app.models import db, User
from faker import Faker

# Adds a demo user, you can add other users here if you want

fake = Faker()


def seed_users():
    demo = User(
        username='demo', firstName='Jane', lastName='Doe', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', firstName='Marnie', lastName='Kim', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', firstName='Bobbie', lastName='Smith', email='bobbie@aa.io', password='password')

    def createFakeUsers():
        i = 0
        while (i < 100):
            fakerUserInfo = fake.simple_profile()
            fakerFirstName = fakerUserInfo['name'].split()[0]
            fakerLaseName = fakerUserInfo['name'].split()[1]
            fakerUser = User(username=fakerUserInfo['username'], firstName=fakerFirstName,
                             lastName=fakerLaseName, email=fakerUserInfo['mail'], password=fake.password(length=8))
            db.session.add(fakerUser)
            i += 1

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    createFakeUsers()

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
