from flask.cli import AppGroup
from .users import seed_users, undo_users
from .restaurants import seed_restaurants, undo_restaurants
from .cuisines import seed_cuisines, undo_cuisines
from .reviews import seed_reviews, undo_reviews
from .reservations import seed_reservations, undo_reservations
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_cuisines()
    seed_restaurants()
    seed_reviews()
    seed_reservations()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_restaurants()
    undo_cuisines()
    undo_reviews()
    undo_reservations()
    # Add other undo functions here
