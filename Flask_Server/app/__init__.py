import os
from dotenv import load_dotenv


load_dotenv()
from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_socketio import SocketIO
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from app.config import Config
from ultralytics import YOLO
from paddleocr import PaddleOCR

app = Flask(__name__, static_folder='client/dist')
app.config.from_object(Config)


# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


CORS(app)
db = SQLAlchemy(app)
api = Api(app)
socketio = SocketIO(app, cors_allowed_origins='*')
model = YOLO('ANPR_Model/best.pt')
ocr = PaddleOCR(use_angle_cls=True, lang='en', USE_GPU=True)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

from app.sockets import register_socketio_events
from app.resources.user import UserListResource, UserLoginResource, UserResource, UserSignupResource
from app.resources.parking import ParkingExitResource, ParkingSearch, ParkingSpaceListResource, ParkingSpaceStatistics, ParkingEntryResource, ParkingTransactionDaySearch, ParkingTransactionListResource
from app.resources.booking import BookingResource

# Define RESTful routes
api.add_resource(UserListResource, '/api/users')
api.add_resource(UserSignupResource, '/api/auth/signup')
api.add_resource(UserLoginResource, '/api/auth/login')
api.add_resource(UserResource, '/api/users/<int:user_id>')
api.add_resource(ParkingSpaceListResource, '/api/parking')
api.add_resource(ParkingTransactionListResource, '/api/parking/transactions')
api.add_resource(ParkingSpaceStatistics, '/api/parking/stats')
api.add_resource(ParkingEntryResource, '/api/parking/entry')
api.add_resource(ParkingExitResource, '/api/parking/exit')
api.add_resource(ParkingSearch, '/api/parking/search')
api.add_resource(ParkingTransactionDaySearch,
                 '/api/parking/transactions/day/<string:date>')
api.add_resource(BookingResource, '/api/parking/book')

# Register SocketIO events
register_socketio_events(socketio)
