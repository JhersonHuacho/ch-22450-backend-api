export const config = {
  fileSystem: {
    path: './DB'
  },
  mongodb: {
    cnxStrLocal: 'mongodb://127.0.0.1:27017/ecommerce',
    cnxStrAtlas: 'mongodb+srv://fhuacho:fhuacho123@cluster0.n8bnc.mongodb.net/ecommerce?retryWrites=true&w=majority',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      serverSelectionTimeoutMS: 5000,
    }
  },
  firebase: {
    "type": "service_account",
    "project_id": "ecommerce-33175",
    "private_key_id": "fd9c4dcdfdd6aef9a250fd0fd5bd1afcf6848bc6",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCiMSbvefuptqm5\nXBSkYkaO8w5iA+MnFeTa5T1DOU9sDHh0LbKkIOUzjl+zOKztKJ7PuzBEs0Qucfjh\nHyiCvHRMXK0hxzCoExl8giqgl6QPi9uvvxnjfbsKG1TphO3+HMf8AHNg2G0Deo5O\nNmNf1paB/KxS94rqDCcGy2ByO2FNuh1BZyzarVT9VVSMpdxT+SDEsiQtvP+9110T\n3muVzwqv861JPrqZAxGFYMHLB4C4Q/i6x6tEyIyhyoSZLRYsoO2egMpXR2b8aGa6\n2h0JT7FSos9sfMdfKh2hGUiSsqXkaSKHyljzbrAoLv+Ee30GyTl8OwUlcnueVWa6\nJ/jHpT8TAgMBAAECggEARkKQoVDwahaM85UmBAfmlOpJosAYWMgtOX3wyfw7oYzN\naVaaemsdnvXgEx1MG/hqw4ZNZJVbxdrte2gp/mhw4NuMzIMjWsvbUIp6uNK36Vwm\nsL1SE7BVpA0u/XHuPxRstYfkc2GN5+HhX5RD/DJTRMAWTmKZtMXK6jCT+SgsAKUc\nYfpWke4iE8ta3+oxCzS77M0H9QX2ZqcT9oOpLNX4sznoz0rXBb1rn4npv4cLYrVA\nt5Hte8tJRGbNq6swHeQZgdeX+O76CSwa502AWvW2kWIKkEqaZGPiSRFo51V+0Go4\nKjdf00MDmQdbh+MHSu7vwtMdrfVk90QCicTHwLXFwQKBgQDWAaFE3rAMIUXDWEf7\nKhfvDsfmkQ95gXqFSGIhaa5Ghjh3ivDOgpn8DUWGysQ8TZkwBone7Vx14ZSrO1Ka\nJk4EHLFpq4176wYaDkBT7BcF73SqcCbI6GtG58IQDAFvqVTqmugPhWj3HHxeRoYR\nFwZt4eiYoTie1eCrn1mbnJlxowKBgQDCBK97/cAciAsI1YgW90t6vI+lfYhuuzRC\nfaJF8qRCl5wws27HPN/GV9QpsWQCfBUswI2cB471Q3cGctseG/ad7MfpunhMxw/9\nQWr9NjLUn1sfgAytcZ8FEGoDVexdHS+74UYbhrQ8MTyt1kFRevMDa/u+1ZsrGdrh\nUmUHVBQz0QKBgQCnQ9jfckoZAPx85QhFqC3SvDPD40c8CdZQTDXetbHwD0IdNSxn\nzC48kcbwxpTAKUp8/e9OnSjyPeEsQI6cSyoZDrAfzmUkIJrBTLg8n7+S9QizmjrG\nNtp6LfRBBJEuzCPBxldwoi5bThlquiZZPyzYP4TDnucZRkN3AHJSLQDFjwKBgQCT\n8GausMov9zwSvF9Mw7v2FpmhoprJdE1g9dMqat39OQWLzQYHPc+TuZy5Pd34Vwz+\nVsSj2M+VDKBRdnrF9qSRvt6gxeK9CHyUq7Ec6prPrcMZvdXs2tpaTi3H5ViZl4uy\nQw/mJUyBKToPg3PC4XEzhr8qwE3VC53ueZk3gVD2QQKBgQCAqxG3S46zNWCHLDHg\nvpsGSeXYN8vn3Extq6lUZJk12L1lPTNzjbNK8ar4Y1kNgiQUF6p+4fSpKE7pHVfE\nJUWuQyisfeIyWeeXDaOXl2c6WqNXBYS4TK2YcxoyFulYnbCSsmAGITz/Z8JipTRH\nv2WKl/jFBhawDbE5mF09SpDdtA==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-jfdiq@ecommerce-33175.iam.gserviceaccount.com",
    "client_id": "114732708045156530707",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jfdiq%40ecommerce-33175.iam.gserviceaccount.com"
  }
  
}