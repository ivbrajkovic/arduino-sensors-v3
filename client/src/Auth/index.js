/**
 * Auth module
 */

const api = 'http://localhost/user';

const login = async ({ email, password }) => {
	const res = await fetch(api + '/login', {
		method: 'POST',
		body: { email, password },
	});

  if(res.status !== 200) ;
  
  

};
