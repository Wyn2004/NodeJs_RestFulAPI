######### Các bước cài đặt và dùng nodeJS

1. Chạy lện npm init -y để cài đặt nodeJS
2. Cấu hình file package.json chỉnh thành dev + với cài đặt endpoint file
3. Cài đặt các thư viện npm i express dotenv cors nodemon
   npm i -D @babel/core @babel/preset-env @babel/node

express dùng để hứng các request của client gửi về server
dotenv dùng để đọc file môi trường .env
cors dùng để bảo mật server, chỉ cho phép 1 vài trang web có thể truy cập vào server backend ( đọc docs )
nodemon đùng để tự restart lại server khi thay đổi file có đôi .js, mjs ...

4. Config dự án như ở file index.js
5. Tạo thư mục src
   -> tạo thư mục trong đó gồm controllers, services, routes
6. Tạo thư mục .babelrc => cấu hình trong đó
7. Chỉnh lại file package.json để dự án chạy đc babel

######### Các bước cài đặt database và chạy bằng sequelize

1. Chạy lệnh npm install --save sequelize để cài sequelize
2. Chạy lệnh npm install --save mysql2 để cài đặt mysql2
3. Cài đặt và cấu hình như trên web orm sequelize và đc config trong connectDatabse
4. Cài đặt sequilize migration bằng lệnh: npm install --save-dev sequelize-cli
5. Khởi tạo thư mục model, migration và tạo mẫu 1 file databse bằng lệnh: npx sequelize-cli init

# lưu ý 1: cài trong thư mục src thì phải cd vào đó

# lưu ý 2: chỉnh sửa cấu hình db ở file config.json

6. Tạo modal đầu tiên (bảng user example) với lệnh: npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
7. Config lệnh "migration:up": "npx sequelize-cli db:migrate" và "migration:undo": "npx sequelize-cli db:migrate:undo" trong
   file packer.json để dễ dùng hơn
8. Association những Association A.hasOne(B), A.hasMany(B) thì foreign key sẽ nằm ở bảng B,
   còn A.belongsTo(B), A.belongsToMany(B) thì foreign key sẽ lằm ở bảng A

# lưu ý có 2 cách cài 1 ở đây và 1 ở package.json

######### Các thư viện thường dùng cho BE NODEJS

1. Cài đặt thư viện để hash password: npm i bcrypt
   Dùng để hash password và truyền vào database
2. Cài đặt thư viện JWT để gene ra token xác thực: npm i jsonwebtoken
   Dùng để phân quyền người dùng
3. Cài uuid4 để khởi tạo id không bao giờ trùng: npm i uuid4
4. Cài đặt thư viện để handle error code: npm i http-errors
5. Cài thư viện joi để xử lý validate: npm i joi
6. Cài đặt các thư viện dưới đây để upload ảnh
   npm install cloudinary multer multer-storage-cloudinary
   Sau đó làm theo file config là được
