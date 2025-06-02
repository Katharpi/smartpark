from socket import socket
from flask_restful import Resource, reqparse
from flask import request, jsonify
from datetime import datetime

from matplotlib.pyplot import cla
import pytz
from app.models import ParkingSpace, ParkingTransactions
from app import db, socketio

parser = reqparse.RequestParser()


class ParkingSpaceListResource(Resource):
    def get(self):
        spaces = ParkingSpace.query.all()
        # spaces = [space.to_dict() for space in spaces]
        return [space.to_dict() for space in spaces], 200

    def post(self):
        data = request.json
        space = ParkingSpace(**data)
        db.session.add(space)
        db.session.commit()
        return jsonify(space), 201

    def delete(self):
        db.session.query(ParkingSpace).delete()
        db.session.commit()
        return {"message": "All parking spaces deleted successfully"}, 200

    def put(self):
        data = request.json
        for space in data:
            space_id = space.get('id')
            if space_id:
                space = ParkingSpace.query.get(space_id)
                if space:
                    space.space_name = space.get(
                        'space_name', space.space_name)
                    # Update other fields as needed
                    db.session.commit()
                else:
                    return {"message": "Parking space not found"}, 404
            else:
                return {"message": "Parking space ID is required"}, 400

        return {"message": "Parking spaces updated successfully"}, 200


class ParkingSpaceResource(Resource):
    def get(self, space_id):
        space = ParkingSpace.query.get(space_id)
        if space:
            return jsonify(space), 200
        else:
            return {"message": "Parking space not found"}, 404

    def post(self):
        data = request.json
        space = ParkingSpace(**data)
        db.session.add(space)
        db.session.commit()
        return jsonify(space), 201

    def put(self, space_id):
        space = ParkingSpace.query.get(space_id)
        if space:
            data = request.json
            space.space_name = data.get('space_name', space.space_name)
            # Update other fields as needed
            db.session.commit()
            return jsonify(space), 200
        else:
            return {"message": "Parking space not found"}, 404

    def delete(self, space_id):
        space = ParkingSpace.query.get(space_id)
        if space:
            db.session.delete(space)
            db.session.commit()
            return {"message": "Parking space deleted successfully"}, 200
        else:
            return {"message": "Parking space not found"}, 404


class ParkingTransactionListResource(Resource):
    def get(self):
        transactions = ParkingTransactions.query.all()
        return [transaction.to_dict() for transaction in transactions], 200

    def post(self):
        data = request.json

        vehicle_number = data.get('vehicle_number')
        transaction = ParkingTransactions(**data)
        db.session.add(transaction)
        db.session.commit()
        return jsonify(transaction), 201

    def delete(self):
        db.session.query(ParkingTransactions).delete()
        db.session.commit()
        return {"message": "All parking transactions deleted successfully"}, 200

    def put(self):
        data = request.json
        for transaction in data:
            transaction_id = transaction.get('id')
            if transaction_id:
                transaction = ParkingTransactions.query.get(transaction_id)
                if transaction:
                    transaction.space_id = transaction.get(
                        'space_id', transaction.space_id)
                    # Update other fields as needed
                    db.session.commit()
                else:
                    return {"message": "Parking transaction not found"}, 404
            else:
                return {"message": "Parking transaction ID is required"}, 400

        return {"message": "Parking transactions updated successfully"}, 200


class ParkingTransactionResource(Resource):
    def get(self, transaction_id):
        transaction = ParkingTransactions.query.get(transaction_id)
        if transaction:
            return jsonify(transaction), 200
        else:
            return {"message": "Parking transaction not found"}, 404

    def put(self, transaction_id):
        transaction = ParkingTransactions.query.get(transaction_id)
        if transaction:
            data = request.json
            transaction.space_id = data.get('space_id', transaction.space_id)
            # Update other fields as needed
            db.session.commit()
            return jsonify(transaction), 200
        else:
            return {"message": "Parking transaction not found"}, 404

    def delete(self, transaction_id):
        transaction = ParkingTransactions.query.get(transaction_id)
        if transaction:
            db.session.delete(transaction)
            db.session.commit()
            return {"message": "Parking transaction deleted successfully"}, 200
        else:
            return {"message": "Parking transaction not found"}, 404


class ParkingSpaceStatistics(Resource):
    def get(self):
        total_spaces = ParkingSpace.query.count()
        occupied_spaces = ParkingSpace.query.filter_by(
            is_occupied=True).count()
        reserved_spaces = ParkingSpace.query.filter_by(
            is_reserved=True).count()
        vacant_spaces = total_spaces - (occupied_spaces + reserved_spaces)
        return {"total_spaces": total_spaces, "occupied_spaces": occupied_spaces, "reserved_spaces": reserved_spaces, "vacant_spaces": vacant_spaces}, 200

    def post(self):
        data = request.json
        start_date = data.get('start_date')
        end_date = data.get('end_date')

        if start_date and end_date:
            transactions = ParkingTransactions.query.filter(
                ParkingTransactions.entry_time.between(start_date, end_date)).all()
            total_revenue = sum(
                [transaction.amount for transaction in transactions if transaction.amount])
            return {"total_revenue": total_revenue}, 200
        else:
            return {"message": "Start date and end date are required"}, 400

class ParkingSearch(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('vehicle_number', type=str, required=True, location='args', help="Vehicle number is required")
        args = parser.parse_args()
        vehicle_number = args['vehicle_number']

        parking_transaction = ParkingTransactions.query.filter_by(vehicle_number=vehicle_number,status='unpaid' ).first()
        parking_space = ParkingSpace.query.filter_by(vehicle_number=vehicle_number).first()
        if parking_space:
            return {
                'message': 'Vehicle found',
                'transaction': parking_transaction.to_dict(),
                'parking_space': parking_space.to_dict() if parking_space else None
            }, 200
        else:
            return {'message': 'Vehicle not found'}, 404

class ParkingTransactionDaySearch(Resource):

    def get(self, date):
        print(date)
        query_date = datetime.strptime(date, '%Y-%m-%d').replace(tzinfo=pytz.timezone('Asia/Kolkata'))
        transactions = ParkingTransactions.query.filter(db.func.date(ParkingTransactions.entry_time) == query_date.date()).all()
        return [transaction.to_dict() for transaction in transactions], 200

class ParkingEntryResource(Resource):

    def __init__(self):
        super().__init__()
        self.socketio = socketio

    def post(self):
        data = request.get_json()
        vehicle_number = data.get('vehicle_number')

        if not vehicle_number:
            return {'message': 'Vehicle number is required'}, 400
        
        # check for reserved parking space
        reserved_space = ParkingSpace.query.filter_by(
            is_reserved=True, vehicle_number=vehicle_number, is_occupied=False).first()
        
        if reserved_space:
            reserved_space.is_occupied = True
            # Create a new parking transaction
            new_transaction = ParkingTransactions(
                space_id=reserved_space.id,
                vehicle_number=vehicle_number,
                entry_time=datetime.now(),
                status='unpaid'
            )

            db.session.add(reserved_space)
            db.session.add(new_transaction)
            db.session.commit()

            self.socketio.emit('parking_space_updated', reserved_space.to_dict())
            self.socketio.emit('parking_transaction_created', new_transaction.to_dict())
        # emit parking stats

            self.socketio.emit('parking_stats_updated', {
                'total_spaces': ParkingSpace.query.count(),
                'occupied_spaces': ParkingSpace.query.filter_by(is_occupied=True).count(),
                'reserved_spaces': ParkingSpace.query.filter_by(is_reserved=True).count(),
                'vacant_spaces': ParkingSpace.query.filter_by(is_occupied=False, is_reserved=False).count()
            })

            return {
                'message': 'Parking space assigned successfully',
                'parking_space': reserved_space.to_dict(),
                'transaction': new_transaction.to_dict()
            }, 201


        # Find an available parking space
        available_space = ParkingSpace.query.filter_by(
            is_occupied=False).first()

        if not available_space:
            return {'message': 'No available parking spaces'}, 400

        # Check for already parked vehicle number
        parked_vehicle = ParkingSpace.query.filter_by(
            vehicle_number=vehicle_number).first()

        if parked_vehicle:
            return {'message': 'Vehicle already parked'}, 400

        # Assign the vehicle to the parking space
        available_space.is_occupied = True
        available_space.vehicle_number = vehicle_number

        # Create a new parking transaction
        new_transaction = ParkingTransactions(
            space_id=available_space.id,
            vehicle_number=vehicle_number,
            entry_time=datetime.now(),
            status='unpaid'
        )

        # Add to the session and commit
        db.session.add(available_space)
        db.session.add(new_transaction)
        db.session.commit()

        self.socketio.emit('parking_space_updated', available_space.to_dict())
        self.socketio.emit('parking_transaction_created', new_transaction.to_dict())
        # emit parking stats

        self.socketio.emit('parking_stats_updated', {
            'total_spaces': ParkingSpace.query.count(),
            'occupied_spaces': ParkingSpace.query.filter_by(is_occupied=True).count(),
            'reserved_spaces': ParkingSpace.query.filter_by(is_reserved=True).count(),
            'vacant_spaces': ParkingSpace.query.filter_by(is_occupied=False, is_reserved=False).count()
        })

        return {
            'message': 'Parking space assigned successfully',
            'parking_space': available_space.to_dict(),
            'transaction': new_transaction.to_dict()
        }, 201

class ParkingExitResource(Resource):

    def __init__(self):
        super().__init__()
        self.socketio = socketio

    def post(self):
        data = request.get_json()
        vehicle_number = data.get('vehicle_number')
        exit_time_str = data.get('exit_time')
        fee = data.get('fee')


        if not vehicle_number:
            return {'message': 'Vehicle number is required'}, 400

        # Find the parking space with the vehicle number
        parking_space = ParkingSpace.query.filter_by(
            vehicle_number=vehicle_number).first()

        if not parking_space:
            return {'message': 'Vehicle not found'}, 404

        # Update the parking space
        parking_space.is_occupied = False
        parking_space.vehicle_number = None
        parking_space.is_reserved = False
        parking_space.reserved_by = None
        parking_space.reserved_time = None

        # Find the parking transaction
        parking_transaction = ParkingTransactions.query.filter_by(
            space_id=parking_space.id, vehicle_number=vehicle_number, status='unpaid').first()

        if not parking_transaction:
            return {'message': 'No unpaid transaction found'}, 404
        
        try:
            # Parse exit_time and convert to UTC
            exit_time = datetime.strptime(exit_time_str, "%Y-%m-%dT%H:%M:%S.%fZ").replace(tzinfo=pytz.UTC)
        except ValueError:
            return {'message': 'Invalid exit time format'}, 400

        # Update the transaction
        # exit time in ist from utc
        parking_transaction.exit_time =  exit_time
        parking_transaction.status = 'paid'
        parking_transaction.amount = fee

        # Add to the session and commit
        db.session.add(parking_space)
        db.session.add(parking_transaction)
        db.session.commit()

        self.socketio.emit('parking_space_updated', parking_space.to_dict())
        # emit parking stats

        self.socketio.emit('parking_stats_updated', {
            'total_spaces': ParkingSpace.query.count(),
            'occupied_spaces': ParkingSpace.query.filter_by(is_occupied=True).count(),
            'reserved_spaces': ParkingSpace.query.filter_by(is_reserved=True).count(),
            'vacant_spaces': ParkingSpace.query.filter_by(is_occupied=False, is_reserved=False).count()
        })

        return {
            'message': 'Parking space updated successfully',
            'parking_space': parking_space.to_dict(),
            'transaction': parking_transaction.to_dict()
        }, 200