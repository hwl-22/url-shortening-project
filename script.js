const mobileMenu = document.querySelector('.mobile-menu');
const navItems = document.querySelector('.navbar__items');
const apiKey = 'de82db3875b840a9ba623eace00db988';
const userInput = document.querySelector('.input-form input');

let dataBase = JSON.parse(localStorage.getItem('url'));

$('.input-section button').click(function () {
	if (!userInput.value) {
		$('.input-form').addClass('empty');
	} else {
		if (!dataBase) {
			dataBase = [];
		}
		const longUrl = userInput.value;

		let linkRequest = {
			destination: `${longUrl}`,
			domain: { fullName: 'rebrand.ly' },
		};

		let requestHeaders = {
			'Content-Type': 'application/json',
			apikey: apiKey,
		};

		$.ajax({
			url: 'https://api.rebrandly.com/v1/links',
			type: 'post',
			data: JSON.stringify(linkRequest),
			headers: requestHeaders,
			dataType: 'json',
			success: (link) => {
				// console.log(`Long URL was ${link.destination}, short URL is ${link.shortUrl}`);
				dataType = { input: longUrl, outcome: link.shortUrl };
				dataBase.push(dataType);
				localStorage.setItem('url', JSON.stringify(dataBase));

				$('.links-url-section').append(
					`<div class="links-url">
          <p class="input-value">${longUrl}</p>
          <p class="shortened-links">${link.shortUrl}</p>
          <button type="button" class="copy-btn fw-b">Copy</button>
        </div>`
				);

				$('.copy-btn').each(function () {
					$(this).click(function (event) {
						event.preventDefault();
						$(this).addClass('clicked');
						$(this).text('Copied!');
						navigator.clipboard.writeText($(this).prev().text());
					});
				});
			},
		});
	}
});

dataBase &&
	dataBase.forEach((element) => {
		$('.links-url-section').append(
			`<div class="links-url">
      <p class="input-value">${element.input}</p>
      <p class="shortened-links">${element.outcome}</p>
      <button type="button" class="copy-btn fw-b">Copy</button>
    </div>`
		);
	});

$('.copy-btn').each(function () {
	$(this).click(function (event) {
		event.preventDefault();
		$(this).addClass('clicked');
		$(this).text('Copied!');
		navigator.clipboard.writeText($(this).prev().text());
	});
});

mobileMenu.onclick = () => {
	mobileMenu.classList.toggle('active');
	navItems.classList.toggle('active');
};
