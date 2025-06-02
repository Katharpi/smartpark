from os import access
from flask import request
from flask_jwt_extended import create_access_token
from flask_restful import Resource
from app.models import User
from app import db, bcrypt



class UserListResource(Resource):
    def get(self):
        users = User.query.all()
        return [{'id': user.id, 'username': user.username, 'email': user.email, 'user_type': user.user_type} for user in users]


class UserResource(Resource):
    def get(self, user_id):
        user = User.query.get_or_404(user_id)
        return {'id': user.id, 'username': user.username, 'email': user.email}


class UserLoginResource(Resource):

    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password_hash, password):
            access_token = create_access_token(identity=user.username)
            return {'message': 'Login successful', 'user': user.to_dict(), 'token': access_token}
        else:
            return {'message': 'Invalid credentials'}, 401


class UserSignupResource(Resource):
    def post(self):
        data = request.get_json()
        name = data.get('name')
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(name=name, username=username, email=email,
                        password_hash=password_hash, )
        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=new_user.username, )

        return {'message': 'User created successfully', 'user': new_user.to_dict(), 'token': access_token}, 201
