# Use the official Node.js image from the Docker Hub
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies inside the container
RUN npm install

# Copy all files from the host machine to the working directory inside the container
COPY . ./app

# Compile TypeScript files
# RUN npm run build

# Expose port 3000 to allow traffic into the container
EXPOSE 3000

# Define the command to run the application
CMD ["node", "app.ts"]
