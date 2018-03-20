function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  } 
  
  
  function getFromStorage(key) {
    var str = localStorage.getItem(key);
    return JSON.parse(str);
  } 
  
  
  