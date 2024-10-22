document.getElementById('submitForm').addEventListener('submit', function (event) {
    event.preventDefault();


    const baseURL = 'https://someserver'
    const url = new URL(window.location.href);
    const urlParams = new URLSearchParams(url.search);
    const utmSource = urlParams.get('utm_source');
    const utmCampaign = urlParams.get('utm_campaign');

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const errorDiv = document.querySelector('.error');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+?[0-9]{7,14}$/;
    let isValid = true;
    const data = {
        customer: {
            name: name.value,
            phone: phone.value,
            email: email.value,
        },
        channelId: utmSource,
        marketingCampaignId: utmCampaign,
        gymId: "",
        comment: "",
        company: ""
    }


    errorDiv.style.display = 'none';

    if (name.parentElement.classList.contains('warning')) {
        name.parentElement.classList.remove('warning');
    }
    if (email.parentElement.classList.contains('warning')) {
        email.parentElement.classList.remove('warning');
    }
    if (phone.parentElement.classList.contains('warning')) {
        phone.parentElement.classList.remove('warning');
    }


    if (name.value.trim().length < 3) {
        isValid = false;
        name.parentElement.classList.add('warning');
    }


    if (!emailPattern.test(email.value.trim())) {
        isValid = false;
        email.parentElement.classList.add('warning');
    }


    if (phone.value.trim() !== '' && !phonePattern.test(phone.value.trim())) {
        isValid = false;
        phone.parentElement.classList.add('warning');
    }

    if (isValid) {
        fetch(`${baseURL}/events/callback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                document.getElementById('submitForm').style.display = 'none';
                document.getElementById('complete').style.display = 'flex';
            })
            .catch(error => {
                console.error('Error:', error);

            });
    } else if (!isValid) {
        event.preventDefault();
        errorDiv.style.display = 'flex';
    }


});

document.getElementById('phone').addEventListener('input', function (event) {
    const phoneField = event.target;
    phoneField.value = phoneField.value.replace(/[^\d+]/g, '');
});


document.getElementById('strategyId').addEventListener('click', () => {
    scrollTo('formSection')
})

function scrollTo(id) {
    document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}
