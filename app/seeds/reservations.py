from app.models import db, Reservation
from sqlalchemy.sql.expression import func
from random import randrange
from faker import Faker
import random, time
fake = Faker()
TIMES = [
  '6:00 AM',
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
  '11:00 PM',
  '12:00 AM',
  '1:00 AM',
]


def str_time_prop(start, end, time_format, prop):
    stime = time.mktime(time.strptime(start, time_format))
    etime = time.mktime(time.strptime(end, time_format))
    ptime = stime + prop * (etime - stime)
    return time.strftime(time_format, time.localtime(ptime))


def random_date(start, end, prop):
    return str_time_prop(start, end, '%Y-%m-%d', prop)

import random
import time
 
 
def str_time_prop(start, end, time_format, prop):
    stime = time.mktime(time.strptime(start, time_format))
    etime = time.mktime(time.strptime(end, time_format))
    ptime = stime + prop * (etime - stime)
    return time.strftime(time_format, time.localtime(ptime))
def seed_reservations():
    
    for restaurant_id_no in range(1,16):
        counter = 1
        while counter <20:
            available_size = randrange(1,11)
            date = random_date("2022-01-01", "2022-1-30", random.random())
            restaurant_id =restaurant_id_no
            time_slot= random.choice(TIMES)
            seed_reservation = Reservation(available_size=available_size, date=date, time_slot=time_slot, restaurant_id=restaurant_id)
            db.session.add(seed_reservation)
            counter+=1
    db.session.commit()
    
def undo_reservations():
    db.session.execute('TRUNCATE reservations RESTART IDENTITY CASCADE;')
    db.session.commit()
