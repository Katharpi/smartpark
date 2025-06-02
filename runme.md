
# Running the Smart Parking System on Windows

This guide will help you set up and run the Smart Parking System on a Windows laptop without GPU requirements.

## Prerequisites

Before starting, ensure you have the following installed on your Windows system:

1. **Python 3.8 or higher**
   - Download from [python.org](https://www.python.org/downloads/)
   - During installation, make sure to check "Add Python to PATH"

2. **Node.js and npm**
   - Download from [nodejs.org](https://nodejs.org/)
   - This will install both Node.js and npm

3. **Git** (optional, for cloning)
   - Download from [git-scm.com](https://git-scm.com/)

## Step-by-Step Installation

### Step 1: Download the Project
1. Download the project files to your desired location (e.g., `C:\smart-parking`)
2. Extract if downloaded as ZIP

### Step 2: Set Up the Flask Backend

1. **Open Command Prompt as Administrator**
   - Press `Win + X` and select "Command Prompt (Admin)" or "PowerShell (Admin)"

2. **Navigate to the Flask_Server directory**
   ```cmd
   cd C:\path\to\your\project\Flask_Server
   ```

3. **Install Python dependencies**
   ```cmd
   pip install -r requirements.txt
   ```
   
   This will install all required packages including:
   - Flask and related packages
   - PaddleOCR (CPU version)
   - YOLO/Ultralytics
   - Database packages
   - And other dependencies

4. **Set up environment variables**
   - Copy `.env.example` to `.env` in the `Flask_Server/app` directory
   - Edit the `.env` file with your configuration:
   ```
   DATABASE_URI=sqlite:///parking.db
   SECRET_KEY=your-secret-key-here
   ```

### Step 3: Set Up the React Frontend

1. **Open a new Command Prompt window**

2. **Navigate to the Client_Interface directory**
   ```cmd
   cd C:\path\to\your\project\Client_Interface
   ```

3. **Install Node.js dependencies**
   ```cmd
   npm install
   ```

### Step 4: Running the Application

You'll need to run both the backend and frontend simultaneously.

#### Option A: Using Two Command Prompt Windows

1. **Terminal 1 - Backend Server**
   ```cmd
   cd C:\path\to\your\project\Flask_Server
   python run.py
   ```
   
   You should see output indicating the Flask server is running on `http://0.0.0.0:5000`

2. **Terminal 2 - Frontend Development Server**
   ```cmd
   cd C:\path\to\your\project\Client_Interface
   npm run dev
   ```
   
   You should see output indicating the Vite dev server is running, typically on `http://localhost:5173`

#### Option B: Using PowerShell (if available)

1. **Open PowerShell as Administrator**

2. **Run both servers using background jobs**
   ```powershell
   cd C:\path\to\your\project
   
   # Start backend in background
   Start-Job -ScriptBlock { cd C:\path\to\your\project\Flask_Server; python run.py }
   
   # Start frontend
   cd Client_Interface
   npm run dev
   ```

### Step 5: Accessing the Application

1. **Open your web browser**
2. **Navigate to** `http://localhost:5173` (or the port shown in the frontend terminal)
3. The React app should load and communicate with the Flask backend

## Troubleshooting

### Common Issues and Solutions

1. **"pip is not recognized"**
   - Reinstall Python and ensure "Add Python to PATH" is checked
   - Or manually add Python to your system PATH

2. **"npm is not recognized"**
   - Reinstall Node.js
   - Restart your command prompt after installation

3. **Port already in use errors**
   - Change the port in the configuration
   - Or stop other applications using the same ports

4. **Database connection errors**
   - Ensure your `.env` file is properly configured
   - Check that the database path is accessible

5. **Missing dependencies errors**
   - Try updating pip: `python -m pip install --upgrade pip`
   - Install dependencies one by one to identify issues

6. **YOLO model loading issues**
   - Ensure the `ANPR_Model/best.pt` file exists
   - Check internet connection for initial model downloads

### Performance Notes

- **CPU Usage**: The application now runs entirely on CPU, which may be slower for image processing
- **Memory**: Ensure you have at least 4GB of available RAM
- **Camera Access**: The application requires camera permissions for vehicle detection

### Security Notes

- The application runs with CORS enabled for development
- For production use, configure proper security settings
- Keep your `.env` file secure and never commit it to version control

## Stopping the Application

To stop the application:

1. **In each Command Prompt window**, press `Ctrl + C`
2. **If using PowerShell jobs**, run:
   ```powershell
   Get-Job | Stop-Job
   Remove-Job *
   ```

## Additional Configuration

### Camera Settings
- The application uses your default camera
- Ensure camera permissions are granted to your browser
- For best results, use good lighting conditions

### Database
- By default, uses SQLite which requires no additional setup
- Database file will be created automatically on first run
- For production, consider PostgreSQL (configuration in `.env`)

## Support

If you encounter issues:
1. Check the console output in both terminal windows for error messages
2. Ensure all dependencies are properly installed
3. Verify your `.env` configuration
4. Check that ports 5000 and 5173 are not blocked by firewall

## System Requirements

- **OS**: Windows 10 or later
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space for dependencies
- **Network**: Internet connection for initial setup and model downloads
- **Camera**: Built-in or USB camera for vehicle detection features
