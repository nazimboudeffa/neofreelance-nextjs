# Job Board

A SaaS that lists full remote freelance jobs

## Env

```
# MongoDB URI for local development
MONGO_URI=mongodb://localhost:27017/neofreelance

# MongoDB URI for production (cloud)
# Uncomment and fill in the correct URI for your MongoDB Atlas cluster
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<neofreelance>?retryWrites=true&w=majority

# NextAuth configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=nextauth_something

# Email server configuration
EMAIL_SERVER=smtp://<username>:<password>@<smtp-host>:<port>
EMAIL_FROM=youremail@example.com
```