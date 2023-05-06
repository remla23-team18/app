# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /root

# Copy the entire app code to the container
COPY my-app /root/

# Authenticate to GitHub Package Registry
ARG GH_TOKEN
ENV GH_TOKEN=${GH_TOKEN}
RUN npm config set @remla23-team18:registry https://npm.pkg.github.com
RUN echo "//npm.pkg.github.com/:_authToken=\${GH_TOKEN}" >> ~/.npmrc

# Install dependencies
RUN npm install

# Build the app for production
RUN npm run build

# Expose the container port
EXPOSE 3000

# Define the command to start the app
CMD ["npm", "start"]
