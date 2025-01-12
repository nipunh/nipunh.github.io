function cb(response) {
    console.log(response.value)
    document.getElementById('visits').innerText = response.value;
}
