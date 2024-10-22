document.getElementById('submitForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const url = new URL(window.location.href);
    const urlParams = new URLSearchParams(url.search);
    const utmSource = urlParams.get('utm_source');
    const utmCampaign = urlParams.get('utm_campaign');

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const baseURL = 'https://someserver'


    const data = {
        customer: {
            name: name,
            phone: phone,
            email: email,
        },
        channelId: utmSource,
        marketingCampaignId: utmCampaign,
        gymId: "",
        comment: "",
        company: ""
    }


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
            document.getElementById('formMessage').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);

        });
});

document.getElementById('strategyId').addEventListener('click', () => {
    scrollTo('formSection')
})

function scrollTo(id) {
    document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}
