import path  from "path";





export const CONFIG_EMAIL = {
    type:{
       activeAccount:1
    },
    from:"elliotgarcia091987@gmail.com",   
    subject:{
        newUser:"Active your account."
    },
    transport:{
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "afef71cf09adf0",
          pass: "06ff0f34079d90"
        }
    }
};

export const IP_SERVER = "localhost";

export const API_GOOGLE = "AIzaSyB_ksRWn8_w4g1pPqP5gtdwfqy6fkStfzk";

export const PORT = process.env.PORT || 3977;

export const DB_USER = "elliot";

export const DB_PASS = "Guillermo981";

export const DB_HOST = "chatapp.yrpdysl.mongodb.net";

export const JWT_SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";

export const MSG_UNAUTHORIZED = "Unauthorized";

export const MSG_AUTH_FAILED = "Authentication failed.";

export const MSG_REQUIRED_FIELDS = "Required fields are missing.";

export const ETQ_LOG = "Module -> FUNCTION[ %s ] -> MSG[ %s ]";

export const DATE_ZONE = "America/Mexico_City";

export const MODULES = {
      MODULE_ROLE:"ROLE",
      MODULE_CHAT:"CHAT"

}

export const SWAGGER_SPEC = {
    definition:{
       openapi:"3.0.0",
       info:{
         title: "App",
         version: "1.0"
       },
       servers:[
        {
            url:"http://localhost:3799",
            description:""
        }
       ]
    },
    apis:[
        `${path.join("../routes/index.js")}`
    ]
}


