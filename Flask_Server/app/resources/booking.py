# resourse for booking a parking slot

from flask import request
from flask_restful import Resource
from app.models import User
from app import db,  socketio
from app.models import ParkingSpace
from datetime import datetime
import pytz
from flask_jwt_extended import jwt_required, get_jwt_identity


class BookingResource(Resource):

    def __init__(self):
        super().__init__()
        self.socketio = socketio

    @jwt_required()
    def get(self):
        username = get_jwt_identity()
        spaces = ParkingSpace.query.filter_by(is_reserved=True, reserved_by=username).all()
        return [space.to_dict() for space in spaces], 200

    @jwt_required()
    def post(self):
        data = request.get_json()
        space_id = data.get('space_id')
        vehicle_number = data.get('vehicle_number')
        reserved_time = data.get('entry_time')
        user = get_jwt_identity()

        space = ParkingSpace.query.get_or_404(space_id)

        already_present = ParkingSpace.query.filter_by(is_reserved=True, vehicle_number=vehicle_number).first()

        if already_present:
            return {'message': 'Vehicle already reserved'}, 400

        if space.is_occupied:
            return {'message': 'Space already occupied'}, 400

        if space.is_reserved:
            return {'message': 'Space already reserved'}, 400

        space.is_reserved = True
        space.reserved_by = user
        space.vehicle_number = vehicle_number

        try:
            space.reserved_time = datetime.strptime(
                reserved_time, "%Y-%m-%dT%H:%M:%S.%fZ").replace(tzinfo=pytz.UTC)
        except ValueError:
            return {'message': 'Invalid reserve time format'}, 400
        
        db.session.commit()

        self.socketio.emit('parking_space_updated', space.to_dict())
        # emit parking stats

        self.socketio.emit('parking_stats_updated', {
            'total_spaces': ParkingSpace.query.count(),
            'occupied_spaces': ParkingSpace.query.filter_by(is_occupied=True).count(),
            'reserved_spaces': ParkingSpace.query.filter_by(is_reserved=True).count(),
            'vacant_spaces': ParkingSpace.query.filter_by(is_occupied=False, is_reserved=False).count()
        })

        return {'message': 'Space reserved successfully', 'space': space.to_dict()}, 201
    
    
