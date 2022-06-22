from flask import Flask
from flask_socketio import SocketIO,emit
# import socketio

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'secret!'


socket_io = SocketIO(app, cors_allowed_origins="*")


@socket_io.on('connect')
def test_connect(auth):
    print("Client connected")


@socket_io.on('disconnect')
def test_disconnect():
    print('Client disconnected')


@socket_io.on('message')
def test_disconnect(data):
    print(data)
    # socket_io.emit('send', 'Ganishka')
    socket_io.emit('send',data)

@socket_io.on('join_room')
def handle_join_room_event(data):
    print(data['room'])
    socket_io.emit('join_room_announcement',data)
    socket_io.emit('join_room_announcement',data,room=data['room'])

if __name__ == '__main__':
    # socket_io.run(app, host="0.0.0.0", port=5000)
    socket_io.run(app, host="192.168.1.125", port=5000)
   