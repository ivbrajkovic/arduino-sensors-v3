// Card data
import React from 'react';

export const ivanCard = {
	front: {
		cover: 'https://picsum.photos/720/500?image=1044',
		user: '/img/ivan.jpg',
		title: 'Ivan Brajković',
		subtitle: 'dev. net.spec.',
		text:
			'HT-specijalista za upravljanje uslugama, CCNA specijalist za mreže, izvanredni student Fakulteta Informatike u Puli u sklopu Sveučilišta Jurja Dobrile u Puli.'
	},
	back: {
		header: (
			<p>
				"The thing about smart people is that thay seem like crazy people to dumb people."
				<span>
					<small>- Stephen Hawknig</small>
				</span>
			</p>
		),
		title: 'Lorem, ipsum.',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, quod.'
	},
	social: {
		github: 'https://github.com/ivbrajkovic'
	}
};

export const slavenCard = {
	front: {
		cover: 'https://unsplash.it/720/500?image=1067',
		user: '/img/slaven.jpg',
		title: 'Slaven Sokčević',
		subtitle: 'student',
		text:
			'Izvanredni student Fakulteta Informatike u Puli u sklopu Sveučilišta Jurja Dobrile u Puli.'
	},
	back: {
		title: 'Lorem, ipsum.',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, quod.'
	}
};

export const aleksandarCard = {
	front: {
		cover: 'https://picsum.photos/720/500?image=1056',
		// user: `${process.env.PUBLIC_URL}/img/aleksandar.jpg`,
		user: '/img/aleksandar.jpg',
		title: 'Aleksandar rakas',
		subtitle: 'teh. student',
		text:
			'HT-tehnički odjel za korisničko iskustvo, izvanredni student Fakulteta Informatike u Puli u sklopu Sveučilišta Jurja Dobrile u Puli.'
	},
	back: {
		title: 'Lorem, ipsum.',
		text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, quod.'
	}
};
