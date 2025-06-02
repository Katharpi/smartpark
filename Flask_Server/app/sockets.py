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

        # Run inference on the image using YOLO model (CPU only)
        result = model(image, device='cpu')

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

        # Run inference on the image using YOLO model (CPU only)
        result = model(image, device='cpu')

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
```

```markdown
# Runme.md

## Steps to Run the Application on a Windows Laptop (CPU Only)

These steps will guide you through setting up and running the application on your Windows laptop using only the CPU.

### Prerequisites

1.  **Python Installation**:
    *   Download Python 3.7 or higher from the [official Python website](https://www.python.org/downloads/windows/).
    *   During installation, make sure to check the box that says "Add Python to PATH" to enable running Python from the command line.
2.  **Git Installation** (Optional but Recommended):
    *   Download and install Git from the [official Git website](https://git-scm.com/download/windows).
    *   Git allows you to easily clone the project repository.

### Step-by-Step Instructions

1.  **Clone the Repository** (If Using Git):

    *   Open Command Prompt or PowerShell.
    *   Navigate to the directory where you want to store the project:

        ```
        cd <your_directory>
        ```

        Replace `<your_directory>` with the actual path.

    *   Clone the repository:

        ```
        git clone <repository_url>
        ```

        Replace `<repository_url>` with the URL of your project repository.

2.  **Navigate to the Project Directory**:

    *   If you cloned the repository, navigate into the project directory:

        ```
        cd <project_directory>
        ```

        Replace `<project_directory>` with the name of your project directory.

3.  **Create a Virtual Environment**:

    *   It's recommended to create a virtual environment to isolate the project dependencies.

        ```
        python -m venv venv
        ```

4.  **Activate the Virtual Environment**:

    *   In Command Prompt:

        ```
        venv\Scripts\activate
        ```

    *   In PowerShell:

        ```
        .\venv\Scripts\Activate.ps1
        ```

5.  **Install Dependencies**:

    *   Install the required Python packages using pip:

        ```
        pip install -r requirements.txt
        ```

        Make sure you have a `requirements.txt` file listing all the dependencies.  If not, you may need to install dependencies individually.  Common dependencies include Flask, flask-socketio, opencv-python, numpy, and potentially torch and torchvision.

        Example `requirements.txt`:

        ```
        Flask==2.0.1
        flask-socketio==5.0.1
        opencv-python==4.5.3.56
        numpy==1.21.2
        torch==1.10.0+cpu  # CPU-only version of PyTorch
        torchvision==0.11.1+cpu # CPU-only version of torchvision
        Pillow
        easyocr
        ```

6.  **Configure for CPU Usage**:

    *   Modify the application code to enforce CPU usage.  This typically involves setting the device argument to `'cpu'` when loading or using the model.

        *   **Example (in `app.py` or relevant file):**

            ```python
            import torch
            # Ensure CUDA is not used
            torch.device('cpu')

            # Load your model, specifying the device
            model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True, device='cpu')  # or yolov5m, yolov5l, etc.
            ```
    *   Modify the `register_socketio_events` function in your `socket_events.py` file to explicitly use the CPU:

        ```python
        # Run inference on the image using YOLO model (CPU only)
        result = model(image, device='cpu')
        ```

7.  **Set Environment Variables** (If Necessary):

    *   If your application requires any environment variables, set them in the Command Prompt or PowerShell before running the application. For example:

        ```
        set FLASK_APP=your_app.py
        set FLASK_ENV=development
        ```

        In PowerShell:

        ```powershell
        $env:FLASK_APP="your_app.py"
        $env:FLASK_ENV="development"
        ```

        Replace `your_app.py` with the name of your main application file.

8.  **Run the Application**:

    *   Run the Flask application:

        ```
        flask run
        ```

    *   Or, if you are using a different startup command:

        ```
        python your_app.py
        ```

        Replace `your_app.py` with the name of your main application file.

9.  **Access the Application**:

    *   Open your web browser and navigate to the address provided in the console output (usually `http://127.0.0.1:5000` or `http://localhost:5000`).

### Troubleshooting

*   **CUDA Errors**: If you encounter CUDA-related errors, ensure that you have installed the CPU-only version of PyTorch and that your code explicitly uses the CPU.
*   **Dependency Issues**: Double-check your `requirements.txt` file and ensure that all dependencies are installed correctly.
*   **Environment Variables**: Verify that all required environment variables are set correctly.
*   **Port Conflicts**: If the application fails to start due to a port conflict, try running it on a different port using the `--port` option:

    ```
    flask run --port 5001
    ```

    Then, access the application at `http://127.0.0.1:5001`.

By following these steps, you should be able to run the application on your Windows laptop using the CPU.
```# Runme.md

## Steps to Run the Application on a Windows Laptop (CPU Only)

These steps will guide you through setting up and running the application on your Windows laptop using only the CPU.

### Prerequisites

1.  **Python Installation**:
    *   Download Python 3.7 or higher from the [official Python website](https://www.python.org/downloads/windows/).
    *   During installation, make sure to check the box that says "Add Python to PATH" to enable running Python from the command line.
2.  **Git Installation** (Optional but Recommended):
    *   Download and install Git from the [official Git website](https://git-scm.com/download/windows/).
    *   Git allows you to easily clone the project repository.

### Step-by-Step Instructions

1.  **Clone the Repository** (If Using Git):

    *   Open Command Prompt or PowerShell.
    *   Navigate to the directory where you want to store the project:

        ```
        cd <your_directory>
        ```

        Replace `<your_directory>` with the actual path.

    *   Clone the repository:

        ```
        git clone <repository_url>
        ```

        Replace `<repository_url>` with the URL of your project repository.

2.  **Navigate to the Project Directory**:

    *   If you cloned the repository, navigate into the project directory:

        ```
        cd <project_directory>
        ```

        Replace `<project_directory>` with the name of your project directory.

3.  **Create a Virtual Environment**:

    *   It's recommended to create a virtual environment to isolate the project dependencies.

        ```
        python -m venv venv
        ```

4.  **Activate the Virtual Environment**:

    *   In Command Prompt:

        ```
        venv\Scripts\activate
        ```

    *   In PowerShell:

        ```
        .\venv\Scripts\Activate.ps1
        ```

5.  **Install Dependencies**:

    *   Install the required Python packages using pip:

        ```
        pip install -r requirements.txt
        ```

        Make sure you have a `requirements.txt` file listing all the dependencies.  If not, you may need to install dependencies individually.  Common dependencies include Flask, flask-socketio, opencv-python, numpy, and potentially torch and torchvision.

        Example `requirements.txt`:

        ```
        Flask==2.0.1
        flask-socketio==5.0.1
        opencv-python==4.5.3.56
        numpy==1.21.2
        torch==1.10.0+cpu  # CPU-only version of PyTorch
        torchvision==0.11.1+cpu # CPU-only version of torchvision
        Pillow
        easyocr
        ```

6.  **Configure for CPU Usage**:

    *   Modify the application code to enforce CPU usage.  This typically involves setting the device argument to `'cpu'` when loading or using the model.

        *   **Example (in `app.py` or relevant file):**

            ```python
            import torch
            # Ensure CUDA is not used
            torch.device('cpu')

            # Load your model, specifying the device
            model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True, device='cpu')  # or yolov5m, yolov5l, etc.
            ```
    *   Modify the `register_socketio_events` function in your `socket_events.py` file to explicitly use the CPU:

        ```python
        # Run inference on the image using YOLO model (CPU only)
        result = model(image, device='cpu')
        ```

7.  **Set Environment Variables** (If Necessary):

    *   If your application requires any environment variables, set them in the Command Prompt or PowerShell before running the application. For example:

        ```
        set FLASK_APP=your_app.py
        set FLASK_ENV=development
        ```

        In PowerShell:

        ```powershell
        $env:FLASK_APP="your_app.py"
        $env:FLASK_ENV="development"
        ```

        Replace `your_app.py` with the name of your main application file.

8.  **Run the Application**:

    *   Run the Flask application:

        ```
        flask run
        ```

    *   Or, if you are using a different startup command:

        ```
        python your_app.py
        ```

        Replace `your_app.py` with the name of your main application file.

9.  **Access the Application**:

    *   Open your web browser and navigate to the address provided in the console output (usually `http://127.0.0.1:5000` or `http://localhost:5000`).

### Troubleshooting

*   **CUDA Errors**: If you encounter CUDA-related errors, ensure that you have installed the CPU-only version of PyTorch and that your code explicitly uses the CPU.
*   **Dependency Issues**: Double-check your `requirements.txt` file and ensure that all dependencies are installed correctly.
*   **Environment Variables**: Verify that all required environment variables are set correctly.
*   **Port Conflicts**: If the application fails to start due to a port conflict, try running it on a different port using the `--port` option:

    ```
    flask run --port 5001