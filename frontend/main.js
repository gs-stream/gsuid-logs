const loginDiv = document.getElementById("loginDiv");
const appDiv = document.getElementById("appDiv");
const loginBtn = document.getElementById("loginBtn");
const loginMsg = document.getElementById("loginMsg");
const uidArea = document.getElementById("uidArea");

const backendUrl = "http://localhost:3000"; // ganti dengan backend URL jika deploy

loginBtn.onclick = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${backendUrl}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if(data.success){
    loginDiv.style.display = "none";
    appDiv.style.display = "block";
  } else {
    loginMsg.innerText = data.message;
  }
};

document.getElementById("ambilBtn").onclick = async () => {
  const res = await fetch(`${backendUrl}/api/uid`);
  const data = await res.json();
  uidArea.value = data.uids.join("\n");
};

document.getElementById("exportCSV").onclick = () => {
  const data = uidArea.value.split("\n").filter(l => l.trim() !== '');
  const csvContent = 'data:text/csv;charset=utf-8,' + data.join("\n");
  const link = document.createElement("a");
  link.href = encodeURI(csvContent);
  link.download = "uid_list.csv";
  link.click();
};

document.getElementById("exportJSON").onclick = () => {
  const data = uidArea.value.split("\n").filter(l => l.trim() !== '');
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "uid_list.json";
  link.click();
  URL.revokeObjectURL(url);
};
