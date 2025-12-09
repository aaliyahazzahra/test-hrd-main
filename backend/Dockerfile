# backend/Dockerfile

# Base image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV APP_HOME /app
WORKDIR $APP_HOME

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the port (FastAPI default)
EXPOSE 8000

# Command to run the application (menggunakan Gunicorn/Uvicorn untuk production)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]