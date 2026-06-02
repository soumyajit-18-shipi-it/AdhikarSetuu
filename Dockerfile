# syntax=docker/dockerfile:1

FROM python:3.14-slim

# Install system deps (minimal)
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only backend requirements first for better layer caching
COPY backend/requirements.txt /app/backend/requirements.txt

RUN python -m pip install --upgrade pip \
    && python -m pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy backend source
COPY backend/app /app/backend/app
COPY backend/data /app/backend/data
COPY backend /app/backend

# Expose FastAPI port
EXPOSE 8000

ENV PYTHONUNBUFFERED=1

# Default command: run FastAPI app
CMD ["python", "-m", "uvicorn", "backend.app.main:app", "--host=0.0.0.0", "--port=8000"]

