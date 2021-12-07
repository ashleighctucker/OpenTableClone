"""Create reservations.

Revision ID: 88acfd65d2f7
Revises: 033d24161adc
Create Date: 2021-12-06 19:50:21.706740

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "88acfd65d2f7"
down_revision = "033d24161adc"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('reservations',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('restaurant_id', sa.Integer(), nullable=False),
                    sa.Column('time_slot', sa.String(
                        length=20), nullable=False),
                    sa.Column('party_size', sa.Integer(), nullable=True),
                    sa.Column('available_size', sa.Integer(), nullable=False),
                    sa.Column('user_id', sa.Integer(), nullable=False),
                    sa.Column('booked', sa.Boolean(), nullable=True),
                    sa.Column('notes', sa.Text(), nullable=True),
                    sa.Column('createdat', sa.DateTime(), nullable=True),
                    sa.Column('updatedat', sa.DateTime(), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['restaurant_id'], ['restaurants.id'], ),
                    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reservations')
    # ### end Alembic commands ###
