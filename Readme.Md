
Project overview: This is parcel delivery system backend that have role based system. This system have four role Super_Admin, Admin,Sender and receiver.
* Technology: node.js,express.js,zod,bcrypt.js,moongose.
** Uses : This project api use in parcel delivery system front end.
1. Install dependencies using `npm install`.  
2. Create a `.env` file with `MONGO_URI` and `JWT_SECRET`.  
3. Start the server with `npm run dev`.  
4. Use Postman to test endpoints by including the JWT token in the `Authorization` header.  
5. Follow role-based restrictions: sender routes for senders, receiver routes for receivers, and admin routes for admins.
