module.exports = {
  ADD_ENCRYPTED: "Insert into encrypteddata values(?)",
  GET_ENCRYPTED:
    "Select encryptedText, iv, viewCount from encrypteddata where uuid = ?",
  UPDATE_ENCRYPTED: " Update encrypteddata set viewCount = ? where uuid = ?",
};
