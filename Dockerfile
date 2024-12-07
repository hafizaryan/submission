FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV APP_PORT=8080
ENV APP_ENV=production
ENV MODEL_URL="https://storage.googleapis.com/submission-mlgc-hafiz/model-in-prod/model.json"
ENV PROJECT_ID="submissionmlgc-hafiz"
EXPOSE 8080
CMD ["npm", "run", "start"]