#!/bin/sh
mysql -D encryptor -u root -p  -e 'DELETE FROM encrypteddata WHERE expireDate < CURDATE() or viewCount = 0;'
