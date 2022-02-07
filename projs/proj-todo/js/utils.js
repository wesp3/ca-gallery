const toDate = date => {
    return new Intl.DateTimeFormat('en-EN', { //for locales also can write: "he-HE-u-ca-hebrew" or "en-EN-u-nu-lath"
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date))
}


function _makeId(length = 5) {
    var txt = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
  }