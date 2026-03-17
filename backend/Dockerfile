FROM python:3.11-slim

WORKDIR /app

# Install system dependencies (needed for Playwright headless mode if we add it)
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    libgconf-2-4 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# If playwright is in requirements, install the browsers
# RUN playwright install chromium --with-deps

COPY . .

# Expose the FastAPI port
EXPOSE 8000

# Run the uvicorn server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
