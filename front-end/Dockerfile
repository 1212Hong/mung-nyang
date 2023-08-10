# 이미지의 기반이 되는 Node.js 이미지 선택
FROM node:16.20.1-alpine

# 애플리케이션 코드를 담을 디렉토리 생성 및 작업 디렉토리 설정
WORKDIR /app

# 애플리케이션 종속성을 복사하고 설치
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Start the application
CMD ["npm", "start"]