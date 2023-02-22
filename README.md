Aplikasi Login/Register/Logout yang di dalamnya terdapat User Profile dengan JWT (accessToken)

-- Database MySQL--
Pembuatan aplikasi ini menggunakan database MySQL yang didalamnya terdapat User dan Profile,
dimana user akan mengUpload data Profile dan menyimpannya. untuk contoh query nya ada di file (data_api.sql)

-- Dependencies --

-bcrypt
-cookie-parser
-cors
-dotenv
-express
-express-fileupload
-jsonwebtoken
-mysql
-sequelize

-- API --

Pada Aplikasi ini terdapat link API sebagai berikut :

-- Login & Register --

1. GET      /users/       -->     menampilkan data
2. POST     /register/    -->     membuat data awal
3. POST     /login/       -->     untuk menginput data masuk
4. DELETE   /logout/      -->     untuk keluar dari login user

-User Profile-

1. GET     /profile/      -->     menampilkan data profile
2. POST    /profile/      -->     membuat data profile
3. PUT     /profile/:id   -->     merubah data profile
4. DELETE  /profile/:id   -->     menghapus data profile

-- Testing
untuk pengetesan bisa menggunakan aplikasi Postman, dan untuk struktur pengetesannya sudah saya sertakan di dalam repository saya.


Terima kasih.
