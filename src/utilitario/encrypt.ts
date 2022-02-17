import bcrypt from 'bcrypt';

const saltRounds = 10;

const createHash = (password: string) => {
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
}

// => bcrypt
const isValidPassword = (user: any, password: string) => {
	return bcrypt.compareSync(password, user.password);
}

export {
	createHash,
	isValidPassword
}