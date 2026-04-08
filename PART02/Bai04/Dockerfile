FROM node:18

# Tạo thư mục app
WORKDIR /app

# Copy package trước để cache tốt hơn
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy source code
COPY . .

# Mở port
EXPOSE 3000

# Chạy app
CMD ["npm", "start"]