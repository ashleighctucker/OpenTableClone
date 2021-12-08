from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextAreaField, DateTimeField, SelectField
from wtforms.validators import DataRequired, ValidationError, Regexp, URL


def nameValidator(form, field):
    name = field.data
    if len(name) > 256:
        raise ValidationError(
            'Restaruant name cannot be longer than 256 characters')


def timeValidator(form, field):
    time = field.data
    if len(time) > 20:
        raise ValidationError('Field input must be less than 20 characters')


class NewRestaurant(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), nameValidator])
    location = TextAreaField("Location", validators=[DataRequired()])
    price_point = IntegerField("Price Point",  validators=[DataRequired()])
    open_time = StringField("Open Time",  validators=[
                            DataRequired(), timeValidator])
    close_time = StringField("Close Time",  validators=[
                             DataRequired(), timeValidator])
    contact_email = StringField("Contact Email", validators=[
                                Regexp("^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$", flags=0, message="Please enter a valid email address")])
    description = TextAreaField("Description",  validators=[DataRequired()])
    cover_photo = StringField("Cover Photo",  validators=[DataRequired(), URL(
        require_tld=True, message="Please enter a valid url for the cover photo")])
    cuisine_type = IntegerField("Cusine Type",  validators=[DataRequired()])
    phone_number = StringField("Phone Number", validators=[DataRequired(), Regexp(
        "^(\+0?1\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$", flags=0, message="Must be a valid phone number")])
    user_id = IntegerField("User Id", validators=[DataRequired()])

class EditRestaurant(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), nameValidator])
    location = TextAreaField("Location", validators=[DataRequired()])
    price_point = IntegerField("Price Point",  validators=[DataRequired()])
    open_time = StringField("Open Time",  validators=[
                            DataRequired(), timeValidator])
    close_time = StringField("Close Time",  validators=[
                             DataRequired(), timeValidator])
    contact_email = StringField("Contact Email", validators=[
                                Regexp("^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$", flags=0, message="Please enter a valid email address")])
    description = TextAreaField("Description",  validators=[DataRequired()])
    cover_photo = StringField("Cover Photo",  validators=[DataRequired(), URL(
        require_tld=True, message="Please enter a valid url for the cover photo")])
    cuisine_type = IntegerField("Cusine Type",  validators=[DataRequired()])
    phone_number = StringField("Phone Number", validators=[DataRequired(), Regexp(
        "^(\+0?1\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$", flags=0, message="Must be a valid phone number")])
