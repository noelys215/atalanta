import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import config from '../../../utils/config';
import { signToken } from '../../../utils/auth';
import client from '../../../utils/client';

const handler = nc();

handler.post(async (req, res) => {
	const projectId = config.projectId;
	const dataset = config.dataset;
	const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;

	const createMutations = [
		{
			create: {
				_type: 'user',
				isAdmin: false,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password),
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				telephone: req.body.phone,
				country: req.body.country,
				address: req.body.address,
				addressCont: req.body.addressCont,
				state: req.body.state,
				city: req.body.city,
				postalCode: req.body.postalCode,
			},
		},
	];

	const existUser = await client.fetch(`*[_type == "user" && email == $email][0]`, {
		email: req.body.email,
	});
	if (existUser) {
		return res.status(401).send({ message: 'Email already exists' });
	}

	const { data } = await axios.post(
		`https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
		{ mutations: createMutations },
		{
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${tokenWithWriteAccess}`,
			},
		}
	);
	const userID = data.results[0].id;
	const user = {
		_id: userID,
		isAdmin: false,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password),
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		telephone: req.body.phone,
		country: req.body.country,
		address: req.body.address,
		addressCont: req.body.addressCont,
		state: req.body.state,
		city: req.body.city,
		postalCode: req.body.postalCode,
	};
	const token = signToken(user);
	res.send({ ...user, token });
});

export default handler;
