"""create restaurant/user table
Revision ID: 96a470be4dea
Revises:
Create Date: 2021-12-06 12:11:46.226922
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '96a470be4dea'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('firstName', sa.String(length=100), nullable=False),
    sa.Column('lastName', sa.String(length=100), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('restaurants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=256), nullable=False),
    sa.Column('location', sa.Text(), nullable=False),
    sa.Column('price_point', sa.Integer(), nullable=False),
    sa.Column('phone_number', sa.String(length=20), nullable=False),
    sa.Column('open_time', sa.String(length=20), nullable=False),
    sa.Column('close_time', sa.String(length=20), nullable=False),
    sa.Column('contact_email', sa.String(length=100), nullable=True),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('cover_photo', sa.String(length=255), nullable=False),
    sa.Column('cuisine_type', sa.Integer(), nullable=False),
    sa.Column('createdat', sa.DateTime(), nullable=True),
    sa.Column('updatedat', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('description'),
    sa.UniqueConstraint('phone_number')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('restaurants')
    op.drop_table('users')
    # ### end Alembic commands ###
