
import os
import re
import cv2
import numpy as np
import base64
from flask_socketio import emit
from app import ocr, model


def find_number_plate_text(text):
    # Regular expression pattern to match license plates
    pattern = r'\b(?:\d{2}BH\d{1,4}[A-NP-Z]{1,2}|(?:AN|AP|AR|AS|BR|CG|CH|DD|DL|GA|GJ|HP|HR|JH|JK|KA|KL|LA|LD|MH|ML|MN|MP|MZ|NL|OD|PB|PY|RJ|SK|TS|TN|TR|UK|UP|WB)\d{1,2}[A-Z]+\d{4})\b'

    # Find the first match in the text
    match = re.search(pattern, text)

    if match:
        return match.group(0)  # Return the matched string
    else:
        return None  # Return None if no match is found


def register_socketio_events(socketio):
    @socketio.on('connect')
    def handle_connect():
        print('Client connected')
        emit('response', {'data': 'Connected'})

    @socketio.on('disconnect')
    def handle_disconnect():
        print('Client disconnected')

    @socketio.on('frame')
    def handle_image(image_data):
        if image_data is None:
            return
        encoded_data = image_data.split(',')[1]
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)

        # Convert to OpenCV image format
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Run inference on the image using YOLO model
        result = model(image)

        for r in result:
            if len(r.boxes.xywh) > 0:
                text = ''
                boxes_array = r.boxes.xywh.cpu().numpy()
                for box in boxes_array:
                    x, y, w, h = box
                    x1, y1, x2, y2 = int(
                        x - w / 2), int(y - h / 2), int(x + w / 2), int(y + h / 2)
                    cropped_image = image[y1:y2, x1:x2]

                    # Encode cropped image as base64
                    _, encoded_cropped_image = cv2.imencode(
                        '.jpg', cropped_image)
                    cropped_image_base64 = base64.b64encode(
                        encoded_cropped_image).decode('utf-8')

                    # # Send the cropped image to the client

                    ocr_result = ocr.ocr(cropped_image, cls=True)
                    if ocr_result is not None:
                        for idx in range(len(ocr_result)):
                            res = ocr_result[idx]
                            if res is not None:
                                for line in res:
                                    text = text + line[1][0]
                                    # Draw bounding box and OCR text on the frame

                                text = find_number_plate_text(
                                    text.replace('IND', '').replace(' ', '').upper())
                                if text is not None:
                                    socketio.emit('ocr', text)
                                    socketio.emit(
                                        'frame', cropped_image_base64)

                                    # cv2.imwrite(
                                    #     f'./model_inference/{text}.jpg', image)
                                    # with open(f'./model_inference/{text}.txt', 'w') as f:
                                    #     f.write(f'0 {x} {y} {w} {h}')

                    else:
                        socketio.emit(
                            'ocr', 'Unable to detect text in the image.')

    @socketio.on('exit_frame')
    def handle_exit_image(image_data):
        if image_data is None:
            return
        encoded_data = image_data.split(',')[1]
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)

        # Convert to OpenCV image format
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        # Run inference on the image using YOLO model
        result = model(image)

        for r in result:
            if len(r.boxes.xywh) > 0:
                text = ''
                boxes_array = r.boxes.xywh.cpu().numpy()
                for box in boxes_array:
                    x, y, w, h = box
                    x1, y1, x2, y2 = int(
                        x - w / 2), int(y - h / 2), int(x + w / 2), int(y + h / 2)
                    cropped_image = image[y1:y2, x1:x2]

                    # Encode cropped image as base64
                    _, encoded_cropped_image = cv2.imencode(
                        '.jpg', cropped_image)
                    cropped_image_base64 = base64.b64encode(
                        encoded_cropped_image).decode('utf-8')

                    # # Send the cropped image to the client

                    ocr_result = ocr.ocr(cropped_image, cls=True)
                    if ocr_result is not None:
                        for idx in range(len(ocr_result)):
                            res = ocr_result[idx]
                            if res is not None:
                                for line in res:
                                    text = text + line[1][0]
                                    # Draw bounding box and OCR text on the frame

                                text = find_number_plate_text(
                                    text.replace('IND', '').replace(' ', '').upper())
                                if text is not None:
                                    socketio.emit('exit_ocr', text)
                                    socketio.emit(
                                        'exit_frame', cropped_image_base64)

                    else:
                        socketio.emit(
                            'ocr', 'Unable to detect text in the image.')
