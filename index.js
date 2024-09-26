document.getElementById('submitButton').addEventListener('submit', function (event) {
    event.preventDefault();
    solve();
})


function solve() {
    const inputName = document.getElementById("name").value;
    const inputEmail = document.getElementById("email").value;

    if (inputName && inputEmail) {
        fetch('https://hio-fitting.incode-systems.com/saveDataFromEvasoft.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `name=${encodeURIComponent(inputName)}&emailPhone=${encodeURIComponent(inputEmail)}`
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                alert('Данные успешно отправлены.');
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Ошибка при отправке данных.');
            });
    } else {
        alert('Пожалуйста, заполните оба поля.');
    }
}
