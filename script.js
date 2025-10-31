// Tampilkan tanggal
const dateEl = document.getElementById("date");
const now = new Date();
dateEl.textContent = now.toLocaleDateString("id-ID", {
  weekday: "long", year: "numeric", month: "long", day: "numeric"
});

// ====== TO DO LIST ======
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.getElementById("addTask").addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task) {
    const li = document.createElement("li");
    li.innerHTML = `${task} <button class="delete">❌</button>`;
    taskList.appendChild(li);
    taskInput.value = "";
    li.querySelector(".delete").addEventListener("click", () => li.remove());
  }
});

// ====== CATATAN HARIAN ======
document.getElementById("saveNote").addEventListener("click", () => {
  const noteText = document.getElementById("noteInput").value;
  if (noteText.trim()) {
    localStorage.setItem("dailyNote", noteText);
    showNote();
  }
});

function showNote() {
  const saved = localStorage.getItem("dailyNote");
  if (saved) {
    document.getElementById("savedNote").innerHTML = `
      <h3>Catatan Tersimpan:</h3>
      <p>${saved}</p>
    `;
  }
}
showNote();

// ====== CUACA (API OpenWeatherMap) ======
document.getElementById("getWeather").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Masukkan nama kota!");

  const apiKey = "YOUR_API_KEY"; // 👉 ganti dengan API key OpenWeatherMap kamu
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=id&appid=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === "404") {
      document.getElementById("weatherResult").innerHTML = `<p>Kota tidak ditemukan 😢</p>`;
    } else {
      document.getElementById("weatherResult").innerHTML = `
        <h3>${data.name}</h3>
        <p>${data.weather[0].description}</p>
        <p>🌡️ Suhu: ${data.main.temp}°C</p>
      `;
    }
  } catch {
    document.getElementById("weatherResult").innerHTML = `<p>Gagal memuat data cuaca!</p>`;
  }
});
