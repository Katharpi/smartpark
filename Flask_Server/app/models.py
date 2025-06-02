from os import name
from app import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(100), nullable=False)
    user_type = db.Column(db.String(20), nullable=False, default='user')

    def __repr__(self):
        return f'<User {self.username}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'username': self.username,
            'email': self.email,
            'user_type': self.user_type
        }


class ParkingSpace(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    space_name = db.Column(db.String(50), unique=True, nullable=False)
    is_occupied = db.Column(db.Boolean, default=False)
    vehicle_number = db.Column(db.String(20), nullable=True)
    is_reserved = db.Column(db.Boolean, default=False)
    reserved_by = db.Column(
        db.String(50), db.ForeignKey('user.username'), nullable=True)
    reserved_time = db.Column(db.DateTime, nullable=True)
    reserved_by_user = db.relationship('User', backref=db.backref('reserved_spaces', lazy=True))

    def __repr__(self):
        return f'<ParkingSpace {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'space_name': self.space_name,
            'is_occupied': self.is_occupied,
            'vehicle_number': self.vehicle_number,
            'is_reserved': self.is_reserved,
            'reserved_by': self.reserved_by,
            'reserved_time': self.reserved_time.strftime('%Y-%m-%d %H:%M:%S') if self.reserved_time else None,
            'reserved_by_user': self.reserved_by_user.to_dict() if self.reserved_by_user else None
        }


class ParkingTransactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    space_id = db.Column(db.Integer, db.ForeignKey(
        'parking_space.id'), nullable=False)
    vehicle_number = db.Column(db.String(20), nullable=True)
    entry_time = db.Column(db.DateTime, nullable=False)
    exit_time = db.Column(db.DateTime, nullable=True)
    amount = db.Column(db.Float, nullable=True)
    status = db.Column(db.String(20), nullable=False)
    parking_space = db.relationship('ParkingSpace', backref=db.backref('transactions', lazy=True))

    def __repr__(self):
        return f'<ParkingTransactions {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'space_id': self.space_id,
            'vehicle_number': self.vehicle_number,
            'entry_time': self.entry_time.isoformat(),
            'exit_time': self.exit_time.isoformat() if self.exit_time else None,
            'amount': self.amount,
            'status': self.status,
            'parking_space': self.parking_space.to_dict() if self.parking_space else None
        }
    
    
    

