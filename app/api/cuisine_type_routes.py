from flask import Blueprint, jsonify, request

from app.models import db, Cuisine
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy import inspect

cuisine_type_routes = Blueprint('cuisine_types', __name__)


@cuisine_type_routes.route('/')
def getCuisineTypes():
    cuisine_types = Cuisine.query.all()
    return {'cuisine_types': [types.to_dict() for types in cuisine_types]}

