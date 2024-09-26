const submitForm = document.getElementById('submitForm');
const formLabel = document.getElementById('formLabel');


submitForm.addEventListener('submit', function (event) {
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

                submitForm.style.display = 'none';
                formLabel.innerHTML = 'заявка принята,<br/> с вами свяжутся';
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Ошибка при отправке данных.');
            });
    } else {
        alert('Пожалуйста, заполните оба поля.');
    }
}
