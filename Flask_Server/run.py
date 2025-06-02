from app import app, db, socketio
from app.models import User  # Import your database models

if __name__ == '__main__':
    with app.app_context():  # Establish application context
        db.create_all()  # Create database tables based on models
    socketio.run(app, debug=True)  # Start development server
